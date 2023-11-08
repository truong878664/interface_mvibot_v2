import { toggerMessage } from "../main.js";
import Node from "./Node.js";

export default function confirmationForm({
    message = "Do you want to delete?",
    callback,
}) {
    const ConfirmElement = Node("div").props({
        className:
            "fixed top-0 z-100 left-0 right-0 bottom-0 bg-black/20 confirmation-form grid place-content-center",
        children: [
            Node("div").props({
                className:
                    "p-4 bg-white rounded-md flex flex-col justify-center",
                children: [
                    Node("p").props({
                        className: "text-center",
                        children: message,
                    }),
                    Node("div").props({
                        className: "flex justify-between mt-4 font-bold gap-5",
                        children: [
                            Node("button").props({
                                className:
                                    "bg-red-500 text-white px-7 py-1 rounded-md btn",
                                children: "Confirm",
                                onClick: () => {
                                    callback();
                                    ConfirmElement.remove();
                                },
                            }),
                            Node("button").props({
                                className:
                                    "border-yellow-500 border text-yellow-500 px-7 py-1 rounded-md btn",
                                children: "Cancel",
                                onClick: () => {
                                    ConfirmElement.remove();
                                },
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
    document.body.appendChild(ConfirmElement);
}
