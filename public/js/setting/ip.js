import { $, $$ } from "../main.js";
import { robotActive } from "../mainLayout.js";
import publishTopicString from "../rosModule/topicString.js";

export default function ip() {
    setIp();
    uiIp();
}
const isIpChange = {
    master: false,
    node: false,
};

function uiIp() {
    $$(".ip-partial").forEach((element) => {
        element.onfocus = (e) => {
            e.target.value === "0" && (e.target.value &&= "");
        };
        element.onblur = (e) => {
            e.target.value === "" && (e.target.value = "0");
        };

        element.onchange = (e) => {
            const currentIp = e.target.dataset.ip;
            isIpChange[currentIp] = true;
        };
    });
}

function setIp() {
    $(".set-ip-btn").onclick = () => {
        const robot = robotActive();

        isIpChange.master && setIpMaster();
        isIpChange.node && setIpNode();

        isIpChange.master = false;
        isIpChange.node = false;

        function setIpMaster() {
            const ipMaster = [];
            Array.from($$(".ip-master-partial")).map((item) => {
                ipMaster.push(item.value);
                return ipMaster;
            });
            publishTopicString(
                `/${robot}/set_config`,
                `(ip_master|${ipMaster.join(".")})`
            );
        }

        function setIpNode() {
            const ipNode = [];
            Array.from($(".ip-node-partial")).map((item) => {
                ipNode.push(item.value);
                return ipNode;
            });
            publishTopicString(
                `/${robot}/set_config`,
                `(ip_node|${ipNode.join(".")})`
            );
        }
    };
}
