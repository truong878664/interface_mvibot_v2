import Gpio from "./Gpio.js";

export default class GpioModule extends Gpio {
    constructor(data) {
        super(data);
        this.type = 'gpio_module';
        const form = document.getElementById("function-item-form-wrapper");
        this.data.name = form.querySelector(".name_function_gpio_module");
        this.data.name_gpio_module = form.querySelector(".name_gpio_module")
        this.data.time_out = form.querySelector(".time_out_gpio_module");
    }
}