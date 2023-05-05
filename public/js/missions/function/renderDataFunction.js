import { loading } from "../../functionHandle/displayLoad.js";
import { htmlDataFunction } from "../handleTypeMission.js";

export default function renderDataFunction(data, type) {
    const BUTTON_ACTION_FUNCTION = `
    <div class="min-w-[120px] flex justify-end">
        <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md delete-function-item-btn shadow-sm shadow-[#ccc]">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md edit-function-item-btn shadow-sm shadow-[#ccc]">
            <i class="fa-solid fa-pen"></i>
        </button>
        <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md add-mission-step-item-btn shadow-sm shadow-[#ccc]">
            <i class="fa-solid fa-plus"></i>
        </button>
    </div>
    `;

    htmlDataFunction[type].length = 0;

    const listFunction = JSON.parse(JSON.stringify(data));

    data.map((item, index) => {
        const dataFunctionDetail = dataRenderFunction(listFunction, index);

        htmlDataFunction[type].push(
            `<div data-id=${item.id} function-id=${item.id} function-type="${
                item.mode
            }"
                class="flex justify-between items-center bg-[rgba(204,204,204,0.2)] px-5 py-3 mb-2 point-id-8 type-mission-function-item text-xl shadow-sm shadow-[#ccc] rounded-lg">
                <input type="hidden" value='${JSON.stringify(
                    item
                )}' class="value-function-item"/>
                <div class="flex">
                    <input data-select-function-id=${item.id} data-type="${
                item.mode
            }" type="checkbox" class="mr-4 w-[12px] h-[12px] accent-[#f5b933] function-item-select">
                    <div class="flex flex-col">
                        <div class="flex">
                            <span class=" font-bold font-3xl capitalize">${
                                item.mode
                            }</span>
                            ${
                                item.mode === "position"
                                    ? `<div class="rounded-full border shadow-sm shadow-[#ccc] ml-2" style="background-color:${item.color_position};width:15px;height:15px;"></div>`
                                    : ""
                            }
                        </div>
                        <div class="flex">
                            <span class="mr-2">Name:</span>
                            <span class="text-sky-600 font-bold name-mission-${
                                item.mode
                            }">${item.name}</span>
                        </div>
                        <span>${dataFunctionDetail}</span>
                        <input value="${item.mode}#${item.name}#${
                item.id
            }" type="hidden" class="value-type-mission-function-item"/>
                    </div>
                </div>
                ${BUTTON_ACTION_FUNCTION}                
            </div>`
        );
    });

    function dataRenderFunction(listFunction, index) {
        delete listFunction[index].id;
        delete listFunction[index].mode;
        delete listFunction[index].time_out;
        delete listFunction[index].name;

        delete listFunction[index].color_position;
        delete listFunction[index].created_at;
        delete listFunction[index].updated_at;

        const data = Object.entries(listFunction[index]).map((item) => {
            if (item[1]) {
                switch (item[0]) {
                    case "time_sleep":
                        return `Sleep <span class="font-bold">${item[1]}</span> seconds`;
                    default:
                        return `<span class="font-bold">${
                            item[0]
                        }</span> <span>: ${
                            isNaN(item[1] * 1)
                                ? item[1]
                                : checkNumber(item[1] * 1)
                        }</span>`;
                }
            } else {
                return "";
            }
        });
        return data.filter((item) => item).join(" <strong>|</strong> ");
    }
}

function checkNumber(number) {
    if (Number(number) === number && number % 1 === 0) {
        return number;
    } else if (Number(number) === number && number % 1 !== 0) {
        return number.toFixed(3);
    }
}
