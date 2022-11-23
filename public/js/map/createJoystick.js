import { $ } from "../main.js";
import moveRobot from "../rosModule/moveRobot.js";

const createJoystick = function () {
    const heightJoystick = $(".joystick-wrapper").offsetHeight;
    var options = {
        zone: document.getElementById("zone_joystick"),
        threshold: 0.1,
        position: {
            left: heightJoystick / 2 + "px",
            top: heightJoystick / 2 + "px",
        },
        mode: "static",
        size: heightJoystick - 50,
        color: "black",
    };
    const manager = nipplejs.create(options);
    let linear_speed = 0;
    let angular_speed = 0;
    let timer;
    manager.on("start", function (event, nipple) {
        timer = setInterval(function () {
            moveRobot(linear_speed, angular_speed);
        }, 500);
    });
    manager.on("move", function (event, nipple) {
        const max_linear = 0.5; // m/s 0.5;
        const max_angular = 0.314; // rad/s
        const max_distance = 200; // pixels;
        linear_speed =
            (Math.sin(nipple.angle.radian) * max_linear * nipple.distance) /
            max_distance;
        angular_speed =
            (-Math.cos(nipple.angle.radian) * max_angular * nipple.distance) /
            max_distance;
        setColorDirection(nipple.direction);
    });
    manager.on("end", function () {
        clearInterval(timer);
        moveRobot(0, 0);
        removeColorDirection();
    });
};

let oldAngle;
function setColorDirection(direction) {
    const angle = direction?.angle;
    if (angle !== oldAngle) {
        $(".position-icon.light")?.classList.remove("light");
        const arrowActive = $(`.${angle}`);
        arrowActive?.classList.add("light");
        oldAngle = angle;
    }
}

function removeColorDirection() {
    $(".position-icon.light")?.classList.remove("light");
}

export default createJoystick;
