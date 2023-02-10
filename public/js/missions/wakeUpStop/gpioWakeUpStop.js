import { $ } from "../../main.js";
import fetchCustom from "../../functionHandle/fetchCustom.js";
import { currentMission } from "../handleStepMission.js";
import getValueWakeUpStop from "./ftWakeUpStop.js";

export const dataGpioWakeUpStop = {
    wake_up: {
        in_on: [],
        in_off: [],
        out_set: [],
        out_reset: [],
        in_pullup: [],
        in_pulldown: [],
    },
    stop: {
        in_on: [],
        in_off: [],
        out_set: [],
        out_reset: [],
        in_pullup: [],
        in_pulldown: [],
    },
};
setDateGpioWakeUpDatabase();
function setDateGpioWakeUpDatabase() {
    fetchCustom(`/api/wake_up?id_mission=${currentMission}`, "GET", (data) => {
        for (const item in dataGpioWakeUpStop.wake_up) {
            dataGpioWakeUpStop.wake_up[item] = data[item]?.split(",") || [];
        }
        setLightGpioWakeUpStop("wake_up", dataGpioWakeUpStop);
    });

    fetchCustom(`/api/stop?id_mission=${currentMission}`, "GET", (data) => {
        for (const item in dataGpioWakeUpStop.stop) {
            dataGpioWakeUpStop.stop[item] = data[item]?.split(",") || [];
        }
        setLightGpioWakeUpStop("stop", dataGpioWakeUpStop);
    });
}

function setDateGpioWakeUp(typeGpio) {
    resetGpioWakeUp(typeGpio);
    const getDataGpioWakeUpStop = new Promise((resolve, reject) => {
        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.input-gpio.in_on`)
            .forEach((element) => {
                dataGpioWakeUpStop[typeGpio].in_on.push(
                    element.getAttribute("gpio")
                );
            });

        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.input-gpio.in_off`)
            .forEach((element) => {
                dataGpioWakeUpStop[typeGpio].in_off.push(
                    element.getAttribute("gpio")
                );
            });

        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.input-gpio.in_pullup`)
            .forEach((element) => {
                dataGpioWakeUpStop[typeGpio].in_pullup.push(
                    element.getAttribute("gpio")
                );
            });

        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.input-gpio.in_pulldown`)
            .forEach((element) => {
                dataGpioWakeUpStop[typeGpio].in_pulldown.push(
                    element.getAttribute("gpio")
                );
            });

        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.output-gpio.out_set`)
            .forEach((element) => {
                dataGpioWakeUpStop[typeGpio].out_set.push(
                    element.getAttribute("gpio")
                );
            });

        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.output-gpio.out_reset`)
            .forEach((element) => {
                dataGpioWakeUpStop[typeGpio].out_reset.push(
                    element.getAttribute("gpio")
                );
            });

        resolve(dataGpioWakeUpStop[typeGpio]);
    });
    getDataGpioWakeUpStop.then((dataGpio) => {
        const [wake_up, stop] = getValueWakeUpStop();
        const data = {
            id_mission: currentMission,
            out_set: dataGpio.out_set.join(","),
            out_reset: dataGpio.out_reset.join(","),
            in_on: dataGpio.in_on.join(","),
            in_off: dataGpio.in_off.join(","),
            in_pullup: dataGpio.in_pullup.join(","),
            in_pulldown: dataGpio.in_pulldown.join(","),
            data: typeGpio == "wake_up" ? wake_up : stop,
        };
        console.log(data.data)
        fetchCustom(
            `/api/${typeGpio}`,
            "POST",
            (data) => console.log(data),
            data
        );
    });
}

$(".save-wake-up-btn").onclick = () => {
    resetGpioWakeUp();
    setDateGpioWakeUp("wake_up");
    $('.cancel-wake-up').click()
};

$(".save-stop-btn").onclick = () => {
    resetGpioWakeUp();
    setDateGpioWakeUp("stop");
    $('.cancel-stop').click()

};

function resetGpioWakeUp(typeGpio) {
    for (const item in dataGpioWakeUpStop[typeGpio]) {
        dataGpioWakeUpStop[typeGpio][item] = [];
    }
}

function setLightGpioWakeUpStop(typeGpio, dataGpioWakeUpStop) {
    for (const item in dataGpioWakeUpStop[typeGpio]) {
        dataGpioWakeUpStop[typeGpio][item].forEach((light) => {
            if (item.indexOf("out") != -1) {
                $(`#${typeGpio}-wrapper`)
                    .querySelector(`.output-gpio[gpio="${light}"]`)
                    .classList.add(`${item}`);
            } else if (item.indexOf("in") != -1) {
                $(`#${typeGpio}-wrapper`)
                    .querySelector(`.input-gpio[gpio="${light}"]`)
                    .classList.add(`${item}`);
            }
        });
    }
}
