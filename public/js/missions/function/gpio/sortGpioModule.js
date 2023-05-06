export default function sortGpioModule() {
    $(".sort-gpio_module-wrapper").onclick = (e) => {
        const sortGpioModuleItem = e.target.closest(".sort-gpio_module-btn");
        if (!sortGpioModuleItem) return;
        $(".sort-gpio_module-btn.active")?.classList.remove("active");
        sortGpioModuleItem.classList.add("active");
        const typeSort = sortGpioModuleItem.dataset.type;

        $$("[data-type-gpio_module].hidden")?.forEach((element) => {
            element.classList.remove("hidden");
        });
        if (typeSort === "all") return;
        const gpioModuleNotSelect = $$(
            `[data-type-gpio_module]:not([data-type-gpio_module=${typeSort}])`
        );
        gpioModuleNotSelect?.forEach((element) => {
            element.classList.add("hidden");
        });
    };
}
