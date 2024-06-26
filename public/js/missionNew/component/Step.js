import { generateID } from "../../functionHandle/createIdBrowser.js";
import { FunctionStepClass } from "../FunctionStepClass.js";

const details = {
    footprint: "set footprint",
    gpio: "enable GPIO pins",
    gpio_module: "enable GPIO module pins",
    marker: "run marker",
    sound: "play sound",
    position: "Go to location",
    variable: "Variable",
    break: "",
    error: "STEP NOT FOUND",
    sleep: "sleep",
    config: "config",
    telegram: "send message to Telegram",
};
const typeVariable = {
    new: "new",
    equal: "=",
    equal_as: "==",
    equal_not: "!=",
    smaller_as: "<",
    smaller_equal_as: "<=",
    bigger_as: ">",
    bigger_equal_as: ">=",
    "equal_+": "++",
    "equal_-": "--",
    reset: "reset",
    delete: "delete",
};

const overLayPreventMoveOnMobile = `<button class="absolute top-0 left-0 right-0 bottom-2 z-1 hover:hidden peer-hover/step:hidden cursor-default"></button>`;
const buttonDetailStep = `<button data-action-block-step="step" class="data-[sticky='show']:z-10 z-2 hidden group-hover/step:flex gap-0.5 justify-center items-center absolute top-0 left-0 bottom-2 peer px-1 bg-black/10 text-gray-600 backdrop-blur-sm rounded-l-md after:absolute after:top-full after:left-1/2 after:w-[100px] after:h-4 after:-translate-x-1/2">
                                <i class="fa-solid fa-ellipsis-vertical"></i><i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>`;
const iconEnableMove = `<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black hidden group-hover/stepz:block"><i class="fa-solid fa-up-down-left-right"></i></span>`;

const stepHTML = (props) => {
    const { step, id, addressIndex, type, name, color, icon, detail } = props;
    const genId = () => generateID();

    if (type === "variable") return htmlVariable(props, genId);

    return `
    <div id="${genId()}" data-action="drag" class="relative group/step flex items-center rounded-md px-2 pb-2 whitespace-nowrap" data-name="step" data-value="${step}" data-id="${id}" data-address-index="${addressIndex}" data-type="${type}" data-sticky="hidden">
        <span class="text-sky-500 font-bold group-data-[type='error']/step:text-red-500 mr-2">${
            details[type]
        }</span>
        ${
            type === "position"
                ? `<span class="h-4 w-4 mr-1 rounded-full" style="background-color:${detail?.color_position}"></span>`
                : ""
        }
        <div draggable="true"
            class="data-[sticky='show']:z-10 peer/step group/stepz relative cursor-grab active:cursor-grabbing h-[30px] rounded-lg inline-flex items-center px-4  ${color}">
            <span class="mr-4">${icon}</span>
            <span>${type === "break" ? "break;" : detail?.name || name}</span>
            ${iconEnableMove}
        </div>
            ${overLayPreventMoveOnMobile}
        ${buttonDetailStep}
    </div>
    `;
};
const htmlVariable = (props, genId) => {
    const { step, id, addressIndex, type, name, color, icon, detail } = props;
    const { command_action, name_variable, focus_value } = detail;

    const notFoundDetailVariable =
        name_variable === undefined || focus_value == undefined;

    const isDeleteOrReset =
        command_action === "delete" || command_action === "reset";
    switch (true) {
        case command_action === "new":
            return `
            <div id="${genId()}" data-action="drag" class="relative group/step flex items-center rounded-md hover:ring-2 px-2 pb-2 hover:ring-slate-50 hover:bg-slate-50/60 whitespace-nowrap data-[type='error']:hover:bg-red-50" data-name="step" data-value="${step}" data-id="${id}" data-address-index="${addressIndex}" data-type="${type}" data-sticky="hidden">
                <span class="text-sky-500 mr-2 ml-6 font-bold  group-data-[type='error']/step:text-red-500">create variable</span>
                <div draggable="true"
                    class="data-[sticky='show']:z-10 peer/step group/stepz relative cursor-grab active:cursor-grabbing h-[30px] rounded-lg inline-flex items-center px-4  ${color}">
                    <span class="font-bold min-w-[20px] text-center">${name_variable}</span>
                    ${iconEnableMove}
                </div>
                ${overLayPreventMoveOnMobile}
                ${buttonDetailStep}
            </div>
            `;
        case isDeleteOrReset:
            return `
            <div id="${genId()}" data-action="drag" class="relative group/step flex items-center rounded-md hover:ring-2 px-2 pb-2 hover:ring-slate-50 hover:bg-slate-50/60 whitespace-nowrap data-[type='error']:hover:bg-red-50" data-name="step" data-value="${step}" data-id="${id}" data-address-index="${addressIndex}" data-type="${type}" data-sticky="hidden">
                <span class="mr-2 ml-6 font-bold  group-data-[type='error']/step:text-red-500 ${
                    command_action === "delete"
                        ? "text-red-500"
                        : "text-blue-500"
                } ">${command_action} variable</span>
                <div draggable="true"
                    class="data-[sticky='show']:z-10 peer/step group/stepz relative cursor-grab active:cursor-grabbing h-[30px] rounded-lg inline-flex items-center px-4  ${color}">
                    <span class="font-bold min-w-[20px] text-center"></span>
                    ${iconEnableMove}
                </div>
                ${overLayPreventMoveOnMobile}
                ${buttonDetailStep}
            </div>
            `;
        case notFoundDetailVariable:
            return `
            <div id="${genId()}" data-action="drag" class="relative group/step flex items-center rounded-md hover:ring-2 px-2 pb-2 hover:ring-slate-50 hover:bg-slate-50/60 whitespace-nowrap data-[type='error']:hover:bg-red-50" data-name="step" data-value="${step}" data-id="${id}" data-address-index="${addressIndex}" data-type="${type}" data-sticky="hidden">
                <span class="text-sky-500 font-bold  group-data-[type='error']/step:text-red-500">${
                    details[type]
                }</span>
                <div draggable="true"
                    class="data-[sticky='show']:z-10 peer/step group/stepz relative cursor-grab active:cursor-grabbing h-[30px] rounded-lg inline-flex items-center px-4  ${color}">
                    <span class="mr-4">${icon}</span>
                    <span>${name}</span>
                </div>
            </div>`;
        default:
            return `
            <div id="${genId()}" data-action="drag" class="relative group/step flex items-center rounded-md hover:ring-2 px-2 pb-2 hover:ring-slate-50 hover:bg-slate-50/60 whitespace-nowrap data-[type='error']:hover:bg-red-50" data-name="step" data-value="${step}" data-id="${id}" data-address-index="${addressIndex}" data-type="${type}" data-sticky="hidden">
                <div draggable="true"
                    class="data-[sticky='show']:z-10 peer/step group/stepz relative cursor-grab active:cursor-grabbing h-[30px] border rounded-lg inline-flex items-center gap-3 px-1">
                    <span class="font-bold min-w-[20px] text-center rounded px-6 block ${color}">${name_variable}</span>
                    <span class="font-bold text-pink-600">${
                        typeVariable[command_action]
                    }</span>
                    <span class="font-bold min-w-[20px] text-center rounded px-6 block ${color}">${focus_value}</span>
                    ${iconEnableMove}
                </div>
                ${overLayPreventMoveOnMobile}
                ${buttonDetailStep}
            </div>
            `;
    }
};

export const checkExistStep = ({ id, type }) => {
    const listFunctionStep = FunctionStepClass.data || {};
    const found = listFunctionStep[type]?.find((item) => {
        return item.id === Number(id);
    });
    if (type === "break") return true;
    return Object.keys(listFunctionStep).length ? found : true;
};

const Step = (step, addressIndex = "") => {
    const arrayStep = step.split("#");
    const name = arrayStep[1];
    const id = arrayStep[2];
    const stepDetail = checkExistStep({ type: arrayStep[0], id });
    const type = stepDetail ? arrayStep[0] : "error";
    const uiList = {
        footprint: {
            color: "bg-[#38c3ff33] text-[#38c3ff]",
            icon: '<i class="fa-solid fa-arrows-left-right-to-line"></i>',
        },
        gpio: {
            color: "bg-[#30C93033] text-[#30C930]",
            icon: '<i class="fa-solid fa-microchip"></i>',
        },
        gpio_module: {
            color: "bg-[#EE5E8B33] text-[#EE5E8B]",
            icon: '<i class="fa-solid fa-microchip"></i>',
        },
        marker: {
            color: "bg-[#432C7A33] text-[#432C7A]",
            icon: '<i class="fa-solid fa-arrows-up-to-line"></i>',
        },
        sound: {
            color: "bg-[#9333EA33] text-[#9333EA]",
            icon: '<i class="fa-solid fa-volume-high"></i>',
        },
        position: {
            color: "bg-[#57534E33] text-[#57534E]",
            icon: '<i class="fa-solid fa-location-dot"></i>',
        },
        variable: {
            color: "bg-[#EA580C33] text-[#EA580C]",
            icon: '<i class="fa-solid fa-file-code"></i>',
        },
        break: {
            color: "bg-[#C9000C33] text-[#C9000C]",
            icon: '<i class="fa-solid fa-right-from-bracket"></i>',
        },
        error: {
            color: "bg-red-100 text-red-500",
            icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
        },

        config: {
            color: "bg-yellow-300/20 text-yellow-500",
            icon: '<i class="fa-solid fa-grip"></i>',
        },
        telegram: {
            color: "bg-sky-300/20 text-sky-500",
            icon: '<i class="fa-brands fa-telegram"></i>',
        },
        sleep: { color: "bg-[#DC262633] text-[#DC2626]", icon: "" },
    };
    const stepItem = stepHTML({
        step,
        id,
        addressIndex,
        name,
        type,
        icon: uiList[type].icon,
        color: uiList[type].color,
        detail: stepDetail,
    });
    return stepItem;
};

export default Step;
