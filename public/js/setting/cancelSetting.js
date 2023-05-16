import { $$ } from "../main.js";
import { showSettingRobot } from "./setting.js";

export default function cancelSetting() {
    const cancelBtns = $$("[data-setting][data-type=cancel]");
    cancelBtns.forEach((element) => {
        element.onclick = showSettingRobot;
    });
}
