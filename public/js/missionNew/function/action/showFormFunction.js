export default function showFormFunction({ type = "", show }) {
    const functionFormWrapper = document.getElementById(
        "function-item-form-wrapper"
    );
    const functionFormItems = document.querySelectorAll(".function-form-item");
    functionFormWrapper?.classList.toggle("hidden", !show);

    if (show) {
        functionFormItems.forEach((item) => {
            if (item.dataset.type === type) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    } else {
        functionFormItems.forEach((item) => {
            item.classList.add("hidden");
        });
    }
}