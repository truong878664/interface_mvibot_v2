import { notEqual } from "assert";
import { $, $$, toggerMessage } from "../main.js";
import publishTopic from "../rosModule/topicString.js";

let currentTypeGpio = "";

$$(".type-gpio-btn").forEach((element) => {
    element.onclick = (e) => {
        currentTypeGpio = e.target.getAttribute("id");

        $(".type-gpio-btn.active")?.classList.remove("active");
        e.target.classList.add("active");
    };
});

$$(".output-gpio").forEach((element) => {
    element.onclick = (e) => {
        e.target.classList.remove(
            currentTypeGpio == "out_reset" ? "null" : "out_reset",
            currentTypeGpio == "out_set" ? "null" : "out_set"
        );
        e.target.classList.toggle(currentTypeGpio);
    };
});

let nameRobot;
$("#robot-gpio").onchange = (e) => {
    nameRobot = e.target.value;
    if (nameRobot) {
        setInterval(() => {
            setInputGpio(nameRobot);

        }, 1000);
    }
};



function setInputGpio(nameRobot) {
    fetch(`/api/input-gpio?name_seri=${nameRobot}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.status == 400) {
                toggerMessage("error", data.message);
            }
            const dataInput = {
                in_on: [],
                in_off: [],
            };

            data.data?.forEach((io, index) => {
                if (io == 1) {
                    dataInput.in_on.push(index);
                } else if (io == 0) {
                    dataInput.in_off.push(index);
                }
            });

            setLightGpio(dataInput);
        });



    function setLightGpio(dataInput) {
        console.log($$(`.input-gpio`))

        for (const item in dataInput) {
            dataInput[item].forEach((light) => {
                $(`.input-gpio[gpio="${light}"]`).classList.add(`${item}`);
            });
        }
    }
}
$(".send-gpio-btn").onclick = () => {
    if (nameRobot) {
        const dataGpio = {
            out_set: [],
            out_reset: [],
        };
        $$(".output-gpio.out_set").forEach((element) => {
            dataGpio.out_set.push(element.getAttribute("gpio"));
        });

        $$(".output-gpio.out_reset").forEach((element) => {
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
        
        if ((outSet.length || outReset.length)) {
            toggerMessage("success", "Send output successfully!");
            publishTopic(nameTopic, dataTopic)
        } else {
            toggerMessage("error", "Please set output IO!");
        }
    } else {
        toggerMessage("error", "Please choose robot!");
    }
};


// note
// clear robot