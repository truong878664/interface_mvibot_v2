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
        const stepId = step.slice(step.lastIndexOf("#") + 1, step.length);

        return htmlStep.push(
            `<div class="step-item step-${stepMode}" index=${index}>
                <input hidden type="text" class="step-id" value=${stepId}>
                <button id-move="${index}" class="move-btn move-left"><i class="fa-solid fa-angle-left"></i></button>
                <span class="stem-name">${stepMode}|${stepName}</span>
                <button id-move="${index}" class="move-btn move-right"><i class="fa-solid fa-angle-right"></i></button>
                <button class="show-menu"><i class="fa-solid fa-ellipsis"></i></button>
                <ul class="menu-right-click">
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
    stepsNameSubmit(dataSteps);
    showMenu();
    contextMenuStep();
    evenClickEdit();
}

function showMenu() {
    $$(".show-menu").forEach((showMenuItem, index) => {
        showMenuItem.addEventListener("click", () => {
            $$(".menu-right-click")[index].classList.add("active");
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

function contextMenuStep() {
    $$(".step-item").forEach((item, index) => {
        item.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            $$(".menu-right-click")[index].classList.add("active");
        });
    });
}

function evenClickEdit() {
    $$(".edit-step").forEach((item) => {
        item.addEventListener("click", (e) => handleEditStep(e));
    });
}

function showHideTabEdit() {
    $(".form-edit-step").style.display = "block";
    $(".overlay-form-edit-step").style.display = "block";
    $(".overlay-form-edit-step").addEventListener("click", () => {
        $(".form-edit-step").style.display = "none";
        $(".overlay-form-edit-step").style.display = "none";
    });
    $(".menu-right-click.active").classList.remove("active");
}

function handleEditStep(e) {
    const stepElement = e.target.parentElement.parentElement;
    const indexStep = stepElement.getAttribute("index");
    const stepsValue = JSON.parse($(".data-steps-value").value);
    const showData = stepsValue[indexStep];
    const mode = getDataAtString("mode", showData);
    showHideTabEdit();

    $(`.${mode}-id`).value = stepElement.querySelector(".step-id").value;

    $$(".form-edit-step").forEach((element) => {
        element.removeAttribute("class");
        element.classList.add("form-edit-step");
    });
    $(".form-edit-step").classList.add(`${mode}-edit`);

    const name = getDataAtString("name", showData);
    $(`.name-${mode}-edit`).value = name;
    const text = getDataAtString("data", showData)
        .replaceAll("~~", "|")
        .replaceAll("~", "");
    const arrDataSteps = text.split("|");

    arrDataSteps.forEach((item) => {
        const name = item.slice(0, item.indexOf("="));
        const value = item
            .slice(item.indexOf("=") + 1, item.length)
            .replace("-", "");
        if (name.trim()) {
            $(`.${name}-edit`).value = value;
        }
    });
}

function getDataAtString(string, showData) {
    if (showData) {
        const indexString = showData.indexOf(string) + 1 + string.length;
        const data = showData.slice(
            indexString,
            showData.indexOf("|", indexString)
        );
        return data;
    } else {
        alert("please save");
    }
}

export { stepsNameSubmit, renderStep };
