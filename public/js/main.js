import Node from "./functionHandle/Node.js";
import clx from "./functionHandle/clx.js";
import createNameWindow from "./functionHandle/createIdBrowser.js";
import connectRos from "./rosModule/connectRos.js";
import topicsListening from "./rosModule/topicsListening.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
createNameWindow();
const ros = connectRos(window.location.hostname);

function toggerMessage(type, message) {
    const MessageComponent = (type, message) => {
        const Icon =
            type === "success"
                ? Node("i").props({ className: "fa-solid fa-check" })
                : Node("i").props({ className: "fa-solid fa-xmark" });

        const HTMLElement = Node("div").props({
            id: "notification-message",
            className:
                "group/notification text-white transition-transform data-[status='error']:text-red-500 data-[status='success']:text-green-500 -translate-y-[120%] -translate-x-1/2 fixed top-[10px] left-1/2 z-100 bg-white px-4 py-2 min-w-[200px] min-h-[60px] max-h-[120px] rounded-lg flex gap-2 items-center shadow overflow-hidden",
            dataset: { status: type },
            children: [
                Node("span").props({
                    className:
                        "text-3xl rounded-md flex justify-center items-center w-8 aspect-square",
                    children: [Icon],
                }),
                Node("div").props({
                    className: "flex flex-col",
                    children: [
                        Node("span").props({
                            className: "font-bold",
                            children: "Notification",
                        }),
                        Node("span").props({ children: message }),
                    ],
                }),
            ],
        });
        setTimeout(() => {
            HTMLElement.classList.add("translate-y-0");
        }, 100);
        const onRemove = () => {
            HTMLElement.classList.remove("translate-y-0");
            setTimeout(() => {
                HTMLElement.remove();
            }, 200);
        };
        setTimeout(onRemove, 3000);
        return HTMLElement;
    };
    document.body.appendChild(MessageComponent(type, message));
}

window.oncontextmenu = (e) => {
    e.preventDefault();
    return false;
};

export { $, $$, toggerMessage };
export default ros;
topicsListening();
