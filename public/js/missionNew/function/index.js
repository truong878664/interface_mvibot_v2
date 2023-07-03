import create from "./create.js";
import render from "./render.js";

export const htmlDataFunction = {
    footprint: [],
    gpio: [],
    marker: [],
    sleep: [],
    position: [],
    gpio_module: [],
    variable: [],
    sound: [],
};

export default function Function() {
    render();
    create();
}
