const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const connectRosBtn = $(".connect-ros-btn");
function connected() {
    connectRosBtn.classList.remove("connection-failed");
    connectRosBtn.classList.add("connected");
}

function connectionFailed() {
    connectRosBtn.classList.remove("connected");
    connectRosBtn.classList.add("connection-failed");
}

activeNabBar();

function activeNabBar() {
    const currentPathname = window.location.pathname.replace("/", "");
    let currentPage;
    if (currentPathname.indexOf("dashboard") != -1) {
        currentPage = "dashboard";
    } else if (currentPathname.indexOf("user") != -1) {
        currentPage = "user";
    } else if (currentPathname.indexOf("setting") != -1) {
        currentPage = "setting";
    } else {
        currentPage = "home";
    }
    $(`.bar-item.active`).classList.remove("active");
    $(`.${currentPage}`).classList.add("active");
    document.title = `Mvibot | ${currentPage}`;
}

export { connected, connectionFailed };
