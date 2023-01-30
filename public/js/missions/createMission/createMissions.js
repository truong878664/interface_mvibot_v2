import { $, $$, toggerMessage } from "../../main.js";
import dbDelete from "../functionHandle/dbDelete.js";

const missionCreateBtn = $(".create-missions-btn");
const mission = $("#name-mission");

handleEditNameMission();
handleDeleteMission();
handleDeleteMultiMission();
handleCloneMission();

missionCreateBtn.addEventListener("click", () => {
    setTimeout(() => {
        mission.focus();
    }, 1);
});

$(".select-btn").onclick = (e) => {
    $(".action-select").classList.toggle("hidden");
    $$(".select-mission-wrapper").forEach((item) => {
        item.classList.toggle("hidden");
    });

    if (e.target.innerText == "Select") {
        e.target.innerText = "Cancel";
        e.target.style.backgroundColor = "rgb(250 204 21)";
    } else {
        e.target.innerText = "Select";
        e.target.style.backgroundColor = "rgb(56 189 248)";
    }
};

$(".send-btn").onclick = (e) => {
    const idSelect = [];
    $$(".select-mission").forEach((item) => {
        if (item.checked) {
            idSelect.push(item.value);
        }
    });

    if ($(".robot-active").value != "" && idSelect.length != 0) {
        getMission(idSelect);
        $("#select-robot").checked = false;
        $(".select-btn").click();

        $$(".select-mission").forEach((item) => {
            item.checked = false;
        });
    }
};

function getMission(ids) {
    const list_id = ids.join(",");
    fetch(`/api/mi/get-mission?list_id=${list_id}`)
        .then((res) => res.json())
        .then((data) => {
            const allMission = [];
            data.map((item) => {
                return allMission.push(
                    `${item.wake_up ? item.wake_up : ""}${
                        item.stop ? item.stop : ""
                    }${item.steps_mission ? item.steps_mission : ""}`
                );
            });
            console.log(allMission.join("") || "mission don't have data");
        });
}

function handleDeleteMission() {
    $$(".delete-mission-btn").forEach((element) => {
        element.onclick = (e) => {
            e.preventDefault();
            dbDelete(e.target, () => {
                handleDelete(e);
            });
            function handleDelete(e) {
                e.target.closest(".action-delete-mission").submit();
            }
        };
    });
}

function handleEditNameMission() {
    $$(".edit-name-mission-btn").forEach((element) => {
        element.onclick = (e) => {
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
                if (oldName != nameElement.value && nameElement.value != "") {
                    const dataUpdate = {
                        method: "update-name",
                        name_mission: nameElement.value,
                    };
                    fetchApi(
                        `/api/mi/${missionItem.getAttribute("mission-id")}`,
                        "PUT",
                        dataUpdate,
                        (data) => {
                            if (data.status != 200) {
                                nameElement.value = oldName;
                            }
                        }
                    );
                } else {
                    nameElement.value = oldName;
                }
            };
        };
    });
}

function handleDeleteMultiMission() {
    $(".delete-btn").onclick = () => {
        const idDelete = [];
        $$(".select-mission").forEach((element) => {
            if (element.checked) {
                idDelete.push(element.value);
                element.closest(".create-misisons-item").remove();
            }
        });
        fetchApi(
            "/api/mi/delete-multi",
            "DELETE",
            {
                method: "delete",
                idDelete: idDelete,
            },
            checkDelete
        );

        function checkDelete(data) {
            if (data.status == 200) {
                toggerMessage("success", data.message);
            } else {
                toggerMessage("error", data.message);
            }
        }
    };
}

function handleCloneMission() {
    $$(".clone-mission-btn").forEach((element) => {
        element.onclick = (e) => {
            const missionId = e.target.getAttribute("mission-id");
            console.log(missionId);

            fetchApi(
                "/api/mi",
                "POST",
                { method: "clone", id: missionId },
                (data) => console.log(data)
            );
            location.reload();
        };
    });
}

function fetchApi(url, method, data, callback = () => {}) {
    fetch(url, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => callback(data));
}
