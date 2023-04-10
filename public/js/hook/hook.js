import publishTopic from "../rosModule/pubicTopic.js";
import subscribeTopic from "../rosModule/subscribeTopic.js";

const hook = document.querySelector(".hook-img");
const selectRobotHook = document.querySelector("#robot-hook");
const hookWrapper = document.querySelector(".hook-wrapper");

let listener;
let listenHook;

selectRobotHook.onchange = (e) => {
    console.log(e.target.value);
    const robot = e.target.value;
    listenHook?.unsubscribe();
    listener?.unsubscribe();
    hookWrapper.dataset.status = "disabled";

    listenHook = subscribeTopic(
        `${robot}/hook_switch`,
        "std_msgs/Float32",
        (data, name) => {
            if (data?.data === 0.0) {
                hookWrapper.dataset.status = "disabled";
                listener?.unsubscribe();
                setRotateHook(0);
                console.log();
            } else {
                hookWrapper.dataset.status = "";
                listener = subscribeTopic(
                    `${robot}/hook_encoder`,
                    "std_msgs/Float32",
                    handleUiHook
                );
            }
        }
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

// let data = 1.0;

// setInterval(() => {
//     publishTopic("Mb23_946/hook_switch", data, "std_msgs/Float32");
//     // data = data === 1.0 ? 0.0 : 1.0;
// }, 3000);
