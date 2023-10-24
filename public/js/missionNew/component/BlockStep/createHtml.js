import clx from "../../../functionHandle/clx.js";

const createHtml = {
    htmlBlock: {
        normal({ value, data, address, addable = true, draggable = true }) {
            const buttonAdd = this.ButtonAdd(addable);
            const children = `<div data-data-block="normal" class="flex-1 w-full inline-flex flex-wrap items-start gap-3">${data}${buttonAdd}</div>`;
            const type = "normal";
            const props = { value, address, addable, draggable, type };
            return this.BlockWrapper({ props, children });
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
            const { wrap, span, data } = this.classNameDataItem;
            const buttonAdd = this.ButtonAdd(addable);
            const children = `
                    <div class="${wrap}">
                        <span class="${span}">If</span>
                        <div class="${data}" data-data-block="condition">${condition}${buttonAdd}</div>
                    </div>
                    <div class="${wrap}">
                        <span class="${span}">Then</span>
                        <div class="${data}" data-data-block="if_">${if_}${buttonAdd}</div>
                    </div>
                    <div class="${wrap}">
                        <span class="${span}">Else</span>
                        <div class="${data}" data-data-block="else_">${else_}${buttonAdd}</div>
                    </div>
                `;
            const type = "ifelse";
            const props = { value, address, addable, draggable, type };
            return this.BlockWrapper({ props, children });
        },
        trycatch({
            value,
            try_,
            catch_,
            address,
            addable = true,
            draggable = true,
        }) {
            const { wrap, span, data } = this.classNameDataItem;
            const buttonAdd = this.ButtonAdd(addable);
            const children = `
                    <div class="${wrap}">
                        <span class="${span}">Try</span>
                        <div class="${data}" data-data-block="try_">${try_}${buttonAdd}</div>
                    </div>
                    <div class="${wrap}">
                        <span class="${span}">Catch</span>
                        <div class="${data}" data-data-block="catch_">${catch_}${buttonAdd}</div>
                    </div>
            `;
            const type = "trycatch";
            const props = { value, address, addable, draggable, type };
            return this.BlockWrapper({ props, children });
        },
        while({
            value,
            address,
            condition,
            do_,
            addable = true,
            draggable = true,
        }) {
            const { wrap, span, data } = this.classNameDataItem;
            const buttonAdd = this.ButtonAdd(addable);
            const children = `
                <div class="${wrap}">
                    <span class="${span}">While</span>
                    <div class="${data}" data-data-block="condition">${condition}${buttonAdd}</div>
                </div>
                <div class="${wrap}">
                    <span class="${span}">Do</span>
                    <div class="${data}" data-data-block="do_"> ${do_}${buttonAdd}</div>
                </div>
            `;
            const type = "while";
            const props = { value, address, addable, draggable, type };
            return this.BlockWrapper({ props, children });
        },
        logicAnd({
            value,
            address,
            logicA,
            logicB,
            addable = true,
            draggable = true,
        }) {
            const { wrap, span, data } = this.classNameDataItem;
            const buttonAdd = this.ButtonAdd(addable);
            const children = `
            <div class="${wrap}"><div class="${data}" data-data-block="logicA">${logicA}${buttonAdd}</div></div>
            <span class="${span} px-4">AND</span>
            <div class="${wrap}"><div class="${data}" data-data-block="logicB">${logicB}${buttonAdd}</div></div>
            `;
            const type = "logic_and";
            const props = { value, address, addable, draggable, type };
            return this.BlockWrapper({ props, children });
        },
        logicOr({
            value,
            address,
            logicA,
            logicB,
            addable = true,
            draggable = true,
        }) {
            const { wrap, span, data } = this.classNameDataItem;
            const buttonAdd = this.ButtonAdd(addable);
            const children = `
            <div class="${wrap}"><div class="${data}" data-data-block="logicA">${logicA}${buttonAdd}</div></div>
            <span class="${span} px-4">OR</span>
            <div class="${wrap}"><div class="${data}" data-data-block="logicB">${logicB}${buttonAdd}</div></div>
            `;
            const type = "logic_or";
            const props = { value, address, addable, draggable, type };
            return this.BlockWrapper({ props, children });
        },
        BlockWrapper({ props, children }) {
            const { value, address, addable, draggable, type } = props;
            const { name, style, id } = value;
            const { icon, color } = this.style[type];
            const isLogicAndOrLogicOr =
                type === "logic_and" || type === "logic_or";
            const classNameWrapper = clx(
                {
                    "pointer-events-none": !draggable,
                    "flex w-full": !isLogicAndOrLogicOr,
                    "inline-flex": isLogicAndOrLogicOr,
                },
                "group/wrapper [&:hover>span>span]:grid data-[show-data='hidden']:inline-block data-[show-data='hidden']:w-fit min-w-[100px] min-h-[103px] flex shadow-block bg-white px-2 py-3 rounded-lg relative",
            );
            const isShowData = !draggable
                ? "show"
                : style?.hidden
                ? "hidden"
                : "show";
            const checkIsBlockHidden = style?.hidden ? "hidden" : "show";
            const clxName = clx({ "text-red-500": !name }, "font-bold ");
            const classNameWrapperData = clx(
                {
                    flex: isLogicAndOrLogicOr,
                },
                "w-full rounded-lg group-data-[show-data='hidden']/wrapper:hidden ",
            );
            const NameComponent = () =>
                `<span class="${clxName}">${name || "No name"}</span>`;
            return `
                <div data-name="block" data-block-wrapper="${type}"
                    data-value='${JSON.stringify(value)}'
                    data-id="${value.id}"
                    data-address="${address}"
                    data-address-index="${address}"
                    class="${classNameWrapper}"
                    data-show-data="${isShowData}">
                    <span
                        draggable="${draggable}"
                        data-action-block-step="hidden"
                        data-status="${checkIsBlockHidden}"
                        data-name="icon-block"
                        class="${color} mr-1 w-10 h-10 relative bg-blue-50 shadow-sm rounded-md text-xl flex justify-center items-center cursor-grab group/drag active:cursor-grabbing">
                        ${icon}
                        <span class="hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-1 absolute text-black/40 group-hover/drag:text-black/90 backdrop-blur-sm w-full h-full place-content-center">
                            <span class="flex gap-1">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </span>
                        </span>
                    </span>
                    <div class="flex flex-col gap-1 w-full">
                        ${NameComponent()}
                        <div class="${classNameWrapperData}" data-data-block="${type}">
                            ${children}
                        </div>
                    </div>
                    ${this.buttonMore({
                        name,
                        enable: addable,
                        isTypeMissionAvailable: id,
                    })}
                </div>
                `;
        },
        buttonMore({ enable, isTypeMissionAvailable }) {
            if (!enable) return "";
            const buttonList = [
                {
                    action: "delete",
                    title: "Delete",
                    icon: '<i class="fa-solid fa-trash-can"></i>',
                    color: "text-red-500",
                    className: "",
                    hidden: false,
                },
                {
                    action: "save",
                    title: isTypeMissionAvailable ? "Save as" : "save",
                    icon: '<i class="fa-solid fa-floppy-disk"></i>',
                    color: "text-blue-500",
                    className: "",
                    hidden: false,
                },
                {
                    action: "update",
                    title: "Update",
                    icon: '<i class="fa-solid fa-rotate"></i>',
                    color: "text-yellow-500",
                    className: "",
                    hidden: !isTypeMissionAvailable,
                },
                {
                    action: "duplicate",
                    title: "Duplicate",
                    icon: '<i class="fa-regular fa-clone"></i>',
                    color: "text-yellow-500",
                    className: "",
                    hidden: false,
                },
                {
                    action: "detailTypeMission",
                    title: "Detail",
                    icon: '<i class="fa-solid fa-circle-info"></i>',
                    color: "text-sky-500",
                    className: "",
                    hidden: !isTypeMissionAvailable,
                },
                {
                    action: "unLinkTypeMission",
                    title: "Unlink",
                    icon: '<i class="fa-solid fa-link-slash"></i>',
                    color: "text-red-500",
                    className: "",
                    hidden: !isTypeMissionAvailable,
                },
                {
                    action: "copy",
                    title: "Copy",
                    icon: '<i class="fa-solid fa-copy"></i>',
                    color: "text-blue-500",
                    className: "pointer-events-none opacity-40",
                    hidden: false,
                },
            ];

            const ButtonItemMore = (props) => {
                const { action, title, className, icon, hidden, color } = props;
                if (hidden) return "";
                return `
                <li>
                    <button data-action-block-step="${action}" class="btn flex px-6 py-2 hover:bg-stone-100 text-xs w-full ${className}">
                        <span class="mr-2 w-5 ${color}">${icon}</span>
                        <span>${title}</span>
                    </button>
                </li>
                `;
            };
            const listButtonHtml = buttonList.map(ButtonItemMore).join("");
            return `
            <div class="absolute top-0 right-0 hover:z-50">
                <div class="group/more">
                    <span class="h-5 w-5 mr-1 btn text-stone-500 text-xl hover:text-stone-900"><i class="fa-solid fa-ellipsis"></i></span>
                    <div class="absolute top-[20px] right-2 h-12 hidden group-hover/more:block">
                        <ul class="bg-white shadow-md py-4 rounded-md overflow-hidden min-w-[100px]">
                        ${listButtonHtml}
                        </ul>
                    </div>
                </div>
            </div>
            `;
        },
        style: {
            normal: {
                icon: '<i class="fa-solid fa-bullseye"></i>',
                color: "text-red-400",
            },
            ifelse: {
                icon: '<i class="fa-solid fa-code-fork"></i>',
                color: "text-green-400",
            },
            trycatch: {
                icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
                color: "text-yellow-400",
            },
            while: {
                icon: '<i class=" fa-solid fa-arrows-spin"></i>',
                color: "text-sky-400",
            },
            logic_or: {
                icon: `<i class="fa-solid fa-grip-lines-vertical"></i>`,
                color: "text-blue-400",
            },
            logic_and: {
                icon: `<i class=" fa-solid fa-link"></i>`,
                color: "text-pink-400",
            },
        },
        classNameDataItem: {
            wrap: "wrap-block bg-stone-100 p-2 rounded-lg flex mb-1 border-2 border-transparent",
            span: "font-bold mr-3 text-red-600",
            data: "flex-1 flex flex-wrap items-start gap-4 content-start",
        },
        ButtonAdd(isButton) {
            const buttonAddStep = `
            <button data-action-block-step="add"
                class="btn w-[30px] aspect-square relative flex justify-center  rounded-md mx-2  items-center text-sky-500 bg-sky-100 self-center [&.active]:bg-sky-800 [&.active]:text-white">
                    <i class="fa-solid fa-plus"></i>
            </button>
            `;
            return isButton ? buttonAddStep : "";
        },
    },

    normal({ normal, address, value, handleAble }) {
        const option = {
            value,
            data: normal.join(""),
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
