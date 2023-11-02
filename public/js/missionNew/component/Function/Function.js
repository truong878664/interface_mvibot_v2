const createHtmlFunctionItem = {
    html({
        mode,
        marker_type = "",
        value,
        detail,
        name,
        id,
        color_position = "",
        data,
        status = "",
    }) {
        const ColorPosition = color_position
            ? `<span class="rounded-full border shadow-sm shadow-[#ccc] ml-2" style="background-color:${color_position};width:15px;height:15px;"></span>`
            : "";

        const MarkerType = marker_type
            ? `data-marker-type="${marker_type}"`
            : "";
        return `
            <div 
            data-function-type="${mode}"
            data-status=""
            data-name=${name}
            data-value="${value}"
            data-id=${id}
            data-data='${data}'
            ${MarkerType}
            class="function-item flex justify-between relative bg-slate-50 px-5 py-3 mb-2 point-id-8 type-mission-function-item text-xs shadow-sm shadow-[#ccc] rounded-lg hover:z-50 data-[status='hidden']:hidden last:mb-20">
                <div class="flex">
                    <input
                        data-select-function-id="${id}"
                        id="${id + mode}"
                        data-type=""
                        type="checkbox"
                        class="mr-4 w-4 h-4 rounded cursor-pointer text-green-500 bg-stone-200 border-none function-item-select">
                    <div class="flex flex-col">
                        <label class="flex cursor-pointer" for="${id + mode}">
                            <span class="mr-2 text-green-400 status hidden">${status}</span>
                            <span class=" font-bold font-3xl capitalize">${mode}</span>
                            ${ColorPosition}
                        </label>
                        <div class="flex">
                            <span class="mr-2">Name:</span>
                            <span class="text-sky-600 font-bold name-mission-marker">${name}</span>
                        </div>
                        ${detail}
                    </div>
                </div>
                <div class="absolute top-0 right-0">
                    <button data-button-function-kind="add" 
                        class=" mx-1 mb-1 h-[30px] w-[30px] btn rounded-md add-function-btn">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <div
                        class=" mx-1 mb-1 h-[30px] w-[30px] rounded-md more-option-function-btn relative inline-block group/item-function">
                        <i class="fa-solid fa-ellipsis"></i>
                        <div class="absolute top-[10px] right-0 bg-white rounded-md shadow-md  z-50 hidden group-hover/item-function:block">
                            ${this.optionButtonFunction}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    detail(data) {
        const detail = [];
        for (const key in data) {
            let value = data[key];
            if (!isNaN(Number(data[key]))) {
                value = Number(Number(data[key]).toFixed(4));
            }
            if (data[key]) {
                detail.push(
                    `<span class="font-bold">${key} : </span><span>${value}</span>`,
                );
            }
        }
        return `<p>${detail.join('<span class="mx-2">|</span>')}</p>`;
    },
    value({ mode, name, id }) {
        const value = mode + "#" + name + "#" + id;
        return value;
    },
    create(data) {
        const {
            mode,
            name,
            id,
            created_at,
            updated_at,
            color_position,
            status,
            ...field
        } = data;

        const value = this.value({ mode, name, id });
        const detail = this.detail(field);

        const dataFunction = {
            mode,
            name,
            id,
            value,
            detail,
            color_position,
            marker_type: field.marker_type,
            data: JSON.stringify(data),
            status,
        };

        const htmlItem = this.html(dataFunction);
        return htmlItem;
    },
    createDOMElement(data) {
        const htmlItem = this.create(data);
        const wrapper = document.createElement("div");
        wrapper.innerHTML = htmlItem;
        const DOMElement = wrapper.firstElementChild;
        const sticker = DOMElement.querySelector(".status");
        sticker.classList.remove("hidden");
        return DOMElement;
    },

    optionButtonFunction: `
        <ul class="bg-white shadow-md py-2 rounded-md overflow-hidden text-stone-900">
            <li>
                <button data-button-function-kind="delete" class="btn flex py-2 w-full px-6 hover:bg-stone-100">
                    <span class="mr-2 text-red-500">
                        <i class="fa-solid fa-trash-can"></i>
                    </span>
                    <span>Delete</span>
                </button>
            </li>
            <li>
                <button data-button-function-kind="edit" class="btn flex py-2 w-full px-6 hover:bg-stone-100">
                    <span class="mr-2 text-sky-500">
                        <i class="fa-solid fa-pen"></i>
                    </span>
                    <span>Edit</span>
                </button>
            </li>
            <li>
                <button data-button-function-kind="duplicate" class="btn flex py-2 w-full px-6 hover:bg-stone-100">
                    <span class="mr-2 text-orange-500">
                        <i class="fa-regular fa-clone"></i>
                    </span>
                    <span>Duplicate</span>
                </button>
            </li>
        </ul>
    `,
};

export default createHtmlFunctionItem;
