import handleOverlayUpdate from "../functionHandle/handleOverlayUpdate.js";
import editTypeMission from "./editTypeMission.js";
import getMission from "./getMission.js";
import { handleCancelUpdateMission, handleUpdateMission } from "./updateTypeMission.js";

export default function handleUpdateTypeMission() {
    $$('.edit-type-mission-btn').forEach(element => {
        element.onclick = (e) => {
            const typeMissionItem = (e.target.closest('.type-mission-item'))
            const typeMissionId = typeMissionItem.getAttribute('type-mission-id')
            getMission(typeMissionId, editTypeMission);
            handleCancelUpdateMission();
            handleUpdateMission(typeMissionId);
            handleOverlayUpdate("show", 'type-mission');
        }
    });
}