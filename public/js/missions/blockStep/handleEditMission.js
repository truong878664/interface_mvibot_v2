import { toggerMessage } from "../../main.js";
import handleOverlayUpdate from "../functionHandle/handleOverlayUpdate.js";

import editTypeMission from "../typeMission/editTypeMission.js";
import { handleCancelUpdateMission, handleUpdateMission } from "../typeMission/updateTypeMission.js";

let currentIdMissionEdit;

export default function handleEditMission() {
    $$(".edit-step-btn").forEach((element) => {
        element.onclick = async (e) => {
            $(".edit-step-btn.active")?.classList.remove("active");
            e.target.classList.add("active");

            const missionItem = e.target.closest(".mission-item");

            $(".delete-mission-btn.not-allowed")?.classList.remove(
                "not-allowed"
            );

            currentIdMissionEdit = missionItem.getAttribute("id-mission");
            
            const resTypeMission = await fetch(`/api/type-mission/${currentIdMissionEdit}`);
            const dataTypeMission = await resTypeMission.json();
            if (!dataTypeMission.error) {
                editTypeMission(dataTypeMission.data);
                handleCancelUpdateMission();
                handleUpdateMission(currentIdMissionEdit);
                handleOverlayUpdate("show", "type-mission");
            } else {
                toggerMessage("error", dataTypeMission.message);
            }
            
        };
    });
    
}


