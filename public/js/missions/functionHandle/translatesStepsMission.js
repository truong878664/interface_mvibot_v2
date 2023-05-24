import { loaded, loading } from "../../functionHandle/displayLoad.js";
import handleRenderTypeMission from "../typeMission/handleRenderTypeMission.js";
import renderBlockStep from "../blockStep/renderBlockStep.js";

export default async function translatesStepsMission({id, renderBlockType = true}) {
    renderBlockType && loading();
    await fetch(`/api/mi/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ method: "update-type-mission" }),
    });

    renderBlockType && renderBlockStep();
    renderBlockType && handleRenderTypeMission();
    renderBlockType && loaded();
    // toggerMessage("success", data.message);
}
