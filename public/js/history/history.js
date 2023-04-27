import subscribeTopic from "../rosModule/subscribeTopic.js";
import publishTopicString from "../rosModule/topicString.js";

const TOPIC = "topic";
const BR_DATA = "/n";
const BR_LINE = "/l";

const type = "error";
const date = "12/23/2020";
const log = `error 2003 (hy000): can't connect to mysql server on 127.0.0.1:3306`;

const data = type + BR_DATA + date + BR_DATA + log;
const datas = data + BR_LINE + data + BR_LINE + data + BR_LINE + data;

setInterval(() => {
    publishTopicString("/Mb23_947/" + TOPIC, datas);
    publishTopicString("/Mb23_946/" + TOPIC, datas + 946);
}, 1000);

const robotHistory = document.querySelector("#robot-history");
robotHistory.addEventListener("change", handleHistory);

let listenerHistory;
function handleHistory(e) {
    const name_seri = e.target.value;
    listenerHistory?.unsubscribe();

    if (!name_seri) {
        renderLog("");
        console.warn("stop render log...");
        return;
    }

    listenerHistory = subscribeTopic(
        `/${name_seri}/${TOPIC}`,
        "std_msgs/String",
        (data, name) => {
            renderLog(data.data);
        }
    );
}

function renderLog(data) {
    const lineLog = data.split(BR_LINE);
    const htmlLog = [];
    lineLog.map((log, index) => {
        const logTd = log.split(BR_DATA);
        htmlLog.push(`<tr>
            <td data-log='${logTd[0]}'
                class=" border-t  data-[log=log]:text-blue-700 data-[log=error]:text-red-600 px-4 py-2 text-left">${
                    index + 1
                }</td>
            <td data-log='${logTd[0]}'
                class=" border-t  data-[log=log]:text-blue-700 data-[log=error]:text-red-600 px-4 py-2 text-left">${
                    logTd[0]
                }</td>
            <td data-log='${logTd[0]}'
                class=" border-t  data-[log=log]:text-blue-700 data-[log=error]:text-red-600 px-4 py-2 text-left">${
                    logTd[1]
                }</td>
            <td data-log='${
                logTd[0]
            }' class=" border-t  data-[log=log]:text-blue-700 data-[log=error]:text-red-600 px-4 py-2 ">
            ${logTd[2]}
                </td>
        </tr>
        `);
        return htmlLog;
    });

    const logContent = document.querySelector(".log-content");
    if (!data) {
        logContent.innerHTML = "";
        return;
    }
    logContent.innerHTML = htmlLog.join("");
    console.warn("rending log...");
}
