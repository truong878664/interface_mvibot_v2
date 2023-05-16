import connectRos from "./rosModule/connectRos.js";
import topicsListening from "./rosModule/topicsListening.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const notification = $(".notification");

const ros = connectRos(window.location.hostname);

let timeOut;
function toggerMessage(type, message) {
    clearTimeout(timeOut);
    notification.classList.remove("notification-show", "success", "error");
    setTimeout(() => {
        notification.classList.add("notification-show", type);
    }, 100);

    $("#message").innerText = message;
    timeOut = setTimeout(() => {
        notification.classList.remove("notification-show", type);
    }, 3000);
}

$(".delete-message-btn").onclick = () => {
    notification.classList.remove("notification-show", "success", "error");
};

$(".back-history-btn").onclick = (e) => {
    const isPageCreateStep = $("#create-step-container");
    const isPageCreateMission = $("#create-mission");
    if (isPageCreateStep) {
        window.location = document.referrer;
    } else if (isPageCreateMission) {
        console.log();
        window.history.go(-3);
    } else {
        window.history.back();
    }
};

$(".next-history-btn").onclick = (e) => {
    window.history.forward();
};

window.oncontextmenu = (e) => {
    e.preventDefault();
    return false;
};

export { $, $$, toggerMessage };

export default ros;
topicsListening();

