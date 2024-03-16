import uniqBy from "../lib/lodash/uniqby.js";
import { parseDate } from "../lib/ultils.js";
import { groupDateMvpTime } from "./ultils.js";
/**
 *
 * @param {*} param0
 * @returns { { groupMVPtime: object, uniqueListError:object }}
 */
const handleErrorSystem = ({ dataErrorSystem, dataErrorShort }) => {
    const listErrorMap = [];
    const listDateError = {};

    const dataErrorShortSorted = dataErrorShort.sort(
        (a, b) => b.timeLine - a.timeLine,
    );
    dataErrorSystem.map((erSystem) => {
        const timeLineErSystem = new Date(erSystem.created_at).getTime();

        const foundErShort = dataErrorShortSorted.find((erShort, index) => {
            const timeLineErShort = parseDate(erShort.time).getTime();

            return timeLineErShort < timeLineErSystem;
        });

        const period =
            (timeLineErSystem - parseDate(foundErShort?.time).getTime()) /
            (1000 * 60 * 60);

        const timeFrom = parseDate(foundErShort.time);
        const timeTo = new Date(erSystem.created_at);
        const itemErrorSystem = {
            system: erSystem,
            short: foundErShort,
            period,
            hours: parseInt(period),
            minute: parseInt(((period - parseInt(period)) * 60).toFixed(0)),
            from: `${timeFrom.getHours()}:${timeFrom.getMinutes()}`,
            dateFrom: `${timeFrom.getDate()}/${timeFrom.getMonth() + 1}`,
            to: `${timeTo.getHours()}:${timeTo.getMinutes()}`,
            dateTo: `${timeTo.getDate()}/${timeTo.getMonth() + 1}`,
            time: timeTo.toLocaleString("vi-VI"),
            ...erSystem,
        };
        listErrorMap.push(itemErrorSystem);

        const date = `${timeTo.getDate()}/${
            timeTo.getMonth() + 1
        }/${timeTo.getFullYear()}`;

        if (date in listDateError) {
            listDateError[date].push(itemErrorSystem);
        } else {
            listDateError[date] = [itemErrorSystem];
        }

        return listDateError;
    });
    const uniqueListError = uniqBy(listErrorMap, "short.time");
    const groupMVPtime = groupDateMvpTime(uniqueListError);
    return { groupMVPtime, uniqueListError };
};
export default handleErrorSystem;
