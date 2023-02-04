import createJoystick from "../createJoystick/createJoystick.js";
import { $, $$ } from "../main.js";
import moveRobot, { cmd_vel_listener } from "../rosModule/moveRobot.js";

createJoystick();

$("#list-robot").onchange = (e) => {
    cmd_vel_listener.name = `${e.target.value}/cmd_vel`;
};

const speedMax = 0.3;
const radMax = 0.314;

const rangeSliderSpeed = $("#rs-range-line-speed");
const rangeBulletSpeed = $("#rs-bullet-speed");

const rangeSliderRad = $("#rs-range-line-rad");
const rangeBulletRad = $("#rs-bullet-rad");

const speedLocal = localStorage.getItem("speed");
const radLocal = localStorage.getItem("rad");

if (speedLocal) {
    rangeSliderSpeed.value = (speedLocal / speedMax) * 100;
    // rangeBulletSpeed.innerText = speedLocal * 100;
    // rangeBulletSpeed.setAttribute("speed", speedLocal * 100);
    showSliderSpeedValue();
}
if (radLocal) {
    rangeSliderRad.value = (radLocal / radMax) * 100;
    showSliderRadValue();
}

rangeSliderSpeed.addEventListener("input", showSliderSpeedValue, false);
rangeSliderRad.addEventListener("input", showSliderRadValue, false);

function showSliderSpeedValue() {
    const speed = ((rangeSliderSpeed.value / 100) * speedMax).toFixed(2);
    rangeBulletSpeed.innerText = speed;
    rangeBulletSpeed.setAttribute("speed", speed);

    localStorage.setItem("speed", speed);
}

function showSliderRadValue() {
    const rad = ((rangeSliderRad.value / 100) * radMax).toFixed(3);

    rangeBulletRad.innerText = rad;
    rangeBulletRad.setAttribute("rad", rad);

    localStorage.setItem("rad", rad);
}

const runRobot = [];

let singleButton = true;

$$(".button-move").forEach((element) => {
    element.onpointerdown = (e) => {
        if (singleButton) {
            const speed = Number(rangeBulletSpeed.getAttribute("speed"));
            const rad = Number(rangeBulletRad.getAttribute("rad"));

            switch (e.target.getAttribute("type")) {
                case "up":
                    runRobot.push(
                        setInterval(() => {
                            moveRobot(speed, 0);
                        }, 100)
                    );

                    break;
                case "down":
                    runRobot.push(
                        setInterval(() => {
                            moveRobot(-speed, 0);
                        }, 100)
                    );
                    break;
                case "left":
                    runRobot.push(
                        setInterval(() => {
                            moveRobot(0, rad);
                        }, 100)
                    );
                    break;
                case "right":
                    runRobot.push(
                        setInterval(() => {
                            moveRobot(0, -rad);
                        }, 100)
                    );
                    break;
            }
            singleButton = false;
        }

        window.onpointerup = (e) => {
            clearIntervalAll(runRobot);
        };

        window.ontouchend = () => {
            clearIntervalAll(runRobot);
        };
        window.ontouchcancel = (e) => {
            clearIntervalAll(runRobot);
        };
    };

    element.onpointerup = (e) => {};
});

function clearIntervalAll(runRobot) {
    clearInterval(runRobot[runRobot.length - 1]);
    runRobot.forEach((id) => {
        clearInterval(id);
    });
    singleButton = true;
    moveRobot(0, 0);
}
