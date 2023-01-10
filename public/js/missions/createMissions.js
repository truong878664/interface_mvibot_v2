import { $, $$ } from "../main.js";

const missionCreateBtn = $(".create-missions-btn");
const mission = $("#name-mission");

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
        item.checked = false;
    });
    $("#select-robot").checked = false;
    $(".select-btn").click();
    getMission(idSelect);
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
            console.log(allMission.join(""));
        });
}
