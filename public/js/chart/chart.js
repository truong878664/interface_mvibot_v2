import Node from "../functionHandle/Node.js";
import { getHistory } from "../lib/ultils.js";
import ShowTrip from "./component/ShowTrip.js";

const robotChart = document.querySelector("#robot-chart");
const selectChartType = document.querySelector(
    "[data-name='change-type-chart']",
);
const leftChartDate = document.querySelector("[data-name='left-chart-date']");
const rightChartDate = document.querySelector("[data-name='right-chart-date']");

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

const currentStepDate = { current: 0 };
const nameRobotRef = { current: null };
const dataHistoryRef = { current: null };
const dataErrorSystemRef = { current: null };

leftChartDate.addEventListener("click", () => {
    if (!nameRobotRef.current) return;
    currentStepDate.current = currentStepDate.current + 1;
    drawChareAll();
});

rightChartDate.addEventListener("click", () => {
    if (!nameRobotRef.current) {
        return;
    }
    if (currentStepDate.current !== 0) {
        currentStepDate.current = currentStepDate.current - 1;
        drawChareAll();
    }
});

robotChart.addEventListener("change", async (e) => {
    const nameRobot = e.target.value;
    if (nameRobot) {
        nameRobotRef.current = nameRobot;
        const data = await getHistory(nameRobotRef.current);
        const dataERrorSystem = await errorSystem(nameRobotRef.current);
        const showChart = Promise.resolve();
        showChart
            .then(() => {
                dataHistoryRef.current = data;
                dataErrorSystemRef.current = dataERrorSystem;
            })
            .then(drawChareAll);
    } else {
        updateChart({ chart: chart, reset: true });
        nameRobotRef.current = null;
        dataHistoryRef.current = null;
        dataErrorSystemRef.current = null;
    }
});

async function drawChareAll() {
    const STEP_MOVE_DAY = 14;
    function getListDay() {
        const listDate = {};
        const now = new Date();
        for (
            let i = currentStepDate.current * STEP_MOVE_DAY;
            i < currentStepDate.current * STEP_MOVE_DAY + STEP_MOVE_DAY;
            i++
        ) {
            const time = new Date().setDate(now.getDate() - i);
            const newTime = new Date(time);
            newTime.setHours(0);
            newTime.setSeconds(0);
            newTime.setMinutes(0);
            newTime.setMilliseconds(0);
            const timeLine = newTime.getTime();
            listDate[timeLine] = [];
        }
        return listDate;
    }
    const listDay = getListDay();
    const dataChart = getDataChart(dataHistoryRef.current);
    const formatTripsDateData = formatDataChartFollowDate(dataChart.trips);
    const formatErrorData = formatDataChartFollowDate(dataChart.error);
    const formatBatteryData = formatDataChartFollowDate(dataChart.battery);

    const tripCount = toChartLib(
        formatTripsDateData,
        Object.keys(listDay).reverse(),
    );
    const errorCount = toChartLib(
        formatErrorData,
        Object.keys(listDay).reverse(),
    );
    const errorSystemCount = toChartLib(
        dataErrorSystemRef.current,
        Object.keys(listDay).reverse(),
    );

    const batteryCount = toChartLib(
        formatBatteryData,
        Object.keys(listDay).reverse(),
    );

    // const tripCount = toChartLib(formatTripsDateData);
    // const errorCount = toChartLib(
    //     formatErrorData,
    //     Object.keys(formatTripsDateData),
    // );
    // const errorSystemCount = toChartLib(
    //     dataERrorSystem,
    //     Object.keys(formatTripsDateData),
    // );

    // const batteryCount = toChartLib(
    //     formatBatteryData,
    //     Object.keys(formatTripsDateData),
    // );

    dataChartRobot.trip = tripCount;
    dataChartRobot.error = errorCount;
    dataChartRobot.battery = batteryCount;
    dataChartRobot.systemError = errorSystemCount;

    drawChart();
}

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
        justOneDataChart(chart);
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

function justOneDataChart(chart) {
    if (chart.data.datasets.length > 1) {
        chart.data.datasets.pop();
        chart.data.datasets.pop();
    }
}

function drawChart() {
    if (activeSelect.type === "performance") {
        handler(chart);
    } else {
        updateChart({
            chart: chart,
            data: dataChartRobot[activeSelect.type].data,
            labelList: dataChartRobot[activeSelect.type].labelList,
            label: detailChart[activeSelect.type].label,
            borderColor: detailChart[activeSelect.type].borderColor,
        });
    }
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
        activeSelect.type = "performance";
    }
};

const handler = (chart) => {
    justOneDataChart(chart);
    updateChart({
        chart: chart,
        data: dataChartRobot.error.data,
        labelList: dataChartRobot.error.labelList,
        label: detailChart.error.label,
        borderColor: detailChart.error.borderColor,
    });
    const dataSystemError = {
        label: detailChart.systemError.label,
        borderColor: detailChart.systemError.borderColor,
        borderWidth: 2,
        type: "line",
        data: dataChartRobot.systemError.data,
        stepSize: 2,
    };
    const newDataset = {
        label: "Trips",
        borderColor: detailChart.trip.borderColor,
        borderWidth: 2,
        type: "bar",
        data: dataChartRobot.trip.data,
    };
    chart.data.datasets.push(newDataset, dataSystemError);
    chart.update();
};

async function errorSystem(name_seri) {
    const res = await fetch("/api/error-system/" + name_seri);
    const data = await res.json();
    const errorSystemList = {};
    data.map((error) => {
        const time = new Date(error.created_at);
        time.setHours(0);
        time.setSeconds(0);
        time.setMinutes(0);
        time.setMilliseconds(0);
        const timeLine = time.getTime();
        if (errorSystemList.hasOwnProperty(timeLine)) {
            return errorSystemList[timeLine].push(error);
        } else {
            return (errorSystemList[timeLine] = [error]);
        }
    });
    return errorSystemList;
}
