import confirmationForm from "../functionHandle/confirmationForm.js";
import splitTwoChar from "../functionHandle/splitTwoChar.js";
import { toggerMessage } from "../main.js";
const logContentElement = document.querySelector(".log-content");
const robotHistory = document.querySelector("#robot-history");
const refreshBtn = document.querySelector("[data-name='refresh-btn']");
const resetBtn = document.querySelector("[data-name='reset-btn']");
renderLog(null);

robotHistory.addEventListener("change", async (e) => {
    const nameRobot = e.target.value;
    if (nameRobot) {
        getHistory(nameRobot);
        toggerMessage(
            "success",
            `Moved to the history of robots <span class="font-bold text-red-500">${nameRobot}</span>!`,
        );
    } else {
        renderLog(parseDataHistoryString(null));
    }
});

refreshBtn.onclick = (e) => {
    toggerMessage("success", "Refreshed!");
    getHistory(robotHistory.value);
};
resetBtn.onclick = () => {
    const nameRobot = robotHistory.value;
    const reset = async () => {
        const res = await fetch("/api/robot/" + nameRobot, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const message = await res.json();
        if (!message.error) {
            renderLog(null);
        }
    };
    if (!nameRobot) {
        toggerMessage("error", "Please choose robot!");
        return;
    }
    confirmationForm({
        message: `Do you want to refresh the data for ${nameRobot} robot to empty?`,
        callback: reset,
    });
};

const getHistory = async (nameRobot) => {
    try {
        const res = await fetch("/api/robot/" + nameRobot);
        const data = await res.json();
        renderLog(parseDataHistoryString(data.history));
    } catch (error) {
        console.log(error);
        renderLog(parseDataHistoryString(null));
    }
};

const historyData =
    "&/time>2023-12-01 15:58:49 //type>normal//data>Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up...Robot start up.../@&/time>2023-12-01 15:58:52 //type>normal//data>Motor left disable brake/@&/time>2023-12-01 15:59:02 //type>normal//data>Camera2 is available/@&/time>2023-12-01 15:59:19 //type>error//data>Restart camera1 because no signal/@&/time>2023-12-01 15:59:33 //type>normal//data>Sensor startup success. Start up mode: navigation/@&/time>2023-12-01 15:59:38 //type>warning//data>Robot load mission charge battery: empty/@&/time>2023-12-01 15:59:39 //type>normal//data>Find new module IB03_916b/@&/time>2023-12-01 16:09:45 //type>normal//data>Robot recevice multiple mission normal: HS_0010__copy/@&/time>2023-12-01 16:10:14 //type>warning//data>Robot reset mission normal/@&/time>2023-12-02 03:00:46 //type>normal//data>Change to mode action mission normal/@&/time>2023-12-02 07:45:49 //type>normal//data>Robot recevice multiple mission normal: In_lift/@&/time>2023-12-02 08:28:16 //type>normal//data>Find new module /@&/time>2023-12-02 08:29:47 //type>warning//data>Robot reset mission normal/@&/time>2023-12-02 08:31:34 //type>warning//data>Robot reset mission normal/@&/time>2023-12-02 08:34:35 //type>warning//data>Robot reset mission normal/@&/time>2023-12-02 08:40:49 //type>normal//data>Robot recevice multiple mission normal: In_lift/@";
const parseDataHistoryString = (historyData) => {
    if (!historyData) return null;
    const trHistoryStringList = splitTwoChar(historyData, "&", "@");
    const resultTrItem = [];
    const parseTrLine = trHistoryStringList.map((trItem) =>
        trItem.split("/").filter((i) => i),
    );
    parseTrLine.map((trStringLine) => {
        const trObjectItem = {};
        trStringLine.map((item) => {
            const [key, value] = item.split(">");
            if (key === "time") {
                trObjectItem.timeLine = new Date(value).getTime();
            }
            trObjectItem[key] = value;
            return trObjectItem;
        });
        resultTrItem.push(trObjectItem);
    });
    return resultTrItem;
};

function renderLog(data) {
    if (!data) {
        logContentElement.innerHTML = `<tr class="text-center text-slate-500">
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>Robot has no history</td>
        </tr>`;
        return;
    }
    const classNameItem =
        "border-t group-data-[log=warning]/log:text-yellow-500 group-data-[log=error]/log:text-red-600 group-data-[log=normal]/log:text-sky-500 px-4 py-2 text-left";

    const icons = {
        normal: `<i class="fa-solid fa-circle-info"></i>`,
        warning: `<i class="fa-solid fa-triangle-exclamation"></i>`,
        error: `<i class="fa-solid fa-circle-question"></i>`,
    };

    const htmlLog = [];
    data.reverse().map((item, index) => {
        htmlLog.push(`
        <tr
            data-log="${item.type}"
            class="group/log font-bold data-[log=normal]:font-normal">
        <td class="${classNameItem} text-center"><span>${
            data.length - index
        }</span></td>
        <td class="${classNameItem}"><span>${icons[item.type]}  ${
            item.type
        }</span></td>
        <td class="${classNameItem}"><span>${item.time}</span></td>
        <td class="${classNameItem}"><span>${item.data}</span></td>
        </tr>
    `);
        return htmlLog;
    });
    logContentElement.innerHTML = htmlLog.join("");
}
