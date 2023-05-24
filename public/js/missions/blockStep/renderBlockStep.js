import { loaded, loading } from "../../functionHandle/displayLoad.js";
import { currentMission, messageEmpty } from "../handleStepMission.js";
import handleDeleteBlockMission from "./handleDeleteBlockStep.js";
import handleEditMission from "./handleEditMission.js";
import handleMoveBlockStep from "./handleMoveBlockStep.js";
import renderStepItem from "./renderStepItem.js";
import showAction from "./showAction.js";
import { showAllStep, showStep } from "./showStep.js";

export default function renderBlockStep() {
    console.log("render block step...");
    loading();
    fetch(`/api/mi/${currentMission}`)
        .then((res) => res.json())
        .then((data) => {
            const steps_mission_name = data.steps_mission_name;
            const shortHandMissionList = data.mission_shorthand?.split("+");

            const arraySteps = steps_mission_name?.split("+");
            const html = [];

            const BUTTON_HANDLE = `<button class="step-item text-[#333] border border-[#333] bg-white group-data-[action-step=hidden]/steps-wrapper:hidden  btn show-step-btn"><i class="fa-regular fa-eye"></i></button>
                                    <button class="step-item text-[#333] border border-[#333] bg-white group-data-[action-step=hidden]/steps-wrapper:hidden  btn move-block-step-btn move-up-step-btn" type="up"><i class="fa-solid fa-angle-up"></i></button>
                                    <button class="step-item text-[#333] border border-[#333] bg-white group-data-[action-step=hidden]/steps-wrapper:hidden  btn move-block-step-btn move-down-step-btn" type="down"><i class="fa-solid fa-angle-down"></i></button>
                                    <button class="step-item text-[#333] border border-[#333] bg-white group-data-[action-step=hidden]/steps-wrapper:hidden  btn edit-step-btn"><i class="fa-solid fa-pen"></i></button>
                                    <button class="step-item text-[#333] border border-[#333] bg-white group-data-[action-step=hidden]/steps-wrapper:hidden  btn delete-mission-btn"><i class="fa-solid fa-xmark"></i></button>`;

            const ICON_FRONT = `<span class="cursor-pointer"><i class="fa-solid fa-ellipsis-vertical"></i><i class="fa-solid fa-ellipsis-vertical ml-1"></i></span>`;

            arraySteps?.forEach((arrayStep, index) => {
                const typeMissionItem = arrayStep.split("^");
                const nameTypeMission = arrayStep.slice(
                    arrayStep.indexOf("^") + 1,
                    arrayStep.indexOf("^", arrayStep.indexOf("^") + 1)
                );
                const idTypeMission = arrayStep.slice(
                    0,
                    arrayStep.indexOf("^")
                );

                switch (typeMissionItem[2]) {
                    case "normal":
                        const htmlNormal = [];

                        renderStepItem(typeMissionItem[3], htmlNormal);

                        const htmlNormalText = htmlNormal.join("");
                        html.push(
                            `<div class=" flex flex-wrap w-full items-center ml-4 mb-4 mission-item" index="${index}" id-mission="${idTypeMission}">
                                ${ICON_FRONT}
                                <div data-id-type-mission=${idTypeMission} data-type="normal" class="type-mission-btn btn step-item text-[#333] border border-[#333] bg-white font-bold">normal|
                                ${nameTypeMission}
                                </div>
                                ${htmlNormalText}
                                ${BUTTON_HANDLE}
                            </div>`
                        );
                        break;
                    case "ifelse":
                        const dataIfelse = typeMissionItem[3].split("?");
                        const htmlIfelse = [];
                        const htmlIf = [];
                        const htmlThen = [];
                        const htmlElse = [];

                        renderStepItem(dataIfelse[0], htmlIf);
                        renderStepItem(dataIfelse[1], htmlThen);
                        renderStepItem(dataIfelse[2], htmlElse);

                        htmlIfelse.push(
                            ` <div data-id-type-mission=${idTypeMission} data-type="ifelse" class="type-mission-btn btn step-item bg-black font-bold text-[#fff]">if|
                            ${nameTypeMission}
                            </div>${htmlIf.join("")}`
                        );
                        htmlIfelse.push(
                            ` <div class="hidden step-item bg-black text-[#fff] font-bold step-hidden">then</div>${htmlThen.join(
                                ""
                            )}`
                        );
                        htmlIfelse.push(
                            ` <div class="hidden step-item bg-black text-[#fff] font-bold step-hidden">else</div>${htmlElse.join(
                                ""
                            )}`
                        );
                        html.push(
                            `<div class="flex flex-wrap w-full items-center ml-4 mb-4 mission-item" index="${index}" id-mission=${
                                idTypeMission
                            }>
                                ${ICON_FRONT}
                                ${htmlIfelse.join("")}
                                ${BUTTON_HANDLE}
                            </div>`
                        );

                        break;
                    case "trycatch":
                        const dataTryCatch = typeMissionItem[3].split("?");
                        const htmlTryCatch = [];
                        const htmlTry = [];
                        const htmlCatch = [];

                        renderStepItem(dataTryCatch[0], htmlTry);
                        renderStepItem(dataTryCatch[1], htmlCatch);

                        htmlTryCatch.push(`
                                <div data-id-type-mission=${idTypeMission} data-type="trycatch" class="type-mission-btn btn step-item bg-black font-bold text-[#fff]">Try|
                                ${nameTypeMission}
                                </div>${htmlTry.join("")}`);

                        htmlTryCatch.push(`
                                <div class="step-item border bg-black  font-bold text-[#fff] step-hidden">Catch</div>${htmlCatch.join(
                                    ""
                                )}`);

                        html.push(
                            `<div class="flex flex-wrap w-full items-center ml-4 mb-4 mission-item" index="${index}" id-mission=${
                                idTypeMission
                            }>
                                ${ICON_FRONT}
                                ${htmlTryCatch.join("")}
                                ${BUTTON_HANDLE}
                            </div>`
                        );
                        break;
                }
            });

            html.length
                ? ($(".steps-wrapper").innerHTML = html.join(""))
                : messageEmpty($(".steps-wrapper"), "Mission empty!");

            handleDeleteBlockMission(shortHandMissionList);
            showStep();
            showAction();
            showAllStep();
            handleEditMission();
            handleMoveBlockStep(shortHandMissionList);
            scrollTop({ query: ".steps-wrapper" });
            loaded();
        });
}

function scrollTop({ query }) {
    const scrollElement = $(query);
    scrollElement.scrollTop =
        scrollElement.scrollHeight - scrollElement.clientHeight;
}
