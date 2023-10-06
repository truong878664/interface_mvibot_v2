import { toggerMessage } from "../../main.js";
import Configuration from "../function/Class/configuration.js";
import { MissionClass } from "../index.js";

const wakeUpStopWrapper = document.querySelector(
    "[data-name='wakeup-stop-wrapper']"
);

const inputShowConfig = document.querySelector("#input-show-configuration");
export function wakeUpStop() {
    const classWakeupAndStop = {
        wakeup: new Configuration("wakeup"),
        stop: new Configuration("stop"),
        continue: new Configuration("continue"),
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
                const dataConfiguration =
                    MissionClass[typeWakeupStop][currentKindModule];
                classWakeupAndStop[typeWakeupStop].display(dataConfiguration);
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
    inputShowConfig?.addEventListener("change", (e) => {
        const checked = e.target.checked;
        const changeModuleWrapperList =
            document.querySelectorAll("[data-module]");
        if (checked && changeModuleWrapperList) {
            changeModuleWrapperList.forEach((element) => {
                if (element) element.dataset.module = "";
            });
        }
    });
}
