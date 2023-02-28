import handleOverlayUpdate from "../functionHandle/handleOverlayUpdate.js";
import translatesStepsMission from "../functionHandle/translatesStepsMission.js";
import { currentMission } from "../handleStepMission.js";
import {
    handleDeleteStep,
    handleMoveStep,
    render,
    validateArray,
    validateInput,
    valueItemIfelse,
    valueItemTrycatch,
    valueNormalMissionArray,
} from "../handleTypeMission.js";

let currentIdMissionEdit;
export default function handleEditMission() {
    $$(".edit-step-btn").forEach((element) => {
        element.onclick = (e) => {
            $(".edit-step-btn.active")?.classList.remove("active");
            e.target.classList.add("active");
            const missionItem = e.target.closest(".mission-item");

            $(".delete-mission-btn.not-allowed")?.classList.remove(
                "not-allowed"
            );
            missionItem
                .querySelector(".delete-mission-btn")
                .classList.add("not-allowed");

            currentIdMissionEdit = missionItem.getAttribute("id-mission");
            getMission(currentIdMissionEdit, editTypeMission);

            handleCancelUpdateMission();
            handleUpdateMission();
            handleOverlayUpdate("show");
        };
    });
    function editTypeMission(data) {
        switch (data.type) {
            case "normal":
                valueNormalMissionArray.length = 0;
                valueNormalMissionArray.push(...data.data.split("|"));

                $(".normal-mission-btn").click();
                $(".name-normal-mission").value = data.name;

                render(valueNormalMissionArray, ".normal-steps-wrapper");
                handleMoveStep(
                    valueNormalMissionArray,
                    ".normal-steps-wrapper"
                );
                handleDeleteStep(
                    valueNormalMissionArray,
                    ".normal-steps-wrapper"
                );
                showUpdateBtn(true, "normal");

                break;
            case "ifelse":
                valueItemIfelse.if.length = 0;
                valueItemIfelse.then.length = 0;
                valueItemIfelse.else.length = 0;

                const dataIfElse = data.data.split("?");
                const dataIf = dataIfElse[0].split("|");
                const dataThen = dataIfElse[1]
                    .split("|")
                    .filter((item) => item.length != 0);

                const dataElse = dataIfElse[2]
                    .split("|")
                    .filter((item) => item.length != 0);

                valueItemIfelse.if.push(...dataIf);
                valueItemIfelse.then.push(...dataThen);
                valueItemIfelse.else.push(...dataElse);

                $(".ifelse-mission-btn").click();
                $(".name-ifelse-mission").value = data.name;
                showUpdateBtn(true, "ifelse");

                render(valueItemIfelse.if, `.if-steps-wrapper`);
                render(valueItemIfelse.then, `.then-steps-wrapper`);
                render(valueItemIfelse.else, `.else-steps-wrapper`);

                handleMoveStep(valueItemIfelse.if, ".if-steps-wrapper");
                handleMoveStep(valueItemIfelse.then, ".then-steps-wrapper");
                handleMoveStep(valueItemIfelse.else, ".else-steps-wrapper");

                handleDeleteStep(valueItemIfelse.if, ".if-steps-wrapper");
                handleDeleteStep(valueItemIfelse.then, ".then-steps-wrapper");
                handleDeleteStep(valueItemIfelse.else, ".else-steps-wrapper");
                break;
            case "trycatch":
                valueItemTrycatch.try.length = 0;
                valueItemTrycatch.catch.length = 0;

                $(".name-trycatch-mission").value = data.name;

                const dataTryCatch = data.data.split("?");
                const dataTry = dataTryCatch[0].split("|");
                const dataCatch = dataTryCatch[1]
                    .split("|")
                    .filter((item) => item.length != 0);

                valueItemTrycatch.try.push(...dataTry);
                valueItemTrycatch.catch.push(...dataCatch);

                $(".trycatch-mission-btn").click();
                showUpdateBtn(true, "trycatch");

                render(valueItemTrycatch.try, `.try-steps-wrapper`);
                render(valueItemTrycatch.catch, `.catch-steps-wrapper`);

                handleMoveStep(valueItemTrycatch.try, `.try-steps-wrapper`);
                handleMoveStep(valueItemTrycatch.catch, `.catch-steps-wrapper`);

                handleDeleteStep(valueItemTrycatch.try, `.try-steps-wrapper`);
                handleDeleteStep(
                    valueItemTrycatch.catch,
                    `.catch-steps-wrapper`
                );
                break;
        }
    }
}

function getMission(id, callback) {
    fetch(`/api/type-mission/${id}`)
        .then((res) => res.json())
        .then((data) => callback(data));
}

function handleCancelUpdateMission() {
    $(`.cancel-normal`).onclick = () => {
        valueNormalMissionArray.length = 0;
        $(".edit-step-btn.active")?.classList.remove("active");
        $(".name-normal-mission").value = "";

        render(valueNormalMissionArray, ".normal-steps-wrapper");
        showUpdateBtn(false, "normal");

        $(".delete-mission-btn.not-allowed")?.classList.remove("not-allowed");
        handleOverlayUpdate("hidden");
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
        handleOverlayUpdate("hidden");
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
        handleOverlayUpdate("hidden");
    };
}

function handleUpdateMission() {
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
            updateTypeMission(currentIdMissionEdit, dataTypeMission);
            translatesStepsMission(currentMission);
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
            updateTypeMission(currentIdMissionEdit, dataTypeMission);
            translatesStepsMission(currentMission);
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
        if (isValid && isDataTry && isDataCatch) {
            updateTypeMission(currentIdMissionEdit, dataTypeMission);
            translatesStepsMission(currentMission);
            $(`.cancel-trycatch`).click();
        }
    };
}

function showUpdateBtn(isShow, type) {
    if (isShow) {
        // $(`.cancel-${type}`).classList.remove("hidden");
        // $(`.update-${type}`).classList.remove("hidden");
        // $(`.add-mission-${type}`).classList.add("hidden");
        $(`.update-wrapper-${type}`).classList.remove("hidden");
        $(`.add-wrapper-${type}`).classList.add("hidden");
    } else {
        $(`.update-wrapper-${type}`).classList.add("hidden");
        $(`.add-wrapper-${type}`).classList.remove("hidden");
        // $(`.cancel-${type}`).classList.add("hidden");
        // $(`.update-${type}`).classList.add("hidden");
        // $(`.add-mission-${type}`).classList.remove("hidden");
    }
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
