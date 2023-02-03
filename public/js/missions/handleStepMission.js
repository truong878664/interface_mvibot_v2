import { loaded, loading } from "./functionHandle/displayLoad.js";
import {
    handleDeleteStep,
    handleMoveStep,
    render,
    updateBlockStep,
    validateArray,
    validateInput,
    valueItemIfelse,
    valueNormalMissionArray,
} from "./handleTypeMission.js";
import translatesStepsMission from "./functionHandle/translatesStepsMission.js";
import dbDelete from "./functionHandle/dbDelete.js";
import handleOverlayUpdate from "./functionHandle/handleOverlayUpdate.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const currentMission = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1,
    location.pathname.length
);

translatesStepsMission(currentMission);

function renderBlockStep() {
    loading();
    fetch(`/api/mi/${currentMission}`)
        .then((res) => res.json())
        .then((data) => {
            loaded();
            const steps_mission_name = data.steps_mission_name;

            const shortHandMissionList = data.mission_shorthand?.split("+");

            const arraySteps = steps_mission_name?.split("+");
            const html = [];

            const buttonHandle = `<button class="step-item text-[#333] border border-[#333] bg-white btn show-step-btn"><i class="fa-regular fa-eye"></i></button>
                            <button class="step-item text-[#333] border border-[#333] bg-white btn move-up-step-btn"><i class="fa-solid fa-angle-up"></i></button>
                            <button class="step-item text-[#333] border border-[#333] bg-white btn move-down-step-btn"><i class="fa-solid fa-angle-down"></i></button>
                            <button class="step-item text-[#333] border border-[#333] bg-white btn edit-step-btn"><i class="fa-solid fa-pen"></i></button>
                            <button class="step-item text-[#333] border border-[#333] bg-white btn delete-mission-btn"><i class="fa-solid fa-xmark"></i></button>`;

            arraySteps?.forEach((arrayStep, index) => {
                const typeMissionItem = arrayStep.split("^");
                switch (typeMissionItem[1]) {
                    case "normal":
                        const htmlNormal = [];

                        renderStepItem(typeMissionItem[2], htmlNormal);

                        const htmlNormalText = htmlNormal.join("");
                        html.push(
                            `<div class="flex flex-wrap w-full items-center ml-4 mb-4 mission-item" id-mission=${
                                shortHandMissionList &&
                                shortHandMissionList[index]
                            }>
                                <i class="fa-solid fa-play"></i>
                                <div class="step-item text-[#333] border border-[#333] bg-white ">normal|
                                ${arrayStep.slice(0, arrayStep.indexOf("^"))}
                                </div>
                                ${htmlNormalText}
                                ${buttonHandle}
                            </div>`
                        );
                        break;
                    case "ifelse":
                        const dataIfelse = typeMissionItem[2].split("?");
                        const htmlIfelse = [];
                        const htmlIf = [];
                        const htmlThen = [];
                        const htmlElse = [];

                        renderStepItem(dataIfelse[0], htmlIf);
                        renderStepItem(dataIfelse[1], htmlThen);
                        renderStepItem(dataIfelse[2], htmlElse);

                        htmlIfelse.push(
                            ` <div class="step-item bg-black text-[#fff]">if|
                            ${arrayStep.slice(0, arrayStep.indexOf("^"))}
                            </div>${htmlIf.join("")}`
                        );
                        htmlIfelse.push(
                            ` <div class="hidden step-item bg-black text-[#fff] step-hidden">then</div>${htmlThen.join(
                                ""
                            )}`
                        );
                        htmlIfelse.push(
                            ` <div class="hidden step-item bg-black text-[#fff] step-hidden">else</div>${htmlElse.join(
                                ""
                            )}`
                        );
                        html.push(
                            `<div class="flex flex-wrap w-full items-center ml-4 mb-4 mission-item" id-mission=${
                                shortHandMissionList[index]
                            }>
                                <i class="fa-solid fa-play"></i>
                                ${htmlIfelse.join("")}
                                ${buttonHandle}
                            </div>`
                        );

                        break;
                }
            });
            $(".steps-wrapper").innerHTML = html.join("");

            scrollTop(".steps-wrapper");
            handleDeleteMission(shortHandMissionList);
            showStep();
            showAllStep();
            handleEditMission();
            handleMoveBlockStep();
        });
}

function renderStepItem(data, html) {
    const dataNormal = data.split("|");
    dataNormal.shift();
    dataNormal.map((step, index) => {
        const stepMode = step.slice(0, step.indexOf("#"));
        const stepName = step.slice(
            step.indexOf("#") + 1,
            step.indexOf("#", step.indexOf("#") + 1)
        );

        return html.push(`
            <div class="hidden step-item step-${stepMode} step-hidden" index=${index}>
            <span class="stem-name">${stepMode}|${stepName}</span>
            </div>
            `);
    });
}

function scrollTop(element) {
    $(element).scrollTop = $(".steps-wrapper").scrollHeight;
}

function handleDeleteMission(missionShorthand) {
    $$(".delete-mission-btn").forEach((element) => {
        element.onclick = (e) => {
            dbDelete(element, () => {
                const missionItem = e.target.closest(".mission-item");
                const idDeleteMission = missionItem.getAttribute("id-mission");

                missionShorthand?.splice(
                    missionShorthand.indexOf(idDeleteMission),
                    1
                );

                const dataMissionShorthand = {
                    mission_shorthand: missionShorthand.join("+"),
                    method: "update",
                };
                updateBlockStep(currentMission, dataMissionShorthand);
                missionItem.remove();
                notAllowMove();
            });
        };
    });
}

function showStep() {
    $$(".show-step-btn").forEach((element) => {
        element.onclick = (e) => {
            const missionItems = e.target
                .closest(".mission-item")
                .querySelectorAll(".step-hidden");

            missionItems.forEach((item) => {
                item.classList.toggle("hidden");
            });
            e.target.innerHTML == '<i class="fa-regular fa-eye-slash"></i>'
                ? (e.target.innerHTML = '<i class="fa-regular fa-eye"></i>')
                : (e.target.innerHTML =
                      '<i class="fa-regular fa-eye-slash"></i>');
        };
    });
}

function showAllStep() {
    $(".check-show-step").checked =
        localStorage.getItem("isShowAllStep") === "true";

    if ($(".check-show-step").checked) {
        $$(".step-hidden").forEach((element) => {
            element.classList.remove("hidden");
        });

        $$(".show-step-btn").forEach((element) => {
            element.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
        });
    } else {
        $$(".step-hidden").forEach((element) => {
            element.classList.add("hidden");
        });

        $$(".show-step-btn").forEach((element) => {
            element.innerHTML = '<i class="fa-regular fa-eye"></i>';
        });
    }

    $(".check-show-step").onchange = (e) => {
        if (e.target.checked) {
            $$(".step-hidden").forEach((element) => {
                element.classList.remove("hidden");
            });

            $$(".show-step-btn").forEach((element) => {
                element.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
            });

            localStorage.setItem("isShowAllStep", true);
        } else {
            $$(".step-hidden").forEach((element) => {
                element.classList.add("hidden");
            });

            $$(".show-step-btn").forEach((element) => {
                element.innerHTML = '<i class="fa-regular fa-eye"></i>';
            });
            localStorage.setItem("isShowAllStep", false);
        }
    };
}

let currentIdMissionEdit;
function handleEditMission() {
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
        }
    }
}

function getMission(id, callback) {
    fetch(`/api/type-mission/${id}`)
        .then((res) => res.json())
        .then((data) => callback(data));
}

function showUpdateBtn(isShow, type) {
    if (isShow) {
        $(`.cancel-${type}`).classList.remove("hidden");
        $(`.update-${type}`).classList.remove("hidden");
        $(`.add-mission-${type}`).classList.add("hidden");
    } else {
        $(`.cancel-${type}`).classList.add("hidden");
        $(`.update-${type}`).classList.add("hidden");
        $(`.add-mission-${type}`).classList.remove("hidden");
    }
}

function handleCancelUpdateMission() {
    $(`.cancel-normal`).onclick = () => {
        valueNormalMissionArray.length = 0;
        $(".edit-step-btn.active")?.classList.remove("active");
        $(".name-normal-mission").value = "";

        render(valueNormalMissionArray, ".normal-steps-wrapper");
        showUpdateBtn(false, "normal");

        $(".delete-mission-btn.not-allowed")?.classList.remove("not-allowed");
        handleOverlayUpdate('hidden')
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
        handleOverlayUpdate('hidden')

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
}

function handleMoveBlockStep() {
    notAllowMove();
    $$(".move-up-step-btn").forEach((element) => {
        element.onclick = (e) => {
            const missionItem = e.target.closest(".mission-item");
            const idMove = missionItem.getAttribute("id-mission");
            const dataMove = { method: "move", type: "left", id_move: idMove };
            updateBlockStep(currentMission, dataMove);

            const moveStep = missionItem.previousSibling;
            $(".steps-wrapper").insertBefore(missionItem, moveStep);
            notAllowMove();
        };
    });

    $$(".move-down-step-btn").forEach((element) => {
        element.onclick = (e) => {
            const missionItem = e.target.closest(".mission-item");
            const idMove = missionItem.getAttribute("id-mission");
            const dataMove = { method: "move", type: "right", id_move: idMove };
            updateBlockStep(currentMission, dataMove);

            const moveStep = missionItem.nextSibling.nextSibling;
            $(".steps-wrapper").insertBefore(missionItem, moveStep);

            notAllowMove();
        };
    });
}
function notAllowMove() {
    $(".move-up-step-btn.not-allowed")?.classList.remove("not-allowed");
    $(".move-down-step-btn.not-allowed")?.classList.remove("not-allowed");
    const missionItems = $(".steps-wrapper").childNodes;
    missionItems[0]
        ?.querySelector(".move-up-step-btn")
        ?.classList.add("not-allowed");
    missionItems[missionItems.length - 1]
        ?.querySelector(".move-down-step-btn")
        ?.classList.add("not-allowed");
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

export { renderBlockStep };
