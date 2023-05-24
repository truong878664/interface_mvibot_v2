import { $, $$ } from "../../main.js";

export default function disableActionTypeMission({disable}) {
    $(".missions-content").classList.toggle("editing", disable);
    $$(".multi-btn").forEach((element) => {
        element.disabled = disable;
    });
}