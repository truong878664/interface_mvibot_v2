import createJoystick from "./createJoystick/createJoystick.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import { $, $$, toggerMessage } from "./main.js";
import changeMapActive from "./rosModule/changeMapMapping.js";
import createAxes from "./rosModule/createAxes.js";
import reloadWhenOrientation from "./reloadOnOrientation.js";
import { createMoveAction } from "./joystick/joystick.js";
import publishTopicString from "./rosModule/topicString.js";
import confirmationForm from "./functionHandle/confirmationForm.js";
import subscribeTopic from "./rosModule/subscribeTopic.js";
import { setRobotMove } from "./rosModule/moveRobot.js";

const heightMap = $("#map").offsetHeight;
const widthMap = $("#map").offsetWidth;
let robotActive = $("#robot-mapping").value;
const tfClient = createTfClient();
const topic = "/";

reloadWhenOrientation();
let viewer = createMap(heightMap, widthMap, tfClient, topic);
createAxes(viewer);

createJoystick();
changeTopic();

createMoveAction();

function changeTopic() {
    $("#robot-mapping").onchange = (e) => {
        const robot = e.target.value;
        robotActive = robot;
        changeTopicMoveRobot(robot);
        robot && changTopicOccupancy(robot);
    };
}
function changeTopicMoveRobot(robotActive) {
    // cmd_vel_listener.name = `${robotActive}/cmd_vel`;
    setRobotMove(robotActive);
}

function changTopicOccupancy(robotActive) {
    $("#map").remove();
    $("#map-wrapper").innerHTML = `<div class="w-full h-full" id="map"></div>`;
    viewer = createMap(
        heightMap,
        widthMap,
        tfClient,
        `${robotActive}/map`,
        "map",
        robotActive
    );
}

$("#create_map_btn").onclick = () => {
    const nameMap = $("#create_map");
    if (nameMap.value === "") {
        $("#error_create_map").innerText = "please enter this field";
        nameMap.focus();
        nameMap.oninput = () => {
            $("#error_create_map").innerText = "";
        };
    } else {

        if (!robotActive) {
            toggerMessage('error', 'Choose robot to save map!')
            return
        }
        confirmationForm({
            message: `Do you want to save this map with the name ${nameMap.value}?`,
            callback: () => {
                changeMapActive(robotActive, nameMap.value);
                nameMap.value = "";
            },
        });
      
    }
};

changeJoystick();
function changeJoystick() {
    $$(".choose-joystick-btn").forEach((element, index) => {
        element.onclick = (e) => {
            $("[data-active=active]").dataset.active = "";
            e.target.dataset.active = "active";
            console.log($(".action-move-robot-wrapper:not(.hidden)"));
            $(".action-move-robot-wrapper:not(.hidden)").classList.add(
                "hidden"
            );
            $$(".action-move-robot-wrapper")[index].classList.remove("hidden");
        };
    });
}

handleSendTopic();
function handleSendTopic() {
    const MAX = 16;

    const timeIntervalSendTopic = [];
    const timeOutSendTopic = [];

    const timeOutRemoveEnd = [];

    const inputTopicElement = $(".input-range-topic");
    const labelTopicElement = $(".label-range-topic");

    setLabelRange(MAX);

    inputTopicElement.oninput = (e) => {
        clearTimeout(timeOutRemoveEnd);
        clearTimeout(timeOutSendTopic);

        const valueInput = e.target.value;
        const valueSend = Math.floor((parseInt(valueInput) * MAX) / 100);

        sendTopic(valueSend);
        setLabelRange(valueSend);

        clearSendTopic();

        timeOutSendTopic.push(
            setTimeout(() => {
                timeIntervalSendTopic.push(
                    setInterval(() => {
                        sendTopic(valueSend);
                    }, 100)
                );
            }, 100)
        );
    };

    inputTopicElement.addEventListener("pointerup", () => {
        clearSendTopic();
    });

    inputTopicElement.addEventListener("pointerdown", (e) => {
        const valueInput = e.target.value;
        const valueSend = Math.floor((parseInt(valueInput) * MAX) / 100);
        timeIntervalSendTopic.push(
            setInterval(() => {
                sendTopic(valueSend);
            }, 100)
        );
    });

    window.addEventListener("pointerup", () => {
        clearSendTopic();
    });

    function sendTopic(valueSend) {
        const nameTopic = `${robotActive}/zzz`;
        publishTopicString(nameTopic, valueSend);
    }
    function setLabelRange(value) {
        labelTopicElement.textContent = value;
    }

    function clearSendTopic() {
        timeIntervalSendTopic.forEach((item) => clearInterval(item));
        timeOutSendTopic.forEach((item) => clearTimeout(item));
    }
}

subscribeTopic(
    `/request_action`,
    "std_msgs/String",
    (data, name) => {
        if (data.data.indexOf('save_map' !== -1)) {
            toggerMessage(
                "success",
                "Map saved!"
            );
        }
        console.log(data);
    }
);
