import { getHistory, useRef } from "../lib/ultils.js";
import { showPopupShortError, showPopupTrip } from "./handle.js";
import handleErrorSystem from "./handleErrorSystem.js";
import {
    detailChart,
    getDataChart,
    getErrorSystem,
    getListDay,
    toDatasetChart,
    updateChart,
} from "./ultils.js";

const getElementByName = (name) =>
    document.querySelector(`[data-name='${name}']`);

const robotChart = document.querySelector("#robot-chart");
const selectChartType = getElementByName("change-type-chart");
const leftChartDate = getElementByName("left-chart-date");
const rightChartDate = getElementByName("right-chart-date");
const ctx = document.getElementById("trips");

export const nameRobotRef = useRef(null);

export const typeActiveRef = useRef("trip");
export const dataHistoryRef = useRef(null);

export const dataErrorSystemRef = useRef(null);
export const dataTripsRef = useRef(null);
export const dataErrorRef = useRef(null);
export const dataBatteryRef = useRef(null);
export const detailErrorSystemRef = useRef(null);

export const dataChartRef = useRef({
    systemError: null,
    trip: null,
    error: null,
    battery: null,
});

export const currentStepDate = useRef(0);
const currentDatasetChart = useRef({
    labels: null,
    datasets: null,
});

const dataUiChair = {
    labels: [],
    datasets: [
        {
            label: "",
            data: [],
            name: "main",
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.01,
            pointStyle: "circle",
            pointRadius: 10,
            pointHoverRadius: 15,
        },
    ],
};

const alwayShowToolTip = {
    id: "alwayShowToolTip",
    afterDraw(chart, args, options) {
        if (typeActiveRef.current !== "systemError") return;
        const { ctx } = chart;
        chart.data.datasets.forEach((dataset, i) => {
            chart.getDatasetMeta(i).data.forEach((dataPoint, index) => {
                const timeLineLabel = chart.data.labels[index];
                const found = detailErrorSystemRef.current?.[timeLineLabel];
                if (found) {
                    const { x, y } = dataPoint.tooltipPosition();
                    const width = 80;
                    const padding = 5;
                    const leading = 16;
                    const positionX =
                        index === 0
                            ? x
                            : index === chart.getDatasetMeta(i).data.length - 1
                            ? x - width
                            : x - width / 2;

                    ctx.fillStyle = "rgba(0,0,0,0.8)";
                    ctx.fillRect(
                        positionX,
                        y - 10,
                        width,
                        (leading * 3 + padding) * found.length,
                    );
                    found.forEach((item, index) => {
                        ctx.fillStyle = "white";
                        ctx.fillText(
                            `• ${item.from}_${item.dateFrom}`,
                            positionX + padding,
                            y + (leading * 3 * index + padding * index),
                        );
                        ctx.fillText(
                            `${item.to}_${item.dateTo}`,
                            positionX + padding,
                            y +
                                leading +
                                (leading * 3 * index + padding * index),
                        );
                        ctx.fillText(
                            `P/T: ${item.hours}h ${item.minute}m`,
                            positionX + padding,
                            y +
                                leading * 2 +
                                (leading * 3 * index + padding * index),
                        );
                    });
                }
            });
        });
    },
};

const chart = new window.Chart(ctx, {
    type: "line",
    data: dataUiChair,
    options: {
        onClick: (e, legendItem, chart) => {
            try {
                const isShortError =
                    chart.data.datasets[0].id_ === "error" &&
                    chart.data.datasets[0].label?.includes(
                        "Short stop error",
                    ) &&
                    chart.data.datasets.length === 1;

                const isTrip =
                    chart.data.datasets[0].label?.includes("Trips") &&
                    chart.data.datasets.length === 1;
                if (isTrip) showPopupTrip({ chart, legendItem });
                if (isShortError) showPopupShortError({ chart, legendItem });
            } catch (error) {
                console.log(error);
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
                anchor: "end",
                offset: 3,
            },
            tooltip: {
                enabled: true,
            },
            legend: { display: true },
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
    plugins: [ChartDataLabels, alwayShowToolTip],
});

const onChangeRobot = async (e) => {
    const nameRobot = e.target.value;
    if (nameRobot) {
        nameRobotRef.current = nameRobot;
        const dataHistory = await getHistory(nameRobotRef.current);
        const dataErrorSystem = await getErrorSystem(nameRobotRef.current);
        dataHistoryRef.current = dataHistory;
        const dataParseFromHistory = getDataChart(dataHistory);

        detailErrorSystemRef.current = handleErrorSystem({
            dataErrorSystem,
            dataErrorShort: dataParseFromHistory.error,
        });
        dataChartRef.current.systemError = dataErrorSystem;
        dataChartRef.current.trip = dataParseFromHistory.trips;
        dataChartRef.current.error = dataParseFromHistory.error;
        dataChartRef.current.battery = dataParseFromHistory.battery;
        drawChartMain();
    } else {
        updateChart({ chart: chart, reset: true });
        nameRobotRef.current = null;
        dataHistoryRef.current = null;
        dataErrorSystemRef.current = null;
    }
};

const onChangeTypeChart = (e) => {
    const type = e.target.dataset.name;
    if (
        dataChartRef.current.hasOwnProperty(type) ||
        type === "performanceMvpTime" ||
        type === "performance"
    ) {
        Promise.resolve()
            .then(() => {
                selectChartType.dataset.active = type;
                typeActiveRef.current = type;
                return Promise.resolve();
            })
            .then(() => {
                drawChartMain();
            });
    }
};

const onClickLeftListDateChart = () => {
    if (!nameRobotRef.current) return;
    currentStepDate.current = currentStepDate.current + 1;
    drawChartMain();
};

const onCLickRightListDateChart = () => {
    if (!nameRobotRef.current) return;
    if (currentStepDate.current !== 0) {
        currentStepDate.current = currentStepDate.current - 1;
        drawChartMain();
    }
};

const drawChartMain = () => {
    updateChart({
        chart: chart,
        reset: true,
    });
    if (!nameRobotRef.current) return;
    switch (typeActiveRef.current) {
        case "performanceMvpTime":
            currentDatasetChart.current.labels = getListDay({ atHour: 6 });
            const datasetErrorMvpTime = toDatasetChart(
                dataChartRef.current.error,
                currentDatasetChart.current.labels,
                "scope",
            );
            updateChart({
                chart: chart,
                data: datasetErrorMvpTime.datasets,
                labelList: datasetErrorMvpTime.labels,
                label: detailChart.error.label,
                borderColor: detailChart.error.borderColor,
            });

            const datasetTripMvpTime = toDatasetChart(
                dataChartRef.current.trip,
                currentDatasetChart.current.labels,
                "scope",
            );
            const datasetSystemErrorMvpTime = toDatasetChart(
                dataChartRef.current.systemError,
                currentDatasetChart.current.labels,
                "scope",
            );

            const dataSystemErrorMvpTime = {
                label: "System error",
                borderColor: detailChart.systemError.borderColor,
                borderWidth: 2,
                type: "line",
                data: datasetSystemErrorMvpTime.datasets,
                stepSize: 2,
                labels: datasetTripMvpTime.labels,
            };
            const dataTripsMvpTime = {
                label: "Trips",
                borderColor: detailChart.trip.borderColor,
                borderWidth: 2,
                type: "bar",
                data: datasetTripMvpTime.datasets,
                labels: datasetTripMvpTime.labels,
            };

            chart.data.datasets.push(dataTripsMvpTime, dataSystemErrorMvpTime);
            chart.update();
            break;
        case "performance":
            currentDatasetChart.current.labels = getListDay({});
            const datasetError = toDatasetChart(
                dataChartRef.current.error,
                currentDatasetChart.current.labels,
            );
            updateChart({
                chart: chart,
                data: datasetError.datasets,
                labelList: datasetError.labels,
                label: "Short stop error",
                labels: detailChart.error.label,
                borderColor: detailChart.error.borderColor,
            });

            const datasetTrip = toDatasetChart(
                dataChartRef.current.trip,
                currentDatasetChart.current.labels,
            );

            const datasetSystemError = toDatasetChart(
                dataChartRef.current.systemError,
                currentDatasetChart.current.labels,
            );
            const dataSystemError = {
                label: "System error",
                borderColor: detailChart.systemError.borderColor,
                borderWidth: 2,
                type: "line",
                data: datasetSystemError.datasets,
                labels: datasetSystemError.labels,
                stepSize: 2,
            };
            const dataTrips = {
                label: "Trips",
                borderColor: detailChart.trip.borderColor,
                borderWidth: 2,
                type: "bar",
                data: datasetTrip.datasets,
                labels: datasetSystemError.labels,
            };

            chart.data.datasets.push(dataTrips, dataSystemError);
            chart.update();
            break;
        case "systemError":
            currentDatasetChart.current.labels = getListDay({ atHour: 6 });
            const datasetErrorSystemMvpTime = toDatasetChart(
                dataChartRef.current.systemError,
                currentDatasetChart.current.labels,
                "scope",
            );
            updateChart({
                chart: chart,
                data: datasetErrorSystemMvpTime.datasets,
                labelList: datasetErrorSystemMvpTime.labels,
                label: detailChart[typeActiveRef.current].label,
                borderColor: detailChart[typeActiveRef.current].borderColor,
            });
            break;
        case "battery":
            currentDatasetChart.current.labels = getListDay({});
            const listDataChart_ = dataChartRef.current[typeActiveRef.current];
            const datasetChart_ = toDatasetChart(
                listDataChart_,
                currentDatasetChart.current.labels,
            );
            currentDatasetChart.current = datasetChart_;
            const optionUpdateChart_ = {
                chart: chart,
                data: datasetChart_.datasets.map((count) =>
                    Math.floor(count / 2),
                ),
                labelList: datasetChart_.labels,
                label: detailChart[typeActiveRef.current].label,
                borderColor: detailChart[typeActiveRef.current].borderColor,
                id_: typeActiveRef.current,
            };
            updateChart(optionUpdateChart_);
            break;
        default:
            currentDatasetChart.current.labels = getListDay({});
            const listDataChart = dataChartRef.current[typeActiveRef.current];
            const datasetChart = toDatasetChart(
                listDataChart,
                currentDatasetChart.current.labels,
            );

            currentDatasetChart.current = datasetChart;

            const optionUpdateChart = {
                chart: chart,
                data: datasetChart.datasets,
                labelList: datasetChart.labels,
                label: detailChart[typeActiveRef.current].label,
                borderColor: detailChart[typeActiveRef.current].borderColor,
                id_: typeActiveRef.current,
            };
            updateChart(optionUpdateChart);
            break;
    }
};

robotChart.addEventListener("change", onChangeRobot);
leftChartDate.addEventListener("click", onClickLeftListDateChart);
rightChartDate.addEventListener("click", onCLickRightListDateChart);
selectChartType.addEventListener("click", onChangeTypeChart);
