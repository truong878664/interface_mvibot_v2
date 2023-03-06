import { $, $$ } from "../main.js";
import wifi from "./wifi.js";
import robot from "./robot.js";
import parameter from "./parameter.js";
import power from "./power.js";
import mode from "./mode.js";
import ip from "./ip.js";
import volume, { uiIcon } from "./volume.js";

showSettingRobot();
handleTabSetting();

wifi();
robot();
parameter();
power();
mode();
ip();
volume();

function handleTabSetting() {
    $$(".setting-item").forEach((element, index) => {
        element.onclick = (e) => {
            $(".setting-item.active").classList.remove("active");
            e.target.classList.add("active");
            $$(".setting-detail").forEach((element) => {
                element.classList.add("hidden");
            });
            $$(".setting-detail")[index].classList.remove("hidden");
        };
    });
}

export function showSettingRobot() {
    const robotActive = localStorage.getItem("robotActive");
    if (robotActive) {
        $$(".setting-item:not(.robot-choose)").forEach((element) => {
            element.classList.remove("hidden");
        });
        handleParameterRobot(robotActive);
    } else {
        $$(".setting-item:not(.robot-choose)").forEach((element) => {
            element.classList.add("hidden");
        });
    }
}

function handleParameterRobot(robot) {
    fetch(`/api/config-status?name_seri=${robot}`)
        .then((res) => res.json())
        .then((data) => {
            renderParameterRobot(data);
        });
}

function renderParameterRobot(data) {

    setModeStart(data.mode)
    setIpStart(data.ip_master, data.ip_node)
    setVolumeStart(data.robot_volume)
    setParameterStart(data)

    function setModeStart(mode) {
        $(`[name=mode-value][value=${mode}`).checked = true;
    }
    function setIpStart(ipMaster, ipNode) {
        const ipMasterPartial = ipMaster.split(".")
        const ipNodePartial = ipNode.split(".")

        $$('.ip-master-partial').forEach((element, index) => {
            element.value = ipMasterPartial[index]
        })
        $$('.ip-node-partial').forEach((element, index) => {
            element.value = ipNodePartial[index]
        })
    }
    function setVolumeStart(volume) {
        $('.input-volume').value = volume
        uiIcon(volume)
    }
    function setParameterStart(data) {
        console.log(data)
    }
}
