import { loadingHeader } from "../../functionHandle/displayLoad.js";
import useDebounce from "../../hooks/useDebouche.js";
import { toggerMessage } from "../../main.js";
import BlockStep from "../component/BlockStep/index.js";
import isJSON from "../handle/isJson.js";

export default class Mission {
    constructor() {
        this.data = [];
        this.currentAddAddress = "";
        this.missionWrapperElement =
            document.getElementById("block-step-wrapper");
        this.id = document.getElementById("id-mission").value;
        this.UrlApi = "/api/mission-v4/" + this.id;
        this.get();
        this.saved = true;
    }
    async get() {
        const urlGet = this.UrlApi + "?kind=get";
        const res = await fetch(urlGet);
        const data = await res.json();
        this.data = JSON.parse(data.mission_shorthand || "[]");
        this.render();
    }
    async save() {
        this.saved = false;
        const res = await fetch(this.UrlApi, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mission_shorthand: JSON.stringify(this.data),
            }),
        });
        const message = await res.json();
        console.log("Saved...");
        this.saved = true;
        loadingHeader(false);
    }
    async getDataRobot() {
        if (this.saved) {
            const urlGet = this.UrlApi + "?kind=convert_data_robot";
            const res = await fetch(urlGet);
            const data = await res.json();
            return data;
        } else {
            toggerMessage("error", "Saving data!");
        }
    }
    render() {
        const html = [];
        this.data?.map((item, index) => {
            html.push(BlockStep[item.type]({ ...item, address: index }));
            return html;
        });

        const buttonAddRoot = `<button data-action-block-step="add" class="active-block-step-root btn w-[25px] h-[20px] relative flex justify-center text-[16px] rounded-md mb-2 ml-2  items-center text-sky-500 bg-sky-100 self-center [&amp;.active]:bg-sky-800 [&amp;.active]:text-white"> <i class="fa-solid fa-plus"></i></button>`;

        this.missionWrapperElement.innerHTML = html.join("") + buttonAddRoot;
        this.activeAddButton();
    }

    getAddress(element) {
        let locationAdd;
        locationAdd = element;
        let timeLoop = 1;
        const TIME_MAX_LOOP = 20;
        const addressCurrentAt = [];
        while (
            locationAdd?.parentElement.id !== "block-step-wrapper" &&
            timeLoop < TIME_MAX_LOOP
        ) {
            const typeDetail = locationAdd.closest("[data-data-block]");
            locationAdd = locationAdd.parentElement.closest(
                "[data-block-wrapper]"
            );

            timeLoop++;
            const typeBlockStep = locationAdd.dataset.blockWrapper;
            if (typeBlockStep === "normal") {
                const address = locationAdd.dataset.address;
                addressCurrentAt.unshift(`[${address}].data.normal`);
            } else {
                const typeDetailValue = typeDetail.dataset.dataBlock;
                const address = locationAdd.dataset.address;
                addressCurrentAt.unshift(
                    `[${address}].data.${typeDetailValue}`
                );
            }
        }
        return addressCurrentAt.join("");
    }
    getAddressByStep(element) {
        const blockMission = element.closest("[data-address-index]");
        const address = this.getAddress(blockMission);
        const indexStep = blockMission.dataset.addressIndex;
        return [address, indexStep];
    }

    deleteStep({ address, indexStep }) {
        try {
            const { targetObject, propertyName } = this.targetObject(address);
            propertyName
                ? targetObject[propertyName].splice(indexStep, 1)
                : targetObject.splice(indexStep, 1);
        } catch (error) {
            console.log(error);
            toggerMessage("error", "ERR!. Reload please!");
        }
        this.resetCurrentAddAddress();
    }
    setAddressAdd(element) {
        this.currentAddAddress = this.getAddress(element);
    }
    addStep({
        step,
        isDefaultLocation = true,
        addressIndex = this.currentAddAddress,
        side = "right",
    }) {
        try {
            loadingHeader(true);
            if (isDefaultLocation) {
                if (!this.currentAddAddress && !(step instanceof Object)) {
                    const normal = this.Normal({ data: { normal: [step] } });
                    this.data.push(normal);
                    useDebounce({ cb: this.save.bind(this), delay: 1000 });
                    return;
                }

                const { targetObject, propertyName } = this.targetObject(
                    this.currentAddAddress
                );

                if (propertyName) {
                    if (Array.isArray(targetObject[propertyName])) {
                        if (!isJSON(step)) {
                            targetObject[propertyName].push(step);
                        } else {
                            targetObject[propertyName].push(JSON.parse(step));
                        }
                    } else {
                        console.log("Address is not array.");
                    }
                } else {
                    if (!isJSON(step)) {
                        targetObject.push(step);
                    } else {
                        targetObject.push(JSON.parse(step));
                    }
                }
            } else {
                const [address, indexStep] = addressIndex;
                const indexAdd =
                    side === "right"
                        ? parseInt(indexStep) + 1
                        : parseInt(indexStep);
                const { targetObject, propertyName } =
                    this.targetObject(address);
                if (!isJSON(step)) {
                    targetObject[propertyName].splice(indexAdd, 0, step);
                } else {
                    targetObject[propertyName].splice(
                        indexAdd,
                        0,
                        JSON.parse(step)
                    );
                }
            }
            useDebounce({ cb: this.save.bind(this), delay: 1000 });
        } catch (error) {
            console.log("[Can't add item]:", error);
        }
    }

    targetObject(address) {
        const addressParts = address.split(".");
        const objectPath = addressParts.slice(0, -1).join(".");
        const propertyName = addressParts[addressParts.length - 1];
        const targetObject = eval("this.data" + objectPath);
        return { targetObject, propertyName };
    }
    activeAddButton() {
        const arrayPath = this.currentAddAddress
            .split(/[.\[\]]/)
            .filter((e) => e && e !== "data");
        let wrapperBlockCurrent = this.missionWrapperElement;
        if (arrayPath.length === 0) {
            document
                .querySelector(".active-block-step-root")
                .classList.add("active");
        } else {
            const querys = [];
            arrayPath.map((path) => {
                const query = isNaN(parseInt(path))
                    ? `[data-data-block='${path}']`
                    : `[data-address='${path}']`;
                return querys.push(query);
            });
            const parentButtonAdd = wrapperBlockCurrent.querySelector(
                querys.join(" ")
            );
            const buttonAdd = parentButtonAdd?.querySelector(
                "[data-action-block-step='add']"
            );
            buttonAdd?.classList.add("active");
        }
    }
    traverseObjectPath(path) {
        return path.split(/[\[\].]/).filter((e) => e);
    }

    lastQuerySelector({ wrapper = document, query }) {
        const elements = wrapper?.querySelectorAll(query);
        if (elements) {
            const lastElement = elements[elements.length - 1];
            return lastElement;
        }
    }

    resetCurrentAddAddress() {
        this.currentAddAddress = "";
        console.log("Reset default path add address!");
        return;
    }
    Normal({ data = { normal: [] }, name = "normal_name", id = null }) {
        return {
            type: "normal",
            name,
            id,
            data: data,
        };
    }
    IfElse({
        data = {
            condition: [],
            if_: [],
            else_: [],
        },
        name = "ifelse_name",
        id = null,
    }) {
        return {
            type: "ifelse",
            name,
            id,
            data: data,
        };
    }
    Trycatch({
        data = { try_: [], catch_: [] },
        name = "trycatch_name",
        id = null,
    }) {
        return {
            type: "trycatch",
            name,
            id,
            data: data,
        };
    }
    While({
        data = { condition: [], do_: [] },
        name = "while_name",
        id = null,
    }) {
        return {
            type: "while",
            name,
            id,
            data: data,
        };
    }
    LogicOr({
        data = { logicA: [], logicB: [] },
        name = "logic_or_name",
        id = null,
    }) {
        return {
            type: "logicOr",
            name,
            id,
            data: data,
        };
    }
    LogicAnd({
        data = { logicA: [], logicB: [] },
        name = "logic_and_name",
        id = null,
    }) {
        return {
            type: "logicAnd",
            name,
            id,
            data: data,
        };
    }
}
