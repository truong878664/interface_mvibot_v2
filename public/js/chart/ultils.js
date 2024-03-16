import uniqBy from "../lib/lodash/uniqby.js";
import { currentStepDate } from "./chart.js";

export const getListDay = ({ atHour = 0, typeReturn = "object" }) => {
    const STEP_MOVE_DAY = 9;
    const listDate = {};
    const listDateArray = [];
    const now = new Date();
    for (
        let i = currentStepDate.current * STEP_MOVE_DAY;
        i < currentStepDate.current * STEP_MOVE_DAY + STEP_MOVE_DAY;
        i++
    ) {
        const time = new Date().setDate(now.getDate() - i);
        const newTime = new Date(time);
        newTime.setHours(atHour);
        newTime.setSeconds(0);
        newTime.setMinutes(0);
        newTime.setMilliseconds(0);
        const timeLine = newTime.getTime();
        listDate[timeLine] = [];
        listDateArray.push(timeLine);
    }
    if (typeReturn === "object") {
        return listDate;
    } else if (typeReturn === "array") {
        return listDateArray;
    } else {
        return {};
    }
};

export async function getErrorSystem(name_seri, atHour = 0) {
    const res = await fetch("/api/error-system/" + name_seri);
    const data = await res.json();
    const nextData = data.map((error) => {
        const time = new Date(error.created_at);
        // time.setHours(atHour);
        time.setSeconds(0);
        time.setMinutes(0);
        time.setMilliseconds(0);
        const timeLine = time.getTime();
        return { ...error, timeLine: timeLine };
    });
    return nextData;
}

export const detailChart = {
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
/**
 *
 * @param {({timeLine: number} & {[key:string]:unknown})[]} data
 * @param {{[key: string]:[]}} keys
 * @param {"equal" | "scope"} type
 * @param {string | undefined} typeActive
 * @returns
 */
export const toDatasetChart = (data, keys, type = "equal", typeActive) => {
    let dataGroupByDate = JSON.parse(JSON.stringify(keys));
    const dataChart = {
        labels: [],
        datasets: [],
    };
    if (type === "equal") {
        data.map((item) => {
            const time = new Date(item.timeLine);
            time.setHours(0);
            if (time.getTime() in dataGroupByDate) {
                dataGroupByDate[time.getTime()].push(item);
            }
            return dataGroupByDate;
        });
    } else if (type === "scope") {
        const arrayTimeLine = Object.keys(keys).map((key) => Number(key));

        const HOUR_PER_DAY = 24;
        const MILLISECONDS_PER_HOUR = 3600000;
        data.map((item) => {
            arrayTimeLine.forEach((date, index) => {
                if (
                    item.timeLine >= date &&
                    item.timeLine < date + MILLISECONDS_PER_HOUR * HOUR_PER_DAY
                ) {
                    let nextDate;
                    const timeItem = new Date(item.timeLine);
                    const currentHours = timeItem.getHours();
                    if (currentHours < 6) {
                        timeItem.setDate(timeItem.getDate() - 1);
                        timeItem.setHours(6);
                        nextDate = timeItem.getTime();
                    } else if (currentHours >= 6) {
                        timeItem.setHours(6);
                        nextDate = timeItem.getTime();
                    }
                    if (nextDate in dataGroupByDate) {
                        return dataGroupByDate[nextDate].push(item);
                    }
                }
            });
            return dataGroupByDate;
        });
    }

    /** uniq data error when duplicate */
    if (typeActive === "error") {
        Object.keys(dataGroupByDate).forEach((key) => {
            const uniqResult = uniqBy(dataGroupByDate[key], "data");
            dataGroupByDate[key] = uniqResult;
        });
    }
    /**group data */
    Object.keys(dataGroupByDate)
        .reverse()
        .map((timeline) => {
            if (type === "equal") {
                dataChart.labels.push(
                    new Date(Number(timeline)).toLocaleDateString("VI-vi"),
                );
                dataChart.datasets.push(dataGroupByDate[timeline].length);
                return dataChart;
            } else if (type === "scope") {
                const time = new Date(Number(timeline));
                const time1 = `6 AM ${time.getDate()}/${time.getMonth() + 1}`;
                time.setDate(time.getDate() + 1);
                const time2 = `6 AM ${time.getDate()}/${time.getMonth() + 1}`;
                dataChart.labels.push(time1 + " - " + time2);
                dataChart.datasets.push(dataGroupByDate[timeline].length);
                return dataChart;
            }
        });
    return dataChart;
};

export const groupDateMvpTime = (dataErrorSystem) => {
    const dataGroupDateMvpTime = {};
    dataErrorSystem.map((item) => {
        const timeItem = new Date(item.created_at);
        const currentHours = timeItem.getHours();
        let nextDate;
        if (currentHours < 6) {
            timeItem.setDate(timeItem.getDate() - 1);
            timeItem.setHours(6);
            timeItem.setMinutes(0);
            timeItem.setSeconds(0);
            timeItem.setMilliseconds(0);
            nextDate = timeItem.getTime();
        } else if (currentHours >= 6) {
            timeItem.setHours(6);
            timeItem.setMinutes(0);
            timeItem.setSeconds(0);
            timeItem.setMilliseconds(0);
            nextDate = timeItem.getTime();
        }

        const time = new Date(nextDate);
        const time1 = `6 AM ${time.getDate()}/${time.getMonth() + 1}`;
        time.setDate(time.getDate() + 1);
        const time2 = `6 AM ${time.getDate()}/${time.getMonth() + 1}`;
        const label = time1 + " - " + time2;
        if (label in dataGroupDateMvpTime) {
            dataGroupDateMvpTime[label].push(item);
        } else {
            dataGroupDateMvpTime[label] = [item];
        }
        return dataGroupDateMvpTime;
    });

    return dataGroupDateMvpTime;
};

export function getDataChart(data) {
    const dataChart = {
        trips: [],
        error: [],
        battery: [],
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
                index: item.index,
            });
        }
        if (item.data.includes(STRING_FINISH_BATTERY)) {
            dataChart.battery.push(item);
        }
        if (item.data.includes(STRING_ERROR_MISSION)) {
            dataChart.error.push(item);
        }
    });
    // const draftError = uniqBy(dataChart.error, "data");
    // dataChart.error = draftError;
    // console.log(draftError, dataChart.error);
    return dataChart;
}

export const justOneDataChartMain = (chart) => {
    chart.data.datasets.forEach((dataset, index) => {
        if (dataset.name !== "main") {
            chart.data.datasets.splice(index, 1);
        }
    });
};
export const updateChart = ({
    chart,
    labelList = [],
    data = [],
    label = "",
    borderColor = "",
    reset = false,
    id_,
}) => {
    justOneDataChartMain(chart);
    if (reset) {
        chart.data.datasets.forEach((dataset) => {
            dataset.data.length = 0;
        });
        chart.data.labels.length = 0;
        chart.update();
    } else {
        chart.data.labels.length = 0;
        chart.data.datasets.forEach((dataset) => {
            if (dataset) {
                dataset.data.length = 0;
                dataset.data.push(...data);
                dataset.type = "line";
                dataset.label = label;

                const maxY = Math.max(...data) + 5;
                chart.options.scales.y.suggestedMax = maxY;
                if (id_) {
                    dataset.id_ = id_;
                }
                borderColor && (dataset.borderColor = borderColor);
            }
        });
        chart.data.labels.push(...labelList);
        chart.update();
    }
};
