import { $, $$ } from "../main.js";
let dataOld;
let currentRobot = $("#robot-status").children[1].value;
updateStatus();

function updateStatus() {
    fetch(`/api/status/${currentRobot}`)
        .then((res) => res.json())
        .then((data) => {
            if (JSON.stringify(data) === JSON.stringify(dataOld)) {
                return;
            }
            $$(".no")?.forEach((element) => {
                element.classList.remove("no");
            });
            $$(".yes")?.forEach((element) => {
                element.classList.remove("yes");
            });
            dataOld = data;

            for (const key in data) {
                const itemElement = $(`#${key}`);
                if (key === "motor_left" || key === "motor_right") {
                    const motorWrapper = $(`.${key}`);
                    for (const item in data[key]) {
                        const value = data[key][item] === 1 ? "yes" : "no";
                        motorWrapper.querySelector(`.${item}`).innerText =
                            value;
                        motorWrapper
                            .querySelector(`.${item}`)
                            .classList.add(value);
                    }
                } else if (key == "soc") {
                    let color;
                    if (data[key] <= 10) {
                        color = "red";
                    } else if (data[key] <= 20) {
                        color = "orange";
                    } else {
                        color = "#54B435";
                    }
                    $(
                        ".soc-wrapper"
                    ).style.background = `linear-gradient(90deg, ${color} ${data[key]}%, rgba(255,255,255,1) ${data[key]}%)`;
                    itemElement.innerText = data[key];
                } else {
                    if (parseInt(data[key]) === 1) {
                        itemElement.innerText = "yes";
                        itemElement.classList.add("yes");
                    } else if (parseInt(data[key]) === 0) {
                        itemElement.innerText = "no";
                        itemElement.classList.add("no");
                    } else {
                        itemElement.innerText = data[key];
                    }
                }
            }
        });
}

setInterval(() => {
    updateStatus();
}, 2000);

$("#robot-status").onchange = (e) => {
    e.target.value && (currentRobot = e.target.value);
    updateStatus();
};