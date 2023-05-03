import bookmark from "./bookmark.js";
import { color } from "./color.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const connectRosBtn = $(".connect-ros-btn");
bookmark();
function connected() {
    connectRosBtn?.classList.remove("connection-failed");
    connectRosBtn?.classList.add("connected");
}

function connectionFailed() {
    connectRosBtn?.classList.remove("connected");
    connectRosBtn?.classList.add("connection-failed");
}

activeNabBar();

function activeNabBar() {
    const currentPathname = window.location.pathname.replace("/", "");
    let currentPage;
    if (currentPathname.indexOf("dashboard") != -1) {
        currentPage = "dashboard";
    } else if (currentPathname.indexOf("user") != -1) {
        currentPage = "user";
    } else {
        currentPage = "home";
    }
    $(`.bar-item.active`)?.classList.remove("active");
    $(`.${currentPage}`)?.classList.add("active");
}

const xhttp = new XMLHttpRequest();
xhttp.onload = function () {
    if (this.responseText === "no map") {
        document.querySelector(
            ".message-map-wrapper"
        ).innerHTML = `<div class = "message-map-none" >
                            <i class = "fa-solid fa-triangle-exclamation" ></i>
                            <span> no active map </span>
                        </div>`;
    }
};
xhttp.open("GET", "/dashboard/map/map-active", true);
xhttp.send();

function robotActive() {
    return localStorage.getItem("robotActive");
}

export { connected, connectionFailed, robotActive };

