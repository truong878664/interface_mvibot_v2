import { $ } from "../main.js";
import { robotActive } from "../mainLayout.js";
import publishTopicString from "../rosModule/topicString.js";
const inputVolumeElement = $(".input-volume");
export default function volume() {
    uiVolume();
    setVolume();
}

function uiVolume() {
    inputVolumeElement.oninput = (e) => {
        const valueVolume = e.target.value;
        uiIcon(valueVolume);
    };
}

function setVolume() {
    $(".set-volume-btn").onclick = () => {
        const inputVolume = inputVolumeElement.value;
        const robot = robotActive();
        publishTopicString(`/${robot}/set_config`, `(volume|${inputVolume})`);
    };
}

export function uiIcon(valueVolume) {
    const iconVolume = $("[data-volume]");
    $(".value-volume").innerText = valueVolume;
    switch (true) {
        case parseInt(valueVolume) > 66:
            iconVolume.dataset.volume = "high-vl";
            break;
        case parseInt(valueVolume) > 33:
            iconVolume.dataset.volume = "medium-vl";
            break;
        case parseInt(valueVolume) == 0:
            iconVolume.dataset.volume = "";
            break;
        default:
            iconVolume.dataset.volume = "low-vl";
            break;
    }
}
