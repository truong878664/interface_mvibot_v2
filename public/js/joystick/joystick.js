import createJoystick from "../createJoystick/createJoystick.js";
import { $, $$ } from "../main.js";
import moveRobot, { cmd_vel_listener } from "../rosModule/moveRobot.js";

createJoystick();

$("#list-robot").onchange = (e) => {
    cmd_vel_listener.name = `${e.target.value}/cmd_vel`;
};

const rangeSlider = $("#rs-range-line");
const rangeBullet = $("#rs-bullet");

const speedLocal = localStorage.getItem("speed");

if (speedLocal) {
    rangeSlider.value = speedLocal * 100;
    // rangeBullet.innerText = speedLocal * 100;
    // rangeBullet.setAttribute("speed", speedLocal * 100);
    showSliderValue();
}

rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue() {
    const speed = (rangeSlider.value / 100).toFixed(1);
    rangeBullet.innerHTML = speed;
    rangeBullet.setAttribute("speed", speed);
    const bulletPosition = rangeSlider.value / rangeSlider.max;
    const width = rangeSlider.offsetWidth;

    rangeBullet.style.left = bulletPosition * (0.935 * width) + "px";
    localStorage.setItem("speed", speed);
}

const runRobot = [];

let singleButton = true;
let moving = false;

$$(".button-move").forEach((element) => {
    element.onpointerdown = (e) => {
        if (singleButton) {
            switch (e.target.getAttribute("type")) {
                case "up":
                    runRobot.push(
                        setInterval(() => {
                            const speed = Number(
                                rangeBullet.getAttribute("speed")
                            );
                            moveRobot(speed, 0);
                            moving = true;
                        }, 100)
                    );
                    break;
                case "down":
                    runRobot.push(
                        setInterval(() => {
                            const speed = Number(
                                rangeBullet.getAttribute("speed")
                            );
                            moveRobot(-speed, 0);
                        }, 100)
                    );
                    break;
                case "left":
                    runRobot.push(
                        setInterval(() => {
                            moveRobot(0, 0.314);
                        }, 100)
                    );
                    break;
                case "right":
                    runRobot.push(
                        setInterval(() => {
                            moveRobot(0, -0.314);
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
