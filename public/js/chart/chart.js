import Node from "../functionHandle/Node.js";
import { getHistory } from "../lib/ultils.js";
import ShowTrip from "./component/ShowTrip.js";

const robotChart = document.querySelector("#robot-chart");
const selectChartType = document.querySelector(
    "[data-name='change-type-chart']",
);
const dataChartRobot = {
    listDate: [],
    trip: {},
    error: {},
    battery: {},
    systemError: {},
};
const activeSelect = {
    nameRobot: "",
    type: "trip", //"error"
};
const detailChart = {
    trip: {
        borderColor: "#88AB8E",
        label: "Trips",
    },
    error: {
        borderColor: "#FFB534",
        label: "Short stop error",
    },
    battery: {
        borderColor: "#52D3D8",
        label: "Battery",
    },
    systemError: {
        borderColor: "red",
        label: "System error",
    },
};

const dataUiChair = {
    labels: [],
    datasets: [
        {
            label: "",
            data: [],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.01,
            pointStyle: "circle",
            pointRadius: 10,
            pointHoverRadius: 15,
        },
    ],
};

const ShowTripElement = Node("div").props({
    className: "bg-white w-3/4 h-3/4 rounded-md",
    children: "12",
});
const ShowTripComponent = (() => {
    const ShowTripContainer = Node("div").props({
        className:
            "fixed top-0 left-0 w-full h-full bg-black/10 flex justify-center items-center",
        onClick: (e) => {
            if (e.target === ShowTripContainer) {
                ShowTripContainer.remove();
            }
        },
        children: [ShowTripElement],
    });

    return {
        show() {
            document.body.appendChild(ShowTripContainer);
        },
        remove() {
            ShowTripContainer.children.remove();

            ShowTripContainer.remove();
        },
    };
})();

const chart = new Chart(document.getElementById("trips"), {
    type: "line",
    data: dataUiChair,
    options: {
        responsive: true,
        onClick: (e, legendItem, chart) => {
            if (legendItem) {
                // const index = legendItem[0].index;
                // console.log(ShowTripElement);
                // ShowTripComponent.show(ShowTripElement);
            }
        },
        element: {
            borderJoinStyle: "round",
            capBezierPoints: false,
        },
        plugins: {
            datalabels: {
                color: "#36A2EB",
                align: "top",
                offset: 6,
            },
        },
        interaction: {
            mode: "index",
            intersect: false,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Count",
                },
                min: 0,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    },
    plugins: [ChartDataLabels],
});
robotChart.addEventListener("change", async (e) => {
    const nameRobot = e.target.value;
    if (nameRobot) {
        const data = await getHistory(nameRobot);
        const dataChart = getDataChart(data);

        const formatTripsDateData = formatDataChartFollowDate(dataChart.trips);
        const formatErrorData = formatDataChartFollowDate(dataChart.error);
        const formatBatteryData = formatDataChartFollowDate(dataChart.battery);
        const formatSystemErrorData = formatDataChartFollowDate(
            dataChart.errorSystem,
        );

        const tripCount = toChartLib(formatTripsDateData);
        const errorCount = toChartLib(
            formatErrorData,
            Object.keys(formatTripsDateData),
        );
        const batteryCount = toChartLib(
            formatBatteryData,
            Object.keys(formatTripsDateData),
        );
        const SystemError = toChartLib(
            formatSystemErrorData,
            Object.keys(formatTripsDateData),
        );
        dataChartRobot.trip = tripCount;
        dataChartRobot.error = errorCount;
        dataChartRobot.battery = batteryCount;
        dataChartRobot.systemError = SystemError;

        drawChart();
    } else {
        updateChart({ chart: chart, reset: true });
    }
});

function getDataChart(data) {
    const dataChart = {
        trips: [],
        error: [],
        battery: [],
        errorSystem: [],
    };
    const STRING_FINISH_TRIP = "Finish mission action normal";
    const STRING_FINISH_BATTERY = "action mission charge battery";
    const STRING_ERROR_MISSION = "Error mission";

    data?.map((item) => {
        if (item.data.includes(STRING_FINISH_TRIP)) {
            dataChart.trips.push({
                data: item.data,
                time: item.time,
                timeLine: item.timeLine,
                nameMission: item.data.replace(STRING_FINISH_TRIP + ": ", ""),
            });
        }
        if (item.data.includes(STRING_FINISH_BATTERY)) {
            dataChart.battery.push(item);
        }
        if (item.data.includes(STRING_ERROR_MISSION)) {
            dataChart.error.push(item);
        }
    });

    return dataChart;
}

function formatDataChartFollowDate(dataList) {
    const data = {};
    dataList.map((trip) => {
        const { timeLine } = trip;
        if (data.hasOwnProperty(timeLine)) {
            return data[timeLine].push(trip);
        } else {
            return (data[timeLine] = [trip]);
        }
    });
    return data;
}

function toChartLib(data, keys) {
    if (!keys) {
        const labelList = Object.keys(data).map((date) => {
            return new Date(Number(date)).toLocaleDateString("VI-vi");
        });
        const dataChart = Object.keys(data).map((date) => {
            return data[date].length;
        });

        return { data: dataChart, labelList };
    } else {
        const dataChart = keys.map((keys) => {
            const dataListChart = data[keys];
            if (dataListChart) {
                return dataListChart.length;
            } else {
                return 0;
            }
        });

        const stringDateList = keys.map((date) => {
            return new Date(Number(date)).toLocaleDateString("VI-vi");
        });
        return { data: dataChart, labelList: stringDateList };
    }
}

function updateChart({
    chart,
    labelList = [],
    data = [],
    label = "",
    borderColor = "",
    reset = false,
}) {
    if (reset) {
        chart.data.datasets.forEach((dataset) => {
            dataset.data.length = 0;
        });
        chart.data.labels.length = 0;
        chart.update();
    } else {
        if (chart.data.datasets.length > 1) {
            chart.data.datasets.pop();
        }
        chart.data.labels.length = 0;
        chart.data.datasets.forEach((dataset) => {
            dataset.data.length = 0;
            dataset.data.push(...data);
            dataset.type = "line";
            dataset.label = label;
            borderColor && (dataset.borderColor = borderColor);
        });
        chart.data.labels.push(...labelList);
        chart.update();
    }
}

function drawChart() {
    updateChart({
        chart: chart,
        data: dataChartRobot[activeSelect.type].data,
        labelList: dataChartRobot[activeSelect.type].labelList,
        label: detailChart[activeSelect.type].label,
        borderColor: detailChart[activeSelect.type].borderColor,
    });
}

selectChartType.onclick = (e) => {
    const type = e.target.dataset.name;
    selectChartType.dataset.active = type;
    if (dataChartRobot.hasOwnProperty(type)) {
        activeSelect.type = type;
        drawChart();
    }
    if (type === "performance") {
        handler(chart);
    }
};

const handler = (chart) => {
    if (chart.data.datasets.length > 1) {
        chart.data.datasets.pop();
    }
    updateChart({
        chart: chart,
        data: dataChartRobot.error.data,
        labelList: dataChartRobot.error.labelList,
        label: detailChart.error.label,
        borderColor: detailChart.error.borderColor,
    });
    const newDataset = {
        label: "Trips",
        backgroundColor: "#ccc",
        borderColor: "#ccc",
        borderWidth: 1,
        type: "bar",
        data: dataChartRobot.trip.data,
    };
    chart.data.datasets.push(newDataset);
    chart.update();
};
