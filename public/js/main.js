import connectRos from "./rosModule/connectRos.js";
import { ip } from "../ip.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const ros = connectRos(ip);

function toggerMessage(type, message) {
    $(".notification").classList.add("notification-show", type);
    $("#message").innerText = message;
    setTimeout(() => {
        $(".notification").classList.remove("notification-show", type);
    }, 3000);
}
$(".delete-message-btn").onclick = () => {
    $(".notification").classList.remove(
        "notification-show",
        "success",
        "error"
    );
};

window.oncontextmenu = (e) => {
    e.preventDefault();
    return false;
};

$(".back-history-btn").onclick = (e) => {
    history.back();
};
$(".next-history-btn").onclick = (e) => {
    history.forward();
};

export { $, $$, toggerMessage };

export default ros;
