import getDataWS from "./getDataWS.js";
import saveDataToDB from "./saveData.js";
import showLight from "./showLight.js";

let typeWakeUpModule = "gpio";
export default function activeModule({ type }) {
    $$(`[data-type-ws-btn=gpio_${type}]`).forEach((element) => {
        element.onclick = (e) => {
            $(`[data-type-ws-btn=gpio_${type}].active`)?.classList.remove(
                "active"
            );
            element.classList.add("active");
            typeWakeUpModule = element.dataset.module;
            const isModule = typeWakeUpModule === "gpio_module";
            $(`[data-ws-module-name=gpio_${type}]`).classList.toggle(
                "hidden",
                !isModule
            );

            showLight({ type, isModule });
        };
    });
}

export function saveData({ type }) {
    const button =
        type === "wake_up" ? $(".save-wake-up-btn") : $(".save-stop-btn");
    button.onclick = () => {
        getDataWS({ type, typeModule: typeWakeUpModule })
            .then((data) => {
                saveDataToDB({ data, type });
            })
            .catch((error) => console.log(error));
    };
}
