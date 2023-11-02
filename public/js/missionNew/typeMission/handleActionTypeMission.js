import confirmationForm from "../../functionHandle/confirmationForm.js";
import { toggerMessage } from "../../main.js";
import Label from "../component/Label.js";
import syncTypeMission from "../handle/syncTypeMission.js";
import { MissionClass } from "../index.js";
import { typeMissionClass } from "./index.js";
export default function handleActionTypeMission() {
    const listTypeMissionWrapper = document.getElementById(
        "list-type-mission-wrapper",
    );
    listTypeMissionWrapper.onclick = (e) => {
        const buttonAction = e.target.closest(
            "[data-button-type-mission-kind]",
        );
        if (!buttonAction) return;
        const typeButtonAction = buttonAction.dataset.buttonTypeMissionKind;
        const itemTypeMission = buttonAction.closest(
            "[data-name='item-type-mission']",
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
                    status.message,
                );
                status.deleted && itemTypeMission.remove();
                status.error && console.log(status.error);
            },
            detail() {
                const dataTypeMission = JSON.parse(
                    JSON.parse(itemTypeMission.dataset.value).data,
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
                    "h-screen",
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
            async sync() {
                try {
                    const idTypeMission = +itemTypeMission.dataset.id;
                    const dataTypeMissionFromDB =
                        await typeMissionClass.getById(idTypeMission);
                    const dataTypeMission = JSON.parse(
                        dataTypeMissionFromDB.data.data,
                    );
                    dataTypeMission.id = idTypeMission;
                    await syncTypeMission(dataTypeMission);
                    toggerMessage("success", "Async successfully!");
                } catch (error) {
                    console.error(error);
                    toggerMessage(
                        "error",
                        "An error occurred, please check the console log for more details!",
                    );
                }
            },
            edit() {
                const dataTypeMission = JSON.parse(
                    JSON.parse(itemTypeMission.dataset.value).data,
                );
                const id = +itemTypeMission.dataset.id;
                const { name } = dataTypeMission;
                const { x, y } = buttonAction.getBoundingClientRect();
                const { inputForm, buttonSubmit, formElement } = Label.form({
                    x,
                    y,
                });
                requestAnimationFrame(() => inputForm.focus());
                inputForm.value = name;

                buttonSubmit.onclick = async () => {
                    if (inputForm.value === "") {
                        toggerMessage(
                            "error",
                            "The name field cannot be empty!",
                        );
                        return;
                    }

                    if (inputForm.value === name) {
                        formElement.remove();
                        return;
                    }
                    dataTypeMission.name = inputForm.value;
                    const status = await typeMissionClass.update({
                        id,
                        data: dataTypeMission,
                    });
                    if (!status.error) {
                        formElement.remove();
                        await syncTypeMission(dataTypeMission);
                    }
                    toggerMessage(
                        status.error ? "error" : "success",
                        status.message,
                    );
                };
            },
        };
        actions[typeButtonAction]?.();
    };
}
