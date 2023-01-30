import { $$, toggerMessage } from "../../main.js";
import { addFunctionStep } from "../createStepMission.js";
import { loadDataFunction } from "../handleTypeMission.js";

let currentTypeGpio = "";

$$(".type-gpio-btn").forEach((element) => {
    element.onclick = (e) => {
        currentTypeGpio = e.target.getAttribute("id");

        $(".type-gpio-btn.active")?.classList.remove("active");
        e.target.classList.add("active");

        const color = getComputedStyle(e.target).backgroundColor;

        if (currentTypeGpio.indexOf("in") != -1) {
            $(".input-arrow").style.fill = color;
            $(".input-name").style.fill = color;

            $(".output-arrow").style.fill = "black";
            $(".output-name").style.fill = "black";
        } else {
            $(".output-arrow").style.fill = color;
            $(".output-name").style.fill = color;

            $(".input-arrow").style.fill = "black";
            $(".input-name").style.fill = "black";
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

$(".submit-btn-gpio").onclick = () => {
    for (const item in dataGpio) {
        dataGpio[item] = [];
    }

    $$(".input-gpio.in_on").forEach((element) => {
        dataGpio.in_on.push(element.getAttribute("gpio"));
    });

    $$(".input-gpio.in_off").forEach((element) => {
        dataGpio.in_off.push(element.getAttribute("gpio"));
    });

    $$(".input-gpio.in_pullup").forEach((element) => {
        dataGpio.in_pullup.push(element.getAttribute("gpio"));
    });

    $$(".input-gpio.in_pulldown").forEach((element) => {
        dataGpio.in_pulldown.push(element.getAttribute("gpio"));
    });

    $$(".output-gpio.out_set").forEach((element) => {
        dataGpio.out_set.push(element.getAttribute("gpio"));
    });

    $$(".output-gpio.out_reset").forEach((element) => {
        dataGpio.out_reset.push(element.getAttribute("gpio"));
    });

    const name_gpio = $(".name_gpio2");
    const time_out_gpio = $(".time_out_gpio2");

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
        loadDataFunction();
        resetGpio();
    } else {
        toggerMessage(
            "error",
            "Please enter name, timeout and at least one type of gpio"
        );
    }
};

export function setLightGpio() {
    for (const item in dataGpio) {
        dataGpio[item].forEach((light) => {
            if (item.indexOf("out") != -1) {
                $(`.output-gpio[gpio="${light}"]`).classList.add(`${item}`);
            } else if (item.indexOf("in") != -1) {
                $(`.input-gpio[gpio="${light}"]`).classList.add(`${item}`);
            }
        });
    }
}

export function resetGpio() {
    for (const item in dataGpio) {
        dataGpio[item] = [];
    }
    $(".name_gpio2").value = "";
    $(".time_out_gpio2").value = -1;

    $$(".gpio-io").forEach((item) => {
        item.classList.remove(
            "in_on",
            "in_off",
            "in_pullup",
            "in_pulldown",
            "out_reset",
            "out_set"
        );
    });
}
