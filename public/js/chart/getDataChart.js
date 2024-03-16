import uniqBy from "../lib/lodash/uniqby.js";

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
    // dataChart.error = uniqBy(dataChart.error, "data");
    return dataChart;
}
