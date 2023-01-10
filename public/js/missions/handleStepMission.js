import arrayMove from "../functionHandle/arrayMove.js";
import { toggerMessage } from "../main.js";
import { resetDataGpio } from "./createStepMission.js";
import { loaded, loading } from "./displayLoad.js";
import { checkboxInputGpio, nameGpios, renderGpio, valueGpio } from "./gpio.js";
import inputFunction from "./inputFunction.js";
import updateStepValue from "./updateStepValue.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const currentMission = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1,
    location.pathname.length
);
{
    // function renderStep() {
    //     loading();
    //     fetch(`/api/mission/${currentMission}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const dataSteps = data.steps_mission_name?.split("|");
    //             dataSteps?.shift();
    //             return dataSteps;
    //         })
    //         .then((dataSteps) => {
    //             console.log(dataSteps);
    //             render(dataSteps);
    //             loaded();
    //         });
    // }
    // function render(dataSteps) {
    //     const stepsWrapper = document.querySelector(".steps-wrapper");
    //     const htmlStep = [];
    //     dataSteps?.map((step, index) => {
    //         const stepMode = step.slice(0, step.indexOf("#"));
    //         const stepName = step.slice(
    //             step.indexOf("#") + 1,
    //             step.indexOf("#", step.indexOf("#") + 1)
    //         );
    //         const stepId = step.slice(step.lastIndexOf("#") + 1, step.length);
    //         return htmlStep.push(
    //             `<div class="step-item step-${stepMode}" index=${index}>
    //                 <input hidden type="text" class="step-id" value=${stepId}>
    //                 <input hidden type="text" class="step-mode" value=${stepMode}>
    //                 <button id-move="${index}" class="move-btn move-left"><i class="fa-solid fa-angle-left"></i></button>
    //                 <span class="stem-name">${stepMode}|${stepName}</span>
    //                 <button id-move="${index}" class="move-btn move-right"><i class="fa-solid fa-angle-right"></i></button>
    //                 <button class="show-menu" index="${index}"><i class="fa-solid fa-ellipsis"></i></button>
    //                 <ul class="menu-right-click menu-click-${index}">
    //                     <div class="menu-overlay"></div>
    //                     ${
    //                         stepMode != "position"
    //                             ? '<li class="menu-item edit-step"><i class="fa-regular fa-pen-to-square"></i></i>edit</li>'
    //                             : ""
    //                     }
    //                     <li class="menu-item delete-step" id-delete="${index}"><i class="fa-regular fa-trash-can"></i></i>delete</li>
    //                 </ul>
    //             </div>`
    //         );
    //     });
    //     stepsWrapper.innerHTML = htmlStep.join("");
    //     deleteStep(dataSteps);
    //     moveStepLeft(dataSteps);
    //     moveStepRight(dataSteps);
    //     showMenu();
    //     handleEditStep();
    // }
    // function showMenu() {
    //     $$(".show-menu").forEach((showMenuItem) => {
    //         showMenuItem.addEventListener("click", (e) => {
    //             const index = e.target.getAttribute("index");
    //             $(`.menu-click-${index}`).classList.add("active");
    //         });
    //     });
    //     $$(".show-menu").forEach((showMenuItem) => {
    //         showMenuItem.addEventListener("click", (e) => {
    //             const index = e.target.getAttribute("index");
    //             $(`.menu-click-${index}`).classList.add("active");
    //         });
    //     });
    //     $$(".menu-overlay").forEach((item) => {
    //         item.addEventListener("click", () => {
    //             $(".menu-right-click.active")?.classList.remove("active");
    //         });
    //     });
    // }
    // function deleteStep(dataSteps) {
    //     const allDeleteBtn = $$(".delete-step");
    //     allDeleteBtn.forEach((deleteBtn) => {
    //         deleteBtn.addEventListener("click", (e) => {
    //             const index = Number(
    //                 e.target.closest(".step-item").getAttribute("index")
    //             );
    //             dataSteps.splice(index, 1);
    //             render(dataSteps);
    //             const stepSave = dataStepSave(dataSteps);
    //             const data = { steps_mission_name: stepSave, method: "update" };
    //             updateStep(`/api/mission/${currentMission}`, data);
    //         });
    //     });
    // }
    // function updateStep(url = "", stepSave) {
    //     loading();
    //     fetch(url, {
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         method: "PUT",
    //         body: JSON.stringify(stepSave),
    //     })
    //         .then(function (res) {
    //             loaded();
    //             console.log(res);
    //             res.status == 200
    //                 ? toggerMessage("success", "Update step success")
    //                 : toggerMessage("error", "ERR!, please try again");
    //         })
    //         .catch(function (res) {
    //             console.log(res);
    //         });
    // }
    // function dataStepSave(dataSteps) {
    //     const data = dataSteps.length > 0 ? `|${dataSteps.join("|")}` : "";
    //     return data;
    // }
    // function moveStepLeft(dataSteps) {
    //     const allMoveBtnLeft = document.querySelectorAll(".move-left");
    //     allMoveBtnLeft.forEach((moveLeftBtn, index) => {
    //         moveLeftBtn.addEventListener("click", (e) => {
    //             let moveIndex = Number(
    //                 e.target.closest(".step-item").getAttribute("index")
    //             );
    //             if (moveIndex != 0) {
    //                 arrayMove(dataSteps, moveIndex, moveIndex - 1);
    //                 const stepSave = dataStepSave(dataSteps);
    //                 const data = { steps_mission_name: stepSave, method: "update" };
    //                 updateStep(`/api/mission/${currentMission}`, data);
    //                 const currentStep = e.target.closest(".step-item");
    //                 const moveStep = currentStep.previousSibling;
    //                 $(".steps-wrapper").insertBefore(currentStep, moveStep);
    //                 moveIndex--;
    //                 e.target.closest(".step-item").setAttribute("index", moveIndex);
    //                 const itemNext = e.target.closest(".step-item").nextSibling;
    //                 itemNext.setAttribute(
    //                     "index",
    //                     Number(itemNext.getAttribute("index")) + 1
    //                 );
    //             }
    //         });
    //     });
    // }
    // function moveStepRight(dataSteps) {
    //     const allMoveBtnRight = document.querySelectorAll(".move-right");
    //     allMoveBtnRight.forEach((moveRightBtn) => {
    //         moveRightBtn.addEventListener("click", (e) => {
    //             let moveIndex = Number(
    //                 e.target.closest(".step-item").getAttribute("index")
    //             );
    //             if (moveIndex < dataSteps.length - 1) {
    //                 arrayMove(dataSteps, moveIndex, moveIndex + 1);
    //                 const stepSave = dataStepSave(dataSteps);
    //                 const data = { steps_mission_name: stepSave, method: "update" };
    //                 updateStep(`/api/mission/${currentMission}`, data);
    //                 const currentStep = e.target.closest(".step-item");
    //                 const moveStep = currentStep.nextSibling.nextSibling;
    //                 $(".steps-wrapper").insertBefore(currentStep, moveStep);
    //                 moveIndex++;
    //                 e.target.closest(".step-item").setAttribute("index", moveIndex);
    //                 const itemPrevious =
    //                     e.target.closest(".step-item").previousSibling;
    //                 itemPrevious.setAttribute(
    //                     "index",
    //                     Number(itemPrevious.getAttribute("index")) - 1
    //                 );
    //             }
    //         });
    //     });
    // }
    // //edit step
    // function handleEditStep() {
    //     $$(".edit-step").forEach((element) => {
    //         element.onclick = (e) => {
    //             const stepItem = e.target.closest(".step-item");
    //             const stepMode = stepItem.querySelector(".step-mode").value;
    //             const stepId = stepItem.querySelector(".step-id").value;
    //             $(`.${stepMode}-function-btn`).click();
    //             $([".menu-right-click.active"]).classList.remove("active");
    //             getValueStep(stepMode, stepId);
    //             e.target.closest(".step-item").classList.add("out-line");
    //         };
    //     });
    // }
    // function getValueStep(stepMode, id) {
    //     fetch(`/api/step/0?type=${stepMode}&id=${id}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             showDataUpdate(stepMode, data);
    //         });
    // }
    // let currentIdUpdate;
    // let oldName;
    // function showDataUpdate(stepMode, data) {
    //     switch (stepMode) {
    //         case "footprint":
    //             const {
    //                 x1_footprint,
    //                 x2_footprint,
    //                 y1_footprint,
    //                 y2_footprint,
    //                 name_footprint,
    //             } = inputFunction("footprint");
    //             x1_footprint.value = Math.abs(data[0].x1);
    //             x2_footprint.value = Math.abs(data[0].x2);
    //             y1_footprint.value = Math.abs(data[0].y1);
    //             y2_footprint.value = Math.abs(data[0].y2);
    //             name_footprint.value = data[0].name_footprint;
    //             handleUpdateStep("footprint");
    //             currentIdUpdate = data[0].id;
    //             oldName = data[0].name_footprint;
    //             break;
    //         case "sleep":
    //             const { name_sleep, time_sleep } = inputFunction("sleep");
    //             name_sleep.value = data[0].name_sleep;
    //             time_sleep.value = data[0].time_sleep;
    //             handleUpdateStep("sleep");
    //             currentIdUpdate = data[0].id;
    //             oldName = data[0].name_sleep;
    //             break;
    //         case "marker":
    //             $(`.${data[0].marker_type}-btn`).click();
    //             const {
    //                 name_marker,
    //                 marker_type,
    //                 marker_dir,
    //                 off_set_x1,
    //                 off_set_x2,
    //                 off_set_y1,
    //                 off_set_y2,
    //                 off_set_dis,
    //                 off_set_angle,
    //                 sx1,
    //                 sx2,
    //                 sy1,
    //                 sy2,
    //             } = inputFunction("marker");
    //             name_marker ? (name_marker.value = data[0].name_marker) : "";
    //             marker_type ? (marker_type.value = data[0].marker_type) : "";
    //             marker_dir ? (marker_dir.value = data[0].marker_dir) : "";
    //             off_set_x1 ? (off_set_x1.value = data[0].off_set_x1) : "";
    //             off_set_x2 ? (off_set_x2.value = data[0].off_set_x2) : "";
    //             off_set_y1 ? (off_set_y1.value = data[0].off_set_y1) : "";
    //             off_set_y2 ? (off_set_y2.value = data[0].off_set_y2) : "";
    //             off_set_dis ? (off_set_dis.value = data[0].off_set_dis) : "";
    //             off_set_angle ? (off_set_angle.value = data[0].off_set_angle) : "";
    //             sx1 ? (sx1.value = data[0].sx1) : "";
    //             sx2 ? (sx2.value = data[0].sx2) : "";
    //             sy1 ? (sy1.value = data[0].sy1) : "";
    //             sy2 ? (sy2.value = data[0].sy2) : "";
    //             handleUpdateStep("marker");
    //             currentIdUpdate = data[0].id;
    //             oldName = data[0].name_marker;
    //             break;
    //         case "gpio":
    //             const { name_gpio, time_out_gpio } = inputFunction("gpio");
    //             name_gpio.value = data[0].name_gpio;
    //             time_out_gpio.value = data[0].time_out;
    //             nameGpios.forEach((item) => {
    //                 valueGpio[item] = [];
    //                 const dataGpioDb = data[0][item]?.split(",");
    //                 valueGpio[item].push(...(dataGpioDb || []));
    //                 renderGpio(item);
    //             });
    //             checkboxInputGpio();
    //             handleUpdateStep("gpio");
    //             currentIdUpdate = data[0].id;
    //             oldName = data[0].name_gpio;
    //             break;
    //     }
    // }
    // function handleUpdateStep(type) {
    //     let updateBtnWrapper;
    //     if (type == "marker") {
    //         updateBtnWrapper = $(".marker-item:not(.hidden)").querySelector(
    //             `.${type}-update-btn-wrapper`
    //         );
    //         updateBtnWrapper.classList.remove("hidden");
    //     } else {
    //         updateBtnWrapper = $(`.${type}-update-btn-wrapper`);
    //         updateBtnWrapper.classList.remove("hidden");
    //     }
    //     updateBtnWrapper.querySelector(`.${type}-update-cancel`).onclick = (e) => {
    //         e.preventDefault();
    //         handleResetData();
    //         $(".step-item.out-line").classList.remove("out-line");
    //     };
    //     updateBtnWrapper.querySelector(`.${type}-update-btn`).onclick = (e) => {
    //         e.preventDefault();
    //         dataUpdateStep(type) && handleResetData();
    //         $(".step-item.out-line").classList.remove("out-line");
    //     };
    //     function handleResetData() {
    //         updateBtnWrapper.classList.add("hidden");
    //         $$(".input-reset").forEach((element) => {
    //             element.value = "";
    //         });
    //         $$(".offset-s-001").forEach((element) => {
    //             element.value = 0.01;
    //         });
    //         if (type == "gpio") {
    //             resetDataGpio();
    //         }
    //     }
    // }
    // function dataUpdateStep(type) {
    //     switch (type) {
    //         case "marker":
    //             const {
    //                 name_marker,
    //                 marker_type,
    //                 marker_dir,
    //                 off_set_x1,
    //                 off_set_x2,
    //                 off_set_y1,
    //                 off_set_y2,
    //                 off_set_dis,
    //                 off_set_angle,
    //                 sx1,
    //                 sx2,
    //                 sy1,
    //                 sy2,
    //             } = inputFunction("marker");
    //             if (
    //                 name_marker.value &&
    //                 (off_set_x1 ? off_set_x1.value : true) &&
    //                 (off_set_x2 ? off_set_x2.value : true) &&
    //                 (off_set_y1 ? off_set_y1.value : true) &&
    //                 (off_set_y2 ? off_set_y2.value : true) &&
    //                 (off_set_dis ? off_set_dis.value : true) &&
    //                 (off_set_angle ? off_set_angle.value : true)
    //             ) {
    //                 const data = {
    //                     type: "marker",
    //                     name_marker: name_marker.value,
    //                     marker_type: marker_type.value,
    //                     marker_dir: marker_dir?.value,
    //                     off_set_x1: Number(off_set_x1?.value),
    //                     off_set_x2: Number(off_set_x2?.value),
    //                     off_set_y1: Number(off_set_y1?.value),
    //                     off_set_y2: Number(off_set_y2?.value),
    //                     off_set_dis: Number(off_set_dis?.value),
    //                     off_set_angle: Number(off_set_angle?.value),
    //                     sx1: Number(sx1?.value),
    //                     sx2: Number(sx2?.value),
    //                     sy1: Number(sy1?.value),
    //                     sy2: Number(sy2?.value),
    //                 };
    //                 updateStep(`/api/step/${currentIdUpdate}`, data);
    //                 changeNameStep(
    //                     currentMission,
    //                     `|${type}#${oldName}#${currentIdUpdate}`,
    //                     `|${type}#${name_marker.value}#${currentIdUpdate}`
    //                 );
    //                 return true;
    //             } else {
    //                 toggerMessage("error", "Please enter all inputs");
    //                 return false;
    //             }
    //         case "footprint":
    //             const {
    //                 x1_footprint,
    //                 x2_footprint,
    //                 y1_footprint,
    //                 y2_footprint,
    //                 name_footprint,
    //             } = inputFunction("footprint");
    //             if (
    //                 x1_footprint.value &&
    //                 x2_footprint.value &&
    //                 y1_footprint.value &&
    //                 y2_footprint.value &&
    //                 name_footprint.value
    //             ) {
    //                 const data = {
    //                     type: "footprint",
    //                     x1: x1_footprint.value,
    //                     x2: x2_footprint.value,
    //                     y1: y1_footprint.value,
    //                     y2: y2_footprint.value,
    //                     name_footprint: name_footprint.value,
    //                 };
    //                 updateStep(`/api/step/${currentIdUpdate}`, data);
    //                 changeNameStep(
    //                     currentMission,
    //                     `|${type}#${oldName}#${currentIdUpdate}`,
    //                     `|${type}#${name_footprint.value}#${currentIdUpdate}`
    //                 );
    //                 return true;
    //             } else {
    //                 toggerMessage("error", "Please enter all inputs");
    //                 return false;
    //             }
    //         case "gpio":
    //             const {
    //                 name_gpio,
    //                 time_out_gpio,
    //                 out_set_gpio,
    //                 out_reset_gpio,
    //                 in_on_gpio,
    //                 in_off_gpio,
    //                 in_pullup_gpio,
    //                 in_pulldown_gpio,
    //             } = inputFunction("gpio");
    //             if (
    //                 name_gpio.value &&
    //                 time_out_gpio.value &&
    //                 (out_set_gpio.value ||
    //                     out_reset_gpio.value ||
    //                     in_on_gpio.value ||
    //                     in_off_gpio.value ||
    //                     in_pullup_gpio.value ||
    //                     in_pulldown_gpio.value)
    //             ) {
    //                 const data = {
    //                     type: "gpio",
    //                     name_gpio: name_gpio.value,
    //                     time_out: time_out_gpio.value,
    //                     out_set: out_set_gpio.value,
    //                     out_reset: out_reset_gpio.value,
    //                     in_on: in_on_gpio.value,
    //                     in_off: in_off_gpio.value,
    //                     in_pullup: in_pullup_gpio.value,
    //                     in_pulldown: in_pulldown_gpio.value,
    //                 };
    //                 updateStep(`/api/step/${currentIdUpdate}`, data);
    //                 $(".data-gpio-item.show")?.classList.remove("show");
    //                 changeNameStep(
    //                     currentMission,
    //                     `|${type}#${oldName}#${currentIdUpdate}`,
    //                     `|${type}#${name_gpio.value}#${currentIdUpdate}`
    //                 );
    //                 return true;
    //             } else {
    //                 toggerMessage(
    //                     "error",
    //                     "Please enter name, timeout and at least one type of gpio"
    //                 );
    //                 return false;
    //             }
    //         case "sleep":
    //             const { name_sleep, time_sleep } = inputFunction("sleep");
    //             if (name_sleep.value && time_sleep.value) {
    //                 const data = {
    //                     type: "sleep",
    //                     name_sleep: name_sleep.value,
    //                     time_sleep: Number(time_sleep.value),
    //                 };
    //                 updateStep(`/api/step/${currentIdUpdate}`, data);
    //                 changeNameStep(
    //                     currentMission,
    //                     `|${type}#${oldName}#${currentIdUpdate}`,
    //                     `|${type}#${name_sleep.value}#${currentIdUpdate}`
    //                 );
    //                 return true;
    //             } else {
    //                 toggerMessage("error", "Please enter all inputs");
    //                 return false;
    //             }
    //     }
    //     updateStepValue(currentMission);
    // }
    // function changeNameStep(id, stepOld, stepNew) {
    //     fetch(`/api/mission/${id}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const newStepNameData = data.steps_mission_name.replaceAll(
    //                 stepOld,
    //                 stepNew
    //             );
    //             const dataUpdate = {
    //                 steps_mission_name: newStepNameData,
    //                 method: "update",
    //             };
    //             updateStep(`/api/mission/${id}`, dataUpdate);
    //             renderStep();
    //         });
    // }
}

function renderStep() {
    loading();
    fetch(`/api/mission/${currentMission}`)
        .then((res) => res.json())
        .then((data) => {
            loaded();
            const steps_mission_name = data.steps_mission_name;

            const shortHandMissionList = data.mission_shorthand?.split("+");

            const arraySteps = steps_mission_name?.split("+");
            const html = [];
            arraySteps?.forEach((arrayStep, index) => {
                console.log(arrayStep.slice(0, arrayStep.indexOf("^")));
                const typeMissionItem = arrayStep.split("^");
                switch (typeMissionItem[1]) {
                    case "normal":
                        const htmlNormal = [];

                        renderStepItem(typeMissionItem[2], htmlNormal);

                        const htmlNormalText = htmlNormal.join("");
                        // html.push(htmlNormalText);
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
                                <button class="step-item text-[#333] border border-[#333] bg-white btn show-step-btn"><i class="fa-regular fa-eye-slash"></i></button>
                                <button class="step-item text-[#333] border border-[#333] bg-white btn"><i class="fa-solid fa-angle-up"></i></button>
                                <button class="step-item text-[#333] border border-[#333] bg-white btn"><i class="fa-solid fa-angle-down"></i></button>
                                <button class="step-item text-[#333] border border-[#333] bg-white btn"><i class="fa-solid fa-pen"></i></button>
                                <button class="step-item text-[#333] border border-[#333] bg-white btn delete-mission-btn"><i class="fa-solid fa-xmark"></i></button>
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
                                <button class="step-item text-[#333] border border-[#333] bg-white btn show-step-btn"><i class="fa-regular fa-eye-slash"></i></button>
                                <button class="step-item text-[#333] border border-[#333] bg-white btn"><i class="fa-solid fa-angle-up"></i></button>
                                <button class="step-item text-[#333] border border-[#333] bg-white btn"><i class="fa-solid fa-angle-down"></i></button>
                                <button class="step-item text-[#333] border border-[#333] bg-white btn"><i class="fa-solid fa-pen"></i></button>
                                <button class="step-item text-[#333] border border-[#333] bg-white btn delete-mission-btn"><i class="fa-solid fa-xmark"></i></button>
                            </div>`
                        );

                        break;
                }
            });
            $(".steps-wrapper").innerHTML = html.join("");
            scrollTop(".steps-wrapper");
            handleDeleteMission(shortHandMissionList);
            showStep();
        });
}

function updateStep() {}

function renderStepItem(data, html) {
    const dataNormal = data.split("|");
    dataNormal.shift();
    dataNormal.map((step, index) => {
        const stepMode = step.slice(0, step.indexOf("#"));
        const stepName = step.slice(
            step.indexOf("#") + 1,
            step.indexOf("#", step.indexOf("#") + 1)
        );
        const stepId = step.slice(step.lastIndexOf("#") + 1, step.length);

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
            const missionItem = e.target.closest(".mission-item");
            const idDeleteMission = missionItem.getAttribute("id-mission");

            missionShorthand.splice(
                missionShorthand.indexOf(idDeleteMission),
                1
            );

            const dataMissionShorthand = {
                mission_shorthand: missionShorthand.join("+"),
                method: "update",
            };
            updateMission(dataMissionShorthand);
            missionItem.remove();
        };
    });
}

function updateMission(data) {
    fetch(`/api/mi/${currentMission}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
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
        };
    });
}

export { renderStep, updateStep };
