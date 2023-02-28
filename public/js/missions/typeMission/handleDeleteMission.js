import { $, $$ } from "../../main.js";
import dbDelete from "../functionHandle/dbDelete.js";

export default function handleDeleteTypeMission() {
    $$(".delete-type-mission-btn").forEach((element) => {
        element.onclick = (e) => dbDelete(e.target, () => handleDelete(e));
    });
    function handleDelete(e) {
        const missionItem = e.target.closest('.type-mission-item');
        const typeMissionId = missionItem.getAttribute('type-mission-id')
        console.log(typeMissionId)
    }
}
