import Step from "../Step.js";
import createHtml from "./createHtml.js";

const blockStep = {
    html: [],
    normal({ data }) {
        const htmlNormal = [];
        data.normal.map((data) => {
            if (data instanceof Object) {
                htmlNormal.push(this[data.type]({ data: data.data }));
            } else {
                htmlNormal.push(Step(data));
            }
        });
        return createHtml.normal({ normal: htmlNormal });
    },
    ifelse({ data }) {
        const htmlIfElse = {
            condition: [],
            if_: [],
            else_: [],
        };
        for (const key in data) {
            data[key].map((item) => {
                if (item instanceof Object) {
                    htmlIfElse[key].push(this[item.type]({ data: item.data }));
                } else {
                    htmlIfElse[key].push(Step(item));
                }
            });
        }
        return createHtml.ifelse(htmlIfElse);
    },
    trycatch({ data }) {
        const htmlTryCatch = {
            try_: [],
            catch_: [],
        };

        for (const key in data) {
            data[key].map((item) => {
                if (item instanceof Object) {
                    htmlTryCatch[key].push(
                        this[item.type]({ data: item.data })
                    );
                } else {
                    htmlTryCatch[key].push(Step(item));
                }
            });
        }

        return createHtml.trycatch(htmlTryCatch);
    },
    while({ data }) {
        const htmlWhile = {
            condition: [],
            do_: [],
        };
        for (const key in data) {
            data[key].map((item) => {
                if (item instanceof Object) {
                    htmlWhile[key].push(this[item.type]({ data: item.data }));
                } else {
                    htmlWhile[key].push(Step(item));
                }
            });
        }
        return createHtml.while(htmlWhile);
    },
    logicAnd({ data }) {
        const htmlLogicAnd = {
            logicA: [],
            logicB: [],
        };
        for (const key in data) {
            data[key].map((item) => {
                if (item instanceof Object) {
                    htmlLogicAnd[key].push(
                        this[item.type]({ data: item.data })
                    );
                } else {
                    htmlLogicAnd[key].push(Step(item));
                }
            });
        }
        return createHtml.logicAnd(htmlLogicAnd);
    },
    logicOr({ data }) {
        const htmlLogicOr = {
            logicA: [],
            logicB: [],
        };
        for (const key in data) {
            data[key].map((item) => {
                if (item instanceof Object) {
                    htmlLogicOr[key].push(this[item.type]({ data: item.data }));
                } else {
                    htmlLogicOr[key].push(Step(item));
                }
            });
        }
        return createHtml.logicOr(htmlLogicOr);
    },
};
export default blockStep;
