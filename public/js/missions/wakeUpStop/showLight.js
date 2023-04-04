import { loaded, loading } from "../../functionHandle/displayLoad.js";
import { currentMission } from "../handleStepMission.js";

export default function showLight({ type, isModule, isReset = true }) {
    loading()
    const typeModule = isModule ? "gpio_module" : "gpio";
    fetch(`/api/${type}?id_mission=${currentMission}&type=${typeModule}`)
        .then((res) => res.json())
        .then((data) => {
            isReset && resetLight({ type });
            setLight({ typeGpio: type, data });
            loaded()
        });
}

function setLight({ typeGpio, data }) {
    const gpios = [
        "out_set",
        "out_reset",
        "in_on",
        "in_off",
        "in_pullup",
        "in_pulldown",
    ];

    gpios.map((item) => {
        data[item] = data[item]?.split(",") || [];
    });

    gpios.forEach((item) => {
        data[item]?.forEach((light) => {
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
    });

    data.name_seri &&
        ($(`[data-ws-module-name=gpio_${typeGpio}]`).value = data.name_seri);
}

function resetLight({ type }) {
    console.log(type);
    $(`#${type}-wrapper`)
        .querySelectorAll(".gpio-io")
        .forEach((item) => {
            item.classList.remove(
                "in_on",
                "in_off",
                "in_pullup",
                "in_pulldown",
                "out_reset",
                "out_set",
                "gpio_normal",
                "gpio_module"
            );
        });
}
