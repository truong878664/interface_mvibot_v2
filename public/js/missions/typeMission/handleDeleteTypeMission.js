import { $, $$ } from "../../main.js";
import resetIndex from "../blockStep/resetIndex.js";
import dbDelete from "../functionHandle/dbDelete.js";
import translatesStepsMission from "../functionHandle/translatesStepsMission.js";
import { currentMission } from "../handleStepMission.js";

export default function handleDeleteTypeMission() {
    $$(".delete-type-mission-btn").forEach((element) => {
        element.onclick = (e) => dbDelete(e.target, () => handleDelete(e));
    });
    function handleDelete(e) {
        const missionItem = e.target.closest(".type-mission-item");
        const typeMissionId = missionItem.getAttribute("type-mission-id");
        fetch(`/api/type-mission/${typeMissionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((res) => res.json())
            .then((statusDelete) => {
                if (statusDelete.deleted) {
                    missionItem.remove();
                    deleteBlockStepMission(typeMissionId);
                    resetIndex(".mission-item");
                    translatesStepsMission({
                        id: currentMission,
                        renderBlockType: false,
                    });
                }
            })
            .catch((err) => console.error(err));
    }
}

function deleteBlockStepMission(idTypeMission) {
    $$(".mission-item").forEach((blockStep) => {
        blockStep.getAttribute("id-mission") === idTypeMission &&
            blockStep.remove();
    });
}
