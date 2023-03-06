import { $, $$ } from "../main.js"
import { robotActive } from "../mainLayout.js"
import publishTopicString from "../rosModule/topicString.js";

export default function mode() {
    $('.send-mode-btn').onclick = () => {
        const robot = robotActive();
        const valueMode = $('[name=mode-value]:checked').value
        publishTopicString(`/${robot}/set_config`, `(mode|${valueMode})`);
    }
}