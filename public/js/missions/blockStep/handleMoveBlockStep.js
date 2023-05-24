import disableActionTypeMission from "../functionHandle/disableActionTypeMission.js";
import { currentMission } from "../handleStepMission.js";
import disabledSendMission from "./disabledSendMission.js";
import getDataBlockStep from "./getDataBlockStep.js";
import notAllowMove from "./notAllowMove.js";
import resetIndex from "./resetIndex.js";
import updateBlockStep from "./updateBlockStep.js";

export default function handleMoveBlockStep(shortHandMissionList) {
    notAllowMove();

    let timeoutDelete;
    $$(".move-block-step-btn").forEach((element) => {
        element.onclick = (e) => {
            handleOverlay({
                isShow: true,
                querySelect: "#block-step-container",
            });

            displayButtonSaveMove({ isShow: true });
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
            saveMoveBlockStep();
            notAllowMove();
        };
    });
}

function saveMoveBlockStep() {
    const saveMoveBlockBtn = document.getElementById("save-move-block-btn");

    saveMoveBlockBtn.onclick = () => {
        const dataBlockStep = getDataBlockStep();
        updateBlockStep(
            currentMission,
            {
                mission_shorthand: dataBlockStep.join("+"),
                method: "update",
            },
            false
        );
        disabledSendMission({ disabled: false });
        displayButtonSaveMove({ isShow: false });
        handleOverlay({
            isShow: false,
            querySelect: "#block-step-container",
        });
    };
}

function displayButtonSaveMove({ isShow }) {
    document
        .getElementById("save-move-block-wrapper")
        .classList.toggle("hidden", !isShow);

    document.querySelectorAll(".delete-mission-btn").forEach((element) => {
        element.classList.toggle("hidden", isShow);
    });
    document
        .querySelectorAll(".add-mission-step-item-btn")
        .forEach((element) => {
            element.classList.toggle("hidden", isShow);
        });
    document.querySelectorAll(".edit-step-btn").forEach((element) => {
        element.classList.toggle("hidden", isShow);
    });
}

function handleOverlay({ isShow, querySelect }) {
    const overlay = document.getElementById("overlay-update-mission");
    const element = document.querySelector(querySelect);
    overlay.classList.toggle("hidden", !isShow);
    if (isShow) {
        overlay.style.zIndex = 1000;
        element.style.zIndex = 1001;
    } else {
        overlay.removeAttribute("style");
        element.removeAttribute("style");
    }
}
