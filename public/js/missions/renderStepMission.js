import { toggerMessage } from "../main.js";
import { valueGpio } from "./gpio.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const currentMission = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1,
    location.pathname.length
);

function renderStep() {
    fetch(`/api/mission/${currentMission}`)
        .then((res) => res.json())
        .then((data) => {
            const dataSteps = data.steps_mission_name.split("|");
            dataSteps.shift();
            return dataSteps;
        })
        .then((dataSteps) => {
            render(dataSteps);
        });
}
function render(dataSteps) {
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
    allDeleteBtn.forEach((deleteBtn, index) => {
        deleteBtn.addEventListener("click", (e) => {
            dataSteps.splice(index, 1);
            render(dataSteps);
            const stepSave = dataStepSave(dataSteps);
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

$$(".add-point-btn").forEach((element) => {
    element.onclick = (e) => {
        e.preventDefault();
        const itemPoint = e.target.closest(".item-point");
        const type = itemPoint.querySelector(".type").value;
        const nameType = itemPoint.querySelector(".name_type").value;
        const idType = itemPoint.querySelector(".id_type").value;

        const dataSaveStep = dataSaveSteps("add", type, nameType, idType);

        updateStep(`/api/mission/${currentMission}`, dataSaveStep);

        renderStep();

        toggerMessage("success", "add point successfully");
    };
});

function dataSaveSteps(method, type, name_type, id_type) {
    return { method, type, name_type, id_type };
}

$(".submit-btn-footprint").onclick = (e) => {
    e.preventDefault();

    const x1_footprint = $('[name="x1_footprint"]');
    const x2_footprint = $('[name="x2_footprint"]');
    const y1_footprint = $('[name="y1_footprint"]');
    const y2_footprint = $('[name="y2_footprint"]');
    const name_footprint = $('[name="name_footprint"]');
    if (
        x1_footprint.value &&
        x2_footprint.value &&
        y1_footprint.value &&
        y2_footprint.value &&
        name_footprint.value
    ) {
        const data = {
            method: "add",
            type: "footprint",
            x1: x1_footprint.value,
            x2: x2_footprint.value,
            y1: y1_footprint.value,
            y2: y2_footprint.value,
            name_type: name_footprint.value,
        };
        updateStep(`/api/mission/${currentMission}`, data);
        renderStep();

        x1_footprint.value = "";
        x2_footprint.value = "";
        y1_footprint.value = "";
        y2_footprint.value = "";
        name_footprint.value = "";
        toggerMessage("success", "save footprint successfully");
    } else {
        toggerMessage("error", "Please enter all inputs");
    }
};

$(".submit-btn-gpio").onclick = (e) => {
    e.preventDefault();
    const name_gpio = $(".name_gpio");
    const time_out_gpio = $(".time_out_gpio");
    const out_set_gpio = $(".out_set_gpio");
    const out_reset_gpio = $(".out_reset_gpio");
    const in_on_gpio = $(".in_on_gpio");
    const in_off_gpio = $(".in_off_gpio");
    const in_pullup_gpio = $(".in_pullup_gpio");
    const in_pulldown_gpio = $(".in_pulldown_gpio");

    if (
        name_gpio.value &&
        time_out_gpio.value &&
        (out_set_gpio.value ||
            out_reset_gpio.value ||
            in_on_gpio.value ||
            in_off_gpio.value ||
            in_pullup_gpio.value ||
            in_pulldown_gpio.value)
    ) {
        const data = {
            method: "add",
            type: "gpio",
            name_type: name_gpio.value,
            time_out: time_out_gpio.value,
            out_set: out_set_gpio.value,
            out_reset: out_reset_gpio.value,
            in_on: in_on_gpio.value,
            in_off: in_off_gpio.value,
            in_pullup: in_pullup_gpio.value,
            in_pulldown: in_pulldown_gpio.value,
        };
        updateStep(`/api/mission/${currentMission}`, data);
        renderStep();

        name_gpio.value = "";
        time_out_gpio.value = "";
        out_set_gpio.value = "";
        out_reset_gpio.value = "";
        in_on_gpio.value = "";
        in_off_gpio.value = "";
        in_pullup_gpio.value = "";
        in_pulldown_gpio.value = "";

        $$(".gpio_checkbox").forEach((element) => {
            element.checked = false;
        });

        valueGpio.out_set = [];
        valueGpio.out_reset = [];
        valueGpio.in_on = [];
        valueGpio.in_off = [];
        valueGpio.in_pullup = [];
        valueGpio.in_pulldown = [];

        $$(".show-gpio-wrapper").forEach((item) => {
            item.innerHTML = "";
        });

        $(".data-gpio-item.show")?.classList.remove("show");
        toggerMessage("success", "save gpio successfully");
    } else {
        toggerMessage(
            "error",
            "Please enter name, timeout and at least one type of gpio"
        );
    }
};

$(".submit-btn-sleep").onclick = (e) => {
    e.preventDefault();
    const name_sleep = $('[name="name_sleep"]');
    const time_sleep = $('[name="time_sleep"]');

    if (name_sleep.value && time_sleep.value) {
        const data = {
            method: "add",
            type: "sleep",
            time_sleep: $('[name="time_sleep"]').value,
            name_type: $('[name="name_sleep"]').value,
        };
        updateStep(`/api/mission/${currentMission}`, data);
        renderStep();

        $('[name="time_sleep"]').value = "";
        $('[name="name_sleep"]').value = "";
        toggerMessage("success", `save sleep successfully`);
    } else {
        toggerMessage("error", "Please enter all inputs");
    }
};

$$(".submit-btn-marker").forEach((element) => {
    element.onclick = (e) => {
        e.preventDefault();
        const formElement = e.target.closest(".marker-item");

        const name_marker = formElement.querySelector('[name="name_marker"]');
        const marker_type = formElement.querySelector('[name="marker_type"]');
        const marker_dir = formElement.querySelector('[name="marker_dir"]');
        const off_set_x1 = formElement.querySelector('[name="off_set_x1"]');
        const off_set_x2 = formElement.querySelector('[name="off_set_x2"]');
        const off_set_y1 = formElement.querySelector('[name="off_set_y1"]');
        const off_set_y2 = formElement.querySelector('[name="off_set_y2"]');
        const off_set_dis = formElement.querySelector('[name="off_set_dis"]');
        const off_set_angle = formElement.querySelector(
            '[name="off_set_angle"]'
        );
        const sx1 = formElement.querySelector('[name="sx1"]');
        const sx2 = formElement.querySelector('[name="sx2"]');
        const sy1 = formElement.querySelector('[name="sy1"]');
        const sy2 = formElement.querySelector('[name="sy2"]');

        if (
            name_marker.value &&
            (off_set_x1 ? off_set_x1.value : true) &&
            (off_set_x2 ? off_set_x2.value : true) &&
            (off_set_y1 ? off_set_y1.value : true) &&
            (off_set_y2 ? off_set_y2.value : true) &&
            (off_set_dis ? off_set_dis.value : true) &&
            (off_set_angle ? off_set_angle.value : true)
        ) {
            const data = {
                type: "marker",
                name_type: name_marker?.value,
                marker_type: marker_type.value,
                marker_dir: marker_dir?.value,
                off_set_x1: off_set_x1?.value,
                off_set_x2: off_set_x2?.value,
                off_set_y1: off_set_y1?.value,
                off_set_y2: off_set_y2?.value,
                off_set_dis: off_set_dis?.value,
                off_set_angle: off_set_angle?.value,
                sx1: sx1?.value,
                sx2: sx2?.value,
                sy1: sy1?.value,
                sy2: sy2?.value,
                method: "add",
            };
            updateStep(`/api/mission/${currentMission}`, data);
            renderStep();
            name_marker ? (name_marker.value = "") : "";
            off_set_x1 ? (off_set_x1.value = "") : "";
            off_set_x2 ? (off_set_x2.value = "") : "";
            off_set_y1 ? (off_set_y1.value = "") : "";
            off_set_y2 ? (off_set_y2.value = "") : "";
            off_set_dis ? (off_set_dis.value = "") : "";
            off_set_angle ? (off_set_angle.value = "") : "";
            toggerMessage("success", `save ${marker_type.value} successfully`);
        } else {
            toggerMessage("error", "Please enter all inputs");
        }
    };
});

function moveStepLeft(dataSteps) {
    console.log(dataSteps);

    const allMoveBtnLeft = document.querySelectorAll(".move-left");
    allMoveBtnLeft.forEach((moveLeftBtn, index) => {
        moveLeftBtn.addEventListener("click", (e) => {
            const indexMove = Number(e.target.getAttribute("id-move"));
            const itemMove = dataSteps.splice(indexMove, 1);
            dataSteps.splice(indexMove - 1, "", ...itemMove);

            const stepSave = dataStepSave(dataSteps);
            const data = { steps_mission_name: stepSave, method: "update" };
            updateStep(`/api/mission/${currentMission}`, data);

            const currentStep = e.target.closest(".step-item");
            const moveStep = currentStep.previousSibling;
            $(".steps-wrapper").insertBefore(currentStep, moveStep);
        });
    });
}

function moveStepRight(dataSteps) {
    const allMoveBtnRight = document.querySelectorAll(".move-right");
    allMoveBtnRight.forEach((moveRightBtn) => {
        moveRightBtn.addEventListener("click", (e) => {
            const indexMove = Number(e.target.getAttribute("id-move"));
            const itemMove = dataSteps.splice(indexMove, 1);
            dataSteps.splice(indexMove + 1, "", ...itemMove);

            const stepSave = dataStepSave(dataSteps);
            const data = { steps_mission_name: stepSave, method: "update" };
            updateStep(`/api/mission/${currentMission}`, data);

            const currentStep = e.target.closest(".step-item");
            const moveStep = currentStep.nextSibling.nextSibling;

            $(".steps-wrapper").insertBefore(currentStep, moveStep);
        });
    });
}

export { renderStep };
