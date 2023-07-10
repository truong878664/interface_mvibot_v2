import { $$ } from "../../main.js";
import fetchApi from "./fetchApi.js";

export default function handleCloneMission() {
    $$(".clone-mission-btn").forEach((element) => {
        element.onclick = (e) => {
            const missionId = e.target.getAttribute("mission-id");
            const missionItem = e.target.closest(".create-misisons-item");
            const versionMission =
                document.querySelector("[data-version]").dataset.version;

            fetchApi(
                "/api/mi",
                "POST",
                { method: "clone", id: missionId, version: versionMission },
                (data) => {
                    location.reload();
                }
            );
        };
    });
}
