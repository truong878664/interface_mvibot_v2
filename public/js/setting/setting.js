import { $, $$ } from "../main.js";

$$(".setting-item").forEach((element, index) => {
    element.onclick = (e) => {
        $(".setting-item.active").classList.remove("active");
        e.target.classList.add("active");
        $$(".setting-detail").forEach((element) => {
            element.classList.add("hidden");
        });
        $$(".setting-detail")[index].classList.remove("hidden");
    };
});
