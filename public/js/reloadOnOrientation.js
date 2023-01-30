export default function reloadWhenOrientation() {
    let portrait = window.matchMedia("(orientation: portrait)");
    portrait.addEventListener("change", function (e) {
        location.reload();
    });
}
