import confirmationForm from "../functionHandle/confirmationForm.js";
import { getHistory, parseDataHistoryString, useRef } from "../lib/ultils.js";
import { toggerMessage } from "../main.js";

const getNodeByName = (name) => document.querySelector(`[data-name='${name}']`);

const logContentElement = document.querySelector(".log-content");
const robotHistory = document.querySelector("#robot-history");
const refreshBtn = document.querySelector("[data-name='refresh-btn']");
const resetBtn = document.querySelector("[data-name='reset-btn']");
const exportBtn = document.querySelector("[data-name='export-btn']");
const historyTable = getNodeByName("history-table");
const loadMoreHistory = getNodeByName("load-more-history");

const nameRobotRef = useRef();
const dataHistoryRobot = useRef([]);
const dataHistoryShow = useRef([]);
const ITEM_ON_PAGE = 50;
const currentPage = useRef(0);

const onChangeNameRobot = async (e) => {
    const nameRobot = e.target.value;
    nameRobotRef.current = nameRobot;
    dataHistoryRobot.current = [];
    dataHistoryShow.current = [];
    if (nameRobot) {
        const data = await getHistory(nameRobot);
        dataHistoryRobot.current = data;
        onAddMoreHistory();
        toggerMessage(
            "success",
            `Moved to the history of robots <span class="font-bold text-red-500">${nameRobot}</span>!`,
        );
    } else {
        handleRenderLog({ reset: true });
    }
};

const onRefresh = async () => {
    if (nameRobotRef.current) {
        const data = await getHistory(nameRobotRef.current);

        dataHistoryRobot.current = data;
        onAddMoreHistory();
        toggerMessage("success", "Refreshed!");
    } else {
        toggerMessage("error", "Choose robot, please!");
    }
};
const onReset = () => {
    const reset = async () => {
        const res = await fetch("/api/robot/" + nameRobotRef.current, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "reset",
            }),
        });
        const message = await res.json();
        if (!message.error) {
            handleRenderLog({ reset: true });
            dataHistoryRobot.current = [];
            dataHistoryShow.current = [];
            currentPage.current = 0;
        }
    };
    if (!nameRobotRef.current) {
        toggerMessage("error", "Please choose robot!");
        return;
    }
    confirmationForm({
        message: `Do you want to refresh the data for ${nameRobotRef.current} robot to empty?`,
        callback: reset,
    });
};

const onExport = () => {
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

const onClickAtHistoryTable = (e) => {
    if (e.target.dataset.name !== "delete-history") return;
    const index = e.target.dataset.index;
    confirmationForm({
        callback: () => {
            deleteHistoryItem(index);
        },
    });
};

const handleRenderLog = ({ reset = false }) => {
    const data = dataHistoryShow.current;
    if (reset) {
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
        <tr data-log="${item.type}" class="group/log font-bold" data-index="${
            item.index
        }">
            <td class="whitespace-nowrap ${classNameItem} text-center">
                <span>${item.index}</span>
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
                <button class="px-2" data-name="delete-history" data-index="${
                    item.index
                }">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
    `);
        return htmlLog;
    });
    logContentElement.innerHTML = htmlLog.join("");
};

const deleteHistoryItem = async (index) => {
    const indexFind = dataHistoryRobot.current.findIndex((item) => {
        return item.index === Number(index);
    });
    dataHistoryRobot.current.splice(indexFind, 1);
    const dataString = dataHistoryRobot.current
        .map(
            (item) =>
                `&/time>${item.time}//type>${item.type}//data>${item.data}/@`,
        )
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
    new Promise((resolve, reject) => {
        const dataNew = parseDataHistoryString(dataString);
        dataHistoryRobot.current = dataNew;
        resolve();
    }).then(() => {
        onAddMoreHistory();
    });
};

const onAddMoreHistory = () => {
    currentPage.current = currentPage.current + 1;
    addMoreHistory();
    handleRenderLog({});
};
const addMoreHistory = () => {
    const lengthHistory = dataHistoryRobot.current.length;
    const dataGet = dataHistoryRobot.current?.filter(
        (item) =>
            item.index >= lengthHistory - ITEM_ON_PAGE * currentPage.current &&
            item.index <=
                lengthHistory -
                    ITEM_ON_PAGE +
                    ITEM_ON_PAGE * currentPage.current,
    );
    dataHistoryShow.current = dataGet;
};

robotHistory.addEventListener("change", onChangeNameRobot);
refreshBtn.addEventListener("click", onRefresh);
resetBtn.addEventListener("click", onReset);
exportBtn.addEventListener("click", onExport);
historyTable.addEventListener("click", onClickAtHistoryTable);
loadMoreHistory.addEventListener("click", onAddMoreHistory);
