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
        this.typeMission = document.getElementById("type-mission").value;
        this.UrlApi = "/api/mission-v4/" + this.id;
        this.get();
        this.saved = true;
        this.history = [];
    }
    async get() {
        const urlGet = this.UrlApi + "?kind=get";
        const res = await fetch(urlGet);
        const data = await res.json();
        this.data = JSON.parse(data.mission_shorthand || "[]");
        console.log(this.data);
        this.render();
    }
    async save() {
        try {
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
            loadingHeader(false);
        } catch (error) {
            toggerMessage("error", "ERR!, Please try again!" + error);
            loadingHeader(false);
            console.log(error);
        }
    }
    async getDataRobot({ html = false }) {
        try {
            await this.save();
            const urlGet =
                this.UrlApi + "?kind=convert_data_robot" + `&html=${html}`;
            const res = await fetch(urlGet);
            const data = await res.json();
            return { success: true, message: "Saving data!", data: data.data };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: "ERR!, Please check your internet and try again!!",
                data: "",
            };
        }
    }
    render() {
        try {
            const html = [];
            this.data?.map((item, index) => {
                html.push(BlockStep[item?.type]?.({ ...item, address: index }));
                return html;
            });

            const buttonAddRoot = `<button data-action-block-step="add" class="active-block-step-root btn w-[25px] h-[20px] relative flex justify-center text-[16px] rounded-md mb-2 ml-2  items-center text-sky-500 bg-sky-100 self-center [&amp;.active]:bg-sky-800 [&amp;.active]:text-white"> <i class="fa-solid fa-plus"></i></button>`;

            this.missionWrapperElement.innerHTML =
                html.join("") + buttonAddRoot;
            this.activeAddButton();
        } catch (error) {
            console.log(error);
        }
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
        try {
            const blockMission = element.closest("[data-address-index]");
            const address = this.getAddress(blockMission);
            const indexStep = blockMission.dataset.addressIndex;
            return [address, indexStep];
        } catch (error) {
            const address = "";
            const indexStep = "";
            return [address, indexStep];
        }
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

    move({
        fromIndex,
        toIndex,
        addressFrom,
        addressTo,
        sideToAdd,
        isBlock = false,
    }) {
        const {
            targetObject: targetObjectFrom,
            propertyName: propertyNameFrom,
            isRootAddress: isRootAddressFrom,
        } = this.targetObject(addressFrom);

        const elementFrom = this.findItemInMission({
            targetObject: targetObjectFrom,
            property: propertyNameFrom,
            index: fromIndex,
        });

        let toIndexNew = toIndex;
        let addressToNew = addressTo;
        let fromIndexNew = fromIndex;
        let addressFromNew = addressFrom;

        const optionAddStep = { step: elementFrom };
        if (isBlock) {
            this.addStep(optionAddStep);
            toIndexNew = 100;
            addressToNew = this.currentAddAddress;
        } else {
            optionAddStep.isDefaultLocation = false;
            optionAddStep.addressIndex = [addressTo, toIndex];
            optionAddStep.side = sideToAdd;
            if (!toIndexNew) return;
            this.addStep(optionAddStep);
        }

        // console.log("");
        // console.log("");
        // console.log("");
        // console.log("");
        // console.log("");
        // console.log("ADDRESS FORM");
        // console.log("address:", addressFromNew + "[" + fromIndexNew + "]");
        // console.log("======");
        // console.log("ADDRESS TO");
        // console.log("address:", addressToNew + "[" + toIndexNew + "]");
        console.log();
        console.log();
        console.log();
        console.log();
        console.log("toindex :", toIndexNew);
        const case1 =
            addressFromNew === addressToNew &&
            parseInt(toIndexNew) < parseInt(fromIndex) &&
            toIndexNew;

        const addressBranch = addressFromNew.slice(0, addressToNew.length);

        const indexBranch = addressFromNew.slice(
            addressBranch.length + 1,
            addressFromNew.indexOf("]", addressBranch.length)
        );
        const addressNextPartBranch = addressFromNew.slice(
            addressBranch.length + indexBranch.length + 2,
            addressFromNew.length
        );
        const case2 = () => {
            console.log("sideToAdd: ", sideToAdd);
            const isSameAddress = addressBranch === addressToNew;
            const conditionToIndex =
                parseInt(toIndexNew) + (sideToAdd === "right" ? 1 : 0);
            return (
                isSameAddress &&
                parseInt(indexBranch) >= conditionToIndex &&
                toIndexNew
            );
        };

        if (case1) {
            this.deleteStep({
                address: addressFromNew,
                indexStep: parseInt(fromIndex) + 1,
            });
        } else if (case2()) {
            const addressFromNewDelete = `${addressToNew}[${
                parseInt(indexBranch) + 1
            }]${addressNextPartBranch}`;
            this.deleteStep({
                address: addressFromNewDelete,
                indexStep: fromIndex,
            });
        } else if (toIndexNew) {
            console.log(addressFromNew, fromIndex);

            



            this.deleteStep({ address: addressFromNew, indexStep: fromIndex });
        } else {
            toggerMessage("error", "no found");
        }

        this.render();
    }

    findItemInMission({ targetObject, property, index }) {
        const target = property ? targetObject[property] : targetObject;
        return JSON.parse(JSON.stringify(target[index]));
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

                let objectToAdd = step;
                isJSON(step) && (objectToAdd = JSON.parse(step));
                propertyName
                    ? targetObject[propertyName].push(objectToAdd)
                    : targetObject.push(objectToAdd);
            } else {
                const [address, indexStep] = addressIndex;
                const indexAdd =
                    side === "right"
                        ? parseInt(indexStep) + 1
                        : parseInt(indexStep);
                const { targetObject, propertyName, isRootAddress } =
                    this.targetObject(address);

                let objectToAdd = step;

                isRootAddress &&
                    !(step instanceof Object) &&
                    (objectToAdd = this.Normal({ data: { normal: [step] } }));

                isJSON(step) && (objectToAdd = JSON.parse(step));

                console.log(objectToAdd);
                propertyName
                    ? targetObject[propertyName].splice(
                          indexAdd,
                          0,
                          objectToAdd
                      )
                    : targetObject.splice(indexAdd, 0, objectToAdd);
            }
            useDebounce({ cb: this.save.bind(this), delay: 1000 });
        } catch (error) {
            console.log("[Can't add item]:", error);
        }
    }

    targetObject(address) {
        try {
            const addressParts = address.split(/\.|\[|\]/).filter((e) => e);
            const objectPath = addressParts.slice(0, -1);
            const propertyName = addressParts[addressParts.length - 1];
            const targetObject = objectPath.reduce(
                (targetObject, currentValue) => targetObject[currentValue],
                this.data
            );
            return {
                targetObject,
                propertyName,
                isRootAddress: !address,
            };
        } catch (error) {
            console.log(error);
            return {
                targetObject: null,
                propertyName: null,
                isRootAddress: true,
            };
        }
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
