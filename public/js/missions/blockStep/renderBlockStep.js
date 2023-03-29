import { loaded, loading } from "../../functionHandle/displayLoad.js";
import { currentMission, messageEmpty } from "../handleStepMission.js";
import handleDeleteBlockMission from "./handleDeleteBlockStep.js";
import handleEditMission from "./handleEditMission.js";
import handleMoveBlockStep from "./handleMoveBlockStep.js";
import renderStepItem from "./renderStepItem.js";
import { showAllStep, showStep } from "./showStep.js";

export default function renderBlockStep(translate = false) {
    translate && translatesStepsMission(currentMission);
    loading();
    fetch(`/api/mi/${currentMission}`)
        .then((res) => res.json())
        .then((data) => {
            const steps_mission_name = data.steps_mission_name;

            const shortHandMissionList = data.mission_shorthand?.split("+");

            const arraySteps = steps_mission_name?.split("+");
            const html = [];

            const buttonHandle = `<button class="step-item text-[#333] border border-[#333] bg-white btn show-step-btn"><i class="fa-regular fa-eye"></i></button>
                            <button class="step-item text-[#333] border border-[#333] bg-white btn move-block-step-btn move-up-step-btn" type="up"><i class="fa-solid fa-angle-up"></i></button>
                            <button class="step-item text-[#333] border border-[#333] bg-white btn move-block-step-btn move-down-step-btn" type="down"><i class="fa-solid fa-angle-down"></i></button>
                            <button class="step-item text-[#333] border border-[#333] bg-white btn edit-step-btn"><i class="fa-solid fa-pen"></i></button>
                            <button class="step-item text-[#333] border border-[#333] bg-white btn delete-mission-btn"><i class="fa-solid fa-xmark"></i></button>`;

            arraySteps?.forEach((arrayStep, index) => {
                const typeMissionItem = arrayStep.split("^");
                switch (typeMissionItem[1]) {
                    case "normal":
                        const htmlNormal = [];

                        renderStepItem(typeMissionItem[2], htmlNormal);

                        const htmlNormalText = htmlNormal.join("");
                        html.push(
                            `<div class="flex flex-wrap w-full items-center ml-4 mb-4 mission-item" index="${index}" id-mission=${
                                shortHandMissionList &&
                                shortHandMissionList[index]
                            }>
                                <i class="fa-solid fa-play"></i>
                                <div class="step-item text-[#333] border border-[#333] bg-white font-bold">normal|
                                ${arrayStep.slice(0, arrayStep.indexOf("^"))}
                                </div>
                                ${htmlNormalText}
                                ${buttonHandle}
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
                            ` <div class="step-item bg-black font-bold text-[#fff]">if|
                            ${arrayStep.slice(0, arrayStep.indexOf("^"))}
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
                                shortHandMissionList[index]
                            }>
                                <i class="fa-solid fa-play"></i>
                                ${htmlIfelse.join("")}
                                ${buttonHandle}
                            </div>`
                        );

                        break;
                    case "trycatch":
                        const dataTryCatch = typeMissionItem[2].split("?");
                        const htmlTryCatch = [];
                        const htmlTry = [];
                        const htmlCatch = [];

                        renderStepItem(dataTryCatch[0], htmlTry);
                        renderStepItem(dataTryCatch[1], htmlCatch);

                        htmlTryCatch.push(`
                                <div class="step-item bg-black font-bold text-[#fff]">Try|
                                ${arrayStep.slice(0, arrayStep.indexOf("^"))}
                                </div>${htmlTry.join("")}`);

                        htmlTryCatch.push(`
                                <div class="step-item border bg-black  font-bold text-[#fff] step-hidden">Catch</div>${htmlCatch.join(
                                    ""
                                )}`);

                        html.push(
                            `<div class="flex flex-wrap w-full items-center ml-4 mb-4 mission-item" index="${index}" id-mission=${
                                shortHandMissionList[index]
                            }>
                                <i class="fa-solid fa-play"></i>
                                ${htmlTryCatch.join("")}
                                ${buttonHandle}
                            </div>`
                        );
                        break;
                }
            });

            html.length
                ? ($(".steps-wrapper").innerHTML = html.join(""))
                : messageEmpty($(".steps-wrapper"), "Mission empty!");

            scrollTop(".steps-wrapper");
            handleDeleteBlockMission(shortHandMissionList);
            showStep();
            showAllStep();
            handleEditMission();
            handleMoveBlockStep(shortHandMissionList);
            loaded();
        });
}


function scrollTop(element) {
    $(element).scrollTop = $(".steps-wrapper").scrollHeight;
}
