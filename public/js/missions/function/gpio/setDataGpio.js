import { $$ } from "../../../main.js";
import { dataGpio } from "./gpio.js";

export default function setDataGpio(typeGpio) {
    for (const item in dataGpio) {
        dataGpio[item] = [];
    }
    $$(`.input-gpio.in_on.${typeGpio}`).forEach((element) => {
        dataGpio.in_on.push(element.getAttribute("gpio"));
    });

    $$(`.input-gpio.in_off.${typeGpio}`).forEach((element) => {
        dataGpio.in_off.push(element.getAttribute("gpio"));
    });

    $$(`.input-gpio.in_pullup.${typeGpio}`).forEach((element) => {
        dataGpio.in_pullup.push(element.getAttribute("gpio"));
    });

    $$(`.input-gpio.in_pulldown.${typeGpio}`).forEach((element) => {
        dataGpio.in_pulldown.push(element.getAttribute("gpio"));
    });

    $$(`.output-gpio.out_set.${typeGpio}`).forEach((element) => {
        dataGpio.out_set.push(element.getAttribute("gpio"));
    });

    $$(`.output-gpio.out_reset.${typeGpio}`).forEach((element) => {
        dataGpio.out_reset.push(element.getAttribute("gpio"));
    });
}