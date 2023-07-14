import { MissionClass } from "../index.js";

export default function add() {
    const listTypeMissionWrapper = document.getElementById(
        "list-type-mission-wrapper"
    );
    listTypeMissionWrapper.onclick = (e) => {
        const buttonAction = e.target.closest(
            "[data-button-type-mission-kind]"
        );
        if (!buttonAction) return;
        const typeButtonAction = buttonAction.dataset.buttonTypeMissionKind;
        const actions = {
            add() {
                const itemTypeMission = buttonAction.closest("[data-name='item-type-mission']")
                const data = JSON.parse(JSON.parse(itemTypeMission.dataset.value).data)
                MissionClass.addStep({step: data})
                MissionClass.render()
            },
        };
        actions[typeButtonAction]?.();
    };
}
