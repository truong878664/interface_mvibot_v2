import Gpio from "./Gpio.js";

export default class WakeUpAndStop extends Gpio {
    constructor(type, data) {
        super(data);
        this.type = type;
        this.data.notSetOut = document.getElementById("not_set_out_" + type);
    }
    get() {
        const wrapperElement = document.querySelector(
            `[data-type-wake-stop-wrapper='${this.type}']`
        );
        const data = this.getGpio(wrapperElement);
        data.not_set_out = this.data.notSetOut.checked ? "1" : "0";
        return data;
    }
    display(data) {
        this.resetIo();
        const wrapperElement = document.querySelector(
            `[data-type-wake-stop-wrapper="${this.type}"]`
        );
        console.log(data);
        this.data.notSetOut.checked = Number(data.not_set_out);
        this.setLightGpio(data, wrapperElement);
    }
    save() {}
}
