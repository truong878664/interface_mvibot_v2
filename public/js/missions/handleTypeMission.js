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
let valueNormalMissionSaveDatabase = "";
const valueNormalMissionArray = [];

const nameIfelseMission = $(".name-ifelse-mission");

let valueIfelseMissionSaveDatabase = "";

const valueItemIfelse = {
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

function handleAddStep() {
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

                    break;

                case "ifelse":
                    valueItemIfelse[currentIf].push(valueStep);
                    render(
                        valueItemIfelse[currentIf],
                        `.${currentIf}-steps-wrapper`
                    );

                    break;
            }
        };
    });
}

function handleAddMissionNormal() {
    $(".add-mission-normal").onclick = () => {
        valueNormalMissionSaveDatabase = `${
            nameNormalMission.value
        }^normal^|${valueNormalMissionArray.join("|")}`;
        updateStep(currentMission, {
            steps_mission_name: valueNormalMissionSaveDatabase,
        });
        resetValueInputNormal();
        renderStep();
    };
    function resetValueInputNormal() {
        valueNormalMissionArray.length = 0;
        $(".normal-steps-wrapper").innerHTML = "";
        nameNormalMission.value = "";
    }
}

function handleAddMissionIfelse() {
    $(".add-mission-ifelse").onclick = () => {
        valueIfelseMissionSaveDatabase = `${
            nameIfelseMission.value
        }^ifelse^|${valueItemIfelse.if.join("|")}?|${valueItemIfelse.then.join(
            "|"
        )}?|${valueItemIfelse.else.join("|")}`;

        updateStep(currentMission, {
            steps_mission_name: valueIfelseMissionSaveDatabase,
        });

        resetValueInputIfelse();
        renderStep();
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

function updateStep(id, data) {
    fetch(`/api/mi/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (res) {
            console.log(res);
        });
}

function render(dataSteps, element) {
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
                <button class="show-menu" index="${index}"><i class="fa-solid fa-ellipsis"></i></button>
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
