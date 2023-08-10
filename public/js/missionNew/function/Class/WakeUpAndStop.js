import Gpio from "./Gpio.js";

export default class WakeUpAndStop extends Gpio {
    constructor(type, data) {
        super(data);
        this.type = type;
    }
    get() {
        const wrapperElement = document.querySelector(
            `[data-type-wake-stop-wrapper='${this.type}']`
        );
        const data = this.getGpio(wrapperElement);
        return data;
    }
    display(data) {
        this.resetIo();
        const wrapperElement = document.querySelector(
            `[data-type-wake-stop-wrapper="${this.type}"]`
        );
        this.setLightGpio(data, wrapperElement);
    }
    save() {}
}
