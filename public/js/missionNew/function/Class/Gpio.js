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
        this.gpioTypes = [
            "in_on",
            "in_off",
            "in_pullup",
            "in_pulldown",
            "out_set",
            "out_reset",
        ];
    }

    reset() {
        this.data.name.value = "";
        this.data.time_out.value = -1;
        this.gpioTypes.forEach((e) => {
            this.data[e] = [];
        });
        document.querySelectorAll(".gpio-io").forEach((item) => {
            item.classList.remove(...this.gpioTypes);
        });
        document
            .querySelector(".type-gpio-btn.active")
            ?.classList.remove("active");
    }
    display(data) {
        const { name, time_out, mode, id, ...field } = data;
        this.data.name.value = name;
        this.data.time_out.value = time_out;
        this.setLightGpio(field);
    }
    get() {
        const gpioContainer = document.querySelector(
            `.function-mission-tab[data-type=${this.type}]`
        );

        this.gpioTypes.forEach((type) => {
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

        const dataValidated = this.validate(data);
        dataValidated.success && this.reset();
        return dataValidated;
    }

    validate(data) {
        const {name, time_out, name_gpio_module, ...filed} = data
        const dataValidated = {
            success: true,
            data,
            message: "Get data success!S",
            error: null,
        };

        if(!name || !time_out) {
            dataValidated.success = false
            dataValidated.message = `Name or timeout cannot be empty!`
            return dataValidated;
        }
        for (const key in filed) {
            if (data[key]) {
                dataValidated.success = true
                dataValidated.message = `Get data success!`
                return dataValidated;
            } else {
                dataValidated.success = false
                dataValidated.message = `Must have at least one gpio imported!`
            }
        }
        return dataValidated;
    }

    setLightGpio(dataGpio) {
        const form = document.querySelector(
            `#function-item-form-wrapper [data-type='${this.type}']`
        );
        for (const item in dataGpio) {
            dataGpio[item]?.split(",").forEach((light) => {
                if (item.indexOf("out") != -1) {
                    form.querySelector(
                        `.output-gpio[data-gpio="${light}"]`
                    ).classList.add(`${item}`);
                } else if (item.indexOf("in") != -1) {
                    form.querySelector(
                        `.input-gpio[data-gpio="${light}"]`
                    ).classList.add(`${item}`);
                }
            });
        }
    }
}
