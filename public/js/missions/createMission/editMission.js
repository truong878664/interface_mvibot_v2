import { $$, toggerMessage } from "../../main.js";
import fetchApi from "./fetchApi.js";

export default function handleEditNameMission() {
    $$(".edit-name-mission-btn").forEach((element) => {
        element.addEventListener("click", editNameMission);
    });
}

function editNameMission(e) {
    const missionItem = e.target.closest(".create-misisons-item");
    const nameElement = missionItem.querySelector(".name-mission");
    const oldName = nameElement.value;
    const hrefElement = missionItem.querySelector(".href-mission");
    hrefElement.onclick = (e) => e.preventDefault();
    nameElement.disabled = false;
    nameElement.focus();
    nameElement.style.borderColor = "#fff";

    nameElement.setSelectionRange(oldName.length, oldName.length);

    nameElement.onblur = () => {
        nameElement.style.borderColor = "transparent";
        setTimeout(() => {
            hrefElement.onclick = () => true;
        }, 500);
        nameElement.disabled = true;
        const versionMission =
        document.querySelector("[data-version]").dataset.version;
        if (oldName != nameElement.value && nameElement.value != "") {
            const dataUpdate = {
                method: "update-name",
                name: nameElement.value,
                version: versionMission,
            };

            fetchApi(
                `/api/mi/${missionItem.getAttribute("mission-id")}`,
                "PUT",
                dataUpdate,
                (data) => {
                    if (data.status != 200) {
                        nameElement.value = oldName;
                    } else {
                        toggerMessage('success', 'Change name mission successfully!')
                    }
                    
                }
            );
        } else {
            nameElement.value = oldName;
        }
    };
}
