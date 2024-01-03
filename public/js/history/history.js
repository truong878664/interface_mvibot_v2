import confirmationForm from "../functionHandle/confirmationForm.js";
import { getHistory, parseDataHistoryString } from "../lib/ultils.js";
import { toggerMessage } from "../main.js";

const getNodeByName = (name) => document.querySelector(`[data-name='${name}']`);

const logContentElement = document.querySelector(".log-content");
const robotHistory = document.querySelector("#robot-history");
const refreshBtn = document.querySelector("[data-name='refresh-btn']");
const resetBtn = document.querySelector("[data-name='reset-btn']");
const exportBtn = document.querySelector("[data-name='export-btn']");
const historyTable = getNodeByName("history-table");

const dataHistoryRobot = { current: null };

renderLog(null);

robotHistory.addEventListener("change", async (e) => {
    const nameRobot = e.target.value;
    if (nameRobot) {
        const data = await getHistory(nameRobot);
        dataHistoryRobot.current = data;
        renderLog(data);
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
exportBtn.onclick = () => {
    const nameRobot = robotHistory.value;
    const handleExport = () => {
        const dataCSV = ["no,type,time,log"];
        if (!dataHistoryRobot.current) {
            toggerMessage("error", "Data empty!");
            return;
        }
        dataHistoryRobot.current.map((item, index) => {
            const { time, type, data } = item;
            dataCSV.push(
                `${
                    dataHistoryRobot.current.length - index
                },${type},${time},${data}`,
            );
            return dataCSV;
        });
        const aElement = document.createElement("a");
        aElement.setAttribute(
            "href",
            "data:csv/plain;charset=utf-8," +
                encodeURIComponent(dataCSV.join("\n")),
        );
        aElement.setAttribute("download", `history_${nameRobot}.csv`);
        aElement.style.display = "none";
        document.body.appendChild(aElement);
        aElement.click();
        document.body.removeChild(aElement);
        // console.log(dataHistoryRobot.current);
    };
    if (!nameRobot) {
        toggerMessage("error", "Please choose robot!");
        return;
    }
    confirmationForm({
        message: `Do you want to export history data of ${nameRobot} robot?`,
        callback: handleExport,
    });
};

function renderLog(data) {
    if (!data) {
        logContentElement.innerHTML = `
        <tr class="text-center text-slate-500">
            <td>N/A</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Robot has no history</td>
            <td>N/A</td>

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
        <tr data-log="${
            item.type
        }" class="group/log font-bold" data-index="${index}">
            <td class="whitespace-nowrap ${classNameItem} text-center">
                <span>${data.length - index}</span>
            </td>
            <td class="whitespace-nowrap ${classNameItem}">
                <span>${icons[item.type]}  ${item.type}</span>
            </td>
            <td class="break-words ${classNameItem}">
                <span>${item.time}</span>
            </td>
            <td class="break-all ${classNameItem}">
                <span>${item.data}</span>
            </td>
            <td class="${classNameItem}">
                <button class="px-2" data-name="delete-history" data-index="${index}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
    `);
        return htmlLog;
    });
    logContentElement.innerHTML = htmlLog.join("");
}

const deleteHistoryItem = async (index) => {
    dataHistoryRobot.current.splice(index, 1);
    const dataString = dataHistoryRobot.current
        .map(
            (item) =>
                `&/time>${item.time}//type>${item.type}//data>${item.data}/@`,
        )
        .reverse()
        .join("");
    const nameRobot = robotHistory.value;
    const res = await fetch("/api/robot/" + nameRobot, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "update", data: dataString }),
    });
    const message = await res.json();
    console.log(message);
    renderLog(dataHistoryRobot.current.reverse());
};
historyTable.addEventListener("click", (e) => {
    if (e.target.dataset.name !== "delete-history") return;
    const index = e.target.dataset.index;

    confirmationForm({
        callback: () => {
            deleteHistoryItem(index);
        },
    });
});

// &/time>2023-12-01 15:58:49 //type>normal//data>Robot start up.../@
