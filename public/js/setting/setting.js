import { $, $$, toggerMessage } from "../main.js";
import wifi, { renderTypeWifi } from "./wifi.js";
import robot from "./robot.js";
import parameter from "./parameter.js";
import power from "./power.js";

import operation from "./operation.js";
import ethernet from "./ethernet.js";
import camera from "./camera.js";
import publicTopic from "./publicTopic.js";
import cancelSetting from "./cancelSetting.js";

showSettingRobot();
handleTabSetting();

robot();
power();
wifi();
publicTopic();
cancelSetting()

function handleTabSetting() {
    $(".setting-item-wrapper").onclick = (e) => {
        const settingItem = e.target.closest(".setting-item");
        if (!settingItem) return;

        $(".setting-item.active").classList.remove("active");
        settingItem.classList.add("active");

        $$(".setting-detail").forEach((element) => {
            element.classList.add("hidden");
        });

        $$(".setting-detail")[settingItem.dataset.index].classList.remove(
            "hidden"
        );
    };
}

export function showSettingRobot() {
    const robotActive = localStorage.getItem("robotActive");

    $$(".setting-item:not(.robot-choose)").forEach((element) => {
        element.classList.toggle("hidden", !robotActive);
    });

    robotActive && handleParameterRobot(robotActive);
}

function handleParameterRobot(robot) {
    fetch(`/api/config-status?name_seri=${robot}`)
        .then((res) => res?.json())
        .then((data) => {
            // renderParameterRobot(data);
            // mode(data)
            operation(data);
            parameter(data);
            ethernet(data);
            camera(data);
            renderTypeWifi(data)
        })
        .catch((error) => {
            localStorage.removeItem("robotActive");
            showSettingRobot();
            toggerMessage("error", error);
        });
}

function renderParameterRobot(data) {
    setModeStart(data.mode);
    setIpStart(data.ip_master, data.ip_node);
    setVolumeStart(data.robot_volume);
    setParameterStart(data);

    function setModeStart(mode) {
        $(`[name=mode-value]#${mode}`).checked = true;
    }
    function setIpStart(ipMaster, ipNode) {
        const ipMasterPartial = ipMaster.split(".");
        const ipNodePartial = ipNode.split(".");

        $$(".ip-master-partial").forEach((element, index) => {
            element.value = ipMasterPartial[index];
        });
        $$(".ip-node-partial").forEach((element, index) => {
            element.value = ipNodePartial[index];
        });
    }
    function setVolumeStart(volume) {
        $(".input-volume").value = volume;
        uiIcon(volume);
    }
    function setParameterStart(data) {
        const { robot_L, robot_R, robot_aw, robot_ax, robot_vmax, robot_wmax } =
            data;

        Object.entries({
            robot_L,
            robot_R,
            robot_aw,
            robot_ax,
            robot_vmax,
            robot_wmax,
        }).forEach(
            ([key, value]) =>
                ($(`[name=${key}]`).value = (value * 1).toFixed(4))
        );
    }
}
