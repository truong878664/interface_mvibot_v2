import BlockStep from "../component/BlockStep/index.js";

export default class Mission {
    constructor() {
        this.data = [];
        this.currentAddAddress = "";
    }
    Normal({ data = "" }) {
        return {
            type: "normal",
            data: {
                normal: data.split("|").filter((i) => i) || [],
            },
        };
    }
    IfElse({ data = "" }) {
        const dataIfElse = data?.split("?");
        const condition = dataIfElse[0]?.split("|").filter((i) => i) || [];
        const if_ = dataIfElse[1]?.split("|").filter((i) => i) || [];
        const else_ = dataIfElse[2]?.split("|").filter((i) => i) || [];
        return {
            type: "ifelse",
            data: {
                condition,
                if_,
                else_,
            },
        };
    }
    Trycatch({ data = "" }) {
        const dataTryCatch = data?.split("?");
        const try_ = dataTryCatch[0]?.split("|").filter((i) => i) || [];
        const catch_ = dataTryCatch[1]?.split("|").filter((i) => i) || [];
        return {
            type: "trycatch",
            data: {
                try_,
                catch_,
            },
        };
    }
    While({ data = "" }) {
        const dataWhile = data?.split("?");
        const condition = dataWhile[0].split("|").filter((i) => i) || [];
        const do_ = dataWhile[1]?.split("|").filter((i) => i) || [];
        return {
            type: "while",
            data: {
                condition,
                do_,
            },
        };
    }
    render() {
        const html = [];
        this.data.map((item, index) => {
            html.push(BlockStep[item.type]({ ...item, address: index }));
            return html;
        });

        const blockWrapper = document.getElementById("block-step-wrapper");
        blockWrapper.innerHTML = html.join("");
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
        this.currentAddAddress = addressCurrentAt.join("");
        return addressCurrentAt.join("");
    }
    addItem(newItem) {
        const addressParts = this.currentAddAddress.split(".");
        const objectPath = addressParts.slice(0, -1).join(".");
        const propertyName = addressParts[addressParts.length - 1];
        try {
            const targetObject = eval("this.data" + objectPath);
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
        } catch (error) {
            console.log("Không thể thêm phần tử:", error);
        }
    }
}
