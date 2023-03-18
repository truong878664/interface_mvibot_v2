import publishTopic from "../rosModule/pubicTopic.js";
import subscribeTopic from "../rosModule/subscribeTopic.js";

const MAX_ROTATE = 90;
const MIN_ROTATE = -90;
const hook = document.querySelector(".hook-img");
const rangeHook = document.querySelector(".change-hook");
const selectRobotHook = document.querySelector("#robot-hook");
let listener;

selectRobotHook.onchange = (e) => {
    console.log(e.target.value);
    const robot = e.target.value;

    listener?.unsubscribe();
    listener = subscribeTopic(
        `${robot}/hook_encoder`,
        "std_msgs/Float32",
        handleUiHook
    );
};
function handleUiHook(data, name) {
    const deg = (data.data / Math.PI) * 180;
    setRotateHook(deg);
}

function setRotateHook(deg) {
    hook.style.rotate = -deg + "deg";
}

// let deg = 0;
// let right = true;
// setInterval(() => {
//     const rad = deg * (Math.PI / 180);

//     publishTopic("Mb23_946/hook_encoder", rad, "std_msgs/Float32");
//     right ? deg++ : deg--;
//     deg === 90 && (right = false);
//     deg === -90 && (right = true);
// }, 1000);
