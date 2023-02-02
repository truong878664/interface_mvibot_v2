import { $, $$ } from "../main.js";

$$(".para-input").forEach((element) => {
    element.onfocus = (e) => {
        $$(".para-robot-btn:not(hidden)").forEach((element) => {
            element.classList.add("hidden");
        });
        e.target
            .closest(".para-item")
            .querySelector(".para-robot-btn")
            .classList.remove("hidden");
    };

    element.onblur = (e) => {
        e.target
            .closest(".para-item")
            .querySelector(".para-robot-btn")
            .classList.add("hidden");
    };
});
