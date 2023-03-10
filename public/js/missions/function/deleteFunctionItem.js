import { $, $$ } from "../../main.js";
import dbDelete from "../functionHandle/dbDelete.js";
import { loaded, loading } from "../../functionHandle/displayLoad.js";
import translatesStepsMission from "../functionHandle/translatesStepsMission.js";
import { currentMission, renderBlockStep } from "../handleStepMission.js";
import handleRenderTypeMission from "../typeMission/handleRenderTypeMission.js";

export default function handleDeleteFunctionType() {
    $$(".delete-function-item-btn").forEach((element) => {
        element.onclick = (e) => {
            dbDelete(e.target, () => deleteItem(e));
        };
    });
}
const timeOut = [];

function deleteItem(e) {
    const functionItem = e.target.closest(".type-mission-function-item");
    const typeFunction = functionItem.getAttribute("function-type");
    const idFunction = functionItem.getAttribute("function-id");

    functionItem.remove()

    loading();
    fetch(`/api/${typeFunction}/${idFunction}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            timeOut.forEach((time) => {
                clearTimeout(time);
            });
            timeOut.push(
                setTimeout(() => {
                    translatesStepsMission(currentMission);
                    renderBlockStep();
                    handleRenderTypeMission()
                }, 1000)
            );
            loaded();
        });
}
