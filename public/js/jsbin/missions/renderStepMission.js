const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const dataStepsJson = $(".data-steps").value;
let dataSteps = JSON.parse(dataStepsJson);

function stepsNameSubmit() {
    const stepsNameSubmitEle = document.querySelector(
        "#input-steps-name-submit"
    );
    stepsNameSubmitEle.value = `|${dataSteps.join("|")}`;
}

function renderStep() {
    const stepsWrapper = document.querySelector(".steps-wrapper");
    const htmlStep = [];
    dataSteps.map((step, index) => {
        const stepMode = step.slice(0, step.indexOf("#"));
        const stepName = step.slice(
            step.indexOf("#") + 1,
            step.indexOf("#", step.indexOf("#") + 1)
        );

        return htmlStep.push(
            `<div class="step-item step-${stepMode}">
                <button id-move="${index}" class="move-btn move-left"><i class="fa-solid fa-angle-left"></i></button>
                <div>${stepMode}|${stepName}</div>
                <button class="delete-step" id-delete="${index}"><i class="fa-solid fa-xmark"></i></button>
                <button id-move="${index}" class="move-btn move-right"><i class="fa-solid fa-angle-right"></i></button>
            </div>`
        );
    });
    stepsWrapper.innerHTML = htmlStep.join("");
    deleteStep(dataSteps);
    moveStepLeft(dataSteps);
    moveStepRight(dataSteps);
    stepsNameSubmit(dataSteps);
}

function deleteStep(dataSteps) {
    const allDeleteBtn = $$(".delete-step");
    allDeleteBtn.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", (e) => {
            const indexDelete = e.target.getAttribute("id-delete");
            dataSteps.splice(indexDelete, 1);
            renderStep(dataSteps);
            dataSteps = dataSteps;
        });
    });
}

function moveStepLeft(dataSteps) {
    const allMoveBtnLeft = document.querySelectorAll(".move-left");
    allMoveBtnLeft.forEach((moveLeftBtn) => {
        moveLeftBtn.addEventListener("click", (e) => {
            const indexMove = Number(e.target.getAttribute("id-move"));
            const itemMove = dataSteps.splice(indexMove, 1);
            dataSteps.splice(indexMove - 1, "", ...itemMove);
            dataSteps = dataSteps;

            renderStep(dataSteps);
        });
    });
}

function moveStepRight(data) {
    const allMoveBtnRight = document.querySelectorAll(".move-right");
    allMoveBtnRight.forEach((moveRightBtn) => {
        moveRightBtn.addEventListener("click", (e) => {
            const indexMove = Number(e.target.getAttribute("id-move"));
            const itemMove = data.splice(indexMove, 1);
            data.splice(indexMove + 1, "", ...itemMove);
            dataSteps = data;
            renderStep(data);
        });
    });
}

export { stepsNameSubmit, renderStep };
