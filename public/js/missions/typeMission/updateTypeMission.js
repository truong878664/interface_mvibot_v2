import handleOverlayUpdate from "../functionHandle/handleOverlayUpdate.js";
import translatesStepsMission from "../functionHandle/translatesStepsMission.js";
import { currentMission } from "../handleStepMission.js";
import {
    valueItemIfelse,
    valueItemTrycatch,
    valueNormalMissionArray,
} from "../function/addFunction.js";
import handleRenderTypeMission from "./handleRenderTypeMission.js";
import showUpdateBtn from "./showUpdateBtn.js";
import { render, validateArray, validateInput } from "../handleTypeMission.js";

export function handleCancelUpdateMission() {
    $(`.cancel-normal`).onclick = () => {
        valueNormalMissionArray.length = 0;
        $(".edit-step-btn.active")?.classList.remove("active");
        $(".name-normal-mission").value = "";

        render(valueNormalMissionArray, ".normal-steps-wrapper");
        showUpdateBtn(false, "normal");

        $(".delete-mission-btn.not-allowed")?.classList.remove("not-allowed");
        handleOverlayUpdate("hidden", "type-mission");
    };

    $(`.cancel-ifelse`).onclick = () => {
        showUpdateBtn(false, "ifelse");
        valueItemIfelse.if.length = 0;
        valueItemIfelse.then.length = 0;
        valueItemIfelse.else.length = 0;
        $(".name-ifelse-mission").value = "";

        $(".edit-step-btn.active")?.classList.remove("active");

        render(valueItemIfelse.if, `.if-steps-wrapper`);
        render(valueItemIfelse.then, `.then-steps-wrapper`);
        render(valueItemIfelse.else, `.else-steps-wrapper`);

        $(".delete-mission-btn.not-allowed")?.classList.remove("not-allowed");
        handleOverlayUpdate("hidden", "type-mission");
    };

    $(`.cancel-trycatch`).onclick = () => {
        showUpdateBtn(false, "trycatch");
        $(".name-trycatch-mission").value = "";

        valueItemTrycatch.try.length = 0;
        valueItemTrycatch.catch.length = 0;

        $(".edit-step-btn.active")?.classList.remove("active");

        render(valueItemTrycatch.try, `.try-steps-wrapper`);
        render(valueItemTrycatch.catch, `.catch-steps-wrapper`);

        $(".delete-mission-btn.not-allowed")?.classList.remove("not-allowed");
        handleOverlayUpdate("hidden", "type-mission");
    };
}

export function handleUpdateMission(idTypeMissionEdit) {
    $(".update-normal").onclick = () => {
        const isValid = validateInput(".name-normal-mission");
        const isData = validateArray(
            valueNormalMissionArray,
            ".normal-steps-wrapper"
        );
        const dataTypeMission = {
            name: $(".name-normal-mission").value,
            data: valueNormalMissionArray.join("|"),
        };

        if (isValid && isData) {
            updateTypeMission(idTypeMissionEdit, dataTypeMission);
            translatesStepsMission(currentMission);
            handleRenderTypeMission()
            $(`.cancel-normal`).click();
        }
    };

    $(".update-ifelse").onclick = () => {
        const isValid = validateInput(".name-ifelse-mission");
        const isDataIf = validateArray(valueItemIfelse.if, ".if-label");
        const isData =
            validateArray(valueItemIfelse.then, ".then-label") ||
            validateArray(valueItemIfelse.else, ".else-label");

        const dataTypeMission = {
            name: $(".name-ifelse-mission").value,
            data: `${valueItemIfelse.if.join("|")}?|${valueItemIfelse.then.join(
                "|"
            )}?|${valueItemIfelse.else.join("|")}`,
        };
        if (isValid && isDataIf && isData) {
            updateTypeMission(idTypeMissionEdit, dataTypeMission);
            translatesStepsMission(currentMission);
            handleRenderTypeMission()
            $(`.cancel-ifelse`).click();
        }
    };

    $(".update-trycatch").onclick = () => {
        const isValid = validateInput(".name-trycatch-mission");
        const isDataTry = validateArray(valueItemTrycatch.try, ".try-label");
        const isDataCatch = validateArray(
            valueItemTrycatch.catch,
            ".catch-label"
        );

        const dataTypeMission = {
            name: $(".name-trycatch-mission").value,
            data: `${valueItemTrycatch.try.join(
                "|"
            )}?|${valueItemTrycatch.catch.join("|")}`,
        };
        if (isValid) {
            updateTypeMission(idTypeMissionEdit, dataTypeMission);
            translatesStepsMission(currentMission);
            handleRenderTypeMission()
            $(`.cancel-trycatch`).click();
        }
    };
}

function updateTypeMission(id, data) {
    fetch(`/api/type-mission/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}
