import arrayMove from "../functionHandle/arrayMove.js";
import { $, $$, toggerMessage } from "../main.js";
import handleDeleteFunctionType from "./function/deleteFunctionItem.js";
import handleEditFunctionType from "./function/editFunctionItem.js";
import { loaded, loading } from "../functionHandle/displayLoad.js";
import { currentMission, renderBlockStep } from "./handleStepMission.js";
import handleRenderTypeMission from "./typeMission/handleRenderTypeMission.js";
import deleteMultiFunction from "./function/handleMultiFunctionItem.js";
import renderDataFunction from "./function/renderDataFunction.js";

export const htmlDataFunction = {
    footprint: [],
    gpio: [],
    marker: [],
    sleep: [],
    position: [],
    gpio_module: [],
    variable: [],
    sound: [],
};

const typeFunction = [
    "footprint",
    "gpio",
    "marker",
    "sleep",
    "position",
    "gpio_module",
    "variable",
    "sound",
];

loadDataFunction();

handleRenderTypeMission();

handleAddMissionNormal();
handleAddMissionIfelse();
handleAddMissionTrycatch();

export function loadDataFunction() {
    fetch(`/api/function`)
        .then((res) => res.json())
        .then((data) => {
            typeFunction.forEach((item) => {
                renderDataFunction(data[item].reverse(), item);
            });
        })
        .then(() => {
            typeFunction.forEach((item) => {
                $(`.function-list-item-${item}`).innerHTML =
                    htmlDataFunction[item].join("");
            });
        })
        .then(() => {
            handleAddStep();
            handleEditFunctionType();
            handleDeleteFunctionType();
        }).then(() => {
            deleteMultiFunction()
        });
}


//normal
export const valueNormalMissionArray = [];
export const valueItemTrycatch = {
    try: [],
    catch: [],
};
export const valueItemIfelse = {
    if: [],
    then: [],
    else: [],
};

const nameIfelseMission = $(".name-ifelse-mission");
const nameNormalMission = $(".name-normal-mission");
const nameTryCatchMission = $(".name-trycatch-mission");

//ifelse

let currentIf = "if";
$$(".add-ifelse-step-btn").forEach((element) => {
    element.onclick = (e) => {
        currentIf = e.target.getAttribute("type");
        $(".add-ifelse-step-btn.active").classList.remove("active");
        e.target.classList.add("active");
    };
});

//trycatch
let currentTrycatch = "try";
$$(".add-trycatch-step-btn").forEach((element) => {
    element.onclick = (e) => {
        currentTrycatch = e.target.getAttribute("type");
        $(".add-trycatch-step-btn.active").classList.remove("active");
        e.target.classList.add("active");
    };
});

export function handleAddStep() {
    $$(".add-mission-step-item-btn").forEach((element) => {
        element.onclick = (e) => {
            let type = "";
            $(".normal-mission-btn.active") && (type = "normal");
            $(".ifelse-mission-btn.active") && (type = "ifelse");
            $(".trycatch-mission-btn.active") && (type = "trycatch");

            const valueStep = e.target
                .closest(".type-mission-function-item")
                .querySelector(".value-type-mission-function-item").value;

            switch (type) {
                case "normal":
                    valueNormalMissionArray.push(valueStep);
                    render(valueNormalMissionArray, ".normal-steps-wrapper");
                    handleMoveStep(
                        valueNormalMissionArray,
                        ".normal-steps-wrapper"
                    );
                    handleDeleteStep(
                        valueNormalMissionArray,
                        ".normal-steps-wrapper"
                    );
                    break;

                case "ifelse":
                    valueItemIfelse[currentIf].push(valueStep);
                    render(
                        valueItemIfelse[currentIf],
                        `.${currentIf}-steps-wrapper`
                    );

                    handleMoveStep(valueItemIfelse.if, ".if-steps-wrapper");
                    handleMoveStep(valueItemIfelse.then, ".then-steps-wrapper");
                    handleMoveStep(valueItemIfelse.else, ".else-steps-wrapper");

                    handleDeleteStep(valueItemIfelse.if, ".if-steps-wrapper");
                    handleDeleteStep(
                        valueItemIfelse.then,
                        ".then-steps-wrapper"
                    );
                    handleDeleteStep(
                        valueItemIfelse.else,
                        ".else-steps-wrapper"
                    );
                    break;
                case "trycatch":
                    valueItemTrycatch[currentTrycatch].push(valueStep);
                    render(
                        valueItemTrycatch[currentTrycatch],
                        `.${currentTrycatch}-steps-wrapper`
                    );
                    handleMoveStep(valueItemTrycatch.try, ".try-steps-wrapper");
                    handleMoveStep(
                        valueItemTrycatch.catch,
                        ".catch-steps-wrapper"
                    );

                    handleDeleteStep(
                        valueItemTrycatch.try,
                        ".try-steps-wrapper"
                    );
                    handleDeleteStep(
                        valueItemTrycatch.catch,
                        ".catch-steps-wrapper"
                    );
                    break;
            }
        };
    });
}

function handleAddMissionNormal() {
    $$(".add-mission-normal").forEach((element) => {
        element.onclick = (e) => {
            const isValid = validateInput(".name-normal-mission");
            const isData = validateArray(
                valueNormalMissionArray,
                ".normal-steps-wrapper"
            );

            const dataSaveTypeMission = {
                name: nameNormalMission.value,
                type: "normal",
                data: valueNormalMissionArray.join("|"),
                type_mission: $(".type-mission").getAttribute("data"),
            };
            const typeSave = e.target.getAttribute("type");
            if (isValid && isData) {
                addTypeMission(dataSaveTypeMission, typeSave);
                resetValueInputNormal();
                handleRenderTypeMission();
            }
        };
    });
}
function resetValueInputNormal() {
    valueNormalMissionArray.length = 0;
    $(".normal-steps-wrapper").innerHTML = "";
    nameNormalMission.value = "";
}

function handleAddMissionIfelse() {
    $$(".add-mission-ifelse").forEach((element) => {
        element.onclick = (e) => {
            const isValid = validateInput(".name-ifelse-mission");
            const isDataIf = validateArray(valueItemIfelse.if, ".if-label");
            const isData =
                validateArray(valueItemIfelse.then, ".then-label") ||
                validateArray(valueItemIfelse.else, ".else-label");

            const dataSaveTypeMission = {
                name: nameIfelseMission.value,
                type: "ifelse",
                data: `${valueItemIfelse.if.join(
                    "|"
                )}?|${valueItemIfelse.then.join(
                    "|"
                )}?|${valueItemIfelse.else.join("|")}`,
                type_mission: $(".type-mission").getAttribute("data"),
            };
            const typeSave = e.target.getAttribute("type");

            if (isValid && isDataIf && isData) {
                addTypeMission(dataSaveTypeMission, typeSave);
                resetValueInputIfelse();
                $$(".normal-border").forEach((item) => {
                    item.style.borderColor = "#ccc";
                });
                handleRenderTypeMission();
            }
        };
    });

    function resetValueInputIfelse() {
        valueItemIfelse.if.length = 0;
        valueItemIfelse.then.length = 0;
        valueItemIfelse.else.length = 0;

        $(".if-steps-wrapper").innerHTML = "";
        $(".then-steps-wrapper").innerHTML = "";
        $(".else-steps-wrapper").innerHTML = "";
        nameIfelseMission.value = "";
    }
}

//add trycatch
function handleAddMissionTrycatch() {
    $$(".add-mission-trycatch").forEach((element) => {
        element.onclick = (e) => {
            const isValid = validateInput(".name-trycatch-mission");
            const isDataTry = validateArray(
                valueItemTrycatch.try,
                ".try-label"
            );
            const isDataCatch = validateArray(
                valueItemTrycatch.catch,
                ".catch-label"
            );
            const dataSaveTypeMission = {
                name: nameTryCatchMission.value,
                type: "trycatch",
                data: `${valueItemTrycatch.try.join(
                    "|"
                )}?|${valueItemTrycatch.catch.join("|")}`,
                type_mission: $(".type-mission").getAttribute("data"),
            };
            const typeSave = e.target.getAttribute("type");

            if (isValid && isDataTry && isDataCatch) {
                addTypeMission(dataSaveTypeMission, typeSave);
                resetValueInputTrycatch();
                handleRenderTypeMission();
            }
        };
    });

    function resetValueInputTrycatch() {
        valueItemTrycatch.try.length = 0;
        valueItemTrycatch.catch.length = 0;

        $(".try-steps-wrapper").innerHTML = "";
        $(".catch-steps-wrapper").innerHTML = "";
        nameTryCatchMission.value = "";
    }
}

function addTypeMission(data, typeSave) {
    fetch("/api/type-mission", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            if (typeSave === "add") {
                updateBlockStep(currentMission, {
                    mission_shorthand: data.id,
                    method: "add",
                });
                renderBlockStep();
            }
        })
        .catch(function (res) {});
}

export function updateBlockStep(id, data) {
    loading();
    fetch(`/api/mi/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            toggerMessage("success", data.message);
            loaded();
        })
        .catch((data) => console.log(data));
}

export function render(dataSteps, element) {
    const stepsWrapper = document.querySelector(element);
    const htmlStep = [];
    dataSteps?.map((step, index) => {
        const stepMode = step.slice(0, step.indexOf("#"));
        const stepName = step.slice(
            step.indexOf("#") + 1,
            step.indexOf("#", step.indexOf("#") + 1)
        );
        const stepId = step.slice(step.lastIndexOf("#") + 1, step.length);

        return htmlStep.push(
            `<div class="step-item step-${stepMode}" index=${index}>
                <input hidden type="text" class="step-id" value=${stepId}>
                <input hidden type="text" class="step-mode" value=${stepMode}>
                <button id-move="${index}" class="move-btn move-left"><i class="fa-solid fa-angle-left"></i></button>
                <span class="stem-name">${stepMode}|${stepName}</span>
                <button id-move="${index}" class="move-btn move-right"><i class="fa-solid fa-angle-right"></i></button>
                <button class="show-menu delete-step-btn" index="${index}"><i class="fa-solid fa-trash-can"></i></button>
            </div>`
        );
    });
    stepsWrapper.innerHTML = htmlStep.join("");
}

export function handleMoveStep(data, wrapperItem) {
    $(wrapperItem)
        .querySelectorAll(".move-left")
        .forEach((element) => {
            element.onclick = (e) => {
                let moveIndex =
                    e.target.closest(".step-item").getAttribute("index") * 1;

                if (moveIndex != 0) {
                    arrayMove(data, moveIndex, moveIndex - 1);

                    const currentStep = e.target.closest(".step-item");

                    const moveStep = currentStep.previousSibling;

                    e.target
                        .closest(".step-item")
                        .parentElement.insertBefore(currentStep, moveStep);

                    moveIndex--;
                    e.target
                        .closest(".step-item")
                        .setAttribute("index", moveIndex);

                    const itemNext = e.target.closest(".step-item").nextSibling;
                    itemNext.setAttribute(
                        "index",
                        Number(itemNext.getAttribute("index")) + 1
                    );
                }
            };
        });

    $$(".move-right").forEach((element) => {
        element.onclick = (e) => {
            let moveIndex =
                e.target.closest(".step-item").getAttribute("index") * 1;

            if (moveIndex < data.length - 1) {
                arrayMove(data, moveIndex, moveIndex + 1);

                const currentStep = e.target.closest(".step-item");
                const moveStep = currentStep.nextSibling.nextSibling;

                e.target
                    .closest(".step-item")
                    .parentElement.insertBefore(currentStep, moveStep);

                moveIndex++;
                e.target.closest(".step-item").setAttribute("index", moveIndex);

                const itemPrevious =
                    e.target.closest(".step-item").previousSibling;

                itemPrevious.setAttribute(
                    "index",
                    Number(itemPrevious.getAttribute("index")) - 1
                );
            }
        };
    });
}

export function handleDeleteStep(data, wrapperItem) {
    $(wrapperItem)
        .querySelectorAll(".delete-step-btn")
        .forEach((element) => {
            element.onclick = (e) => {
                const stepItem = e.target;
                data.splice(
                    stepItem.closest(".step-item").getAttribute("index"),
                    1
                );
                stepItem.closest(".step-item").remove();
                $(wrapperItem)
                    .querySelectorAll(".step-item")
                    .forEach((element, index) => {
                        element.setAttribute("index", index);
                    });
            };
        });
}

export function validateInput(...rest) {
    const result = rest.map((item) => {
        const pattern = /^[a-zA-Z0-9_]*$/;

        if ($(item).value == "" || !pattern.exec($(item).value)) {
            toggerMessage(
                "error",
                "Please enter all input & does not contain special characters like (!@#$%^&*()+-=)"
            );
            return false;
        } else {
            return true;
        }
    });

    return result.indexOf(false) == -1;
}

export function validateArray(arr, element) {
    if (arr.length == 0) {
        toggerMessage("error", "Data cannot be empty");
        return false;
    } else {
        return true;
    }
}
