import Step from "../Step.js";
import createHtml from "./createHtml.js";

const blockStep = {
    html: [],
    normal({ data, address }) {
        const htmlNormal = [];
        data.normal.map((data, index) => {
            if (data instanceof Object) {
                htmlNormal.push(
                    this[data.type]({ data: data.data, address: index })
                );
            } else {
                htmlNormal.push(Step(data, index));
            }
        });
        return createHtml.normal({ normal: htmlNormal, address });
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
        return createHtml.ifelse({ ...htmlIfElse, address });
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

        return createHtml.trycatch({ ...htmlTryCatch, address });
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
        return createHtml.while({ ...htmlWhile, address });
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
        return createHtml.logicAnd({ ...htmlLogicAnd, address });
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
        return createHtml.logicOr({ ...htmlLogicOr, address });
    },
};
export default blockStep;
