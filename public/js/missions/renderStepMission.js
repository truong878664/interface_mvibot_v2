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
    deleteStep(dataSteps);
    moveStepLeft(dataSteps);
    moveStepRight(dataSteps);
    showMenu();
    handleEditStep();
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

//edit step
function handleEditStep() {
    $$(".edit-step").forEach((element) => {
        element.onclick = (e) => {
            const stepItem = e.target.closest(".step-item");

            const stepMode = stepItem.querySelector(".step-mode").value;
            const stepId = stepItem.querySelector(".step-id").value;

            $(`.${stepMode}-function-btn`).click();
            $([".menu-right-click.active"]).classList.remove("active");

            getValueStep(stepMode, stepId);
        };
    });
}

function getValueStep(stepMode, id) {
    fetch(`/api/step/0?type=${stepMode}&id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            showDataUpdate(stepMode, data);
        });
}

function showDataUpdate(stepMode, data) {
    switch (stepMode) {
        case "footprint":
            const x1_footprint = $('[name="x1_footprint"]');
            const x2_footprint = $('[name="x2_footprint"]');
            const y1_footprint = $('[name="y1_footprint"]');
            const y2_footprint = $('[name="y2_footprint"]');
            const name_footprint = $('[name="name_footprint"]');

            x1_footprint.value = Math.abs(data[0].x1);
            x2_footprint.value = Math.abs(data[0].x2);
            y1_footprint.value = Math.abs(data[0].y1);
            y2_footprint.value = Math.abs(data[0].y2);
            name_footprint.value = data[0].name_footprint;
            break;
        case "sleep":
            const name_sleep = $('[name="name_sleep"]');
            const time_sleep = $('[name="time_sleep"]');

            name_sleep.value = data[0].name_sleep;
            time_sleep.value = data[0].name_sleep;
            break;
        case "marker":
            $(`.${data[0].marker_type}-btn`).click();

            $(".marker-item");

            // const formElement = e.target.closest(".marker-item");

            // const name_marker = formElement.querySelector(
            //     '[name="name_marker"]'
            // );
            // const marker_type = formElement.querySelector(
            //     '[name="marker_type"]'
            // );
            // const marker_dir = formElement.querySelector('[name="marker_dir"]');
            // const off_set_x1 = formElement.querySelector('[name="off_set_x1"]');
            // const off_set_x2 = formElement.querySelector('[name="off_set_x2"]');
            // const off_set_y1 = formElement.querySelector('[name="off_set_y1"]');
            // const off_set_y2 = formElement.querySelector('[name="off_set_y2"]');
            // const off_set_dis = formElement.querySelector(
            //     '[name="off_set_dis"]'
            // );
            // const off_set_angle = formElement.querySelector(
            //     '[name="off_set_angle"]'
            // );
            // const sx1 = formElement.querySelector('[name="sx1"]');
            // const sx2 = formElement.querySelector('[name="sx2"]');
            // const sy1 = formElement.querySelector('[name="sy1"]');
            // const sy2 = formElement.querySelector('[name="sy2"]');
            break;
    }
}

export { renderStep, updateStep };
