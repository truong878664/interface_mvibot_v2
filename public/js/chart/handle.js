import { toggerMessage } from "../main.js";
import { dataChartRef, dataHistoryRef } from "./chart.js";
import DetailChart from "./component/DetailChart.js";

export const showPopupShortError = ({ chart, legendItem }) => {
    const indexClick = legendItem[0].index;
    const countShortErrorClick = chart.data.datasets[0].data[indexClick];

    if (countShortErrorClick === 0) {
        toggerMessage("warning", "There are no short stop errors on this day");
        return;
    }
    const labelShortErrorClick = chart.data.labels[indexClick];
    const dataShortError = dataChartRef.current.error;

    const [day, month, year] = labelShortErrorClick.split("/");
    const nextMonth = month.length === 1 ? "0" + month : month;
    const nextDay = day.length === 1 ? "0" + day : day;

    const listShortErrorFound = dataShortError.filter((shortErrorItem) =>
        shortErrorItem.time.includes(`${year}-${nextMonth}-${nextDay}`),
    );

    const listShortErrorFoundAndContinue = listShortErrorFound.map(
        (shortErrorItem, index) => {
            const itemContinueShortError = dataHistoryRef.current.find(
                (item, index) => {
                    return (
                        index >= shortErrorItem.index &&
                        (item.data.includes("Start mission") ||
                            item.data.includes("Try continue mission"))
                    );
                },
            );
            return {
                error: shortErrorItem,
                continue: itemContinueShortError,
            };
        },
    );
    document.body.appendChild(
        DetailChart({
            data: listShortErrorFoundAndContinue,
            type: "short-error",
        }),
    );
};

export const showPopupTrip = ({ chart, legendItem }) => {
    const indexClick = legendItem[0].index;
    const countTripsClick = chart.data.datasets[0].data[indexClick];
    if (countTripsClick === 0) {
        toggerMessage("warning", "There are no trip on this day");
        return;
    }
    const labelTripsClick = chart.data.labels[indexClick];
    const dataTrips = dataChartRef.current.trip;

    const [day, month, year] = labelTripsClick.split("/");
    const nextMonth = month.length === 1 ? "0" + month : month;
    const nextDay = day.length === 1 ? "0" + day : day;

    const listShortErrorFound = dataTrips.filter((tripItem) =>
        tripItem.time.includes(`${year}-${nextMonth}-${nextDay}`),
    );

    const dataHistoryReverse = JSON.parse(
        JSON.stringify(dataHistoryRef.current),
    ).reverse();

    const listTripFinishAndStart = listShortErrorFound.map(
        (tripFinishItem, i) => {
            const tripStartItem = dataHistoryReverse.find((item) => {
                return (
                    item.index < tripFinishItem.index &&
                    item.data.includes(
                        "Start mission action normal by condition wake up",
                    )
                );
            });
            return {
                finish: tripFinishItem,
                start: tripStartItem,
            };
        },
    );
    document.body.appendChild(
        DetailChart({ data: listTripFinishAndStart, type: "trip" }),
    );
};
