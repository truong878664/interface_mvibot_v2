import bookmark from "./bookmark.js";
import { color } from "./color.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const connectRosBtn = $(".connect-ros-btn");

function connected() {
    connectRosBtn?.classList.remove("connection-failed");
    connectRosBtn?.classList.add("connected");
}

function connectionFailed() {
    connectRosBtn?.classList.remove("connected");
    connectRosBtn?.classList.add("connection-failed");
}

activeNabBar();
bookmark()

const usernameLocal = localStorage.getItem("username");

if (usernameLocal) {
    setAvatar(usernameLocal);
} else {
    updateAvatarUser();
}

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
    // document.title = `Mvibot – ${currentPage}`;
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

function updateAvatarUser() {
    fetch("/api/user/logged")
        .then((res) => res.json())
        .then((data) => {
            const username = data.data.name;
            localStorage.setItem("username", username);
        })
        .then(() => {
            setAvatar(localStorage.getItem("username"));
        });
}

function setAvatar(username) {
    $$(".name-user").forEach((element) => {
        element.value = username;
    });

    $$(".avatar-img-key").forEach((element) => {
        element.innerText = username.slice(0, 1);
    });
    $$(".bg-avatar").forEach((element) => {
        element.style.backgroundColor = color[username.length];
    });
}

function robotActive() {
    return localStorage.getItem("robotActive");
}

export { connected, connectionFailed, updateAvatarUser, robotActive };
