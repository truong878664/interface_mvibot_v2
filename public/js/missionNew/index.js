import { loadingHeader } from "../functionHandle/displayLoad.js";
import useDebounce from "../hooks/useDebouche.js";
import Mission from "./Class/Mission.js";
import createTypeMission from "./blockStep/create.js";
import Function from "./function/index.js";

export const MissionClass = new Mission();

createTypeMission();
Function();
handleAddStepToBlockStep();

function handleAddStepToBlockStep() {
    const blockStepWrapper = document.getElementById("block-step-wrapper");
    blockStepWrapper.addEventListener("click", (e) => {
        const buttonAction = e.target.closest("[data-action-block-step]");
        if (!buttonAction) return;
        const typeAction = buttonAction.dataset.actionBlockStep;
        switch (typeAction) {
            case "add":
                MissionClass.setAddressAdd(buttonAction);
                const activeButton = document.querySelector(
                    '[data-action-block-step="add"].active'
                );
                activeButton?.classList.remove("active");
                buttonAction.classList.add("active");
                break;
            case "delete":
                loadingHeader(true);
                const [address, indexItemDelete] =
                    MissionClass.getAddressDelete(buttonAction);
                const { targetObject, propertyName } =
                    MissionClass.targetObject(address);
                propertyName
                    ? targetObject[propertyName].splice(indexItemDelete, 1)
                    : targetObject.splice(indexItemDelete, 1);

                MissionClass.render();
                useDebounce({
                    cb: MissionClass.save.bind(MissionClass),
                    delay: 1000,
                });
                break;
            case "step":
                const isSticky = buttonAction.querySelector(
                    "[data-name='sticky']"
                );
                if (isSticky) {
                    isSticky.remove();
                } else {
                    removeSticky();
                    const currentStickyShow = blockStepWrapper.querySelector(
                        "[data-sticky='show']"
                    );
                    if (currentStickyShow) {
                        currentStickyShow.dataset.sticky = "hidden";
                    }

                    const sticky = `
                    <div class="absolute top-[120%] left-1/2 -translate-x-1/2 bg-white rounded-md shadow-md text-xl" data-name="sticky">
                        <ul class="bg-white shadow-md py-4 rounded-md overflow-hidden text-stone-900">
                            <li class="px-6 py-1 hover:bg-stone-100 ">
                                <button data-action-block-step="delete" class="btn flex py-2">
                                    <span class="mr-2 text-red-500">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </span>
                                    <span>Delete</span>
                                </button>
                            </li>
                            <li class="px-6 py-1 hover:bg-stone-100 ">
                                <button data-action-block-step="" class="btn flex">
                                    <span class="mr-2 text-sky-500">
                                        <i class="fa-solid fa-circle-info"></i>
                                    </span>
                                    <span>Detail</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    `;
                    const div = document.createElement("div");
                    div.innerHTML = sticky;
                    buttonAction.dataset.sticky = "show";
                    buttonAction.appendChild(div.firstElementChild);
                }
                break;
            case "hidden":
                buttonAction.closest("[data-block-wrapper]").dataset.showData= "hidden"
                break;
            default:
                console.log(134);
                break;
        }
    });

    function removeSticky() {
        blockStepWrapper.querySelector("[data-name='sticky']")?.remove();
    }

    blockStepWrapper.addEventListener("drop", (e) => {
        const [address, indexItemDelete] = MissionClass.getAddressDelete(
            e.target
        );
        // console.log(e.srcElement.);
        console.log(address, indexItemDelete);
        blockStepWrapper.querySelectorAll('.highline-move')?.forEach(e => {
            e.remove()
        })

    });
    const line = document.createElement('div')
    line.classList.add("absolute","top-0","h-full","w-[2px]","rounded-full","bg-main", "highline-move")


    blockStepWrapper.addEventListener("dragover", (e) => {
        const itemDrop = e.target.closest("[data-name='step']");
        if (!itemDrop) return;
        const offsetX = e.offsetX;

        const targetWidth = itemDrop.offsetWidth;
        const distanceFromCenter = offsetX - targetWidth / 2;

        if (distanceFromCenter < 0) {
            line.style.left = "-3px"
            line.style.right = "auto"
        } else {
            line.style.right = "-3px"
            line.style.left = "auto"
        }
        itemDrop.appendChild(line)

        e.preventDefault();
    });
}

// const json = [
//     {
//         type: "ifelse",
//         name: "ifelse_name",
//         id: null,
//         data: {
//             condition: [
//                 "footprint#truong#4",
//                 {
//                     type: "normal",
//                     name: "normal_name",
//                     id: null,
//                     data: {
//                         normal: [
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "gpio#123#22",
//                             "variable#123#2",
//                             "variable#123#3",
//                             "variable#g#4",
//                             "variable#g#4",
//                             {
//                                 type: "logicAnd",
//                                 name: "logic_and_name",
//                                 id: null,
//                                 data: {
//                                     logicA: [
//                                         "sleep#1#2",
//                                         {
//                                             type: "trycatch",
//                                             name: "trycatch_name",
//                                             id: null,
//                                             data: { try_: [], catch_: [] },
//                                         },
//                                     ],
//                                     logicB: [
//                                         "sleep#12#1",
//                                         {
//                                             type: "trycatch",
//                                             name: "trycatch_name",
//                                             id: null,
//                                             data: { try_: [], catch_: [] },
//                                         },
//                                     ],
//                                 },
//                             },
//                             {
//                                 type: "logicAnd",
//                                 name: "logic_and_name",
//                                 id: null,
//                                 data: { logicA: [], logicB: [] },
//                             },
//                         ],
//                     },
//                 },
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 "gpio#jjjjjjjjjjjjjjjjjjjjjj#53",
//                 {
//                     type: "trycatch",
//                     name: "trycatch_name",
//                     id: null,
//                     data: {
//                         try_: [
//                             {
//                                 type: "normal",
//                                 name: "normal_name",
//                                 id: null,
//                                 data: {
//                                     normal: [
//                                         "footprint#1#9",
//                                         "footprint#1#9",
//                                         "footprint#1#9",
//                                         "footprint#1#9",
//                                         "footprint#1#9",
//                                         "footprint#123#7",
//                                         "footprint#123#8",
//                                         "footprint#truong#4",
//                                     ],
//                                 },
//                             },
//                             {
//                                 type: "logicAnd",
//                                 name: "logic_and_name",
//                                 id: null,
//                                 data: {
//                                     logicA: [
//                                         "footprint#123#7",
//                                         "footprint#123#7",
//                                         "footprint#123#7",
//                                         "footprint#123#7",
//                                         "footprint#123#7",
//                                     ],
//                                     logicB: [
//                                         "footprint#1#9",
//                                         "footprint#123#8",
//                                         "footprint#123#7",
//                                         "footprint#truong#4",
//                                     ],
//                                 },
//                             },
//                             {
//                                 type: "ifelse",
//                                 name: "ifelse_name",
//                                 id: null,
//                                 data: {
//                                     condition: [
//                                         {
//                                             type: "logicAnd",
//                                             name: "logic_and_name",
//                                             id: null,
//                                             data: {
//                                                 logicA: ["position#hhhg#1"],
//                                                 logicB: ["marker#123#1"],
//                                             },
//                                         },
//                                     ],
//                                     if_: ["gpio#123#22", "gpio#123#22"],
//                                     else_: [
//                                         "footprint#truong#4",
//                                         "footprint#truong#4",
//                                         "footprint#truong#4",
//                                         "footprint#truong#4",
//                                         "footprint#truong#4",
//                                     ],
//                                 },
//                             },
//                         ],
//                         catch_: [
//                             "gpio_module#123#14",
//                             "gpio_module#123#13",
//                             "gpio_module#ggggg#12",
//                             "gpio_module#123#11",
//                             "gpio_module#123#11",
//                             "gpio_module#123#11",
//                             "gpio_module#123#11",
//                             "gpio_module#123#11",
//                             "gpio_module#123#11",
//                             "gpio_module#123#11",
//                             "gpio_module#123#11",
//                         ],
//                     },
//                 },
//                 "variable#123#7",
//             ],
//             if_: [
//                 "footprint#truong#4",
//                 {
//                     type: "normal",
//                     name: "normal_name",
//                     id: null,
//                     data: {
//                         normal: [
//                             {
//                                 type: "trycatch",
//                                 name: "trycatch_name",
//                                 id: null,
//                                 data: { try_: [], catch_: [] },
//                             },
//                             {
//                                 type: "logicAnd",
//                                 name: "logic_and_name",
//                                 id: null,
//                                 data: { logicA: [], logicB: [] },
//                             },
//                         ],
//                     },
//                 },
//                 {
//                     type: "ifelse",
//                     name: "ifelse_name",
//                     id: null,
//                     data: { condition: [], if_: [], else_: [] },
//                 },
//                 {
//                     type: "trycatch",
//                     name: "trycatch_name",
//                     id: null,
//                     data: {
//                         try_: [
//                             "gpio_module#123#13",
//                             "gpio_module#ggggg#12",
//                             "footprint#truong#4",
//                             "footprint#123#7",
//                             "footprint#123#8",
//                             "footprint#123#10",
//                             "footprint#123#26",
//                         ],
//                         catch_: [],
//                     },
//                 },
//                 {
//                     type: "while",
//                     name: "while_name",
//                     id: null,
//                     data: { condition: [], do_: [] },
//                 },
//                 {
//                     type: "logicOr",
//                     name: "logic_or_name",
//                     id: null,
//                     data: { logicA: [], logicB: [] },
//                 },
//                 {
//                     type: "logicAnd",
//                     name: "logic_and_name",
//                     id: null,
//                     data: { logicA: [], logicB: [] },
//                 },
//                 "gpio_module#123#14",
//                 "gpio_module#123#14",
//                 "gpio_module#123#14",
//                 "gpio_module#123#14",
//                 {
//                     type: "normal",
//                     name: "normal_name",
//                     id: null,
//                     data: { normal: [] },
//                 },
//             ],
//             else_: [
//                 "gpio#123_copy_copy#28",
//                 {
//                     type: "normal",
//                     name: "normal_name",
//                     id: null,
//                     data: {
//                         normal: [
//                             "sound#1#4",
//                             {
//                                 type: "normal",
//                                 name: "normal_name",
//                                 id: null,
//                                 data: {
//                                     normal: [
//                                         "sound#1#4",
//                                         {
//                                             type: "trycatch",
//                                             name: "trycatch_name",
//                                             id: null,
//                                             data: {
//                                                 try_: [
//                                                     "sound#1#4",
//                                                     "sound#1#4",
//                                                     "gpio_module#a#9",
//                                                     "gpio_module#a#9",
//                                                     "gpio_module#a#9",
//                                                     "gpio_module#a#9",
//                                                     "gpio_module#a#9",
//                                                 ],
//                                                 catch_: [],
//                                             },
//                                         },
//                                     ],
//                                 },
//                             },
//                         ],
//                     },
//                 },
//                 "sound#123#10",
//             ],
//         },
//     },
//     {
//         type: "trycatch",
//         name: "trycatch_name",
//         id: null,
//         data: {
//             try_: [
//                 "gpio_module#a#9",
//                 {
//                     type: "ifelse",
//                     name: "ifelse_name",
//                     id: null,
//                     data: {
//                         condition: ["marker#123#1"],
//                         if_: ["marker#123#2"],
//                         else_: ["marker#123#1"],
//                     },
//                 },
//             ],
//             catch_: ["marker#1#3"],
//         },
//     },
//     {
//         type: "while",
//         name: "while_name",
//         id: null,
//         data: {
//             condition: ["marker#123#1"],
//             do_: [
//                 "marker#123#4",
//                 {
//                     type: "logicAnd",
//                     name: "logic_and_name",
//                     id: null,
//                     data: { logicA: [], logicB: [] },
//                 },
//             ],
//         },
//     },
//     {
//         type: "logicAnd",
//         name: "logic_and_name",
//         id: null,
//         data: {
//             logicA: ["footprint#truong#4"],
//             logicB: [
//                 "gpio#adf_copy#27",
//                 {
//                     type: "logicOr",
//                     name: "logic_or_name",
//                     id: null,
//                     data: { logicA: [], logicB: [] },
//                 },
//             ],
//         },
//     },
//     {
//         type: "logicOr",
//         name: "logic_or_name",
//         id: null,
//         data: { logicA: ["gpio#123_copy#26"], logicB: ["gpio#adf_copy#27"] },
//     },
//     {
//         type: "while",
//         name: "while_name",
//         id: null,
//         data: {
//             condition: [
//                 "sound#OFF#12",
//                 {
//                     type: "ifelse",
//                     name: "ifelse_name",
//                     id: null,
//                     data: {
//                         condition: [
//                             "sound#OFF#12",
//                             "footprint#iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii#63",
//                         ],
//                         if_: ["sound#OFF#12"],
//                         else_: ["sound#OFF#12"],
//                     },
//                 },
//             ],
//             do_: ["sound#OFF#12"],
//         },
//     },
//     {
//         type: "logicAnd",
//         name: "logic_and_name",
//         id: null,
//         data: { logicA: [], logicB: [] },
//     },
//     {
//         type: "normal",
//         name: "normal_name",
//         id: null,
//         data: { normal: ["break##"] },
//     },
//     {
//         type: "normal",
//         name: "normal_name",
//         id: null,
//         data: {
//             normal: [
//                 "variable#123#2",
//                 {
//                     type: "ifelse",
//                     name: "ifelse_name",
//                     id: null,
//                     data: {
//                         condition: [
//                             {
//                                 type: "normal",
//                                 name: "normal_name",
//                                 id: null,
//                                 data: {
//                                     normal: [
//                                         {
//                                             type: "ifelse",
//                                             name: "ifelse_name",
//                                             id: null,
//                                             data: {
//                                                 condition: [
//                                                     "gpio#123#22",
//                                                     "gpio#123#22",
//                                                     "gpio#123#22",
//                                                     "gpio#adf#23",
//                                                     "gpio#123_copy#24",
//                                                 ],
//                                                 if_: [
//                                                     "footprint#truong#4",
//                                                     "footprint#123#7",
//                                                     "footprint#123#8",
//                                                     "footprint#1#9",
//                                                     "sound#hhhh#9",
//                                                     "sound#123#10",
//                                                     "sound#1#11",
//                                                     "sound#OFF#12",
//                                                 ],
//                                                 else_: [
//                                                     "marker#123#1",
//                                                     "marker#123#1",
//                                                     "marker#123#1",
//                                                     "marker#123#1",
//                                                     "marker#123#1",
//                                                     "marker#123#1",
//                                                     "marker#123#1",
//                                                     "marker#123#1",
//                                                     "marker#123#1",
//                                                 ],
//                                             },
//                                         },
//                                         {
//                                             type: "trycatch",
//                                             name: "trycatch_name",
//                                             id: null,
//                                             data: {
//                                                 try_: [
//                                                     "position#hhhg#1",
//                                                     "position#h#2",
//                                                     "position#hhhg#1",
//                                                     "sound#1#4",
//                                                     "sound#123#5",
//                                                     "sound#123#6",
//                                                 ],
//                                                 catch_: [
//                                                     "break##",
//                                                     "break##",
//                                                     "break##",
//                                                     "break##",
//                                                 ],
//                                             },
//                                         },
//                                         {
//                                             type: "while",
//                                             name: "while_name",
//                                             id: null,
//                                             data: {
//                                                 condition: [
//                                                     "sleep#12#1",
//                                                     "sleep#1#2",
//                                                     "sleep#10#3",
//                                                     "sleep#ggg#4",
//                                                 ],
//                                                 do_: [],
//                                             },
//                                         },
//                                         {
//                                             type: "logicOr",
//                                             name: "logic_or_name",
//                                             id: null,
//                                             data: { logicA: [], logicB: [] },
//                                         },
//                                         {
//                                             type: "logicAnd",
//                                             name: "logic_and_name",
//                                             id: null,
//                                             data: { logicA: [], logicB: [] },
//                                         },
//                                         {
//                                             type: "logicOr",
//                                             name: "logic_or_name",
//                                             id: null,
//                                             data: { logicA: [], logicB: [] },
//                                         },
//                                         {
//                                             type: "while",
//                                             name: "while_name",
//                                             id: null,
//                                             data: { condition: [], do_: [] },
//                                         },
//                                     ],
//                                 },
//                             },
//                         ],
//                         if_: [],
//                         else_: [],
//                     },
//                 },
//             ],
//         },
//     },
//     {
//         type: "normal",
//         name: "normal_name",
//         id: null,
//         data: { normal: ["variable#123#2"] },
//     },
//     {
//         type: "normal",
//         name: "normal_name",
//         id: null,
//         data: { normal: ["variable#123#2"] },
//     },
//     {
//         type: "normal",
//         name: "normal_name",
//         id: null,
//         data: { normal: ["variable#123#2"] },
//     },
//     {
//         type: "normal",
//         name: "normal_name",
//         id: null,
//         data: { normal: ["variable#123#2"] },
//     },
//     {
//         type: "normal",
//         name: "normal_name",
//         id: null,
//         data: { normal: ["variable#123#2"] },
//     },
//     {
//         type: "normal",
//         name: "normal_name",
//         id: null,
//         data: {
//             normal: [
//                 "variable#123#2",
//                 "variable#g#11",
//                 {
//                     type: "trycatch",
//                     name: "trycatch_name",
//                     id: null,
//                     data: {
//                         try_: [
//                             {
//                                 type: "normal",
//                                 name: "normal_name",
//                                 id: null,
//                                 data: {
//                                     normal: [
//                                         "gpio_module#123#14",
//                                         "gpio_module#123#14",
//                                         "gpio_module#123#14",
//                                         "gpio_module#123#14",
//                                     ],
//                                 },
//                             },
//                         ],
//                         catch_: [],
//                     },
//                 },
//             ],
//         },
//     },
// ];

// const address = json[0].data.condition[1].data.normal[36].data.logicA[1];
// console.log(address);
// // [0].data.condition[1].data.normal[36].data.logicA[1].data.try_
// // [0].data.condition[1].data.normal[36].data.logicA[1].data.logicA
