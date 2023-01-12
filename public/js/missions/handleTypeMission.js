import arrayMove from "../functionHandle/arrayMove.js";
import { $, $$ } from "../main.js";
import { currentMission, renderStep } from "./handleStepMission.js";

const htmlDataFunction = {
    footprint: [],
    gpio: [],
    marker: [],
    sleep: [],
    position: [],
};
const typeFunction = ["footprint", "gpio", "marker", "sleep", "position"];

loadDataFunction();
handleRenderDataFunction();

handleAddMissionNormal();
handleAddMissionIfelse();

export function loadDataFunction() {
    typeFunction.map((item) => {
        getDataFunction(item, htmlDataFunction);
    });
}

function getDataFunction(type) {
    fetch(`/api/${type}`)
        .then((res) => res.json())
        .then((data) => {
            renderDataFunction(data, type);
            $(".type-mission-function-normal[type=footprint]").click();
            $(".type-mission-function-ifelse[type=footprint]").click();
        });
}
function handleRenderDataFunction() {
    $$(".type-mission-function-normal").forEach((element) => {
        element.onclick = (e) => {
            $(".type-mission-function-normal.active")?.classList.remove(
                "active"
            );
            e.target.classList.add("active");

            const type = e.target.getAttribute("type");
            $(".detail-type-mission-function-normal").innerHTML =
                htmlDataFunction[type].join("");
            handleAddStep();
        };
    });

    $$(".type-mission-function-ifelse").forEach((element) => {
        element.onclick = (e) => {
            $(".type-mission-function-ifelse.active")?.classList.remove(
                "active"
            );

            e.target.classList.add("active");

            const type = e.target.getAttribute("type");
            $(".detail-type-mission-function-ifelse").innerHTML =
                htmlDataFunction[type].join("");
            handleAddStep();
        };
    });
}

function renderDataFunction(data, type) {
    htmlDataFunction[type].length = 0;
    data.map((item) => {
        htmlDataFunction[type].push(
            `<div class="point-id-1 flex justify-between items-center bg-[rgba(204,204,204,0.53)] px-5 py-3 mb-2 point-id-8 type-mission-function-item">
                <div class="flex">
                    <span class="type-mission-${item.mode}">${item.mode}|</span>
                    <span class="name-mission-${item.mode}">${
                item.name_position ||
                item.name_gpio ||
                item.name_marker ||
                item.name_sleep ||
                item.name_footprint
            }</span>
                </div>
                <input value="${item.mode}#${
                item.name_position ||
                item.name_gpio ||
                item.name_marker ||
                item.name_sleep ||
                item.name_footprint
            }#${
                item.id
            }" type="hidden" class="value-type-mission-function-item"/>
                <div class="">
                    <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn add-mission-step-item-btn">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>`
        );
    });
}
const nameNormalMission = $(".name-normal-mission");
export const valueNormalMissionArray = [];

const nameIfelseMission = $(".name-ifelse-mission");

export const valueItemIfelse = {
    if: [],
    then: [],
    else: [],
};

let currentIf = "if";
$$(".add-ifelse-step-btn").forEach((element) => {
    element.onclick = (e) => {
        currentIf = e.target.getAttribute("type");
        $(".add-ifelse-step-btn.active").classList.remove("active");
        e.target.classList.add("active");
    };
});

export function handleAddStep() {
    $$(".add-mission-step-item-btn").forEach((element) => {
        element.onclick = (e) => {
            let type = "";
            $(".normal-mission-btn.active") && (type = "normal");
            $(".ifelse-mission-btn.active") && (type = "ifelse");

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
                    console.log(valueItemIfelse);
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
            }
        };
    });
}

function handleAddMissionNormal() {
    $(".add-mission-normal").onclick = () => {
        const isValid = validateInput(".name-normal-mission");
        const isData = validateArray(
            valueNormalMissionArray,
            ".normal-steps-wrapper"
        );

        const dataSaveTypeMission = {
            name: nameNormalMission.value,
            type: "normal",
            data: valueNormalMissionArray.join("|"),
        };

        if (isValid && isData) {
            addTypeMission(dataSaveTypeMission);
            resetValueInputNormal();
        }
    };
}
function resetValueInputNormal() {
    valueNormalMissionArray.length = 0;
    $(".normal-steps-wrapper").innerHTML = "";
    nameNormalMission.value = "";
}

function handleAddMissionIfelse() {
    $(".add-mission-ifelse").onclick = () => {
        const isValid = validateInput(".name-ifelse-mission");
        const isDataIf = validateArray(valueItemIfelse.if, ".if-label");
        const isData =
            validateArray(valueItemIfelse.then, ".then-label") ||
            validateArray(valueItemIfelse.else, ".else-label");

        const dataSaveTypeMission = {
            name: nameIfelseMission.value,
            type: "ifelse",
            data: `${valueItemIfelse.if.join("|")}?|${valueItemIfelse.then.join(
                "|"
            )}?|${valueItemIfelse.else.join("|")}`,
        };
        if (isValid && isDataIf && isData) {
            addTypeMission(dataSaveTypeMission);
            resetValueInputIfelse();
            $$(".normal-border").forEach((item) => {
                item.style.borderColor = "#ccc";
            });
        }
    };

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

function addTypeMission(data) {
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
            updateBlockStep(currentMission, {
                mission_shorthand: data.id,
                method: "add",
            });
            renderStep();
        })
        .catch(function (res) {});
}

export function updateBlockStep(id, data) {
    fetch(`/api/mi/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
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
                <ul class="menu-right-click menu-click-${index}">
                    <div class="menu-overlay"></div>
                    ${
                        stepMode != "position"
                            ? '<li class="menu-item edit-step"><i class="fa-regular fa-pen-to-square"></i></i>edit</li>'
                            : ""
                    }
                    <li class="menu-item delete-step" id-delete="${index}"><i class="fa-regular fa-trash-can"></i></i>delete</li>
                </ul>
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
        $(item).oninput = (e) => {
            e.target.style.borderColor = "#ccc";
        };
        const pattern = /^[a-zA-Z0-9]*$/;

        if ($(item).value == "" || !pattern.exec($(item).value)) {
            $(item).style.borderColor = "red";
            return false;
        } else {
            return true;
        }
    });

    return result.indexOf(false) == -1;
}

export function validateArray(arr, element) {
    if (arr.length == 0) {
        $(element).style.borderColor = "red";
        return false;
    } else {
        $(element).style.borderColor = "#ccc";
        return true;
    }
}
