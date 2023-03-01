import { $, toggerMessage } from "../../main.js";
import { renderBlockStep } from "../handleStepMission.js";
import { loaded, loading } from "../../functionHandle/displayLoad.js";

export default function translatesStepsMission(id) {
    loading()
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
            loaded()
            renderBlockStep();
            toggerMessage("success", data.message);
        });
}
