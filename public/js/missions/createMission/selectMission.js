import { $, $$ } from "../../main.js";

export default function selectMission() {
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
    
}