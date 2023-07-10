import { MissionClass } from "../../index.js";
import Step from "../Step.js";
import createHtml from "./createHtml.js";

const blockStep = {
    html: [],
    normal({ data, address }) {
        const htmlNormal = [];
        try {
            data.normal.map((data, index) => {
                if (data instanceof Object) {
                    htmlNormal.push(
                        this[data.type]({
                            data: data.data,
                            address: index,
                            value: data,
                        })
                    );
                } else {
                    htmlNormal.push(Step(data, index));
                }
            });
            const value = MissionClass.Normal({ data: data });
            return createHtml.normal({ normal: htmlNormal, address, value });
        } catch (error) {
            console.log(error);
            htmlNormal.push(Step("step error", "error"))
            return createHtml.normal({ normal: htmlNormal, address, value:"" });
        }
    },
    ifelse({ data, address }) {
        const htmlIfElse = {
            condition: [],
            if_: [],
            else_: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                if (item instanceof Object) {
                    htmlIfElse[key].push(
                        this[item.type]({ data: item.data, address: index })
                    );
                } else {
                    htmlIfElse[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.IfElse({ data: data });
        return createHtml.ifelse({ ...htmlIfElse, address, value });
    },
    trycatch({ data, address }) {
        const htmlTryCatch = {
            try_: [],
            catch_: [],
        };

        for (const key in data) {
            data[key].map((item, index) => {
                if (item instanceof Object) {
                    htmlTryCatch[key].push(
                        this[item.type]({ data: item.data, address: index })
                    );
                } else {
                    htmlTryCatch[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.Trycatch({ data: data });
        return createHtml.trycatch({ ...htmlTryCatch, address, value });
    },
    while({ data, address }) {
        const htmlWhile = {
            condition: [],
            do_: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                if (item instanceof Object) {
                    htmlWhile[key].push(
                        this[item.type]({ data: item.data, address: index })
                    );
                } else {
                    htmlWhile[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.While({ data: data });
        return createHtml.while({ ...htmlWhile, address, value });
    },
    logicAnd({ data, address }) {
        const htmlLogicAnd = {
            logicA: [],
            logicB: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                if (item instanceof Object) {
                    htmlLogicAnd[key].push(
                        this[item.type]({ data: item.data, address: index })
                    );
                } else {
                    htmlLogicAnd[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.LogicAnd({ data: data });
        return createHtml.logicAnd({ ...htmlLogicAnd, address, value });
    },
    logicOr({ data, address }) {
        const htmlLogicOr = {
            logicA: [],
            logicB: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                if (item instanceof Object) {
                    htmlLogicOr[key].push(
                        this[item.type]({ data: item.data, address: index })
                    );
                } else {
                    htmlLogicOr[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.LogicOr({ data: data });

        return createHtml.logicOr({ ...htmlLogicOr, address, value });
    },
};
export default blockStep;
