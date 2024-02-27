import Node from "./functionHandle/Node.js";
import createNameWindow from "./functionHandle/createIdBrowser.js";
import connectRos from "./rosModule/connectRos.js";
import subscribeTopic from "./rosModule/subscribeTopic.js";
import topicsListening from "./rosModule/topicsListening.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const timeResetElement = document.querySelector("[data-name='time-reset']");
const toastMessageContainer = document.querySelector("#toast-message");

createNameWindow();
const ros = connectRos(window.location.hostname);

function toggerMessage(type, message) {
    const MessageComponent = (type, message) => {
        const Icon =
            type === "success"
                ? Node("i").props({ className: "fa-solid fa-check" })
                : type === "error"
                ? Node("i").props({ className: "fa-solid fa-xmark" })
                : Node("i").props({ className: "fa-solid fa-warning" });

        const HTMLElement = Node("div").props({
            id: "notification-message",
            className:
                "flex max-h-[120px] min-h-[60px] min-w-[200px] items-center gap-2 overflow-hidden rounded-lg bg-white px-4 py-2 text-white shadow transition-transform data-[status='error']:text-red-500 data-[status='success']:text-green-500 data-[status='warning']:text-orange-500",
            // "fixed left-1/2 top-2 z-100 flex max-h-[120px] min-h-[60px] min-w-[200px] -translate-x-1/2 -translate-y-[120%] items-center gap-2 overflow-hidden rounded-lg bg-white px-4 py-2 text-white shadow transition-transform data-[status='error']:text-red-500 data-[status='success']:text-green-500 data-[status='warning']:text-orange-500",
            dataset: { status: type },
            children: [
                Node("span").props({
                    className:
                        "text-3xl flex justify-center items-center w-8 h-8",
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
                Node("button").props({
                    className: "absolute top-0 right-0 text-gray-700 px-2 py-1",
                    onClick: () => {
                        onRemove();
                    },
                    children: [
                        Node("i").props({ className: "fa-solid fa-xmark" }),
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
        setTimeout(onRemove, 5000);
        return HTMLElement;
    };
    toastMessageContainer.appendChild(MessageComponent(type, message));
    // document.body.appendChild(MessageComponent(type, message));
}

window.oncontextmenu = (e) => {
    e.preventDefault();
    return false;
};

export { $, $$, toggerMessage };
export default ros;
subscribeTopic("/time_reset", "std_msgs/String", (ms) => {
    const secondTotal = isNaN(Number(ms.data)) ? 0 : Number(ms.data);
    const hourFloat = secondTotal / 3600;
    const hour = Math.floor(hourFloat);
    const minuteFloat = (hourFloat - hour) * 60;
    const minute = Math.floor(minuteFloat);
    const second = Math.floor((minuteFloat - minute) * 60);
    timeResetElement.innerHTML = `${hour}:${minute}:${second}`;
});
topicsListening();
