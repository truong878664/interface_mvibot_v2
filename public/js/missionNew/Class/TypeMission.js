export default class TypeMission {
    constructor() {
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
        const res = await fetch(this.urlApi + "?type-mission=normal");
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
            htmlElement[data.type].push(this.html(data));
            return htmlElement;
        });

        for (const key in htmlElement) {
            const wrapper = document.querySelector(
                `[data-list-type-mission='${key}']`
            );
            wrapper.innerHTML = htmlElement[key].join("");
        }
    }

    html(data) {
        const { name, id } = data;

        return `
            <div
                data-value='${JSON.stringify(data)}' data-id='${id}' data-name="item-type-mission" class="flex relative justify-between items-center bg-slate-50 px-5 py-3 mb-2 shadow-sm shadow-[#ccc] rounded-lg">
                <div class="flex">
                    <input type="checkbox" data-select-type-mission-id="" data-type="normal" class="mr-4 w-[12px] h-[12px] accent-[#f5b933]">
                    <div class="flex flex-col">
                        <div class="flex">
                            <span class="font-bold text-sky-600">${name}</span>
                        </div>
                    </div>
                </div>
                <div class="absolute top-0 right-0">
                    <button data-button-type-mission-kind="add" 
                        class="text-2xl mx-1 mb-1 h-[30px] w-[30px] btn rounded-md add-function-btn">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <div
                        class="text-2xl mx-1 mb-1 h-[30px] w-[30px] rounded-md more-option-function-btn relative inline-block group">
                        <i class="fa-solid fa-ellipsis"></i>
                        <div class="absolute top-[10px] right-0 bg-white rounded-md shadow-md text-xl z-50 hidden group-hover:block">
                        1
                        </div>
                    </div>
                </div>
            </div>`;
    }
}
