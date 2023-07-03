

const IfElse = {
    type: "ifelse",
    data: {
        condition: ["marker#c#1", "gpio_module#c#1"],
        if_: ["gpio_module#i#2", "footprint#i#2"],
        else_: ["gpio_module#e#4", "gpio_module#e#4"],
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
        try_: ["gpio_module#name#2", "gpio_module#name#2", { ...Normal }],
        catch_: ["gpio_module#name#2"],
    },
};

const LogicAnd = {
    type: "logicAnd",
    data: {
        logicA: ["gpio_module#name#2", "gpio_module#name#2"],
        logicB: ["gpio_module#name#2", "gpio_module#name#2"],
    },
};

const LogicOr = {
    type: "logicOr",
    data: {
        logicA: ["gpio_module#name#2", "gpio_module#name#2"],
        logicB: ["gpio_module#name#2", "gpio_module#name#2"],
    },
};

const While = {
    type: "while",
    data: {
        condition: [{ ...LogicAnd }, { ...LogicOr }],
        do_: ["gpio_module#name#2", "gpio_module#name#2"],
    },
};
