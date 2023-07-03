export default function showFormFunction({ type = "", show }) {
    const functionFormWrapper = document.getElementById(
        "function-item-form-wrapper"
    );
    const functionItems = document.querySelectorAll(".function-item");
    functionFormWrapper?.classList.toggle("hidden", !show);

    if (show) {
        functionItems.forEach((item) => {
            if (item.dataset.type === type) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    } else {
        functionItems.forEach((item) => {
            item.classList.add("hidden");
        });
    }
}