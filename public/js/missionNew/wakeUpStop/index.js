import { toggerMessage } from "../../main.js";
import WakeUpAndStop from "../function/Class/WakeUpAndStop.js";
import { MissionClass } from "../index.js";

const wakeUpStopWrapper = document.querySelector(
    "[data-name='wakeup-stop-wrapper']"
);

export function wakeUpStop() {
    const classWakeupAndStop = {
        wakeup: new WakeUpAndStop("wakeup"),
        stop: new WakeUpAndStop("stop"),
    };
    let currentKindModule;
    wakeUpStopWrapper.addEventListener("click", (e) => {
        const buttonAction = e.target.closest("[data-kind-button]");
        if (!buttonAction) return;
        const kindAction = buttonAction.dataset.kindButton;
        const typeWakeupStop = buttonAction.dataset.type;
        const actions = {
            changeModule() {
                const kindModule = buttonAction.dataset.kind;
                buttonAction.parentElement.dataset.module = kindModule;
                currentKindModule = kindModule;

                const dataWakeupStop =
                    MissionClass[typeWakeupStop][currentKindModule];
                classWakeupAndStop[typeWakeupStop].display(dataWakeupStop);
            },
            async save() {
                const data = classWakeupAndStop[typeWakeupStop].get();
                if (currentKindModule === "module") {
                    const name_seri = wakeUpStopWrapper.querySelector(
                        `[data-name-seri-module='${typeWakeupStop}']`
                    ).value;
                    data.name_seri = name_seri;
                }
                MissionClass[typeWakeupStop][currentKindModule] = data;
                const statusSave = await MissionClass.save();
                toggerMessage(
                    statusSave ? "success" : "error",
                    statusSave.message
                );
            },
        };
        actions[kindAction]?.();
    });
}
