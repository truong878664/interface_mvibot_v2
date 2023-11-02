import { toggerMessage } from "../../main.js";

export default class TypeMission {
    constructor() {
        this.type = document.querySelector("#type-mission").value;
        this.urlApi = "/api/type-mission-v4";
    }
    async save(data) {
        const res = await fetch(this.urlApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const message = await res.json();
        return message;
    }
    async get() {
        const res = await fetch(this.urlApi + `?type-mission=${this.type}`);
        const data = await res.json();
        return data;
    }
    async getById(id) {
        const res = await fetch(this.urlApi + "/" + id);
        const data = await res.json();
        return data;
    }
    async render() {
        const htmlElement = {
            normal: [],
            ifelse: [],
            trycatch: [],
            while: [],
            logic_and: [],
            logic_or: [],
        };
        const datas = await this.get();
        datas.map((data) => {
            try {
                htmlElement[data.type].push(this.html(data));
                return htmlElement;
            } catch (error) {
                return;
            }
        });

        for (const key in htmlElement) {
            const wrapper = document.querySelector(
                `[data-list-type-mission='${key}']`,
            );
            wrapper.innerHTML = htmlElement[key].join("");
        }
    }

    html(data) {
        const { name, id, type } = data;
        return `
            <div
                data-value='${JSON.stringify(data)}'
                data-id='${id}'
                data-name="item-type-mission"
                class="flex relative justify-between items-center bg-slate-50 px-5 py-3 mb-2 shadow-sm shadow-[#ccc] rounded-lg text-sm last:mb-20">
                
                <div class="flex w-full">
                    <input
                    data-select-type-mission-id="${id}"
                    id="${id + type}"
                    data-type="${type}"
                    type="checkbox"
                    class="mr-4 w-4 h-4 rounded cursor-pointer text-green-500 bg-stone-200 border-none function-item-select">
                    <button data-button-type-mission-kind="detail" class="font-bold text-sky-600 w-full py-3 text-start">${name}</button>
                </div>

                <div class="absolute top-0 right-0">
                    <button data-button-type-mission-kind="add" 
                        class="mx-1 mb-1 h-7 w-7 btn rounded-md add-function-btn">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <div
                        class="mx-1 mb-1 h-7 w-7 rounded-md more-option-function-btn relative inline-block group">
                        <i class="fa-solid fa-ellipsis"></i>
                        <ul class="absolute top-2 right-0 bg-white rounded-md shadow-md z-50 hidden group-hover:block py-4 text-xs">
                            <li>
                                <button data-button-type-mission-kind="edit" class="btn flex px-6 py-2 hover:bg-stone-100 w-full">
                                    <span class="mr-2 w-5 text-blue-500">
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </span>
                                    <span>Edit</span>
                                </button>
                            </li>
                            <li>
                                <button data-button-type-mission-kind="delete" class="btn flex px-6 py-2 hover:bg-stone-100 w-full">
                                    <span class="mr-2 w-5 text-red-500">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </span>
                                    <span>Delete</span>
                                </button>
                            </li>
                            <li>
                                <button data-button-type-mission-kind="detail" class="btn hidden px-6 py-2 hover:bg-stone-100 w-full">
                                    <span class="mr-2 w-5 text-sky-500">
                                        <i class="fa-solid fa-circle-info"></i>
                                    </span>
                                    <span>Detail</span>
                                </button>
                            </li>
                            
                            <li>
                                <button data-button-type-mission-kind="sync" class="btn flex px-6 py-2 hover:bg-stone-100 w-full">
                                    <span class="mr-2 w-5 text-yellow-500">
                                        <i class="fa-solid fa-rotate"></i>
                                    </span>
                                    <span>Sync</span>
                                </button>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>`;
    }
    async delete(id) {
        try {
            const res = await fetch(this.urlApi + "/" + id, {
                method: "DELETE",
            });
            const message = await res.json();
            return message;
        } catch (error) {
            console.log(error);
        }
    }
    async update({ id, data }) {
        try {
            const res = await fetch(this.urlApi + "/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data }),
            });
            const message = await res.json();
            this.render();
            return message;
        } catch (error) {
            console.log(error);
        }
    }
}
