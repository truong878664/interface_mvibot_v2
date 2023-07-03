import Gpio from "../Class/Gpio.js";
import { handleChangeTypeGpio } from "./handle/changeTypeGpio.js";
import {
    handleClickSetLightGpio,
    setLightGpio,
} from "./handle/setLightGpio.js";

export const dataGpio = {
    in_on: [],
    in_off: [],
    out_set: [],
    out_reset: [],
    in_pullup: [],
    in_pulldown: [],
};
export default function gpio() {
    handleChangeTypeGpio();
    setLightGpio();
    handleClickSetLightGpio();
    handleReset();
}

function handleReset() {
    const resetBtn = document.querySelector(".reset-gpio-btn");
    resetBtn.onclick = () => {
        new Gpio().reset();
    };
}
