import { loaded, loading } from "../../functionHandle/displayLoad.js";
import { toggerMessage } from "../../main.js";
import handleOverlayUpdate from "../functionHandle/handleOverlayUpdate.js";
import editTypeMission from "./editTypeMission.js";
import {
    handleCancelUpdateMission,
    handleUpdateMission,
} from "./updateTypeMission.js";

export default function handleUpdateTypeMission() {
    $$(".edit-type-mission-btn").forEach((element) => {
        element.onclick = async (e) => {
            const typeMissionItem = e.target.closest(".type-mission-item");
            const typeMissionId = typeMissionItem.getAttribute("type-mission-id");
            loading();
            const resTypeMission = await fetch(`/api/type-mission/${typeMissionId}`);
            const dataTypeMission = await resTypeMission.json();
            if (!dataTypeMission.error) {
                editTypeMission(dataTypeMission.data);
                handleCancelUpdateMission();
                handleUpdateMission(typeMissionId);
                handleOverlayUpdate("show", 'type-mission');
            } else {
                toggerMessage("error", dataTypeMission.message);
            }
            loaded();
        };
    });
}
