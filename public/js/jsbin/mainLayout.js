const $ = document.querySelector.bind(document);

const connectRosBtn = $(".connect-ros-btn");
function connected() {
    connectRosBtn.classList.remove("connection-failed");
    connectRosBtn.classList.add("connected");
}

function connectionFailed() {
    connectRosBtn.classList.remove("connected");
    connectRosBtn.classList.add("connection-failed");
}

export { connected, connectionFailed };
