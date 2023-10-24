import { loadingHeader } from "../../functionHandle/displayLoad.js";
import useDebounce from "../../hooks/useDebouche.js";
import { toggerMessage } from "../../main.js";
import publishTopicString from "../../rosModule/topicString.js";
import BlockStep from "../component/BlockStep/index.js";
import isJSON from "../handle/isJson.js";

export default class Mission {
    constructor(id) {
        this.data = [];
        this.currentAddAddress = "";
        this.missionWrapperElement =
            document.getElementById("block-step-wrapper");
        this.id = id;
        this.typeMission = document.getElementById("type-mission")?.value;
        this.UrlApi = "/api/mission-v4/" + this.id;
        this.saved = true;
        this.historyStatus = { data: [], currentLastIndexHistory: 0 };
        this.wakeup = { normal: {}, module: {} };
        this.stop = { normal: {}, module: {} };
        this.continue = { normal: {}, module: {} };
    }
    async get() {
        const urlGet = this.UrlApi + "?kind=get";
        const res = await fetch(urlGet);
        const data = await res.json();
        this.data = JSON.parse(data.mission_shorthand || "[]");
        this.wakeup = JSON.parse(data.wake_up || `{"normal":{},"module":{}}`);
        this.stop = JSON.parse(data.stop || `{"normal":{},"module":{}}`);
        this.continue = JSON.parse(
            data.continue || `{"normal":{},"module":{}}`,
        );
        this.historyStatus.data.push(JSON.parse(JSON.stringify(this.data)));
        this.render();
    }
    async getDataByName(name) {
        const urlGet = "/api/mission-v4/" + name + "?kind=get_by_name";
        const res = await fetch(urlGet);
        const status = await res.json();
        return status;
    }
    async getDataById(id) {
        const urlGet = "/api/mission-v4/" + id + "?kind=get_by_id";
        const res = await fetch(urlGet);
        const status = await res.json();
        return status;
    }
    save() {
        useDebounce({ cb: this._save.bind(this), delay: 600 });
    }

    async _save() {
        try {
            const res = await fetch(this.UrlApi, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mission_shorthand: JSON.stringify(this.data),
                    wake_up: JSON.stringify(this.wakeup),
                    stop: JSON.stringify(this.stop),
                    continue: JSON.stringify(this.continue),
                }),
            });
            const message = await res.json();
            console.log("save");

            const dataDevice = {
                name: navigator.userAgent,
                id: window.name,
            };
            publishTopicString(
                `/change_data_mission/${this.id}`,
                JSON.stringify(dataDevice),
            );

            loadingHeader(false);
            return { saved: true, message: "Successfully saved" };
        } catch (error) {
            toggerMessage("error", "ERR!, Please try again!" + error);
            loadingHeader(false);
            console.log(error);
            return { saved: false, message: "ERR!, " + error };
        }
    }
    async getDataRobot({ html = false }) {
        try {
            await this._save();
            const urlGet =
                this.UrlApi + "?kind=convert_data_robot" + `&html=${html}`;
            const res = await fetch(urlGet);
            const data = await res.json();
            return {
                id: data.id,
                success: true,
                message: "Saving data!",
                data: data.data,
                wakeup: data.wakeup,
                stop: data.stop,
                continue: data.continue,
                name: data.name,
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: "ERR!, Please check your internet and try again!!",
                data: "",
            };
        }
    }
    dataEndToRobot(data) {
        const dataEnd = `&/name_mission>${data.name}//id_mission>${data.id}//data_configuration>${data.continue}${data.wakeup}${data.stop}/*${data.data}@`;
        return dataEnd;
    }
    render() {
        try {
            const html = this.renderHtml({ data: this.data });
            const buttonAddRoot = `<button data-action-block-step="add" class="active-block-step-root btn w-7 h-7 relative flex justify-center rounded-md mb-2 ml-2  items-center text-sky-500 bg-sky-100 self-center [&amp;.active]:bg-sky-800 [&amp;.active]:text-white"> <i class="fa-solid fa-plus"></i></button>`;
            this.missionWrapperElement.innerHTML = html + buttonAddRoot;
            this.activeAddButton();
        } catch (error) {
            console.log(error);
        }
    }
    renderHtml({ data, handleAble = true }) {
        const html = [];
        data?.map((item, index) => {
            html.push(
                BlockStep[item?.type]?.({
                    ...item,
                    address: index,
                    name: item.name,
                    handleAble,
                }),
            );
            return html;
        });
        return html.join("");
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
                "[data-block-wrapper]",
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
                    `[${address}].data.${typeDetailValue}`,
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
    deleteStep({ address, indexStep, kind = "delete" }) {
        try {
            loadingHeader(true);
            const { targetObject, propertyName } = this.targetObject(address);
            propertyName
                ? targetObject[propertyName].splice(indexStep, 1)
                : targetObject.splice(indexStep, 1);
        } catch (error) {
            console.log(error);
            toggerMessage("error", "ERR!. Reload please!");
        }
        kind === "delete" &&
            this.addHistory({ data: JSON.parse(JSON.stringify(this.data)) });
        this.resetCurrentAddAddress();
        useDebounce({ cb: this.save.bind(this), delay: 1000 });
    }
    setAddressAdd(element) {
        this.currentAddAddress = this.getAddress(element);
    }
    addStyle({ address, indexStep, style }) {
        try {
            const { targetObject, propertyName } = this.targetObject(address);
            const targetItemAddStyle = propertyName
                ? targetObject[propertyName][indexStep]
                : targetObject[indexStep];
            const currentStyle = targetItemAddStyle.style;
            targetItemAddStyle.style = { ...currentStyle, ...style };
            this.save();
        } catch (error) {
            console.log(error);
        }
    }
    update({ address, indexStep, data }) {
        const { targetObject, propertyName } = this.targetObject(address);
        const targetItemAddStyle = propertyName
            ? targetObject[propertyName][indexStep]
            : targetObject[indexStep];
        if (targetItemAddStyle) {
            for (const key in data) {
                targetItemAddStyle[key] = data[key];
            }
        }
        this.render();
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

        const optionAddStep = { step: elementFrom, kind: "move" };
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

        const case1 =
            addressFromNew === addressToNew &&
            parseInt(toIndexNew) < parseInt(fromIndex) &&
            toIndexNew;

        const addressBranch = addressFromNew.slice(0, addressToNew.length);

        const indexBranch = addressFromNew.slice(
            addressBranch.length + 1,
            addressFromNew.indexOf("]", addressBranch.length),
        );
        const addressNextPartBranch = addressFromNew.slice(
            addressBranch.length + indexBranch.length + 2,
            addressFromNew.length,
        );
        const case2 = () => {
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
                kind: "move",
            });
        } else if (case2()) {
            const addressFromNewDelete = `${addressToNew}[${
                parseInt(indexBranch) + 1
            }]${addressNextPartBranch}`;
            this.deleteStep({
                address: addressFromNewDelete,
                indexStep: fromIndex,
                kind: "move",
            });
        } else if (toIndexNew) {
            const addressFromDelete =
                addressFromNew + "[" + fromIndexNew + "]" + ".data";

            const moveIntoItself =
                addressToNew.slice(0, addressFromDelete.length) !==
                addressFromDelete;
            if (moveIntoItself) {
                this.deleteStep({
                    address: addressFromNew,
                    indexStep: fromIndex,
                    kind: "move",
                });
            }
        } else {
            toggerMessage("error", "Reload and try again!");
        }
        this.addHistory({ data: JSON.parse(JSON.stringify(this.data)) });
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
        kind = "add",
    }) {
        try {
            loadingHeader(true);
            if (isDefaultLocation) {
                if (!this.currentAddAddress && !(step instanceof Object)) {
                    const normal = this.Normal({ data: { normal: [step] } });
                    this.data.push(normal);
                } else {
                    const { targetObject, propertyName } = this.targetObject(
                        this.currentAddAddress,
                    );

                    let objectToAdd = step;
                    isJSON(step) && (objectToAdd = JSON.parse(step));
                    propertyName
                        ? targetObject[propertyName].push(objectToAdd)
                        : targetObject.push(objectToAdd);
                }
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

                propertyName
                    ? targetObject[propertyName].splice(
                          indexAdd,
                          0,
                          objectToAdd,
                      )
                    : targetObject.splice(indexAdd, 0, objectToAdd);
            }
            //add history
            kind === "add" &&
                this.addHistory({
                    data: JSON.parse(JSON.stringify(this.data)),
                });

            //save data to database
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
                this.data,
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
                querys.join(" "),
            );
            const buttonAdd = parentButtonAdd?.querySelector(
                "[data-action-block-step='add']",
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
    history({ type }) {
        // type = undo || redo
        if (type === "undo") {
            this.historyStatus.currentLastIndexHistory--;
        } else if (type === "redo") {
            this.historyStatus.currentLastIndexHistory++;
        }

        let currentLastIndexHistory =
            this.historyStatus.currentLastIndexHistory;

        if (this.historyStatus.data.length === 0) {
            this.historyStatus.currentLastIndexHistory = 0;
            toggerMessage("error", "No data to undo & redo!");
            return;
        }

        if (
            this.historyStatus.data.length <=
                Math.abs(currentLastIndexHistory) &&
            type == "undo"
        ) {
            this.historyStatus.currentLastIndexHistory = -(
                this.historyStatus.data.length - 1
            );
            toggerMessage("error", "No data to undo!");
            return;
        }

        if (currentLastIndexHistory > 0 && type == "redo") {
            this.historyStatus.currentLastIndexHistory = 0;
            toggerMessage("error", "No data to redo!");
            return;
        }
        loadingHeader(true);
        this.data =
            this.historyStatus.data[
                this.historyStatus.data.length - 1 + currentLastIndexHistory
            ] || [];

        useDebounce({ cb: this.save.bind(this), delay: 1000 });
        this.render();
    }
    addHistory({ data }) {
        const currentHistory = this.historyStatus.currentLastIndexHistory;
        const lengthHistory = this.historyStatus.data.length;
        const dataHistory = this.historyStatus.data;

        this.historyStatus.data.length === 10 &&
            this.historyStatus.data.shift();

        if (currentHistory === 0) {
            this.historyStatus.data.push(JSON.parse(JSON.stringify(data)));
        } else {
            this.historyStatus.data.splice(
                lengthHistory + currentHistory,
                Math.abs(currentHistory),
                JSON.parse(JSON.stringify(data)),
            );
        }
        this.historyStatus.currentLastIndexHistory = 0;
    }
    get dataMission() {
        return this.data;
    }
    Normal({
        data = { normal: [] },
        name = null,
        id = null,
        style = { hidden: false },
    }) {
        return { type: "normal", name, id, data: data, style };
    }
    IfElse({
        data = { condition: [], if_: [], else_: [] },
        name = null,
        id = null,
        style = { hidden: false },
    }) {
        return { type: "ifelse", name, id, data: data, style };
    }
    Trycatch({
        data = { try_: [], catch_: [] },
        name = null,
        id = null,
        style = { hidden: false },
    }) {
        return { type: "trycatch", name, id, data: data, style };
    }
    While({
        data = { condition: [], do_: [] },
        name = null,
        id = null,
        style = { hidden: false },
    }) {
        return { type: "while", name, id, data: data, style };
    }
    LogicOr({
        data = { logicA: [], logicB: [] },
        name = null,
        id = null,
        style = { hidden: false },
    }) {
        return { type: "logicOr", name, id, data: data, style };
    }
    LogicAnd({
        data = { logicA: [], logicB: [] },
        name = null,
        id = null,
        style = { hidden: false },
    }) {
        return { type: "logicAnd", name, id, data: data, style };
    }
}
