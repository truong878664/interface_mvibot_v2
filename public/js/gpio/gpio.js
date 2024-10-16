import { $, $$, toggerMessage } from "../main.js";
import publishTopic from "../rosModule/topicString.js";

let currentTypeGpio = "";

$$(".type-gpio-btn").forEach((element) => {
    element.onclick = (e) => {
        $$(".type-gpio-btn.active")?.forEach((element) => {
            if (element != e.target) element.classList.remove("active");
        });
        e.target.classList.toggle("active");
        currentTypeGpio = $(".type-gpio-btn.active")?.getAttribute("id") || "";
    };
});

$$(".output-gpio").forEach((element) => {
    element.onclick = (e) => {
        const currentIoOutput = e.target;
        const isOutReset = currentIoOutput.classList.contains("out_reset");
        currentIoOutput.classList.remove("out_reset", "out_set");
        currentIoOutput.classList.add(isOutReset ? "out_set" : "out_reset");
        currentIoOutput.classList.add("output-send");
    };
});

let nameRobot;
let updateGpio;

$("#robot-gpio").onchange = (e) => {
    nameRobot = e.target.value;
    clearInterval(updateGpio);
    if (nameRobot) {
        setLightGpio(nameRobot);
        updateGpio = setInterval(() => {
            setLightGpio(nameRobot);
        }, 1000);
    } else {
        clearInterval(updateGpio);
        resetLightGpioInput();
        resetLightGpioOutput();
    }
    $(".type-gpio-btn.active")?.classList.remove("active");
    currentTypeGpio = "";
};
const LIGHT_ON = 1;
const LIGHT_OFF = 0;

async function setLightGpio(nameRobot) {
    const res = await fetch(`/api/input-gpio?name_seri=${nameRobot}`);
    const data = await res.json();
    if (data.status == 400) {
        toggerMessage("error", data.message);
    }
    const dataInput = {
        in_on: [],
        in_off: [],
    };

    const dataOutput = {
        out_set: [],
        out_reset: [],
    };

    data.dataInput?.forEach((io, index) => {
        if (io === LIGHT_ON) {
            dataInput.in_on.push(index);
        } else if (io === LIGHT_OFF) {
            dataInput.in_off.push(index);
        }
    });

    if (!currentTypeGpio) {
        data.dataOutput?.forEach((io, index) => {
            if (io === LIGHT_ON) {
                dataOutput.out_set.push(index);
            } else if (io === LIGHT_OFF) {
                dataOutput.out_reset.push(index);
            }
        });
        resetLightGpioOutput();
        setLightGpioOutput(dataOutput);
    }

    resetLightGpioInput();
    setLightGpioInput(dataInput);

    function setLightGpioInput(dataInput) {
        for (const item in dataInput) {
            dataInput[item].forEach((light) => {
                $(`.input-gpio[gpio="${light}"]`).classList.add(`${item}`);
            });
        }
    }

    function setLightGpioOutput(dataOutput) {
        for (const item in dataOutput) {
            dataOutput[item].forEach((light) => {
                $(`.output-gpio[gpio="${light}"]`).classList.add(`${item}`);
            });
        }
    }
}

function resetLightGpioInput() {
    $$(`.input-gpio`).forEach((io) => {
        io.classList.remove("in_on", "in_off");
    });
}

function resetLightGpioOutput() {
    $$(`.output-gpio`).forEach((io) => {
        io.classList.remove("out_set", "out_reset");
    });
}

$(".send-gpio-btn").onclick = () => {
    if (nameRobot) {
        const dataGpio = {
            out_set: [],
            out_reset: [],
        };
        $$(".output-gpio.out_set.output-send")?.forEach((element) => {
            dataGpio.out_set.push(element.getAttribute("gpio"));
        });

        $$(".output-gpio.out_reset.output-send")?.forEach((element) => {
            dataGpio.out_reset.push(element.getAttribute("gpio"));
        });

        const nameTopic = `/${nameRobot}/output_user_set`;

        const outSet = [];
        dataGpio.out_set.forEach((item) => {
            outSet.push(`(${item}|1)`);
        });
        const outReset = [];
        dataGpio.out_reset.forEach((item) => {
            outReset.push(`(${item}|0)`);
        });

        const dataTopic = outSet.join("") + outReset.join("");

        if (outSet.length || outReset.length) {
            toggerMessage("success", "Send output successfully!");
            publishTopic(nameTopic, dataTopic);
            $(".type-gpio-btn.active")?.classList.remove("active");
            currentTypeGpio = "";

            $$(".output-gpio.output-send").forEach((item) => {
                item.classList.remove("output-send");
            });
            console.log(dataTopic);
        } else {
            toggerMessage("error", "Please set output IO!");
        }
    } else {
        toggerMessage("error", "Please choose robot!");
    }
};
