import connectRos from "./rosModule/connectRos.js";
import topicsListening from "./rosModule/topicsListening.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const ros = connectRos(window.location.hostname);

let timeOut;
function toggerMessage(type, message) {
    clearTimeout(timeOut);
    $(".notification").classList.remove(
        "notification-show",
        "success",
        "error"
    );
    $(".notification").classList.add("notification-show", type);
    $("#message").innerText = message;
    timeOut = setTimeout(() => {
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

$(".back-history-btn").onclick = (e) => {
    history.back();
};
$(".next-history-btn").onclick = (e) => {
    history.forward();
};

window.oncontextmenu = (e) => {
    e.preventDefault();
    return false;
};

export { $, $$, toggerMessage };

export default ros;

topicsListening();
