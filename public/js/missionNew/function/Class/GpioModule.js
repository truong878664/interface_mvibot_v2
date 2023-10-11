import Gpio from "./Gpio.js";

export default class GpioModule extends Gpio {
    constructor(data) {
        super(data);
        this.type = "gpio_module";
        const form = document.getElementById("function-item-form-wrapper");
        this.data.name = form.querySelector(".name_function_gpio_module");
        this.data.name_gpio_module = form.querySelector(".name_gpio_module");
        this.data.time_out = form.querySelector(".time_out_gpio_module");
        this.data.notSetout = form.querySelector("#not_set_out_module");
    }
    display(data) {
        const {
            name,
            time_out,
            mode,
            id,
            not_set_out,
            name_gpio_module,
            ...field
        } = data;
        this.data.name_gpio_module.value = name_gpio_module;
        this.data.name.value = name;
        this.data.time_out.value = time_out;
        this.data.notSetout.checked = Number(not_set_out);

        const gpioWrapElement = document.querySelector(
            `#function-item-form-wrapper [data-type='${this.type}']`
        );
        this.setLightGpio(field, gpioWrapElement);
    }
}
