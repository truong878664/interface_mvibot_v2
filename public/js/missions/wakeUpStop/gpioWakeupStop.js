import { $ } from "../../main.js";

const wakeUp = $("#form-wake-up");

function setDateGpioWakeUp(typeGpio) {
    const getDataGpioWakeUpStop = new Promise((resolve, reject) => {
        const dataGpioWakeUpStop = {
            in_on: [],
            in_off: [],
            out_set: [],
            out_reset: [],
            in_pullup: [],
            in_pulldown: [],
        };

        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.input-gpio.in_on`)
            .forEach((element) => {
                dataGpioWakeUpStop.in_on.push(element.getAttribute("gpio"));
            });

        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.input-gpio.in_off`)
            .forEach((element) => {
                dataGpioWakeUpStop.in_off.push(element.getAttribute("gpio"));
            });

        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.input-gpio.in_pullup`)
            .forEach((element) => {
                dataGpioWakeUpStop.in_pullup.push(element.getAttribute("gpio"));
            });

        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.input-gpio.in_pulldown`)
            .forEach((element) => {
                dataGpioWakeUpStop.in_pulldown.push(
                    element.getAttribute("gpio")
                );
            });

        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.output-gpio.out_set`)
            .forEach((element) => {
                dataGpioWakeUpStop.out_set.push(element.getAttribute("gpio"));
            });

        $(`#${typeGpio}-wrapper`)
            .querySelectorAll(`.output-gpio.out_reset`)
            .forEach((element) => {
                dataGpioWakeUpStop.out_reset.push(element.getAttribute("gpio"));
            });

        resolve(dataGpioWakeUpStop);
    });
    getDataGpioWakeUpStop.then((res) => console.log(res));
}

$(".save-wake-up-btn").onclick = () => {
    setDateGpioWakeUp("wake-up");
};

$(".save-stop-btn").onclick = () => {
    setDateGpioWakeUp("stop");
};
