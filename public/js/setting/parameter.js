import dispatchEvent from "../functionHandle/dispatchEvent.js";
import usePress from "../functionHandle/usePress.js";
import showLabelInput from "./showLabelInput.js";
import checkChangeParameter from "./checkChangeParameter.js";
import pubSetting from "./pubSetting.js";

const inputVolumeElement = document.querySelector(".input-volume");
const iconVolume = document.querySelector("[data-volume]");

const inputLowBattery = document.querySelector(".input-low-battery");

export default function parameter(data) {
    showLabelInput({
        inputElement: ".input-low-battery",
        labelElement: ".value-low-battery",
    });

    volume(data);
    robotLowBattery(data);
    robotTypeConnect(data);
    otherParameter(data);
    setParameter();
}

function volume(data) {
    showLabelInput({
        inputElement: ".input-volume",
        labelElement: ".value-volume",
        callback: setIconVolume,
    });
    inputVolumeElement.value = data.robot_volume;
    dispatchEvent({ event: "input", element: inputVolumeElement });

    function setIconVolume(valueVolume) {
        const VOLUME_HIGH = 100;
        const VOLUME_MEDIUM = 50;
        const VOLUME_OFF = 0;
        iconVolume.dataset.volume =
            valueVolume > VOLUME_HIGH
                ? "high-vl"
                : valueVolume > VOLUME_MEDIUM
                ? "medium-vl"
                : valueVolume == VOLUME_OFF
                ? "off-vl"
                : "low-vl";
    }
}

function robotLowBattery(data) {
    let valueRobotLowBattery = data.robot_low_battery;
    valueRobotLowBattery ??= 0;
    inputLowBattery.value = parseInt(valueRobotLowBattery);
    dispatchEvent({ event: "input", element: inputLowBattery });
}

function robotTypeConnect(data) {
    const checkboxTypeConnect = document.querySelector(
        `[name=robot_type_connect]#${data.robot_type_connect}`
    );
    checkboxTypeConnect.checked = true;
}

function otherParameter(data) {
    showParameter(data);
    actionParameter();
}
function actionParameter() {
    const mathParameterBtns = document.querySelectorAll(".math-parameter-btn");
    mathParameterBtns.forEach((element) => {
        usePress({
            element: element,
            time: 150,
            callback: handleMatch,
        });
    });

    const SPEED_MATH = 0.01;

    function handleMatch(e) {
        const typeMath = this.dataset.action;
        const typeParameter = this.dataset.parameter;
        const inputParameter = document.querySelector(`[name=${typeParameter}`);
        let numberParameter = Number(inputParameter.value);
        numberParameter =
            typeMath === "increment"
                ? (numberParameter += SPEED_MATH)
                : (numberParameter -= SPEED_MATH);
        inputParameter.value = Number((numberParameter * 1).toFixed(3));
    }
}

function showParameter(data) {
    const {
        robot_L,
        robot_R,
        robot_aw,
        robot_ax,
        robot_gear,
        robot_vmax,
        robot_volume,
        robot_wmax,
    } = data;
    const parameters = {
        robot_L,
        robot_R,
        robot_aw,
        robot_ax,
        robot_gear,
        robot_vmax,
        robot_volume,
        robot_wmax,
    };
    for (const key in parameters) {
        document.querySelector(`[name=${key}]`).value = parameters[key];
    }
}

function setParameter() {
    const saveOperationBtn = document.querySelector(
        "[data-setting=parameter][data-type=save]"
    );
    saveOperationBtn.onclick = handleSave;
    async function handleSave() {
        const dataParameter = getParameter();
        const dataChanged = await checkChangeParameter(dataParameter);
        pubSetting(dataChanged);
    }

    function getParameter() {
        const robot_volume = document.querySelector(
            "[name=robot_volume]"
        ).value;
        const robot_type_connect = document.querySelector(
            "[name=robot_type_connect]:checked"
        ).value;
        const robot_low_battery = document.querySelector(
            "[name=robot_low_battery]"
        ).value;

        const parameters = {};
        const listParameterElement =
            document.querySelectorAll(".parameter-item");
        Array.from(listParameterElement).map((element) => {
            const typeParam = element.name;
            parameters[typeParam] = element.value;
        });
        const dataParameter = {
            robot_volume,
            robot_type_connect,
            robot_low_battery:
                robot_low_battery === "0" ? null : robot_low_battery,
            ...parameters,
        };
        return dataParameter;
    }
}
