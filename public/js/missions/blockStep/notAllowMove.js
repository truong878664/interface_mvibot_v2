export default function notAllowMove() {
    $(".move-up-step-btn.not-allowed")?.classList.remove("not-allowed");
    $(".move-down-step-btn.not-allowed")?.classList.remove("not-allowed");
    const missionItems = $(".steps-wrapper").childNodes;
    missionItems[0]
        ?.querySelector(".move-up-step-btn")
        ?.classList.add("not-allowed");
    missionItems[missionItems.length - 1]
        ?.querySelector(".move-down-step-btn")
        ?.classList.add("not-allowed");
}
