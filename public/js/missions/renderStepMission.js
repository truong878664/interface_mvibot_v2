import arrayMove from "../functionHandle/arrayMove.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const currentMission = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1,
    location.pathname.length
);

function renderStep() {
    loading();
    fetch(`/api/mission/${currentMission}`)
        .then((res) => res.json())
        .then((data) => {
            const dataSteps = data.steps_mission_name?.split("|");
            dataSteps?.shift();
            return dataSteps;
        })
        .then((dataSteps) => {
            render(dataSteps);
            loaded();
        });
}

function loading() {
    $(".step-loading").classList.remove("hidden");
}
function loaded() {
    $(".step-loading").classList.add("hidden");
}
function render(dataSteps) {
    const stepsWrapper = document.querySelector(".steps-wrapper");
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
    deleteStep(dataSteps);
    moveStepLeft(dataSteps);
    moveStepRight(dataSteps);
    showMenu();
}

function showMenu() {
    $$(".show-menu").forEach((showMenuItem) => {
        showMenuItem.addEventListener("click", (e) => {
            const index = e.target.getAttribute("index");
            $(`.menu-click-${index}`).classList.add("active");
        });
    });
    $$(".show-menu").forEach((showMenuItem) => {
        showMenuItem.addEventListener("click", (e) => {
            const index = e.target.getAttribute("index");
            $(`.menu-click-${index}`).classList.add("active");
        });
    });

    $$(".menu-overlay").forEach((item) => {
        item.addEventListener("click", () => {
            $(".menu-right-click.active")?.classList.remove("active");
        });
    });
}

function deleteStep(dataSteps) {
    const allDeleteBtn = $$(".delete-step");
    allDeleteBtn.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", (e) => {
            const index = Number(
                e.target.closest(".step-item").getAttribute("index")
            );
            dataSteps.splice(index, 1);
            render(dataSteps);
            const stepSave = dataStepSave(dataSteps);
            console.log(dataSteps);
            const data = { steps_mission_name: stepSave, method: "update" };
            updateStep(`/api/mission/${currentMission}`, data);
        });
    });
}

function updateStep(url = "", stepSave) {
    fetch(url, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(stepSave),
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (res) {
            console.log(res);
        });
}

function dataStepSave(dataSteps) {
    const data = dataSteps.length > 0 ? `|${dataSteps.join("|")}` : "";
    return data;
}

function moveStepLeft(dataSteps) {
    const allMoveBtnLeft = document.querySelectorAll(".move-left");
    allMoveBtnLeft.forEach((moveLeftBtn, index) => {
        moveLeftBtn.addEventListener("click", (e) => {
            let moveIndex = Number(
                e.target.closest(".step-item").getAttribute("index")
            );
            if (moveIndex != 0) {
                arrayMove(dataSteps, moveIndex, moveIndex - 1);

                const stepSave = dataStepSave(dataSteps);
                const data = { steps_mission_name: stepSave, method: "update" };
                updateStep(`/api/mission/${currentMission}`, data);

                const currentStep = e.target.closest(".step-item");
                const moveStep = currentStep.previousSibling;
                $(".steps-wrapper").insertBefore(currentStep, moveStep);

                moveIndex--;
                e.target.closest(".step-item").setAttribute("index", moveIndex);

                const itemNext = e.target.closest(".step-item").nextSibling;
                itemNext.setAttribute(
                    "index",
                    Number(itemNext.getAttribute("index")) + 1
                );
            }
        });
    });
}

function moveStepRight(dataSteps) {
    const allMoveBtnRight = document.querySelectorAll(".move-right");
    allMoveBtnRight.forEach((moveRightBtn) => {
        moveRightBtn.addEventListener("click", (e) => {
            let moveIndex = Number(
                e.target.closest(".step-item").getAttribute("index")
            );
            if (moveIndex < dataSteps.length - 1) {
                arrayMove(dataSteps, moveIndex, moveIndex + 1);

                const stepSave = dataStepSave(dataSteps);
                const data = { steps_mission_name: stepSave, method: "update" };
                updateStep(`/api/mission/${currentMission}`, data);

                const currentStep = e.target.closest(".step-item");
                const moveStep = currentStep.nextSibling.nextSibling;

                $(".steps-wrapper").insertBefore(currentStep, moveStep);

                moveIndex++;
                e.target.closest(".step-item").setAttribute("index", moveIndex);

                const itemPrevious =
                    e.target.closest(".step-item").previousSibling;

                itemPrevious.setAttribute(
                    "index",
                    Number(itemPrevious.getAttribute("index")) - 1
                );
            }
        });
    });
}

export { renderStep, updateStep };
