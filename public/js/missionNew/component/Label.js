const Label = {
    sticky: `
    <div class="absolute top-[120%] left-1/2 -translate-x-1/2 bg-white rounded-md shadow-md text-xl" data-name="sticky">
        <ul class="bg-white shadow-md py-4 rounded-md overflow-hidden text-stone-900">
            <li class="px-6 py-1 hover:bg-stone-100 ">
                <button data-action-block-step="delete" class="btn flex py-2">
                    <span class="mr-2 text-red-500">
                        <i class="fa-solid fa-trash-can"></i>
                    </span>
                    <span>Delete</span>
                </button>
            </li>
            <li class="px-6 py-1 hover:bg-stone-100 ">
                <button data-action-block-step="" class="btn flex">
                    <span class="mr-2 text-sky-500">
                        <i class="fa-solid fa-circle-info"></i>
                    </span>
                    <span>Detail</span>
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
};

export default Label;
