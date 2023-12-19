import { getHistory } from "../lib/ultils.js";

const robotChart = document.querySelector("#robot-chart");
const selectChartType = document.querySelector(
    "[data-name='change-type-chart']",
);
const dataChartRobot = {
    trip: {},
    error: {},
    battery: {},
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
        borderColor: "#EF4040",
        label: "Error",
    },
    battery: {
        borderColor: "#52D3D8",
        label: "Battery",
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

const chart = new Chart(document.getElementById("trips"), {
    type: "line",
    data: dataUiChair,
    options: {
        responsive: true,
        onClick: (e, legendItem, chart) => {
            const index = legendItem[0].index;
            console.log(e);
            console.log(chart.data.labels.at(index));
            // console.log(dataChartRobot[activeSelect.type]);
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
                    text: "Quantity",
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

        const tripCount = toChartLib(formatTripsDateData);
        const errorCount = toChartLib(formatErrorData);
        const batteryCount = toChartLib(formatBatteryData);
        dataChartRobot.trip = tripCount;
        dataChartRobot.error = errorCount;
        dataChartRobot.battery = batteryCount;

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
    };
    const STRING_FINISH_TRIP = "Finish mission action normal";
    const STRING_FINISH_BATTERY = "action mission charge battery";
    const STRING_ERROR_MISSIon = "Error mission";
    data.map((item) => {
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
        if (item.data.includes(STRING_ERROR_MISSIon)) {
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

function toChartLib(input) {
    const labelList = Object.keys(input).map((date) => {
        return new Date(Number(date)).toLocaleDateString("VI-vi");
    });
    const data = Object.keys(input).map((date) => {
        return input[date].length;
    });
    return { data, labelList };
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
        chart.data.labels.length = 0;
        chart.data.datasets.forEach((dataset) => {
            dataset.data.length = 0;
            dataset.data.push(...data);
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
    if (dataChartRobot.hasOwnProperty(type)) {
        selectChartType.dataset.active = type;
        activeSelect.type = type;
        drawChart();
    }
};
