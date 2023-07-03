import renderBlockStep from "./handle/renderBlockStep.js";
import blockStep from "./handle/renderBlockStep.js";
import renderStepItem from "../component/Step.js";

const IfElse = {
    type: "ifelse",
    data: {
        condition: ["footprint#HS_123#1", "marker#HS_111#1"],
        if_: ["marker#HS_111#1", "gpio_module#JS_123#2"],
        else_: [
            "footprint#HS_123#1",
            "marker#HS_111#1",
            "gpio_module#JS_123#2",
            "gpio#HB_999#23",
        ],
    },
};
const Normal = {
    type: "normal",
    data: {
        normal: [
            "footprint#HS_123#1",
            "marker#HS_111#1",
            "gpio_module#JS_123#2",
            "gpio#HB_999#23",
        ],
    },
};

const Trycatch = {
    type: "trycatch",
    data: {
        try_: ["gpio_module#HS_1II#2", "gpio_module#KK_1II#2"],
        catch_: ["gpio_module#HK_1II#2"],
    },
};

const LogicAnd = {
    type: "logicAnd",
    data: {
        logicA: ["gpio_module#AS_1II#2", "gpio_module#HS_1II#2"],
        logicB: ["gpio_module#TT_1II#2", "position#HS_1II#2"],
    },
};

const LogicOr = {
    type: "logicOr",
    data: {
        logicA: ["sleep#HD_1II#2", "variable#HS_1II#2"],
        logicB: ["variable#HS_1II#2", "gpio_module#JG_1IDPP#3", "break"],
    },
};

const While = {
    type: "while",
    data: {
        condition: ["variable#HS_1II#2", "gpio_module#HS_1GEDI#2", "break"],
        do_: ["marker#HS_1II#2", "gpio_module#HS_GDII#2"],
    },
};



