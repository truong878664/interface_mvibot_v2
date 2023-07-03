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
    eventFunctionContainer();
}

function eventFunctionContainer() {
    const functionContainer = document.getElementById("function-container");
    functionContainer.addEventListener("click", (e) => {
        const button = e.target.closest("[data-button-function-kind]");
        if (!button) return;
        const functionKind = button.dataset.buttonFunctionKind;
        switch (functionKind) {
            case "add":
                console.log();
                break;
        }
    });
}
