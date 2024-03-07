import splitTwoChar from "../functionHandle/splitTwoChar.js";

export const parseDate = (time) => new Date(time.replace(/-/g, "/"));

export const getHistory = async (nameRobot) => {
    try {
        const res = await fetch("/api/robot/" + nameRobot);
        const data = await res.json();
        return parseDataHistoryString(data.history);
    } catch (error) {
        console.log(error);
        return parseDataHistoryString(null);
    }
};

const historyData =
    "&/time>2023-12-01 15:58:49 //type>normal//data>Robot start up.../@&/time>2023-12-01 15:58:52 //type>normal//data>Motor left disable brake/@&/time>2023-12-01 15:59:02 //type>normal//data>Camera2 is available/@&/time>2023-12-01 15:59:19 //type>error//data>Restart camera1 because no signal/@&/time>2023-12-01 15:59:33 //type>normal//data>Sensor startup success. Start up mode: navigation/@&/time>2023-12-01 15:59:38 //type>warning//data>Robot load mission charge battery: empty/@&/time>2023-12-01 15:59:39 //type>normal//data>Find new module IB03_916b/@&/time>2023-12-01 16:09:45 //type>normal//data>Robot recevice multiple mission normal: HS_0010__copy/@&/time>2023-12-01 16:10:14 //type>warning//data>Robot reset mission normal/@&/time>2023-12-02 03:00:46 //type>normal//data>Change to mode action mission normal/@&/time>2023-12-02 07:45:49 //type>normal//data>Robot recevice multiple mission normal: In_lift/@&/time>2023-12-02 08:28:16 //type>normal//data>Find new module /@&/time>2023-12-02 08:29:47 //type>warning//data>Robot reset mission normal/@&/time>2023-12-02 08:31:34 //type>warning//data>Robot reset mission normal/@&/time>2023-12-02 08:34:35 //type>warning//data>Robot reset mission normal/@&/time>2023-12-02 08:40:49 //type>normal//data>Robot recevice multiple mission normal: In_lift/@";
export const parseDataHistoryString = (historyData) => {
    if (!historyData) return [];
    const trHistoryStringList = splitTwoChar(historyData, "&", "@");
    const resultTrItem = [];
    const parseTrLine = trHistoryStringList.map((trItem) =>
        trItem.split("/").filter((i) => i),
    );
    parseTrLine.map((trStringLine, index) => {
        const trObjectItem = {};
        trStringLine.map((item) => {
            const [key, value] = item.split(">");
            if (key === "time") {
                const time = parseDate(value);
                time.setSeconds(0);
                time.setMinutes(0);
                time.setMilliseconds(0);
                trObjectItem.timeLine = time.getTime();
            }
            trObjectItem[key] = value;
            return trObjectItem;
        });
        resultTrItem.push({ ...trObjectItem, index: index + 1 });
    });
    return resultTrItem;
};

export const useRef = (init) => {
    const ref = { current: init };
    return ref;
};
