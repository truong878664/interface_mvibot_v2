import Node from "../../functionHandle/Node.js";
import { toggerMessage } from "../../main.js";

const Label = {
    sticky: `
    <div class="absolute top-[120%] left-1/2 -translate-x-1/2 bg-white rounded-md shadow-md text-xs" data-name="sticky">
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
    formName({ x, y }) {
        return `
        <div class="fullscreen">
            <div class="absolute top-0 left-0 right-0 bottom-0" onclick="this.parentElement.remove()"></div>
            <div class="justify-center items-center py-1 px-4 bg-stone-100 shadow-md rounded-md inline-flex absolute -translate-x-1/2" style="top: ${y}px; left: ${x}px;">
            <input type="text" class="py-1 rounded-md px-2 bg-white placeholder:text-sm" placeholder="Name" name="name">
            <button class="btn py-1 px-4 font-bold bg-main rounded-md ml-2 text-white enter-btn"><i class="fa-solid fa-check"></i></button>
            </div>
        </div>
        `;
    },
    form({ x, y, onSubmit, name = "" }) {
        const onRemove = () => {
            formElement.remove();
        };

        const buttonSubmit = Node("button").props({
            onClick: () => {
                if (inputForm.value) {
                    onSubmit(inputForm.value);
                    onRemove();
                } else {
                    toggerMessage("error", "Enter input!");
                }
            },
            className:
                "btn py-1 px-4 font-bold bg-main rounded-md ml-2 text-white enter-btn",
            children: [
                Node("i").props({
                    className: "fa-solid fa-check",
                }),
            ],
        });
        const inputForm = Node("input").props({
            className: "py-1 rounded-md px-2 bg-white placeholder:text-sm",
        });
        inputForm.value = name;
        const formElement = Node("div").props({
            className: "fullscreen",
            children: [
                Node("div").props({
                    className: "absolute top-0 left-0 right-0 bottom-0",
                    onClick: onRemove,
                }),
                Node("div").props({
                    className:
                        "justify-center items-center py-1 px-1 bg-stone-100 shadow-md rounded-md inline-flex absolute -translate-x-1/2",
                    style: { top: y + "px", left: x + "px" },
                    children: [inputForm, buttonSubmit],
                }),
            ],
        });
        document.body.appendChild(formElement);
        requestAnimationFrame(() => inputForm.focus());
    },
};

export default Label;
