import { $, $$, toggerMessage } from "../../main.js";
import { addFunctionStep } from "../createStepMission.js";

let currentTypeGpio = "";

$$(".type-gpio-btn").forEach((element) => {
    element.onclick = (e) => {
        currentTypeGpio = e.target.getAttribute("type");

        $$(".type-gpio-btn.active")?.forEach((item) => {
            item.classList.remove("active");
        });

        $$(`[type=${currentTypeGpio}]`).forEach((item) => {
            item.classList.add("active");
        });

        const color = getComputedStyle(e.target).backgroundColor;

        if (currentTypeGpio.indexOf("in") != -1) {
            $$(".input-arrow").forEach((item, index) => {
                item.style.fill = color;
                $$(".input-name")[index].style.fill = color;
                $$(".output-arrow")[index].style.fill = "black";
                $$(".output-name")[index].style.fill = "black";
            });
        } else {
            $$(".output-arrow").forEach((item, index) => {
                item.style.fill = color;
                $$(".output-name")[index].style.fill = color;
                $$(".input-arrow")[index].style.fill = "black";
                $$(".input-name")[index].style.fill = "black";
            });
        }
    };
});

$$(".input-gpio").forEach((element) => {
    element.onclick = (e) => {
        if (currentTypeGpio.indexOf("in") != -1) {
            e.target.classList.remove(
                currentTypeGpio == "in_on" ? "null" : "in_on",
                currentTypeGpio == "in_off" ? "null" : "in_off",
                currentTypeGpio == "in_pullup" ? "null" : "in_pullup",
                currentTypeGpio == "in_pulldown" ? "null" : "in_pulldown"
            );
            e.target.classList.toggle(currentTypeGpio);
            e.target.classList.toggle(getModeFunction());
        }
    };
});

$$(".output-gpio").forEach((element) => {
    element.onclick = (e) => {
        if (currentTypeGpio.indexOf("out") != -1) {
            e.target.classList.remove(
                currentTypeGpio == "out_reset" ? "null" : "out_reset",
                currentTypeGpio == "out_set" ? "null" : "out_set"
            );
            e.target.classList.toggle(currentTypeGpio);
            e.target.classList.toggle(getModeFunction());
        }
    };
});

export const dataGpio = {
    in_on: [],
    in_off: [],
    out_set: [],
    out_reset: [],
    in_pullup: [],
    in_pulldown: [],
};

export function setLightGpio() {
    const gpio_mode = getModeFunction() + "_mode";
    for (const item in dataGpio) {
        dataGpio[item].forEach((light) => {
            if (item.indexOf("out") != -1) {
                $(`.output-gpio.${gpio_mode}[gpio="${light}"]`).classList.add(
                    `${item}`,
                    getModeFunction()
                );
            } else if (item.indexOf("in") != -1) {
                $(`.input-gpio.${gpio_mode}[gpio="${light}"]`).classList.add(
                    `${item}`,
                    getModeFunction()
                );
            }
        });
    }
}

export function resetGpio() {
    for (const item in dataGpio) {
        dataGpio[item] = [];
    }
    $(".name_gpio").value = "";
    $(".time_out_gpio").value = -1;
    $(".name_function_gpio_module").value = "";
    $(".name_gpio_module").value = "";

    $$(".gpio-io").forEach((item) => {
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
}

export function setDateGpio(typeGpio) {
    for (const item in dataGpio) {
        dataGpio[item] = [];
    }

    $$(`.input-gpio.in_on.${typeGpio}`).forEach((element) => {
        dataGpio.in_on.push(element.getAttribute("gpio"));
    });

    $$(`.input-gpio.in_off.${typeGpio}`).forEach((element) => {
        dataGpio.in_off.push(element.getAttribute("gpio"));
    });

    $$(`.input-gpio.in_pullup.${typeGpio}`).forEach((element) => {
        dataGpio.in_pullup.push(element.getAttribute("gpio"));
    });

    $$(`.input-gpio.in_pulldown.${typeGpio}`).forEach((element) => {
        dataGpio.in_pulldown.push(element.getAttribute("gpio"));
    });

    $$(`.output-gpio.out_set.${typeGpio}`).forEach((element) => {
        dataGpio.out_set.push(element.getAttribute("gpio"));
    });

    $$(`.output-gpio.out_reset.${typeGpio}`).forEach((element) => {
        dataGpio.out_reset.push(element.getAttribute("gpio"));
    });
}

$(".submit-btn-gpio").onclick = () => {
    for (const item in dataGpio) {
        dataGpio[item] = [];
    }

    setDateGpio("gpio_normal");

    const name_gpio = $(".name_gpio");
    const time_out_gpio = $(".time_out_gpio");

    if (
        name_gpio.value &&
        time_out_gpio.value &&
        (dataGpio.out_set.length ||
            dataGpio.out_reset.length ||
            dataGpio.in_on.length ||
            dataGpio.in_off.length ||
            dataGpio.in_pullup.length ||
            dataGpio.in_pulldown.length)
    ) {
        const data = {
            type: "gpio",
            name_type: name_gpio.value,
            time_out: time_out_gpio.value * 1,
            out_set: dataGpio.out_set.join(","),
            out_reset: dataGpio.out_reset.join(","),
            in_on: dataGpio.in_on.join(","),
            in_off: dataGpio.in_off.join(","),
            in_pullup: dataGpio.in_pullup.join(","),
            in_pulldown: dataGpio.in_pulldown.join(","),
        };

        addFunctionStep("gpio", data);
        toggerMessage("success", "save gpio successfully");

        resetGpio();
        localStorage.setItem("isUpload", 1);
    } else {
        toggerMessage(
            "error",
            "Please enter name, timeout and at least one type of gpio"
        );
    }
};

$(".submit-btn-gpio_module").onclick = () => {
    for (const item in dataGpio) {
        dataGpio[item] = [];
    }

    setDateGpio("gpio_module");

    const name_gpio_function_module = $(".name_function_gpio_module");
    const time_out_gpio_module = $(".time_out_gpio_module");
    const name_gpio_module = $(".name_gpio_module");
    if (
        name_gpio_function_module.value &&
        time_out_gpio_module.value &&
        name_gpio_module.value &&
        (dataGpio.out_set.length ||
            dataGpio.out_reset.length ||
            dataGpio.in_on.length ||
            dataGpio.in_off.length ||
            dataGpio.in_pullup.length ||
            dataGpio.in_pulldown.length)
    ) {
        const data = {
            type: "gpio_module",
            name_type: name_gpio_function_module.value,
            name_gpio_module: name_gpio_module.value,
            time_out: time_out_gpio_module.value * 1,
            out_set: dataGpio.out_set.join(","),
            out_reset: dataGpio.out_reset.join(","),
            in_on: dataGpio.in_on.join(","),
            in_off: dataGpio.in_off.join(","),
            in_pullup: dataGpio.in_pullup.join(","),
            in_pulldown: dataGpio.in_pulldown.join(","),
        };

        addFunctionStep("gpio_module", data);
        toggerMessage("success", "save gpio successfully");

        resetGpio();
        localStorage.setItem("isUpload", 1);
    } else {
        toggerMessage(
            "error",
            "Please enter name, timeout and at least one type of gpio"
        );
    }
};

function getModeFunction() {
    return $(".gpio-function-btn.active") ? "gpio_normal" : "gpio_module";
}
