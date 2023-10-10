const buttonAddStep = `
    <button data-action-block-step="add"
        class="btn w-[25px] h-[20px] relative flex justify-center text-[16px] rounded-md mb-2 ml-2  items-center text-sky-500 bg-sky-100 self-center [&.active]:bg-sky-800 [&.active]:text-white">
            <i class="fa-solid fa-plus"></i>
    </button>
`;
const buttonMore = ({ name, isHidden, enable, isTypeMissionNew }) => {
    if (!enable) return "";
    return ` <div class="absolute top-0 right-0 hover:z-50">
        <div class="group/more">
            <span class="h-[20px] w-[20px] mr-3 text-3xl btn text-stone-500 hover:text-stone-900 ">
                <i class="fa-solid fa-ellipsis"></i>
            </span>
            <div class="absolute top-[20px] right-2 h-[50px] text-2xl hidden group-hover/more:block">
                <ul class="bg-white shadow-md py-4 rounded-md overflow-hidden min-w-[100px]">
                    <li>
                        <span class="text-center block text-2xl">name: ${name}</span>
                    </li>
                    <li>
                        <button data-action-block-step="delete" class="btn flex px-6 py-2 hover:bg-stone-100 text-xl w-full">
                        <span class="mr-2 w-[20px] text-red-500">
                            <i class="fa-solid fa-trash-can"></i>
                        </span>
                        <span>Delete</span>
                        </button>
                    </li>
                    <li>
                        <button data-action-block-step="hidden" class="btn flex group/hidden px-6 py-2 hover:bg-stone-100 text-xl w-full" data-status="${
                            isHidden ? "hidden" : "show"
                        }">
                            <span class="flex group-data-[status='show']/hidden:hidden">
                                <span class="mr-2 w-[20px] text-green-500">
                                    <i class="fa-solid fa-eye"></i>
                                </span>
                                <span>Show</span>
                            </span>
                            <span class="hidden group-data-[status='show']/hidden:flex">
                                <span class="mr-2 w-[20px] text-green-500">
                                    <i class="fa-solid fa-eye-low-vision"></i>
                                </span>
                                <span>Hidden</span>
                            </span>
                        </button>
                    </li>

                    <li>
                        <button data-action-block-step="save" class="btn flex px-6 py-2 hover:bg-stone-100 text-xl w-full">
                        <span class="mr-2 w-[20px] text-blue-500">
                            <i class="fa-solid fa-floppy-disk"></i>
                        </span>
                        <span>${isTypeMissionNew ? "Save as" : "Save"}</span>
                        </button>
                    </li>
                    ${
                        isTypeMissionNew
                            ? `<li>
                                    <button data-action-block-step="update" class="btn flex px-6 py-2 hover:bg-stone-100 text-xl w-full">
                                    <span class="mr-2 w-[20px] text-yellow-500">
                                        <i class="fa-solid fa-rotate"></i>
                                    </span>
                                    <span>Update</span>
                                    </button>
                                </li>`
                            : ""
                    }
                    <li>
                        <button data-action-block-step="duplicate" class="btn flex px-6 py-2 hover:bg-stone-100 text-xl w-full">
                        <span class="mr-2 w-[20px] text-orange-500">
                            <i class="fa-regular fa-clone"></i>
                        </span>
                        <span>Duplicate</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
`;
};
const createHtml = {
    htmlBlock: {
        normal({ value, data, address, addable = true, draggable = true }) {
            return `
                <div
                    data-name="block"
                    data-block-wrapper="normal"
                    data-value='${JSON.stringify(value)}'
                    data-show-data="${
                        !draggable
                            ? "show"
                            : value?.style?.hidden
                            ? "hidden"
                            : "show"
                    }"
                    data-id="${value.id}"
                    class="${
                        draggable ? "" : "pointer-events-none"
                    } group/wrapper data-[show-data='hidden']:inline-block data-[show-data='hidden']:mx-2 data-[show-data='hidden']:w-fit min-w-[100px] min-h-[103px] flex w-full shadow-block bg-white px-4 py-10 rounded-lg my-4 relative pt-[20px]"
                    data-address="${address}"
                    data-address-index="${address}">
                    <span draggable="${draggable}" class="text-red-400 mr-3 w-[20px] h-[20px] flex justify-center items-center cursor-pointer hover:scale-105">
                        <i class="fa-solid fa-bullseye"></i>
                    </span>
                    <span class="hidden group-data-[show-data='hidden']/wrapper:block font-bold text-2xl ${
                        value.name || "text-red-500"
                    }">${value.name || "No name"}</span>
                    <div class="w-full group-data-[show-data='hidden']/wrapper:hidden" data-data-block="normal">
                        <div data-data-block="normal" class="flex-1 w-full inline-flex flex-wrap items-start">
                            ${data}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                    ${buttonMore({
                        name: value.name,
                        enable: addable,
                        isHidden: value?.style?.hidden,
                        isTypeMissionNew: value.id,
                    })}
                </div>
        `;
        },
        ifelse({
            value,
            condition,
            if_,
            else_,
            address,
            addable = true,
            draggable = true,
        }) {
            return `
            <div
                data-name="block"
                data-block-wrapper="ifelse"
                data-show-data="${
                    !draggable
                        ? "show"
                        : value?.style?.hidden
                        ? "hidden"
                        : "show"
                }"
                data-value='${JSON.stringify(value)}'
                data-address="${address}"
                data-id="${value.id}"
                data-address-index="${address}"
                class="${
                    draggable ? "" : "pointer-events-none"
                } group/wrapper data-[show-data='hidden']:inline-block data-[show-data='hidden']:mx-2 data-[show-data='hidden']:w-fit min-w-[100px] min-h-[103px] flex w-full shadow-block bg-white px-4 py-10 rounded-lg my-4 relative pt-[20px]">
                
                <span draggable="${draggable}" class="text-green-400 mr-3 rotate-90 w-[20px] h-[20px] cursor-pointer hover:scale-105 flex justify-center items-center">
                    <i class="fa-solid fa-code-fork"></i>
                </span>
                <span class="hidden group-data-[show-data='hidden']/wrapper:block font-bold text-2xl ${
                    value.name || "text-red-500"
                }">${value.name || "No name"}</span>
                <div class="flex-1 text-[16px] group-data-[show-data='hidden']/wrapper:hidden">
                    <div class="bg-stone-100 p-4 rounded-lg flex mb-3 border-[2px] border-transparent">
                        <span class="font-bold mr-3 text-red-600">If</span>
                        <div class="flex-1 flex flex-wrap items-start" data-data-block="condition">
                            ${condition}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                    <div class="bg-stone-100 p-4 rounded-lg flex mb-3 border-[2px] border-transparent">
                        <span class="font-bold mr-3 text-red-700">Then</span>
                        <div class="flex-1 flex flex-wrap items-start" data-data-block="if_">
                            ${if_}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                    <div class="bg-stone-100 p-4 rounded-lg flex mb-3 border-[2px] border-transparent">
                        <span class="font-bold mr-3 text-red-700">Else</span>
                        <div class="flex-1 flex flex-wrap items-start" data-data-block="else_">
                            ${else_}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                </div>
                ${buttonMore({
                    name: value.name,
                    enable: addable,
                    isHidden: value?.style?.hidden,
                    isTypeMissionNew: value.id,
                })}       
            </div>
            `;
        },
        trycatch({
            value,
            try_,
            catch_,
            address,
            addable = true,
            draggable = true,
        }) {
            return `
            <div
            data-name="block"
            data-block-wrapper="trycatch"
            data-show-data="${
                !draggable ? "show" : value?.style?.hidden ? "hidden" : "show"
            }"
            data-value='${JSON.stringify(value)}'
            data-id="${value.id}"
            data-address="${address}"
            data-address-index="${address}"
            class="${
                draggable ? "" : "pointer-events-none"
            } group/wrapper data-[show-data='hidden']:inline-block data-[show-data='hidden']:mx-2 data-[show-data='hidden']:w-fit min-w-[100px] min-h-[103px] flex w-full shadow-block bg-white px-4 py-10 rounded-lg my-4 relative pt-[20px]">

                <span draggable="${addable}" class="text-yellow-500 mr-3 w-[20px] h-[20px] cursor-pointer hover:scale-105 flex justify-center items-center">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </span>
                <span class="hidden group-data-[show-data='hidden']/wrapper:block font-bold text-2xl ${
                    value.name || "text-red-500"
                }">${value.name || "No name"}</span>
                <div class="flex-1 text-[16px] group-data-[show-data='hidden']/wrapper:hidden">
                    <div class="bg-stone-100 p-4 rounded-lg flex mb-3 border-[2px] border-transparent">
                        <span class="font-bold mr-3 text-red-700">Try</span>
                        <div class="flex-1 flex flex-wrap items-start" data-data-block="try_">
                            ${try_}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                    <div class="bg-stone-100 p-4 rounded-lg flex mb-3 border-[2px] border-transparent">
                        <span class="font-bold mr-3 text-red-700">Catch</span>
                        <div class="flex-1 flex flex-wrap items-start" data-data-block="catch_">
                            ${catch_}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                </div>
                ${buttonMore({
                    name: value.name,
                    enable: addable,
                    isHidden: value?.style?.hidden,
                    isTypeMissionNew: value.id,
                })}
            </div>
            `;
        },
        while({
            value,
            address,
            condition,
            do_,
            addable = true,
            draggable = true,
        }) {
            return `
            <div
                data-name="block"
                data-block-wrapper="while"
                data-id="${value.id}"
                draggable="false"
                data-show-data="${
                    !draggable
                        ? "show"
                        : value?.style?.hidden
                        ? "hidden"
                        : "show"
                }"
                data-value='${JSON.stringify(value)}'
                class="${
                    draggable ? "" : "pointer-events-none"
                } group/wrapper data-[show-data='hidden']:inline-block data-[show-data='hidden']:mx-2 data-[show-data='hidden']:w-fit min-w-[100px] min-h-[103px] flex w-full shadow-block bg-white px-4 py-10 rounded-lg my-4 relative pt-[20px]"
                data-address="${address}"
                data-address-index="${address}">
                
                <span draggable="${addable}" class="text-sky-400 mr-3 rotate-90 w-[20px] h-[20px] cursor-pointer hover:scale-105 flex justify-center items-center">
                    <i class="fa-solid fa-arrows-spin"></i>
                </span>
                <span class="hidden group-data-[show-data='hidden']/wrapper:block font-bold text-2xl ${
                    value.name || "text-red-500"
                }">${value.name || "No name"}</span>
                <div class="flex-1 text-[16px] group-data-[show-data='hidden']/wrapper:hidden">
                    <div class="bg-stone-100 p-4 rounded-lg flex mb-3 border-[2px] border-transparent">
                        <span class="font-bold mr-3 text-red-700">While</span>
                        <div class="flex-1 flex flex-wrap items-start" data-data-block="condition">
                            ${condition}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                    <div class="bg-stone-100 p-4 rounded-lg flex mb-3 border-[2px] border-transparent">
                        <span class="font-bold mr-3 text-red-700">Do</span>
                        <div class="flex-1 flex flex-wrap items-start" data-data-block="do_">
                            ${do_}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                </div>
                ${buttonMore({
                    name: value.name,
                    enable: addable,
                    isHidden: value?.style?.hidden,
                    isTypeMissionNew: value.id,
                })}
            </div>
            `;
        },
        logicAnd({
            value,
            address,
            logicA,
            logicB,
            addable = true,
            draggable = true,
        }) {
            return `
            <div
                data-name="block"
                data-block-wrapper="logic_and"
                data-show-data="${
                    !draggable
                        ? "show"
                        : value?.style?.hidden
                        ? "hidden"
                        : "show"
                }"
                data-id="${value.id}"
                data-value='${JSON.stringify(value)}'
                class="${
                    draggable ? "" : "pointer-events-none"
                } group/wrapper mx-2 data-[show-data='hidden']:inline-block data-[show-data='hidden']:mx-2 data-[show-data='hidden']:w-fit min-w-[100px] min-h-[103px] inline-flex shadow-block bg-white px-4 py-10 rounded-lg my-4 relative pt-[20px]"
                data-address="${address}"
                data-address-index="${address}">
                
                <span draggable="${draggable}" class="text-pink-500 mr-3 w-[20px] h-[20px] cursor-pointer hover:scale-105 flex justify-center items-center">
                    <i class="fa-solid fa-link"></i>    
                </span>
                <span class="hidden group-data-[show-data='hidden']/wrapper:block font-bold text-2xl ${
                    value.name || "text-red-500"
                }">${value.name || "No name"}</span>
                <div class="flex-1 text-[16px] flex group-data-[show-data='hidden']/wrapper:hidden">
                    <div class="bg-stone-100 p-4  rounded-lg flex mb-3 items-start border-[2px] border-transparent">
                        <div class="flex-1 flex flex-wrap items-start" data-data-block="logicA">
                            ${logicA}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                    <span class="px-4 font-bold text-red-700">AND</span>
                    <div class="bg-stone-100 p-4 rounded-lg flex mb-3 items-start border-[2px] border-transparent">
                        <div class="flex-1 flex flex-wrap items-start" data-data-block="logicB">
                            ${logicB}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                </div>
                ${buttonMore({
                    name: value.name,
                    enable: addable,
                    isHidden: value?.style?.hidden,
                    isTypeMissionNew: value.id,
                })}
            </div>
            `;
        },
        logicOr({
            value,
            address,
            logicA,
            logicB,
            addable = true,
            draggable = true,
        }) {
            return `
            <div
                data-name="block"
                data-block-wrapper="logic_or"
                data-id="${value.id}"
                draggable="false"
                data-show-data="${
                    !draggable
                        ? "show"
                        : value?.style?.hidden
                        ? "hidden"
                        : "show"
                }"
                data-value='${JSON.stringify(value)}'
                class="${
                    draggable ? "" : "pointer-events-none"
                } group/wrapper mx-2 data-[show-data='hidden']:inline-block data-[show-data='hidden']:mx-2 data-[show-data='hidden']:w-fit min-w-[100px] min-h-[103px] inline-flex shadow-block bg-white px-4 py-10 rounded-lg my-4 relative pt-[20px]"
                data-address="${address}"
                data-address-index="${address}">
               
                <span draggable="${draggable}" class="text-blue-500 mr-3 w-[20px] h-[20px] cursor-pointer hover:scale-105 flex justify-center items-center">
                    <i class="fa-solid fa-grip-lines-vertical"></i>
                </span>
                <span class="hidden group-data-[show-data='hidden']/wrapper:block font-bold text-2xl ${
                    value.name || "text-red-500"
                }">${value.name || "No name"}</span>
                <div class="flex-1 text-[16px] flex group-data-[show-data='hidden']/wrapper:hidden">
                    <div class="bg-stone-100 p-4  rounded-lg flex mb-3 items-start border-[2px] border-transparent">
                        <div class="flex-1 flex flex-wrap items-start" data-data-block="logicA">
                            ${logicA}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                    <span class="px-4 font-bold text-red-700">OR</span>
                    <div class="bg-stone-100 p-4 rounded-lg flex mb-3 items-start border-[2px] border-transparent">
                        <div class="flex-1 flex flex-wrap items-start" data-data-block="logicB">
                            ${logicB}
                            ${addable ? buttonAddStep : ""}
                        </div>
                    </div>
                </div>
                ${buttonMore({
                    name: value.name,
                    enable: addable,
                    isHidden: value?.style?.hidden,
                    isTypeMissionNew: value.id,
                })}
            </div>
            `;
        },
    },
    normal({ normal, address, value, handleAble }) {
        const option = {
            value,
            data: normal.join(""),
            buttonAdd: buttonAddStep,
            address,
            draggable: handleAble,
            addable: handleAble,
        };

        return this.htmlBlock.normal(option);
    },
    ifelse({ condition, if_, else_, address, value, handleAble }) {
        const option = {
            value,
            condition: condition.join(""),
            if_: if_.join(""),
            else_: else_.join(""),
            address,
            draggable: handleAble,
            addable: handleAble,
        };
        return this.htmlBlock.ifelse(option);
    },
    trycatch({ try_, catch_, address, value, handleAble }) {
        const option = {
            value,
            try_: try_.join(""),
            catch_: catch_.join(""),
            address,
            draggable: handleAble,
            addable: handleAble,
        };
        return this.htmlBlock.trycatch(option);
    },
    while({ condition, do_, address, value, handleAble }) {
        const option = {
            value,
            condition: condition.join(""),
            do_: do_.join(""),
            address,
            draggable: handleAble,
            addable: handleAble,
        };
        return this.htmlBlock.while(option);
    },
    logicAnd({ logicA, logicB, address, value, handleAble }) {
        const option = {
            value,
            logicA: logicA.join(""),
            logicB: logicB.join(""),
            address,
            draggable: handleAble,
            addable: handleAble,
        };
        return this.htmlBlock.logicAnd(option);
    },
    logicOr({ logicA, logicB, address, value, handleAble }) {
        const option = {
            value,
            logicA: logicA.join(""),
            logicB: logicB.join(""),
            address,
            draggable: handleAble,
            addable: handleAble,
        };
        return this.htmlBlock.logicOr(option);
    },
};

export default createHtml;
