import { $, toggerMessage } from "../../main.js";
import { loaded, loading } from "../../functionHandle/displayLoad.js";
import handleRenderTypeMission from "../typeMission/handleRenderTypeMission.js";
import renderBlockStep from "../blockStep/renderBlockStep.js";

export default function translatesStepsMission({id, renderBlockType = true}) {
    loading();
    fetch(`/api/mi/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ method: "update-type-mission" }),
    })
        .then((res) => res.json())
        .then((data) => {
            loaded();
            renderBlockType && renderBlockStep();
            renderBlockType && handleRenderTypeMission();
            toggerMessage("success", data.message);
        });
}
