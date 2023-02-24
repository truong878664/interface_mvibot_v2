const sendMissionBtn = $("label[for=select-robot]");

export function loading() {
    $(".step-loading").classList.remove("hidden");
    sendMissionBtn.classList.add("disabled");
}
export function loaded() {
    $(".step-loading").classList.add("hidden");
    sendMissionBtn.classList.remove("disabled");
}
