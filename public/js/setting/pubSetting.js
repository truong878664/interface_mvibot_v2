import { toggerMessage } from "../main.js";
import { robotActive } from "../mainLayout.js";
import publishTopicString from "../rosModule/topicString.js";

export default function pubSetting(datas) {
    const robot = robotActive();
    const dataTopicArray = [];
    for (const key in datas) {
        if (!(datas[key] === null)) {
            dataTopicArray.push(key + "|" + datas[key]);
        }
    }
    if(dataTopicArray.length) {
        const dataTopic =`(${dataTopicArray.join("),(")})`;
        publishTopicString(`/${robot}/set_config`, dataTopic);
    } else {
        toggerMessage('error', 'No setting data!')
    }
}