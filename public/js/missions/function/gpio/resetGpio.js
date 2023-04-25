import { dataGpio } from "./gpio.js";

export default function resetGpio() {
    for (const item in dataGpio) {
        dataGpio[item] = [];
    }
    $(".name_gpio").value = "";
    $(".time_out_gpio").value = -1;
    $('.time_out_gpio_module').value = -1;
    $(".name_function_gpio_module").value = "";
    $(".name_gpio_module").value = "";

    $$(".gpio-io").forEach((item) => {
        // const isWakeUp = item.closest("#wake_up-wrapper");
        // const isStop = item.closest("#stop-wrapper");
        // if (isWakeUp || isStop) return;
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

    // $('.type-gpio-btn.active').classList.remove('active')
    // $('.type-gpio-btn.active').classList.remove('active')
    $$(".type-gpio-btn.active")?.forEach((typeIo) => {
        typeIo?.classList.remove("active");
    });
}
