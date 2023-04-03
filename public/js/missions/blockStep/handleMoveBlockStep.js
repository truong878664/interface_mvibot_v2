import { currentMission } from "../handleStepMission.js";
import disabledSendMission from "./disabledSendMission.js";
import notAllowMove from "./notAllowMove.js";
import resetIndex from "./resetIndex.js";
import updateBlockStep from "./updateBlockStep.js";

export default function handleMoveBlockStep(shortHandMissionList) {
    notAllowMove();
    
    let timeoutDelete;
    $$(".move-block-step-btn").forEach((element) => {
        element.onclick = (e) => {
            disabledSendMission({ disabled: true });
            
            const typeMove = e.target.getAttribute("type");
            clearTimeout(timeoutDelete);
            const missionItem = e.target.closest(".mission-item");

            switch (typeMove) {
                case "up":
                    const moveStepUp = missionItem.previousSibling;
                    $(".steps-wrapper").insertBefore(missionItem, moveStepUp);
                    break;
                case "down":
                    const moveStepDown = missionItem.nextSibling.nextSibling;
                    $(".steps-wrapper").insertBefore(missionItem, moveStepDown);
                    break;
            }

            resetIndex(".mission-item");
            const dataBlockStep = updateDataBlockStep();

            timeoutDelete = setTimeout(() => {
                updateBlockStep(
                    currentMission,
                    {
                        mission_shorthand: dataBlockStep.join("+"),
                        method: "update",
                    },
                    false
                );
                disabledSendMission({ disabled: false });
            }, 2000);
            notAllowMove();
        };
    });
}

function updateDataBlockStep() {
    const step = [];
    Array.from($$(".mission-item")).map((item) => {
        step.push(item.getAttribute("id-mission"));
        return step;
    });
    return step;
}
