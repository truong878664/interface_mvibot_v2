import { classFunctions } from "../index.js";

export default function showFormFunction({
    type = "",
    show,
    method = "create",
}) {
    const functionFormWrapper = document.getElementById(
        "function-item-form-wrapper"
    );
    const functionFormItems = document.querySelectorAll(".function-form-item");
    const buttonWrapper = document.querySelector(
        `[data-name="action-form-function"][data-type="${type}"]`
    );
    functionFormWrapper?.classList.toggle("hidden", !show);

    if (show) {
        classFunctions[type]?.reset();
        functionFormItems.forEach((item) => {
            if (item.dataset.type === type) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
        if (buttonWrapper) buttonWrapper.dataset.status = method;
    } else {
        functionFormItems.forEach((item) => {
            item.classList.add("hidden");
        });
    }
}
