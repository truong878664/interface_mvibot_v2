import { toggerMessage } from "../main.js";
import Mission from "../missionNew/Class/Mission.js";
import pub from "./pub.js";
import topic from "./subscribeTopic.js";

const getNode = document.querySelector.bind(document);
const getNodeList = document.querySelectorAll.bind(document);

const splitIndex = (string, index) => {
    return [string.slice(0, index), string.slice(index)];
};
const splitTwoChar = (string, first, second) => {
    const result = [];
    let indexFirst;
    let indexSecond;
    while (true) {
        indexFirst = string.indexOf(first, indexFirst + 1);
        indexSecond = string.indexOf(second, indexSecond + 1);
        if (indexFirst === -1 && indexFirst === -1) break;
        result.push(string.slice(indexFirst + 1, indexSecond));
    }
    return result;
};

const convert = {
    mission_action_infor(data) {
        const dataMission = splitTwoChar(data, "(", ")");
        const dataMissionObject = {};
        dataMission.map((item) => {
            const [key, value] = item.split(":");
            dataMissionObject[key] = isNaN(Number(value))
                ? value
                : Number(value);
            return dataMissionObject;
        });
        return dataMissionObject;
    },
};
let currentMission = {
    name_mission: "",
    id_mission: "",
};
function progress() {
    // pub();
    const robotSelect = getNode("#robot-navigation");
    let actionTopic;
    robotSelect.addEventListener("change", (e) => {
        const nameRobot = e.target.value;
        actionTopic?.unsubscribe();
        if (!nameRobot) return;
        actionTopic = topic({ name: `/${nameRobot}/mission_action_infor` });
        // actionTopic = topic({ name: `/${nameRobot}/mission_action_infor` });
        actionTopic.subscribe((data, topic) => {
            const infoMission = convert.mission_action_infor(data);
            const { name_mission, now_step } = infoMission;
            activeStepNow(now_step);
            if (currentMission.name_mission !== name_mission) {
                currentMission.name_mission = name_mission;
                renderMission();
            }
        });
    });
}

async function renderMission() {
    console.log("get mission from database");
    const missionClass = new Mission();
    const statusFetch = await missionClass.getDataByName(
        currentMission.name_mission
    );
    if (!statusFetch.error) {
        const { mission_shorthand } = statusFetch.data;
        const progressMainWrapper = getNode("#progress-main-wrapper");
        progressMainWrapper.innerHTML = missionClass.renderHtml({
            data: JSON.parse(mission_shorthand),
            handleAble: false,
        });
    } else {
        toggerMessage("error", statusFetch.message);
    }
}

function activeStepNow(stepNow) {
    const styleActive = ["ring-4", "ring-red-400"];
    const stepList = getNodeList("[data-name='step']");
    const currentActiveStyle = getNode(
        "[data-name='step']." + styleActive.join(".")
    );
    currentActiveStyle?.classList.remove(...styleActive);

    const stepActive = stepList[stepNow - 1];
    if (stepActive) {
        stepActive.classList.add(...styleActive);
        stepActive.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }
}
export default progress;
