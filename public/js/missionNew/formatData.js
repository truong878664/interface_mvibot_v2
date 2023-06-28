
const IfElse = {
    type: "ifelse",
    data: {
        condition: ["gpio_module|2", "gpio_module|2"],
        if: ["gpio_module|2", "gpio_module|2"],
        else: ["gpio_module|2", "gpio_module|2"],
    },
};
const Normal = {
    type: "normal",
    data: {
        normal: ["footprint|1", "gpio|23",{...IfElse} ,"gpio_module|2"],
    },
};

const TryCatch = {
    type: "trycatch",
    data: {
        try: ["gpio_module|2", "gpio_module|2"],
        catch: ["gpio_module|2", "gpio_module|2"],
    },
};

const While = {
    type: "white",
    data: {
        condition: ["gpio_module|2",{...TryCatch}, "gpio_module|2", {...TryCatch}],
        do: ["gpio_module|2", "gpio_module|2"],
    },
};

const LogicAnd = {
    type: "logic_and",
    data: {
        logicA: ["gpio_module|2", "gpio_module|2"],
        logicB: ["gpio_module|2", "gpio_module|2"],
    },
};

const LogicOr = {
    type: "logic_or",
    data: {
        logicA: ["gpio_module|2", "gpio_module|2"],
        logicB: ["gpio_module|2", "gpio_module|2"],
    },
};

const data = [
    {...Normal},
    {...While}
]

data.map((data, index) => {
    console.log(data.data)
})
