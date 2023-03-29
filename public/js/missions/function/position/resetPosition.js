// import { mode_child, mode_position, mode_position_other, name_position, time_out, time_out_position } from "../getDataFunction.js";

import { $ } from "../../../main.js";

// export default function resetPosition() {
//     name_position.value = "";
//     time_out_position.value = -1;
//     mode_position.value = "normal";
//     mode_child.value = -1;
//     mode_position_other.dataset.modePosition = "";
//     mode_position_other.value = "";
// }

export default function resetPosition() {
    $(".number-position-x").value = 0;
    $(".number-position-y").value = 0;
    $(".number-rotate-z").value = 0;
    $("#position-x").value = 0;
    $("#position-y").value = 0;
    $("#rotate-z").value = 0;

    $("#inx").value = 0;
    $("#iny").value = 0;
    $("#position-x").value = 0;
    $("#position-y").value = 0;

    $('[name="name_position"]').value = "";
    $('.time-out-position[name="time_out"]').value = "-1";
    $('[name="color_position"]').value = "#EA047E";
    $('[name="mode_position"]').value = "normal";
    $('[name="mode_child"]').value = "-1";
    $("#create-point-checkbox").checked = false;
}