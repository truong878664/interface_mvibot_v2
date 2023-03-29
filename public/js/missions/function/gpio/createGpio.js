import { toggerMessage } from "../../../main.js";
import getDataFunction from "../getDataFunction.js";
import saveFunctionItem from "../saveFunction.js";
import { dataGpio } from "./gpio.js";
import resetGpio from "./resetGpio.js";
import setDataGpio from "./setDataGpio.js";

export default function createGpio() {
    $(".submit-btn-gpio").onclick = () => {
        for (const item in dataGpio) {
            dataGpio[item] = [];
        }

        setDataGpio("gpio_normal");

        const { isValid, data } = getDataFunction("gpio");

        if (isValid) {
            saveFunctionItem("gpio", data);
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


