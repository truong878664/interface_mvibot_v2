import { MissionClass } from "../../index.js";
import Step from "../Step.js";
import createHtml from "./createHtml.js";

const blockStep = {
    html: [],
    normal({ data, address, name = null, handleAble = false }) {
        const htmlNormal = [];
        data.normal.map((item, index) => {
            if (item instanceof Object) {
                htmlNormal.push(
                    this[item.type]({
                        data: item.data,
                        address: index,
                        value: item,
                        name: item.name,
                        handleAble,
                    })
                );
            } else {
                htmlNormal.push(Step(item, index));
            }
        });
        const value = MissionClass.Normal({ data: data, name });
        return createHtml.normal({
            normal: htmlNormal,
            address,
            value,
            handleAble,
        });
    },
    ifelse({ data, address, name = null, handleAble = false }) {
        const htmlIfElse = {
            condition: [],
            if_: [],
            else_: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                if (item instanceof Object) {
                    htmlIfElse[key].push(
                        this[item.type]({
                            data: item.data,
                            address: index,
                            name: item.name,
                            handleAble,
                        })
                    );
                } else {
                    htmlIfElse[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.IfElse({ data: data, name });
        return createHtml.ifelse({ ...htmlIfElse, address, value, handleAble });
    },
    trycatch({ data, address, name = null, handleAble = false }) {
        const htmlTryCatch = {
            try_: [],
            catch_: [],
        };

        for (const key in data) {
            data[key].map((item, index) => {
                if (item instanceof Object) {
                    htmlTryCatch[key].push(
                        this[item.type]({
                            data: item.data,
                            address: index,
                            name: item.name,
                            handleAble,
                        })
                    );
                } else {
                    htmlTryCatch[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.Trycatch({ data: data, name });
        return createHtml.trycatch({
            ...htmlTryCatch,
            address,
            value,
            handleAble,
        });
    },
    while({ data, address, name = null, handleAble = false }) {
        const htmlWhile = {
            condition: [],
            do_: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                if (item instanceof Object) {
                    htmlWhile[key].push(
                        this[item.type]({
                            data: item.data,
                            address: index,
                            name: item.name,
                            handleAble,
                        })
                    );
                } else {
                    htmlWhile[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.While({ data: data, name });
        return createHtml.while({ ...htmlWhile, address, value, handleAble });
    },
    logicAnd({ data, address, name = null, handleAble = false }) {
        const htmlLogicAnd = {
            logicA: [],
            logicB: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                if (item instanceof Object) {
                    htmlLogicAnd[key].push(
                        this[item.type]({
                            data: item.data,
                            address: index,
                            name: item.name,
                            handleAble,
                        })
                    );
                } else {
                    htmlLogicAnd[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.LogicAnd({ data: data, name });
        return createHtml.logicAnd({
            ...htmlLogicAnd,
            address,
            value,
            handleAble,
        });
    },
    logicOr({ data, address, name = null, handleAble = false }) {
        const htmlLogicOr = {
            logicA: [],
            logicB: [],
        };
        for (const key in data) {
            data[key].map((item, index) => {
                if (item instanceof Object) {
                    htmlLogicOr[key].push(
                        this[item.type]({
                            data: item.data,
                            address: index,
                            name: item.name,
                            handleAble,
                        })
                    );
                } else {
                    htmlLogicOr[key].push(Step(item, index));
                }
            });
        }
        const value = MissionClass.LogicOr({ data: data, name });
        return createHtml.logicOr({
            ...htmlLogicOr,
            address,
            value,
            handleAble,
        });
    },
};
export default blockStep;
