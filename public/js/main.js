import connectRos from "./rosModule/connectRos.js";
import { ip } from "../ip.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const ros = connectRos(ip);

function toggerMessage(type, message) {
    const divMessage = document.querySelector(`#message-${type}`);
    divMessage.innerText = message;
    setTimeout(() => {
        divMessage.innerText = "";
    }, 2000);
    type = "error" && window.navigator.vibrate(200);
}

window.oncontextmenu = (e) => {
    e.preventDefault();
    return false;
};

export { $, $$, toggerMessage };

export default ros;
