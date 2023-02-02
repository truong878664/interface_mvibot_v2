import connectRos from "../rosModule/connectRos.js";
import { $ } from "./setting.js";
import {ip} from '../../ip.js'
import publishTopic from '../rosModule/topicString.js'

$(".address-ip-master").value = ip


$(".set-ip-master-btn").onclick = () => {
    const ipMaster = $(".address-ip-master").value;
    publishTopic('/ip_master', ipMaster)
    // connectRos(ipNew)
};

$(".set-ip-node-btn").onclick = () => {
    const ipNode = $(".address-ip-node").value;
    publishTopic('/ip_node', ipNode)
    // connectRos(ipNew)
};