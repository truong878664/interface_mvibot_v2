import handleChangeTypeGpio from "./changeTypeGpio.js";
import createGpio from "./createGpio.js";
import createGpioModule from "./createGpioModule.js";
import { handleClickSetLightGpio } from "./setLightGpio.js";

export const dataGpio = {
    in_on: [],
    in_off: [],
    out_set: [],
    out_reset: [],
    in_pullup: [],
    in_pulldown: [],
};
export default function gpio() {

    createGpio();
    createGpioModule();
    handleChangeTypeGpio();
    handleClickSetLightGpio();
}