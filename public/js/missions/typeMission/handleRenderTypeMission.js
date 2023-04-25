import { loaded, loading } from "../../functionHandle/displayLoad.js";
import updateBlockStep from "../blockStep/updateBlockStep.js";
import { currentMission } from "../handleStepMission.js";
import handleDeleteTypeMission from "./handleDeleteTypeMission.js";
import handleMultiTypeMission from "./handleMultiTypeMission.js";
import handleUpdateTypeMission from "./handleUpdateTypeMisison.js";

export default function handleRenderTypeMission() {
    loading();
    fetch("/api/type-mission")
        .then((res) => res.json())
        .then((data) => {
            const htmlTypeMission = {
                normal: [],
                ifelse: [],
                trycatch: [],
            };

            const typeMissionEmpty = `
            <div class="flex justify-center items-center bg-[rgba(204,204,204,0.2)] px-5 py-3 mb-2 point-id-8 type-mission-item shadow-sm shadow-[#ccc] text-slate-300 border">
                <i class="fa-solid fa-box-open text-[30px]"></i>
                <span>Type mission empty</span>      
            </div>`;

            data.reverse().map((item) => {
                const itemHtml = `
                    <div type-mission-id=${item.id} mission-type="${item.type}"
                        class="flex justify-between items-center bg-[rgba(204,204,204,0.2)] px-5 py-3 mb-2 point-id-8 type-mission-item shadow-sm shadow-[#ccc] last:mb-[50px] rounded-lg">
                        <input type="hidden" value="${JSON.stringify(
                            item
                        )}" class="" />

                        <div class="flex">
                            <input type="checkbox" data-select-type-mission-id="${
                                item.id
                            }" data-type="${
                    item.type
                }" class="mr-4 w-[12px] h-[12px] accent-[#f5b933] type-mission-item-select">
                            <div class="flex flex-col">
                                <span class="font-bold font-3xl capitalize">${
                                    item.type
                                }</span>
                                <div class="flex">
                                    <span class="mr-2">Name:</span>
                                    <span class="font-bold text-sky-600">${
                                        item.name
                                    }</span>
                                </div>
                            </div>
                        </div>
                        <input value="${item.data}" type="hidden" class="" />
                        <div class="">
                            <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md delete-type-mission-btn shadow-sm shadow-[#ccc]">
                                <i class="fa-solid fa-xmark"></i>
                            </button>

                            <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md edit-type-mission-btn shadow-sm shadow-[#ccc]">
                                <i class="fa-solid fa-pen"></i>
                            </button>

                            <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md add-type-mission-btn shadow-sm shadow-[#ccc]">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>`;

                const currentTypeMission =
                    $(".type-mission").getAttribute("data");

                item.type_mission === currentTypeMission &&
                    htmlTypeMission[item.type].push(itemHtml);

                return htmlTypeMission;
            });

            for (const type in htmlTypeMission) {
                const itemTypeMission = $(`.type-mission-item-wrapper-${type}`);
                itemTypeMission.innerHTML = htmlTypeMission[type].join("")
                    ? htmlTypeMission[type].join("")
                    : typeMissionEmpty;
            }
            handleAddTypeMission();
            handleDeleteTypeMission();
            handleUpdateTypeMission();
            handleMultiTypeMission();
            loaded();
        });
}

function handleAddTypeMission() {
    $$(".add-type-mission-btn").forEach((element) => {
        element.onclick = (e) => {
            const itemTypeMission = e.target.closest(".type-mission-item");
            const idTypeMission =
                itemTypeMission.getAttribute("type-mission-id");
            updateBlockStep(currentMission, {
                mission_shorthand: idTypeMission,
                method: "add",
            });
        };
    });
}
