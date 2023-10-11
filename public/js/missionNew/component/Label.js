const Label = {
    sticky: `
    <div class="absolute top-[120%] left-1/2 -translate-x-1/2 bg-white rounded-md shadow-md text-xl" data-name="sticky">
        <ul class="bg-white shadow-md py-4 rounded-md overflow-hidden text-stone-900">
            <li>
                <button data-action-block-step="delete" class="hover:bg-stone-100 px-6 btn flex py-2 w-full">
                    <span class="mr-2 text-red-500">
                        <i class="fa-solid fa-trash-can"></i>
                    </span>
                    <span>Delete</span>
                </button>
            </li>
            <li>
                <button data-action-block-step="detail" class="hover:bg-stone-100 px-6 btn flex py-2 w-full">
                    <span class="mr-2 text-sky-500">
                        <i class="fa-solid fa-circle-info"></i>
                    </span>
                    <span>Detail</span>
                </button>
            </li>
            <li>
                <button data-action-block-step="duplicate" class="hover:bg-stone-100 px-6 btn flex py-2 w-full">
                    <span class="mr-2 text-orange-500">
                        <i class="fa-regular fa-clone"></i>
                    </span>
                    <span>Duplicate</span>
                </button>
            </li>
        </ul>
    </div>
    `,
    line() {
        const line = document.createElement("div");
        line.classList.add(
            "absolute",
            "top-0",
            "h-full",
            "w-[2px]",
            "rounded-full",
            "bg-main",
            "highline-line"
        );
        return line;
    },
    lineLargeY() {
        const line = document.createElement("div");
        line.classList.add(
            "absolute",
            "w-full",
            "h-[2px]",
            "bg-main",
            "left-0",
            "highline-line"
        );
        return line;
    },
    lineLargeX() {
        const line = document.createElement("div");
        line.classList.add(
            "absolute",
            "w-[2px]",
            "h-full",
            "bg-main",
            "top-0",
            "highline-line"
        );
        return line;
    },
    formName({ x, y }) {
        return `
        <div class="fullscreen">
            <div class="absolute top-0 left-0 right-0 bottom-0" onclick="this.parentElement.remove()"></div>
            <div class="text-2xl justify-center items-center py-2 px-4 bg-stone-100 shadow-md rounded-md inline-flex absolute -translate-x-1/2" style="top: ${y}px; left: ${x}px;">
            <input type="text" class="py-2 rounded-md px-2 bg-white" placeholder="Name" name="name">
            <button class="btn py-2 px-4 font-bold bg-main rounded-md ml-2 text-white enter-btn"><i class="fa-solid fa-check"></i></button>
            </div>
        </div>
        `;
    },
    form({ x, y }) {
        const html = `
        <div class="fullscreen">
            <div class="absolute top-0 left-0 right-0 bottom-0" onclick="this.parentElement.remove()"></div>
            <div class="text-2xl justify-center items-center py-2 px-4 bg-stone-100 shadow-md rounded-md inline-flex absolute -translate-x-1/2" style="top: ${y}px; left: ${x}px;">
            <input type="text" class="py-2 rounded-md px-2 bg-white" placeholder="Name" name="name">
            <button class="btn py-2 px-4 font-bold bg-main rounded-md ml-2 text-white enter-btn"><i class="fa-solid fa-check"></i></button>
            </div>
        </div>
        `;
        const div = document.createElement("div");
        div.innerHTML = html;
        const formElement = div.firstElementChild;
        const buttonSubmit = formElement.querySelector(".enter-btn");
        const inputForm = formElement.querySelector("input");
        document.body.appendChild(formElement);
        return { formElement, buttonSubmit, inputForm };
    },
};

export default Label;
