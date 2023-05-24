import dispatchEvent from "../functionHandle/dispatchEvent.js";

import checkChangeParameter from "./checkChangeParameter.js";
import getIp from "./getIp.js";
import pubSetting from "./pubSetting.js";
import renderIp from "./renderIP.js";
const isMasterElement = document.querySelector("#is-master");

export default function operation(data) {
    mode(data);
    master(data);
    setOperation();
}

function mode(data) {
    const inputMode = document.querySelector(`.input-mode#${data.mode}`)
    if (inputMode) {
        inputMode.checked = true;
    }
}
function master(data) {
    const isMaster = data.is_master === "yes" ? true : false;
    isMasterElement.checked = isMaster;
    dispatchEvent({ event: "change", element: isMasterElement });
    
    renderIp({
        ipString: isMaster ? "" : data.ip_master,
        ipElement: "[data-ip=master]",
    });
}
function setOperation() {
    const saveOperationBtn = document.querySelector(
        "[data-setting=operation][data-type=save]"
    );
    saveOperationBtn.onclick = handleSave;
    async function handleSave() {
        const dataOperation = getDataOpera();
        const dataChanged = await checkChangeParameter(dataOperation);
        pubSetting(dataChanged);
    }
    function getDataOpera() {
        const mode = document.querySelector("[name=mode-value]:checked").value;
        const is_master = document.querySelector("#is-master").checked;
        const ip_master = !is_master
            ? getIp({ element: "[data-ip=master]" })
            : null;
        const dataOperation = {
            mode,
            is_master: is_master ? "yes" : "no",
            ip_master,
        };
        return dataOperation;
    }
}
