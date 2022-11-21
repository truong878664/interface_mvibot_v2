document.title = "Status Robot | Mvibot";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

setPercentBattery();
setColorTemper();

function setPercentBattery() {
    const outerCircles = $$(".outer-circle");

    outerCircles.forEach((outerCircle) => {
        const batteryPercent =
            parseFloat(
                outerCircle.parentElement.querySelector(".battery-percent")
                    .innerText
            ) / 100;
        const batteryPercentToDeg = batteryPercent * 265;

        let color = "#54B435";
        if (batteryPercent <= 0.1) {
            color = "#FF1E00";
        } else if (batteryPercent <= 0.2) {
            color = "#F57328";
        }

        outerCircle.style.background = `conic-gradient(${color} ${batteryPercentToDeg}deg, #ccc ${batteryPercentToDeg}deg)`;
    });
}

function setColorTemper() {
    const batteryTempers = $$(".battery-temper");
    batteryTempers.forEach((batteryTemper) => {
        const temperIcon = batteryTemper.querySelector(".temper-icon");
        const temperValue = batteryTemper.querySelector(
            ".battery-temper-value"
        ).innerText;

        if (parseInt(temperValue) < 40) {
            temperIcon.style.color = "blue";
        } else if (parseInt(temperValue) < 50) {
            temperIcon.style.color = "orange";
        } else {
            temperIcon.style.color = "red";
        }
    });
}
