export default function position() {
    uiNonAvoid();
}

const noneAvoidWrap = document.querySelector("[data-name='non-avoid-wrap']");
const modeChildElement = document.querySelector('[name="mode_position"]');
function uiNonAvoid() {
    modeChildElement.addEventListener("click", (e) => {
        const isLineFollow = e.target.value === "line_follow";
        noneAvoidWrap.classList.toggle("hidden", !isLineFollow);
    });
}
