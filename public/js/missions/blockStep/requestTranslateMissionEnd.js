import { currentMission } from "../handleStepMission.js";

export default async function requestTranslateMissionEnd() {
    const res = await fetch(`/api/mi/${currentMission}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ method: "translate-data-mission-end" }),
    });
    return res.json();
}