import Step from "./Step.js";
export default class Gpio extends Step {
    constructor(data) {
        super(data);
        this.type = "gpio";
        const form = document.getElementById("function-item-form-wrapper");
        this.data.name = form.querySelector(".name_gpio");
        this.data.time_out = form.querySelector(".time_out_gpio");
        this.data.in_off = [];
        this.data.in_on = [];
        this.data.in_pullup = [];
        this.data.in_pulldown = [];
        this.data.out_set = [];
        this.data.out_reset = [];
    }

    reset() {
        this.data.name.value = "";
        this.data.time_out.value = -1;

        document.querySelectorAll(".gpio-io").forEach((item) => {
            item.classList.remove(
                "in_on",
                "in_off",
                "in_pullup",
                "in_pulldown",
                "out_reset",
                "out_set",
                "gpio_normal",
                "gpio_module"
            );
        });
        document
            .querySelector(".type-gpio-btn.active")
            ?.classList.remove("active");
    }

    get() {
        const gpioContainer = document.querySelector(
            `.function-mission-tab[data-type=${this.type}]`
        );

        const gpioTypes = [
            "in_on",
            "in_off",
            "in_pullup",
            "in_pulldown",
            "out_set",
            "out_reset",
        ];

        gpioTypes.forEach((type) => {
            const elements = gpioContainer.querySelectorAll(`.gpio-io.${type}`);
            this.data[type].push(
                ...Array.from(elements, (gpio) => gpio.dataset.gpio)
            );
        });

        const data = {
            name: this.data.name.value,
            time_out: this.data.time_out.value * 1,
            out_set: this.data.out_set.join(","),
            out_reset: this.data.out_reset.join(","),
            in_on: this.data.in_on.join(","),
            in_off: this.data.in_off.join(","),
            in_pullup: this.data.in_pullup.join(","),
            in_pulldown: this.data.in_pulldown.join(","),
        };

        if (this.type === "gpio_module") {
            data.name_gpio_module = this.data.name_gpio_module.value;
        }

        this.reset();
        return data;
    }
}
