import { $$ } from "../../main.js";
import fetchApi from "./fetchApi.js";

export default function handleCloneMission() {
    $$(".clone-mission-btn").forEach((element) => {
        element.onclick = (e) => {
            const missionId = e.target.getAttribute("mission-id");
            const missionItem = e.target.closest(".create-misisons-item");

            fetchApi(
                "/api/mi",
                "POST",
                { method: "clone", id: missionId },
                (data) => {
                    location.reload();
                }
            );
        };
    });
}
