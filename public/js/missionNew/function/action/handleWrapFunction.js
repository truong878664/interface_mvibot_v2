import { MissionClass } from "../../index.js";
import { toggerMessage } from "../../../main.js";
import confirmationForm from "../../../functionHandle/confirmationForm.js";
import showFormFunction from "./showFormFunction.js";
import { classFunctions } from "../index.js";
import { FunctionStepClass } from "../../FunctionStepClass.js";
import Map from "../../../Object/Map.js";
import Node from "../../../functionHandle/Node.js";

export default function handleWrapFunction() {
    const functionContainer = document.getElementById("function-container");
    functionContainer.addEventListener("click", (e) => {
        const buttonAction = e.target.closest("[data-button-function-kind]");
        if (!buttonAction) return;
        const functionItem = e.target.closest(".function-item");
        const functionKind = buttonAction?.dataset.buttonFunctionKind;
        const functionType = functionItem?.dataset.functionType;
        const functionId = functionItem?.dataset.id;
        const functionClass = classFunctions?.[functionType];
        const actions = {
            add() {
                const valueFunction = functionItem.dataset.value;
                MissionClass.addStep({ step: valueFunction });
                MissionClass.render();
                toggerMessage(
                    "success",
                    `Add step <span class="font-bold text-pink-500">${functionType}</span> successfully`,
                );
            },
            delete() {
                confirmationForm({ callback: handleDeleteFunction });
                async function handleDeleteFunction() {
                    const data = await functionClass.delete(functionId);
                    FunctionStepClass.delete({
                        type: functionType,
                        id: functionId,
                    });
                    toggerMessage(
                        data.deleted ? "success" : "error",
                        data.message,
                    );
                    data.deleted && functionItem.remove();
                }
            },
            edit() {
                showFormFunction({
                    type: functionType,
                    show: true,
                    method: "update",
                });
                const data = JSON.parse(functionItem.dataset.data);
                functionClass.display(data);
                functionClass.currentIdUpdate = data.id;
            },
            showAllPosition() {
                // return;
                const positionList = FunctionStepClass.data.position;
                let mapObject;

                function deletePosition() {
                    const idPosition = this.id;
                    const positionElementOnPreviewMap =
                        this.closest(".li-position-map");
                    const deletePosition = async () => {
                        const message =
                            await classFunctions.position.delete(idPosition);
                        toggerMessage(
                            message.deleted ? "success" : "error",
                            message.message,
                        );
                        if (message.deleted) {
                            FunctionStepClass.delete({
                                type: "position",
                                id: idPosition,
                            });
                            const positionElement = document.querySelector(
                                `[data-function-type='position'][data-id='${idPosition}']`,
                            );
                            positionElement?.remove();
                            positionElementOnPreviewMap?.remove();
                        }
                    };
                    confirmationForm({
                        callback: deletePosition,
                    });
                }

                const LiItemPosition = (position) =>
                    Node("li").props({
                        className:
                            "w-full flex items-center justify-between gap-16 hover:bg-white/10 hover:backdrop-blur-sm px-4 py-2 cursor-pointer group relative li-position-map",
                        children: [
                            Node("span").props({
                                className: "group-hover:font-bold",
                                children: position.name,
                            }),
                            Node("div").props({
                                className: "flex gap-2",
                                children: [
                                    Node("span").props({
                                        className:
                                            "w-5 h-5 rounded-full bg-blue-400 ring-4 ring-transparent group-hover:ring-sky-300 block",
                                        style: {
                                            backgroundColor:
                                                position.color_position,
                                        },
                                    }),
                                    Node("div").props({
                                        className:
                                            "absolute right-10 top-1/2 -translate-y-1/2 hidden group-hover:block text-slate-700",
                                        children: [
                                            Node("button").props({
                                                id: position.id,
                                                className:
                                                    "px-3 hover:text-red-500 btn",
                                                children: [
                                                    Node("i").props({
                                                        className:
                                                            "fa-regular fa-trash-can",
                                                    }),
                                                ],
                                                onClick: deletePosition,
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    });
                const DivMapWrapper = Node("div").props({
                    className: "w-[90%] h-[90%] bg-white block relative",
                    children: [
                        Node("div").props({
                            id: "map-show-all",
                            className: "w-full h-full",
                        }),
                        Node("ul").props({
                            className:
                                "absolute left-0 bottom-0 h-full backdrop-blur-sm flex flex-col py-4 overflow-auto",
                            children: positionList.map((position) =>
                                LiItemPosition(position),
                            ),
                        }),
                        Node("button").props({
                            className: "absolute right-0 top-0 px-4 py-2 aaaa",
                            children: [
                                Node("i").props({
                                    className: "fa-solid fa-eye",
                                }),
                            ],
                            onClick: function () {
                                mapObject.point.displayAll(positionList);
                            },
                        }),
                    ],
                });
                const Div = Node("div").props({
                    id: "div-map-preview-wrapper",
                    className:
                        "fixed top-0 bottom-0 w-full h-full z-90 bg-black/10 flex justify-center items-center wrapper",
                    children: [DivMapWrapper],
                    onClick: function (e) {
                        e.target.classList.contains("wrapper") && this.remove();
                    },
                });
                document.body.appendChild(Div);
                mapObject = new Map({ mapID: "map-show-all" });
                mapObject.create({ type: "basic" });
                mapObject.point.create({});
                mapObject.pose.create({});
                mapObject.point.displayAll(positionList);
            },
        };
        actions[functionKind]?.();
        return;
    });
}
