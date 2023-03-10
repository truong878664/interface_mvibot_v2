import { loaded, loading } from "../../functionHandle/displayLoad.js";
import { currentMission, messageEmpty, renderBlockStep } from "../handleStepMission.js";
import { updateBlockStep } from "../handleTypeMission.js";
import handleDeleteTypeMission from "./handleDeleteTypeMission.js";
import handleUpdateTypeMission from "./handleUpdateTypeMisison.js";

export default function handleRenderTypeMission() {
    loading(".type-mission-item-wrapper-normal");
    fetch("/api/type-mission")
        .then((res) => res.json())
        .then((data) => {
            const htmlTypeMission = {
                normal: [],
                ifelse: [],
                trycatch: [],
            };
            data.map((item) => {
                const itemHtml = `
                    <div type-mission-id=${item.id} mission-type="${item.type}"
                        class="flex justify-between items-center bg-[rgba(204,204,204,0.2)] px-5 py-3 mb-2 point-id-8 type-mission-item">
                        <input type="hidden" value="${JSON.stringify(
                            item
                        )}" class="" />
                        <div class="flex flex-col">
                            <span class="font-bold font-3xl capitalize">
                                ${item.type}
                            </span>
                            <div class="flex">
                                <span class="mr-2">Name:</span>
                                <span class="">${item.name}</span>
                            </div>
                        </div>
                        <input value="${item.data}"
                            type="hidden" class="" />
                        <div class="">
                            <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md delete-type-mission-btn">
                                <i class="fa-solid fa-xmark"></i>
                            </button>

                            <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md edit-type-mission-btn">
                                <i class="fa-solid fa-pen"></i>
                            </button>

                            <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md add-type-mission-btn">
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
                htmlTypeMission[type].length
                    ? (itemTypeMission.innerHTML =
                          htmlTypeMission[type].join(""))
                    : messageEmpty(itemTypeMission, "Type mission empty!");
            }
            handleAddTypeMission();
            handleDeleteTypeMission();
            handleUpdateTypeMission()
            loaded(".type-mission-item-wrapper-normal");
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
            renderBlockStep();
        };
    });
}
