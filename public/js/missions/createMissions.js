import { $, $$ } from "../main.js";

const missionCreateBtn = $(".create-missions-btn");
const mission = $("#name-mission");

missionCreateBtn.addEventListener("click", () => {
    setTimeout(() => {
        mission.focus();
    }, 1);
});

$(".select-btn").onclick = () => {
    $(".action-select").classList.toggle("hidden");
    $$(".select-mission-wrapper").forEach((item) => {
        item.classList.toggle("hidden");
    });
};

$(".send-btn").onclick = (e) => {
    const idSelect = [];
    $$(".select-mission").forEach((item) => {
        if (item.checked) {
            idSelect.push(item.value);
        }
        item.checked = false;
    });

    getMission(idSelect);
};

function getMission(ids) {
    const list_id = ids.join(",");
    fetch(`/api/mi/get-mission?list_id=${list_id}`)
        .then((res) => res.json())
        .then((data) => console.log(data.join("")));
}
