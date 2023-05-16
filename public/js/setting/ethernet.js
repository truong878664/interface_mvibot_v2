import dispatchEvent from "../functionHandle/dispatchEvent.js";
import checkChangeParameter from "./checkChangeParameter.js";
import getIp from "./getIp.js";
import pubSetting from "./pubSetting.js";
import renderIp from "./renderIP.js";

export default function ethernet(data) {
    setEthernet();
    const { lan_type, lan_ipv4, lan_ipv4_gateway, lan_ipv4_dns } = data;
    const lanTypeElement = document.querySelector(
        `[name=lan_type]#lan-${lan_type}`
    );
    if (lanTypeElement) {
        lanTypeElement.checked = true;
    }
    dispatchEvent({ event: "change", element: lanTypeElement });
    if (lan_type === "auto") return;
    renderIp({ ipString: lan_ipv4, ipElement: "[data-ip=lan_ipv4]" });
    renderIp({
        ipString: lan_ipv4_gateway,
        ipElement: "[data-ip=lan_ipv4_gateway]",
    });
    document.querySelector("[data-ip=lan_ipv4_dns]").value = lan_ipv4_dns;
}

function setEthernet() {
    const saveEthernetBtn = document.querySelector(
        "[data-setting=ethernet][data-type=save]"
    );
    saveEthernetBtn.onclick = handleSave;
    async function handleSave() {
        const dataEthernet = getDataEthernet();
        const dataChanged = await checkChangeParameter(dataEthernet);
        pubSetting(dataChanged);
    }

    function getDataEthernet() {
        const lan_type = document.querySelector(
            "[name=lan_type]:checked"
        ).value;
        const lan_ipv4 = getIp({ element: "[data-ip=lan_ipv4]" });
        const lan_ipv4_gateway = getIp({
            element: "[data-ip=lan_ipv4_gateway]",
        });
        const lan_ipv4_dns = document.querySelector(
            "[data-ip=lan_ipv4_dns]"
        ).value;
        if (lan_type === "auto") {
            return { lan_type };
        } else {
            return {
                lan_type,
                lan_ipv4,
                lan_ipv4_gateway,
                lan_ipv4_dns,
            };
        }
    }
}
