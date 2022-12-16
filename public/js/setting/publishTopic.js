import publishTopic from "../rosModule/topicString.js";
import { $ } from "../main.js";

$("#shutdown-btn");
$("#reboot-data");

$("#public-btn").onclick = () => {
    const dataPublic = $("#public-data").value;
    if ($("#choose_robot").value === "") {
        alert("enter robot");
    } else if (dataPublic === "") {
        alert("enter data public");
    } else {
        publishTopic(`${$("#choose_robot").value}/set_config`, dataPublic);
        alert("public success");
        $("#public-data").value = "";
        $("#public-data").focus();
    }
};

$("#shutdown-btn").onclick = () => {
    if ($("#choose_robot").value === "") {
        alert("enter robot");
    } else {
        publishTopic(`${$("#choose_robot").value}/robot_shutdown`, "1");
        alert("shutdown success");
    }
};

$("#reboot-btn").onclick = () => {
    if ($("#choose_robot").value === "") {
        alert("enter robot");
    } else {
        publishTopic(`${$("#choose_robot").value}/robot_shutdown`, "2");
        alert("reboot success");
    }
};
