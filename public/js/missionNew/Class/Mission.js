import { loadingHeader } from "../../functionHandle/displayLoad.js";
import useDebounce from "../../hooks/useDebouche.js";
import BlockStep from "../component/BlockStep/index.js";

export default class Mission {
    constructor() {
        this.data = [];
        this.currentAddAddress = "";
        this.missionWrapperElement =
            document.getElementById("block-step-wrapper");
        this.id = document.getElementById("id-mission").value;
        this.UrlApi = "/api/mission-v4/" + this.id;
        this.get();
    }
    async get() {
        const res = await fetch(this.UrlApi);
        const data = await res.json();
        this.data = JSON.parse(data.mission_shorthand || "[]");
        this.render();
    }
    async save() {
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
        console.log(message);
        loadingHeader(false);
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
    getAddressDelete(element) {
        const blockMission = element.closest("[data-address-index]");
        const address = this.getAddress(blockMission);
        const indexItemDelete = blockMission.dataset.addressIndex;
        return [address, indexItemDelete ];
    }
    setAddressAdd(element) {
        this.currentAddAddress = this.getAddress(element);
    }
    addItem(newItem) {
        try {
            loadingHeader(true);
            if (!this.currentAddAddress && !(newItem instanceof Object)) {
                const normal = this.Normal({ data: newItem });
                this.data.push(normal);
                this.render();
                useDebounce({ cb: this.save.bind(this), delay: 1000 });
                return;
            }
            const {targetObject, propertyName} = this.targetObject(this.currentAddAddress);
            if (propertyName) {
                if (Array.isArray(targetObject[propertyName])) {
                    targetObject[propertyName].push(newItem);
                    this.render();
                } else {
                    console.log(
                        "Địa chỉ không hợp lệ hoặc không phải là một mảng."
                    );
                }
            } else {
                targetObject.push(newItem);
                this.render();
            }
            useDebounce({ cb: this.save.bind(this), delay: 1000 });
        } catch (error) {
            console.log("Không thể thêm phần tử:", error);
        }
    }

    targetObject(address) {
        const addressParts = address.split(".");
            const objectPath = addressParts.slice(0, -1).join(".");
            const propertyName = addressParts[addressParts.length - 1];
            const targetObject = eval("this.data" + objectPath);
            return {targetObject, propertyName}
    }
    activeAddButton() {
        const arrayPath = this.currentAddAddress
            .split(/[.\[\]]/)
            .filter((e) => e && e !== "data");
        let wrapperBlockCurrent = this.missionWrapperElement;
        let element;
        if (arrayPath.length === 0) {
            document
                .querySelector(".active-block-step-root")
                .classList.add("active");
        } else {
            arrayPath.map((path) => {
                const query = isNaN(parseInt(path))
                    ? `[data-data-block='${path}']`
                    : `[data-address='${path}']`;
                element = wrapperBlockCurrent?.querySelector(query);

                wrapperBlockCurrent = element;
                return element;
            });

            const lastButton = this.lastQuerySelector({
                wrapper: element,
                query: "[data-action-block-step='add']",
            });
            lastButton?.classList.add("active");
        }
    }
    traverseObjectPath(path) {
        return path.split(/[\[\].]/).filter((e) => e);
    }
    demoPath() {
        const demoPath =
            "[1].data.condition[0].data.if_[0].data.if_[0].data.normal[0].data.else_";
        return demoPath;
    }
    lastQuerySelector({ wrapper = document, query }) {
        const elements = wrapper?.querySelectorAll(query);
        if (elements) {
            const lastElement = elements[elements.length - 1];
            return lastElement;
        }
    }

    Normal({ data = "", name = "normal_name", id = null }) {
        return {
            type: "normal",
            name,
            id,
            data: {
                normal: data.split("|").filter((i) => i) || [],
            },
        };
    }
    IfElse({ data = "", name = "ifelse_name", id = null }) {
        const dataIfElse = data?.split("?");
        const condition = dataIfElse[0]?.split("|").filter((i) => i) || [];
        const if_ = dataIfElse[1]?.split("|").filter((i) => i) || [];
        const else_ = dataIfElse[2]?.split("|").filter((i) => i) || [];
        return {
            type: "ifelse",
            name,
            id,
            data: {
                condition,
                if_,
                else_,
            },
        };
    }
    Trycatch({ data = "", name = "trycatch_name", id = null }) {
        const dataTryCatch = data?.split("?");
        const try_ = dataTryCatch[0]?.split("|").filter((i) => i) || [];
        const catch_ = dataTryCatch[1]?.split("|").filter((i) => i) || [];
        return {
            type: "trycatch",
            name,
            id,
            data: {
                try_,
                catch_,
            },
        };
    }
    While({ data = "", name = "while_name", id = null }) {
        const dataWhile = data?.split("?");
        const condition = dataWhile[0].split("|").filter((i) => i) || [];
        const do_ = dataWhile[1]?.split("|").filter((i) => i) || [];
        return {
            type: "while",
            name,
            id,
            data: {
                condition,
                do_,
            },
        };
    }
    LogicOr({ data = "", name = "logic_or_name", id = null }) {
        const dataOr = data?.split("?");
        const logicA = dataOr[0].split("|").filter((i) => i) || [];
        const logicB = dataOr[1]?.split("|").filter((i) => i) || [];
        return {
            type: "logicOr",
            name,
            id,
            data: {
                logicA,
                logicB,
            },
        };
    }
    LogicAnd({ data = "", name = "logic_and_name", id = null }) {
        const dataAnd = data?.split("?");
        const logicA = dataAnd[0].split("|").filter((i) => i) || [];
        const logicB = dataAnd[1]?.split("|").filter((i) => i) || [];
        return {
            type: "logicAnd",
            name,
            id,
            data: {
                logicA,
                logicB,
            },
        };
    }
}
