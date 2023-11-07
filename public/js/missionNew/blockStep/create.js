import { toggerMessage } from "../../main.js";
import { MissionClass } from "../index.js";

export default function createTypeMission() {
    const createTypeMissionWrapper = document.getElementById(
        "create-type-mission-wrapper",
    );
    createTypeMissionWrapper.addEventListener("click", (e) => {
        const createTypeMissionBtn = e.target.closest("[data-type-mission]");
        if (!createTypeMissionBtn) return;
        const typeMission = createTypeMissionBtn.dataset.typeMission;
        const typeMissionObject = MissionClass[typeMission]({});
        MissionClass.addStep({ step: typeMissionObject });
        toggerMessage(
            "success",
            `Add type mission <span class="font-bold text-pink-600">${typeMission}</span> successfully!`,
        );
        MissionClass.render();
    });
}
