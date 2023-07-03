import { $, $$ } from "../../../../main.js";
import { dataGpio } from "../index.js";
import { currentTypeGpio } from "./changeTypeGpio.js";

export function setLightGpio() {
    const gpio_mode = getModeFunction() + "_mode"; 
    for (const item in dataGpio) {
        dataGpio[item].forEach((light) => {
            if (item.indexOf("out") != -1) {
                $$(`.output-gpio.${gpio_mode}[gpio="${light}"]`).classList.add(
                    `${item}`,
                    getModeFunction()
                );
            } else if (item.indexOf("in") != -1) {
                $(`.input-gpio.${gpio_mode}[gpio="${light}"]`).classList.add(
                    `${item}`,
                    getModeFunction()
                );
            }
        });
    }
}

export function handleClickSetLightGpio() {
    $$(".input-gpio").forEach((element) => {
        element.onclick = (e) => {
            if (currentTypeGpio.indexOf("in") != -1) {
                e.target.classList.remove(
                    currentTypeGpio === "in_on" ? "null" : "in_on",
                    currentTypeGpio === "in_off" ? "null" : "in_off",
                    currentTypeGpio === "in_pullup" ? "null" : "in_pullup",
                    currentTypeGpio === "in_pulldown" ? "null" : "in_pulldown"
                );
                e.target.classList.toggle(currentTypeGpio);
                e.target.classList.add(getModeFunction());
            }
        };
    });

    $$(".output-gpio").forEach((element) => {
        element.onclick = (e) => {
            if (currentTypeGpio.indexOf("out") != -1) {
                e.target.classList.remove(
                    currentTypeGpio === "out_reset" ? "null" : "out_reset",
                    currentTypeGpio === "out_set" ? "null" : "out_set"
                );
                e.target.classList.toggle(currentTypeGpio);
                e.target.classList.add(getModeFunction());
            }
        };
    });
}


function getModeFunction() {
    return $(".gpio-function-btn.active") ? "gpio_normal" : "gpio_module";
}
