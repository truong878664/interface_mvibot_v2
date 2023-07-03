import Mission from "./Class/Mission.js";
import createTypeMission from "./blockStep/create.js";
import blockStep from "./component/BlockStep/index.js";
import Function from "./function/index.js";
import renderMission from "./handle/renderMission.js";

export const MissionClass = new Mission();

createTypeMission();
Function();
handleAddStepToBlockStep();

// const Normal = {
//     type: "normal",
//     data: {
//         normal: [
//             "footprint#HS_123#1",
//             {
//                 type: "trycatch",
//                 data: {
//                     try_: [
//                         "gpio_module#HS_1II#2",
//                         "gpio_module#KK_1II#2",
//                         {
//                             type: "ifelse",
//                             data: {
//                                 condition: [
//                                     "footprint#HS_123#1",
//                                     "marker#HS_111#1",
//                                 ],
//                                 if_: [
//                                     "marker#HS_111#1",
//                                     "gpio_module#JS_123#2",
//                                 ],
//                                 else_: [
//                                     "footprint#HS_123#1",
//                                     "marker#HS_111#1",
//                                     "gpio_module#JS_123#2",
//                                     "gpio#HB_999#23",
//                                 ],
//                             },
//                         },
//                     ],
//                     catch_: [
//                         "gpio_module#HK_1II#2",
//                         {
//                             type: "ifelse",
//                             data: {
//                                 condition: [
//                                     "footprint#HS_123#1",
//                                     "marker#HS_111#1",
//                                 ],
//                                 if_: [
//                                     "marker#HS_111#1",
//                                     "gpio_module#JS_123#2",
//                                 ],
//                                 else_: [
//                                     "footprint#HS_123#1",
//                                     "marker#HS_111#1",
//                                     "gpio_module#JS_123#2",
//                                     "gpio#HB_999#23",
//                                 ],
//                             },
//                         },
//                     ],
//                 },
//             },
//             "marker#HS_111#1",
//             "gpio_module#JS_123#2",
//             "gpio#HB_999#23",
//             {
//                 type: "ifelse",
//                 data: {
//                     condition: ["footprint#HS_123#1", "marker#HS_111#1"],
//                     if_: ["marker#HS_111#1", "gpio_module#JS_123#2"],
//                     else_: [
//                         "footprint#HS_123#1",
//                         "marker#HS_111#1",
//                         "gpio_module#JS_123#2",
//                         "gpio#HB_999#23",
//                     ],
//                 },
//             },
//         ],
//     },
// };

// MissionClass.data.push(Normal);
// MissionClass.render();

function handleAddStepToBlockStep() {
    const blockStepWrapper = document.getElementById("block-step-wrapper");
    blockStepWrapper.addEventListener("click", (e) => {
        const buttonAdd = e.target.closest('[data-action-block-step="add"]');
        if (!buttonAdd) return;
        MissionClass.getAddress(buttonAdd);
        buttonAdd.classList.add('active')
    });
}
