import { $ } from "../../../../main.js";
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
