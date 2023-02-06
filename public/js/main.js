import connectRos from "./rosModule/connectRos.js";
import { ip } from "../ip.js";
import route from "./route.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


// let ip;
// if (localStorage.getItem("ip")) {
//     ip = localStorage.getItem("ip");
// } else {
//     localStorage.setItem("ip", "192.168.0.2");
//     ip = localStorage.getItem("ip");
// }
const ros = connectRos('192.168.85.238');

route()


function toggerMessage(type, message) {
    const divMessage = document.querySelector(`#message-${type}`);
    divMessage.innerText = message;
    setTimeout(() => {
        divMessage.innerText = "";
    }, 2000);
}

window.oncontextmenu = (e) => {
    e.preventDefault();
    return false;
};


export { $, $$, toggerMessage };

export default ros;
