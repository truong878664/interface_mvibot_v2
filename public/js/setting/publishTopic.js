import publishTopic from "../rosModule/topicString.js";
import { $ } from "../main.js";

$("#public-btn");
$("#public-data");

$("#public-btn").onclick = () => {
    const dataPublic = $("#public-data").value;
    if ($("#choose_robot").value === "") {
        alert("enter robot");
    } else if (dataPublic === "") {
        alert("enter data public");
    } else {
        publishTopic(dataPublic);
        alert("public success");
        $("#public-data").value = "";
        $("#public-data").focus();
    }
};
