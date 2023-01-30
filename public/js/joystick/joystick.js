import createJoystick from "../createJoystick/createJoystick.js";
import { $ } from "../main.js";
import { cmd_vel_listener } from "../rosModule/moveRobot.js";

createJoystick();

$("#list-robot").onchange = (e) => {
    cmd_vel_listener.name = `${e.target.value}/cmd_vel`;
};
