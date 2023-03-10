import handleOverlayUpdate from "../functionHandle/handleOverlayUpdate.js";

import editTypeMission from "../typeMission/editTypeMission.js";
import getMission from "../typeMission/getMission.js";
import { handleCancelUpdateMission, handleUpdateMission } from "../typeMission/updateTypeMission.js";

let currentIdMissionEdit;

export default function handleEditMission() {
    $$(".edit-step-btn").forEach((element) => {
        element.onclick = (e) => {
            $(".edit-step-btn.active")?.classList.remove("active");
            e.target.classList.add("active");
            const missionItem = e.target.closest(".mission-item");

            $(".delete-mission-btn.not-allowed")?.classList.remove(
                "not-allowed"
            );
            missionItem
                .querySelector(".delete-mission-btn")
                .classList.add("not-allowed");

            currentIdMissionEdit = missionItem.getAttribute("id-mission");
            getMission(currentIdMissionEdit, editTypeMission);
            
            handleCancelUpdateMission();
            handleUpdateMission(currentIdMissionEdit);
            handleOverlayUpdate("show", "type-mission");
        };
    });
    
}


