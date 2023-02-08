import { $, $$ } from "../main.js";
import subscribeTopic from "../rosModule/subscribeTopic.js";
import publishTopic from "../rosModule/topicString.js";
const robotActive = localStorage.getItem("robotActive");
settingRobotStart(robotActive)

export function settingRobotStart(robotActive) {
    setIp(robotActive);
    setModeIp(robotActive);
    setParameter(robotActive);
};

function setIp(robotActive) {
    $(".set-ip-master-btn").onclick = () => {
        const ipMaster = $(".address-ip-master").value;
        publishTopic(`/${robotActive}/set_config`, `(ip_master|${ipMaster})`);
    };

    $(".set-ip-node-btn").onclick = () => {
        const ipNode = $(".address-ip-node").value;
        publishTopic(`/${robotActive}/set_config`, `(ip_node|${ipNode})`);
    };
}
function setModeIp(robotActive) {
    robotActive && setModeRobot(robotActive);
    function setModeRobot(nameRobot) {
        $(".mode-item.active")?.classList.remove("active");
        fetch(`/api/robot/${nameRobot}`)
            .then((res) => res.json())
            .then((data) => {
                $$(".mode-item").forEach((item) => {
                    item.getAttribute("value") == data.mode &&
                        item.classList.add("active");
                });
                console.log(data);

                $(".address-ip-master").value = data.ip_master;
                $(".address-ip-node").value = data.ip_node;
            })
            .then(() => {
                changeModeRobot(robotActive);
            });
    }

    function changeModeRobot(robotActive) {
        let oldMode = $(".mode-item.active")?.getAttribute("value");
        $$(".mode-item").forEach((item) => {
            item.onclick = (e) => {
                $(".mode-item.active")?.classList.remove("active");
                e.target.classList.add("active");
                const mode = e.target.getAttribute("value");
                mode != oldMode &&
                    publishTopic(
                        `/${robotActive}/set_config`,
                        `(mode|${mode})`
                    );
                oldMode = mode;
            };
        });
    }
}

function setParameter(robotActive) {
    $$(".para-input").forEach((element) => {
        element.onfocus = (e) => {
            $$(".para-robot-btn:not(hidden)").forEach((element) => {
                element.classList.add("hidden");
            });
            e.target
                .closest(".para-item")
                .querySelector(".para-robot-btn")
                .classList.remove("hidden");

            e.target
                .closest(".para-item")
                .querySelector(".para-robot-btn").onclick = sendRobotPara;
        };
    });

    function sendRobotPara(e) {
        const type = e.target.getAttribute("type");
        const value = $(`.${type}_input`).value;
        const data = `(${type}|${value})`;
        publishTopic(`/${robotActive}/set_config`, data);
    }

    const types = [
        "robot_wmax",
        "robot_vmax",
        "robot_aw",
        "robot_ax",
        "robot_gear",
        "robot_l",
        "robot_r",
    ];

    subscribeTopic(`/${robotActive}/set_config`, "std_msgs/String", showPara);

    function showPara(data) {
        const dataSetting = data.data
            .replaceAll(")(", "+")
            .replaceAll("(", "")
            .replaceAll(")", "")
            .split("+");
        dataSetting?.forEach((item) => {
            const type = item.split("|")[0];
            const value = item.split("|")[1];

            if (types.indexOf(type) != -1) {
                $(`#${type}`).value = value;
            }
        });
    }
}
