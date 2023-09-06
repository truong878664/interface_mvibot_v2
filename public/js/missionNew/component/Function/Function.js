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
        status = ""
    }) {
        const html = `
            <div data-function-type="${mode}" ${
            marker_type ? `data-marker-type="${marker_type}"` : ``
        } data-value="${value}" data-id=${id} data-data='${data}'
                class="function-item flex justify-between relative bg-slate-50 px-5 py-3 mb-2 point-id-8 type-mission-function-item text-xl shadow-sm shadow-[#ccc] rounded-lg hover:z-50">
                <div class="flex">
                    <input data-select-function-id="1" data-type="marker" type="checkbox" class="mr-4 w-[12px] h-[12px] accent-[#f5b933] function-item-select">
                    <div class="flex flex-col">
                        <div class="flex">
                            <span class="mr-2 text-green-400 status hidden">${status}</span>
                            <span class=" font-bold font-3xl capitalize">${mode}</span>
                            ${
                                color_position
                                    ? `<span class="rounded-full border shadow-sm shadow-[#ccc] ml-2" style="background-color:${color_position};width:15px;height:15px;"></span>`
                                    : ""
                            }
                        </div>
                        <div class="flex">
                            <span class="mr-2">Name:</span>
                            <span class="text-sky-600 font-bold name-mission-marker">${name}</span>
                        </div>
                        ${detail}
                    </div>
                </div>
                <div class="absolute top-0 right-0">
                    <button data-button-function-kind="add" 
                        class="text-2xl mx-1 mb-1 h-[30px] w-[30px] btn rounded-md add-function-btn">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <div
                        class="text-2xl mx-1 mb-1 h-[30px] w-[30px] rounded-md more-option-function-btn relative inline-block group">
                        <i class="fa-solid fa-ellipsis"></i>
                        <div class="absolute top-[10px] right-0 bg-white rounded-md shadow-md text-xl z-50 hidden group-hover:block">
                            ${this.optionButtonFunction}
                        </div>
                    </div>
                </div>
            </div>
        `;
        return html;
    },
    detail(data) {
        const detail = [];
        for (const key in data) {
            if (data[key]) {
                detail.push(
                    `<span class="font-bold">${key} : </span><span>${data[key]}</span>`
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
            status
        };

        const htmlItem = this.html(dataFunction);
        return htmlItem;
    },
    createDOMElement(data) {
        const htmlItem = this.create(data);
        const wrapper = document.createElement("div");
        wrapper.innerHTML = htmlItem;
        const DOMElement = wrapper.firstElementChild;
        const sticker = DOMElement.querySelector(".status")
        sticker.classList.remove("hidden");
        return DOMElement;
    },

    optionButtonFunction: `
        <ul class="bg-white shadow-md py-4 rounded-md overflow-hidden text-stone-900">
            <li class="px-6 py-1 hover:bg-stone-100 mt-4">
                <button data-button-function-kind="delete" class="btn flex w-full h-full">
                    <span class="mr-2 text-red-500">
                        <i class="fa-solid fa-trash-can"></i>
                    </span>
                    <span>Delete</span>
                </button>
            </li>
            <li class="px-6 py-1 hover:bg-stone-100 ">
                <button data-button-function-kind="edit" class="btn flex py-2 w-full h-full">
                    <span class="mr-2 text-sky-500">
                        <i class="fa-solid fa-pen"></i>
                    </span>
                    <span>Edit</span>
                </button>
            </li>
            <li class="px-6 py-1 hover:bg-stone-100 ">
                <button data-button-function-kind="duplicate" class="btn flex py-2 w-full h-full">
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