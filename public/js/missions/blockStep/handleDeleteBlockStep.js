import dbDelete from "../functionHandle/dbDelete.js";
import { currentMission, messageEmpty } from "../handleStepMission.js";
import getDataBlockStep from "./getDataBlockStep.js";
import notAllowMove from "./notAllowMove.js";
import resetIndex from "./resetIndex.js";
import updateBlockStep from "./updateBlockStep.js";

export default function handleDeleteBlockMission(missionShorthand) {
    $$(".delete-mission-btn").forEach((element, index) => {
        element.onclick = (e) => {
            dbDelete(element, () => {
                const missionItem = e.target.closest(".mission-item");
                const stepWrapper = e.target.closest(".steps-wrapper");
                missionItem.remove();

                const dataBlockStep = getDataBlockStep()
                const dataMissionShorthand = {
                    mission_shorthand: dataBlockStep.join("+"),
                    method: "update",
                };
                updateBlockStep(currentMission, dataMissionShorthand, false);

                !stepWrapper.children.length &&
                    messageEmpty(stepWrapper, "Mission empty!");

                notAllowMove();
                resetIndex(".mission-item");
            });
        };
    });
}

