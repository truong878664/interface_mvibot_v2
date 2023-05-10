import createJoystick from "../createJoystick/createJoystick.js";
import { $, $$ } from "../main.js";
import moveRobot, {
    setRobotMove,
} from "../rosModule/moveRobot.js";

createJoystick();
createMoveAction();

export function createMoveAction() {
    const listRobot = $("#list-robot");

    listRobot &&
        listRobot.addEventListener("change", (e) => {
            // cmd_vel_listener.name = `${e.target.value}/cmd_vel`;
            const robotActive = e.target.value;
            setRobotMove(robotActive);
        });

    const SPEED_MAX = 0.5;
    const RAD_MAX = 0.314;

    const [rangeSliderSpeed, rangeBulletSpeed] = [
        $("#rs-range-line-speed"),
        $("#rs-bullet-speed"),
    ];

    const [rangeSliderRad, rangeBulletRad] = [
        $("#rs-range-line-rad"),
        $("#rs-bullet-rad"),
    ];

    const speedLocal = localStorage.getItem("speed");
    const radLocal = localStorage.getItem("rad");

    speedLocal &&
        (rangeSliderSpeed.value = (speedLocal / SPEED_MAX) * 100) &&
        showSliderSpeedValue();
    radLocal &&
        (rangeSliderRad.value = (radLocal / RAD_MAX) * 100) &&
        showSliderRadValue();

    rangeSliderSpeed.addEventListener("input", showSliderSpeedValue, false);
    rangeSliderRad.addEventListener("input", showSliderRadValue, false);

    function showSliderSpeedValue() {
        const speed = ((rangeSliderSpeed.value / 100) * SPEED_MAX).toFixed(2);
        rangeBulletSpeed.innerText = speed;
        rangeBulletSpeed.setAttribute("speed", speed);

        localStorage.setItem("speed", speed);
    }

    function showSliderRadValue() {
        const rad = ((rangeSliderRad.value / 100) * RAD_MAX).toFixed(3);

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
                $(".joystick-wrapper").style.pointerEvents = "none";
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
        $(".joystick-wrapper").style.pointerEvents = "auto";
    }
}
