import resetGpio from "./resetGpio.js";

export default function reset() {
    const resetBtn = document.querySelectorAll(".reset-gpio-btn");
    resetBtn.forEach((btn) => {
        btn.addEventListener("click", handleReset);
    });
}

function handleReset() {
    resetGpio();
}
