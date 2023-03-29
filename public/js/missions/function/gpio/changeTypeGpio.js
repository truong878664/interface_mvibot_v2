export let currentTypeGpio = "";

export default function handleChangeTypeGpio() {
    $$(".type-gpio-btn").forEach((element) => {
        element.onclick = (e) => {
            currentTypeGpio = e.target.getAttribute("type");
            $$(".type-gpio-btn.active")?.forEach((item) => {
                item.classList.remove("active");
            });
    
            $$(`[type=${currentTypeGpio}]`).forEach((item) => {
                item.classList.add("active");
            });
    
            const color = getComputedStyle(e.target).backgroundColor;
    
            if (currentTypeGpio.indexOf("in") != -1) {
                $$(".input-arrow").forEach((item, index) => {
                    item.style.fill = color;
                    $$(".input-name")[index].style.fill = color;
                    $$(".output-arrow")[index].style.fill = "black";
                    $$(".output-name")[index].style.fill = "black";
                });
            } else {
                $$(".output-arrow").forEach((item, index) => {
                    item.style.fill = color;
                    $$(".output-name")[index].style.fill = color;
                    $$(".input-arrow")[index].style.fill = "black";
                    $$(".input-name")[index].style.fill = "black";
                });
            }
        };
    });
}