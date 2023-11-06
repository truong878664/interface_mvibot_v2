import create from "./action/handleFormFunction.js";
import render from "./render.js";
import Gpio from "./Class/Gpio.js";
import GpioModule from "./Class/GpioModule.js";
import Marker from "./Class/Marker.js";
import Sleep from "./Class/Sleep.js";
import Sound from "./Class/Sound.js";
import Position from "./Class/Position.js";
import Variable from "./Class/Variable.js";
import Footprint from "./Class/Footprint.js";
import handleWrapFunction from "./action/handleWrapFunction.js";
import Config from "./Class/Config.js";

export const htmlDataFunction = {
    footprint: [],
    gpio: [],
    marker: [],
    sleep: [],
    position: [],
    gpio_module: [],
    variable: [],
    sound: [],
    config: [],
};
export const classFunctions = {
    footprint: new Footprint(),
    gpio: new Gpio(),
    gpio_module: new GpioModule(),
    marker: new Marker(),
    sleep: new Sleep(),
    sound: new Sound(),
    position: new Position(),
    variable: new Variable(),
    config: new Config(),
};

export default function Function() {
    render();
    create();
    handleWrapFunction();
}
