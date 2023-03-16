import { $ } from "../main.js";
import { robotActive } from "../mainLayout.js";
import publishTopicString from "../rosModule/topicString.js";
const inputVolumeElement = $(".input-volume");
export default function volume() {
    uiVolume();
    setVolume();
}

function uiVolume() {
    inputVolumeElement.addEventListener("input", (e) => {
        const valueVolume = parseInt(e.target.value);
        !isNaN(valueVolume) && uiIcon(valueVolume);
    });
}

function setVolume() {
    $(".set-volume-btn").onclick = () => {
        const inputVolume = inputVolumeElement.value;
        const robot = robotActive();
        publishTopicString(`/${robot}/set_config`, `(robot_volume|${inputVolume})`);
    };
}

const VOLUME_HIGH = 100;
const VOLUME_MEDIUM = 50;
const VOLUME_OFF = 0;
const iconVolume = $("[data-volume]");

export function uiIcon(valueVolume) {
    iconVolume.dataset.volume =
        valueVolume > VOLUME_HIGH
            ? "high-vl"
            : valueVolume > VOLUME_MEDIUM
            ? "medium-vl"
            : valueVolume == VOLUME_OFF
            ? "off-vl"
            : "low-vl";
    $(".value-volume").textContent = valueVolume;
}
