import { toggerMessage } from "../../../main.js";
import getDataFunction from "../getDataFunction.js";
import saveFunctionItem from "../saveFunction.js";
import { dataGpio } from "./gpio.js";
import resetGpio from "./resetGpio.js";
import setDataGpio from "./setDataGpio.js";

export default function createGpioModule() {
    $(".submit-btn-gpio_module").onclick = () => {
        for (const item in dataGpio) {
            dataGpio[item] = [];
        }

        setDataGpio("gpio_module");

        const { isValid, data } = getDataFunction("gpio_module");

        if (isValid) {
            saveFunctionItem("gpio_module", data);
            toggerMessage("success", "save gpio successfully");
            resetGpio();
        } else {
            toggerMessage(
                "error",
                "Please enter name, timeout and at least one type of gpio"
            );
        }
    };
}
