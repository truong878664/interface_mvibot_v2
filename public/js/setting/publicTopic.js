import { robotActive } from "../mainLayout.js";
import publishTopicString from "../rosModule/topicString.js";

export default function publicTopic() {
    const publicTopicBtn = document.querySelector("#public-btn");
    publicTopicBtn.onclick = handlePublic;
}

function handlePublic() {
    const robot = robotActive();
    const publicData = document.querySelector("#public-data");
    publishTopicString(`/${robot}/set_config`, publicData.value);
    publicData.value = "";
}
