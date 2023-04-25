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

export function handleShowWakeUpStop() {
    const wakeUpBtn = document.querySelector("#wake_up-btn");
    const stopBtn = document.querySelector("#stop-btn");
    wakeUpBtn.addEventListener("click", showWs);
    stopBtn.addEventListener("click", showWs);
    function showWs(e) {
        const type = e.target.dataset.ws;
        showLight({ type, isModule: false, isReset: true });
        $(".wakeup-module-btn[data-module=gpio]")?.click();
        $(".stop-module-btn[data-module=gpio]")?.click();
    }
}
