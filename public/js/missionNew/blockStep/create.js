import renderMission from "../handle/renderMission.js";
import { MissionData } from "../index.js";
import Mission from "../Class/Mission.js";

export default function createTypeMission() {
    const createTypeMissionWrapper = document.getElementById(
        "create-type-mission-wrapper"
    );
    createTypeMissionWrapper.addEventListener("click", (e) => {
        const createTypeMissionBtn = e.target.closest("[data-type-mission]");
        if (!createTypeMissionBtn) {
            return;
        }
        const typeMission = createTypeMissionBtn.dataset.typeMission;

        const mission = new Mission();
        const typeMissionObject = mission[typeMission]({});
        MissionData.push(typeMissionObject);
        renderMission({ mission: MissionData });
    });
}
