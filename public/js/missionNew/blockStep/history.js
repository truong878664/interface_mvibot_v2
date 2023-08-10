import { MissionClass } from "../index.js";

const actionHistoryWrapper = document.getElementById("action-history");
export default function handleHistory() {
    actionHistoryWrapper.onclick = (e) => {
        const buttonHistory = e.target.closest("[data-action-history")
        if(!buttonHistory) return;
        const typeHistory = buttonHistory.dataset.actionHistory
        MissionClass.history({type: typeHistory})
    };
}
