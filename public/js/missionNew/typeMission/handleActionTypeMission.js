import confirmationForm from "../../functionHandle/confirmationForm.js";
import { toggerMessage } from "../../main.js";
import syncTypeMission from "../handle/syncTypeMission.js";
import { MissionClass } from "../index.js";
import typeMission, { typeMissionClass } from "./index.js";
export default function handleActionTypeMission() {
    const listTypeMissionWrapper = document.getElementById(
        "list-type-mission-wrapper"
    );
    listTypeMissionWrapper.onclick = (e) => {
        const buttonAction = e.target.closest(
            "[data-button-type-mission-kind]"
        );
        if (!buttonAction) return;
        const typeButtonAction = buttonAction.dataset.buttonTypeMissionKind;
        const itemTypeMission = buttonAction.closest(
            "[data-name='item-type-mission']"
        );
        const actions = {
            add() {
                const dataDatabase = JSON.parse(itemTypeMission.dataset.value);
                const data = JSON.parse(dataDatabase.data);

                MissionClass.addStep({
                    step: { ...data, id: dataDatabase.id },
                });
                MissionClass.render();
            },
            delete() {
                confirmationForm({ callback: this.actionDelete });
            },
            async actionDelete() {
                const idMissionType = itemTypeMission.dataset.id;
                const status = await typeMissionClass.delete(idMissionType);
                toggerMessage(
                    status.deleted ? "success" : "error",
                    status.message
                );
                status.deleted && itemTypeMission.remove();
                status.error && console.log(status.error);
            },
            detail() {
                const dataTypeMission = JSON.parse(
                    JSON.parse(itemTypeMission.dataset.value).data
                );
                const html = MissionClass.renderHtml({
                    data: [dataTypeMission],
                    handleAble: false,
                });
                const div = document.createElement("div");
                div.classList.add(
                    "fullscreen",
                    "flex",
                    "justify-center",
                    "items-center",
                    "w-screen",
                    "h-screen"
                );
                const contentDetail = `
                    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-[-1]" onclick="this.parentElement.remove()"></div>
                    <div class="w-10/12 max-h-[80%] bg-white rounded-md p-4 shrink-0 z-10 overflow-auto">
                        ${html}
                    </div>
                `;
                div.innerHTML = contentDetail;
                document.body.appendChild(div);
            },
            sync() {
                const dataTypeMission = JSON.parse(
                    JSON.parse(itemTypeMission.dataset.value).data
                );
                syncTypeMission(dataTypeMission);
            },
        };
        actions[typeButtonAction]?.();
    };
}
