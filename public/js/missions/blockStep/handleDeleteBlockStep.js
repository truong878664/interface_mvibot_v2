import dbDelete from "../functionHandle/dbDelete.js";
import { currentMission, messageEmpty } from "../handleStepMission.js";
import { updateBlockStep } from "../handleTypeMission.js";
import notAllowMove from "./notAllowMove.js";
import resetIndex from "./resetIndex.js";

export default function handleDeleteBlockMission(missionShorthand) {
    $$(".delete-mission-btn").forEach((element, index) => {
        element.onclick = (e) => {
            dbDelete(element, () => {
                const missionItem = e.target.closest(".mission-item");
                const indexBlockStep = missionItem.getAttribute("index");

                missionShorthand?.splice(indexBlockStep, 1);

                const dataMissionShorthand = {
                    mission_shorthand: missionShorthand.join("+"),
                    method: "update",
                };
                updateBlockStep(currentMission, dataMissionShorthand);
                const stepWrapper = e.target.closest(".steps-wrapper");
                missionItem.remove();

                !stepWrapper.children.length &&
                    messageEmpty(stepWrapper, "Mission empty!");

                notAllowMove();
                resetIndex(".mission-item");
            });
        };
    });
}