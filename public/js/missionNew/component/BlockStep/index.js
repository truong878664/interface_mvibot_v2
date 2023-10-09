import { MissionClass } from "../../index.js";
import Step from "../Step.js";
import createHtml from "./createHtml.js";

const blockStep = {
    html: [],
    normal({ data, address, name = null, handleAble = false, ...rest }) {
        const htmlNormal = [];
        data.normal.map((item, index) => {
            const { data, name, type, ...rest } = item;
            if (item instanceof Object) {
                htmlNormal.push(
                    this[type]({
                        data,
                        address: index,
                        value: item,
                        name,
                        handleAble,
                        ...rest,
                    })
                );
            } else {
                htmlNormal.push(Step(item, index));
            }
        });
        const value = MissionClass.Normal({ data: data, name, ...rest });
        return createHtml.normal({
            normal: htmlNormal,
            address,
            value,
            handleAble,
        });
    },
    ifelse({ data, address, name = null, handleAble = false, ...rest }) {
        const htmlIfElse = {
            condition: [],
            if_: [],
            else_: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                const { data, name, type, ...rest } = item;
                if (item instanceof Object) {
                    htmlIfElse[key].push(
                        this[type]({
                            data,
                            address: index,
                            name,
                            handleAble,
                            ...rest,
                        })
                    );
                } else {
                    htmlIfElse[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.IfElse({ data: data, name, ...rest });
        return createHtml.ifelse({
            ...htmlIfElse,
            address,
            value,
            handleAble,
        });
    },
    trycatch({ data, address, name = null, handleAble = false, ...rest }) {
        const htmlTryCatch = {
            try_: [],
            catch_: [],
        };

        for (const key in data) {
            data[key].map((item, index) => {
                const { data, name, type, ...rest } = item;
                if (item instanceof Object) {
                    htmlTryCatch[key].push(
                        this[type]({
                            data,
                            address: index,
                            name,
                            handleAble,
                            ...rest,
                        })
                    );
                } else {
                    htmlTryCatch[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.Trycatch({ data: data, name, ...rest });
        return createHtml.trycatch({
            ...htmlTryCatch,
            address,
            value,
            handleAble,
        });
    },
    while({ data, address, name = null, handleAble = false, ...rest }) {
        const htmlWhile = {
            condition: [],
            do_: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                const { data, name, type, ...rest } = item;
                if (item instanceof Object) {
                    htmlWhile[key].push(
                        this[type]({
                            data,
                            address: index,
                            name,
                            handleAble,
                            ...rest,
                        })
                    );
                } else {
                    htmlWhile[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.While({ data: data, name, ...rest });
        return createHtml.while({
            ...htmlWhile,
            address,
            value,
            handleAble,
        });
    },
    logicAnd({ data, address, name = null, handleAble = false, ...rest }) {
        const htmlLogicAnd = {
            logicA: [],
            logicB: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                const { data, name, type, ...rest } = item;
                if (item instanceof Object) {
                    htmlLogicAnd[key].push(
                        this[type]({
                            data,
                            address: index,
                            name,
                            handleAble,
                            ...rest,
                        })
                    );
                } else {
                    htmlLogicAnd[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.LogicAnd({ data: data, name, ...rest });
        return createHtml.logicAnd({
            ...htmlLogicAnd,
            address,
            value,
            handleAble,
        });
    },
    logicOr({ data, address, name = null, handleAble = false, ...rest }) {
        const htmlLogicOr = {
            logicA: [],
            logicB: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                const { data, name, type, ...rest } = item;
                if (item instanceof Object) {
                    htmlLogicOr[key].push(
                        this[type]({
                            data,
                            address: index,
                            name,
                            handleAble,
                            ...rest,
                        })
                    );
                } else {
                    htmlLogicOr[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.LogicOr({ data: data, name, ...rest });
        return createHtml.logicOr({
            ...htmlLogicOr,
            address,
            value,
            handleAble,
        });
    },
};
export default blockStep;
