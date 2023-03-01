
export default function showUpdateBtn(isShow, type) {
    if (isShow) {
        // $(`.cancel-${type}`).classList.remove("hidden");
        // $(`.update-${type}`).classList.remove("hidden");
        // $(`.add-mission-${type}`).classList.add("hidden");
        $(`.update-wrapper-${type}`).classList.remove("hidden");
        $(`.add-wrapper-${type}`).classList.add("hidden");
    } else {
        $(`.update-wrapper-${type}`).classList.add("hidden");
        $(`.add-wrapper-${type}`).classList.remove("hidden");
        // $(`.cancel-${type}`).classList.add("hidden");
        // $(`.update-${type}`).classList.add("hidden");
        // $(`.add-mission-${type}`).classList.remove("hidden");
    }
}
