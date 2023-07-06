import Mission from "./Class/Mission.js";
import createTypeMission from "./blockStep/create.js";
import blockStep from "./component/BlockStep/index.js";
import Function from "./function/index.js";
import renderMission from "./handle/renderMission.js";

export const MissionClass = new Mission();

createTypeMission();
Function();
handleAddStepToBlockStep();

function handleAddStepToBlockStep() {
    const blockStepWrapper = document.getElementById("block-step-wrapper");
    blockStepWrapper.addEventListener("click", (e) => {
        const buttonAdd = e.target.closest("[data-action-block-step]");
        if (!buttonAdd) return;
        const typeAction = buttonAdd.dataset.actionBlockStep;
        switch (typeAction) {
            case "add":
                MissionClass.setAddressAdd(buttonAdd);
                const activeButton = document.querySelector(
                    '[data-action-block-step="add"].active'
                );
                activeButton?.classList.remove("active");
                buttonAdd.classList.add("active");
                break;
            case "delete":
                const [address, indexItemDelete] = MissionClass.getAddressDelete(buttonAdd);
                console.log(address);
                console.log(indexItemDelete);
                break;
            default:
                console.log(134);
                break;
        }
    });
}

const json = [
    {
        type: "ifelse",
        name: "ifelse_name",
        id: null,
        data: {
            condition: [
                "footprint#truong#4",
                {
                    type: "normal",
                    name: "normal_name",
                    id: null,
                    data: {
                        normal: [
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "gpio#123#22",
                            "variable#123#2",
                            "variable#123#3",
                            "variable#g#4",
                            "variable#g#4",
                            {
                                type: "logicAnd",
                                name: "logic_and_name",
                                id: null,
                                data: {
                                    logicA: [
                                        "sleep#1#2",
                                        {
                                            type: "trycatch",
                                            name: "trycatch_name",
                                            id: null,
                                            data: { try_: [], catch_: [] },
                                        },
                                    ],
                                    logicB: [
                                        "sleep#12#1",
                                        {
                                            type: "trycatch",
                                            name: "trycatch_name",
                                            id: null,
                                            data: { try_: [], catch_: [] },
                                        },
                                    ],
                                },
                            },
                            {
                                type: "logicAnd",
                                name: "logic_and_name",
                                id: null,
                                data: { logicA: [], logicB: [] },
                            },
                        ],
                    },
                },
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
                {
                    type: "trycatch",
                    name: "trycatch_name",
                    id: null,
                    data: {
                        try_: [
                            {
                                type: "normal",
                                name: "normal_name",
                                id: null,
                                data: {
                                    normal: [
                                        "footprint#1#9",
                                        "footprint#1#9",
                                        "footprint#1#9",
                                        "footprint#1#9",
                                        "footprint#1#9",
                                        "footprint#123#7",
                                        "footprint#123#8",
                                        "footprint#truong#4",
                                    ],
                                },
                            },
                            {
                                type: "logicAnd",
                                name: "logic_and_name",
                                id: null,
                                data: {
                                    logicA: [
                                        "footprint#123#7",
                                        "footprint#123#7",
                                        "footprint#123#7",
                                        "footprint#123#7",
                                        "footprint#123#7",
                                    ],
                                    logicB: [
                                        "footprint#1#9",
                                        "footprint#123#8",
                                        "footprint#123#7",
                                        "footprint#truong#4",
                                    ],
                                },
                            },
                            {
                                type: "ifelse",
                                name: "ifelse_name",
                                id: null,
                                data: {
                                    condition: [
                                        {
                                            type: "logicAnd",
                                            name: "logic_and_name",
                                            id: null,
                                            data: {
                                                logicA: ["position#hhhg#1"],
                                                logicB: ["marker#123#1"],
                                            },
                                        },
                                    ],
                                    if_: ["gpio#123#22", "gpio#123#22"],
                                    else_: [
                                        "footprint#truong#4",
                                        "footprint#truong#4",
                                        "footprint#truong#4",
                                        "footprint#truong#4",
                                        "footprint#truong#4",
                                    ],
                                },
                            },
                        ],
                        catch_: [
                            "gpio_module#123#14",
                            "gpio_module#123#13",
                            "gpio_module#ggggg#12",
                            "gpio_module#123#11",
                            "gpio_module#123#11",
                            "gpio_module#123#11",
                            "gpio_module#123#11",
                            "gpio_module#123#11",
                            "gpio_module#123#11",
                            "gpio_module#123#11",
                            "gpio_module#123#11",
                        ],
                    },
                },
                "variable#123#7",
            ],
            if_: [
                "footprint#truong#4",
                {
                    type: "normal",
                    name: "normal_name",
                    id: null,
                    data: {
                        normal: [
                            {
                                type: "trycatch",
                                name: "trycatch_name",
                                id: null,
                                data: { try_: [], catch_: [] },
                            },
                            {
                                type: "logicAnd",
                                name: "logic_and_name",
                                id: null,
                                data: { logicA: [], logicB: [] },
                            },
                        ],
                    },
                },
                {
                    type: "ifelse",
                    name: "ifelse_name",
                    id: null,
                    data: { condition: [], if_: [], else_: [] },
                },
                {
                    type: "trycatch",
                    name: "trycatch_name",
                    id: null,
                    data: {
                        try_: [
                            "gpio_module#123#13",
                            "gpio_module#ggggg#12",
                            "footprint#truong#4",
                            "footprint#123#7",
                            "footprint#123#8",
                            "footprint#123#10",
                            "footprint#123#26",
                        ],
                        catch_: [],
                    },
                },
                {
                    type: "while",
                    name: "while_name",
                    id: null,
                    data: { condition: [], do_: [] },
                },
                {
                    type: "logicOr",
                    name: "logic_or_name",
                    id: null,
                    data: { logicA: [], logicB: [] },
                },
                {
                    type: "logicAnd",
                    name: "logic_and_name",
                    id: null,
                    data: { logicA: [], logicB: [] },
                },
                "gpio_module#123#14",
                "gpio_module#123#14",
                "gpio_module#123#14",
                "gpio_module#123#14",
                {
                    type: "normal",
                    name: "normal_name",
                    id: null,
                    data: { normal: [] },
                },
            ],
            else_: [
                "gpio#123_copy_copy#28",
                {
                    type: "normal",
                    name: "normal_name",
                    id: null,
                    data: {
                        normal: [
                            "sound#1#4",
                            {
                                type: "normal",
                                name: "normal_name",
                                id: null,
                                data: {
                                    normal: [
                                        "sound#1#4",
                                        {
                                            type: "trycatch",
                                            name: "trycatch_name",
                                            id: null,
                                            data: {
                                                try_: [
                                                    "sound#1#4",
                                                    "sound#1#4",
                                                    "gpio_module#a#9",
                                                    "gpio_module#a#9",
                                                    "gpio_module#a#9",
                                                    "gpio_module#a#9",
                                                    "gpio_module#a#9",
                                                ],
                                                catch_: [],
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                },
                "sound#123#10",
            ],
        },
    },
    {
        type: "trycatch",
        name: "trycatch_name",
        id: null,
        data: {
            try_: [
                "gpio_module#a#9",
                {
                    type: "ifelse",
                    name: "ifelse_name",
                    id: null,
                    data: {
                        condition: ["marker#123#1"],
                        if_: ["marker#123#2"],
                        else_: ["marker#123#1"],
                    },
                },
            ],
            catch_: ["marker#1#3"],
        },
    },
    {
        type: "while",
        name: "while_name",
        id: null,
        data: {
            condition: ["marker#123#1"],
            do_: [
                "marker#123#4",
                {
                    type: "logicAnd",
                    name: "logic_and_name",
                    id: null,
                    data: { logicA: [], logicB: [] },
                },
            ],
        },
    },
    {
        type: "logicAnd",
        name: "logic_and_name",
        id: null,
        data: {
            logicA: ["footprint#truong#4"],
            logicB: [
                "gpio#adf_copy#27",
                {
                    type: "logicOr",
                    name: "logic_or_name",
                    id: null,
                    data: { logicA: [], logicB: [] },
                },
            ],
        },
    },
    {
        type: "logicOr",
        name: "logic_or_name",
        id: null,
        data: { logicA: ["gpio#123_copy#26"], logicB: ["gpio#adf_copy#27"] },
    },
    {
        type: "while",
        name: "while_name",
        id: null,
        data: {
            condition: [
                "sound#OFF#12",
                {
                    type: "ifelse",
                    name: "ifelse_name",
                    id: null,
                    data: {
                        condition: [
                            "sound#OFF#12",
                            "footprint#iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii#63",
                        ],
                        if_: ["sound#OFF#12"],
                        else_: ["sound#OFF#12"],
                    },
                },
            ],
            do_: ["sound#OFF#12"],
        },
    },
    {
        type: "logicAnd",
        name: "logic_and_name",
        id: null,
        data: { logicA: [], logicB: [] },
    },
    {
        type: "normal",
        name: "normal_name",
        id: null,
        data: { normal: ["break##"] },
    },
    {
        type: "normal",
        name: "normal_name",
        id: null,
        data: {
            normal: [
                "variable#123#2",
                {
                    type: "ifelse",
                    name: "ifelse_name",
                    id: null,
                    data: {
                        condition: [
                            {
                                type: "normal",
                                name: "normal_name",
                                id: null,
                                data: {
                                    normal: [
                                        {
                                            type: "ifelse",
                                            name: "ifelse_name",
                                            id: null,
                                            data: {
                                                condition: [
                                                    "gpio#123#22",
                                                    "gpio#123#22",
                                                    "gpio#123#22",
                                                    "gpio#adf#23",
                                                    "gpio#123_copy#24",
                                                ],
                                                if_: [
                                                    "footprint#truong#4",
                                                    "footprint#123#7",
                                                    "footprint#123#8",
                                                    "footprint#1#9",
                                                    "sound#hhhh#9",
                                                    "sound#123#10",
                                                    "sound#1#11",
                                                    "sound#OFF#12",
                                                ],
                                                else_: [
                                                    "marker#123#1",
                                                    "marker#123#1",
                                                    "marker#123#1",
                                                    "marker#123#1",
                                                    "marker#123#1",
                                                    "marker#123#1",
                                                    "marker#123#1",
                                                    "marker#123#1",
                                                    "marker#123#1",
                                                ],
                                            },
                                        },
                                        {
                                            type: "trycatch",
                                            name: "trycatch_name",
                                            id: null,
                                            data: {
                                                try_: [
                                                    "position#hhhg#1",
                                                    "position#h#2",
                                                    "position#hhhg#1",
                                                    "sound#1#4",
                                                    "sound#123#5",
                                                    "sound#123#6",
                                                ],
                                                catch_: [
                                                    "break##",
                                                    "break##",
                                                    "break##",
                                                    "break##",
                                                ],
                                            },
                                        },
                                        {
                                            type: "while",
                                            name: "while_name",
                                            id: null,
                                            data: {
                                                condition: [
                                                    "sleep#12#1",
                                                    "sleep#1#2",
                                                    "sleep#10#3",
                                                    "sleep#ggg#4",
                                                ],
                                                do_: [],
                                            },
                                        },
                                        {
                                            type: "logicOr",
                                            name: "logic_or_name",
                                            id: null,
                                            data: { logicA: [], logicB: [] },
                                        },
                                        {
                                            type: "logicAnd",
                                            name: "logic_and_name",
                                            id: null,
                                            data: { logicA: [], logicB: [] },
                                        },
                                        {
                                            type: "logicOr",
                                            name: "logic_or_name",
                                            id: null,
                                            data: { logicA: [], logicB: [] },
                                        },
                                        {
                                            type: "while",
                                            name: "while_name",
                                            id: null,
                                            data: { condition: [], do_: [] },
                                        },
                                    ],
                                },
                            },
                        ],
                        if_: [],
                        else_: [],
                    },
                },
            ],
        },
    },
    {
        type: "normal",
        name: "normal_name",
        id: null,
        data: { normal: ["variable#123#2"] },
    },
    {
        type: "normal",
        name: "normal_name",
        id: null,
        data: { normal: ["variable#123#2"] },
    },
    {
        type: "normal",
        name: "normal_name",
        id: null,
        data: { normal: ["variable#123#2"] },
    },
    {
        type: "normal",
        name: "normal_name",
        id: null,
        data: { normal: ["variable#123#2"] },
    },
    {
        type: "normal",
        name: "normal_name",
        id: null,
        data: { normal: ["variable#123#2"] },
    },
    {
        type: "normal",
        name: "normal_name",
        id: null,
        data: {
            normal: [
                "variable#123#2",
                "variable#g#11",
                {
                    type: "trycatch",
                    name: "trycatch_name",
                    id: null,
                    data: {
                        try_: [
                            {
                                type: "normal",
                                name: "normal_name",
                                id: null,
                                data: {
                                    normal: [
                                        "gpio_module#123#14",
                                        "gpio_module#123#14",
                                        "gpio_module#123#14",
                                        "gpio_module#123#14",
                                    ],
                                },
                            },
                        ],
                        catch_: [],
                    },
                },
            ],
        },
    },
];

const address = json[0].data.condition[1].data.normal[36].data.logicA[1];
console.log(address);
// [0].data.condition[1].data.normal[36].data.logicA[1].data.try_
// [0].data.condition[1].data.normal[36].data.logicA[1].data.logicA