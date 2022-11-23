import ros from "../main.js";
import { $ } from "../main.js";

// let datas = {};
function setSizeMap() {
    const map_listener = new ROSLIB.Topic({
        ros: ros,
        name: "/map",
        messageType: "nav_msgs/OccupancyGrid",
    });
    map_listener.subscribe(function (message) {
        const resolution = message.info.resolution;
        const width = message.info.width;
        const height = message.info.height;
        const positionX = message.info.origin.position.x;
        const positionY = message.info.origin.position.y;

        const xMax = (width * resolution + positionX).toFixed(2);
        const xMin = positionX.toFixed(2);
        const yMin = positionY.toFixed(2);
        const yMax = (height * resolution + positionY).toFixed(2);

        setSizeBar(xMax, xMin, yMin, yMax);
        setSizeInput(xMax, xMin, yMin, yMax);
    });
}

function setSizeBar(xMax, xMin, yMin, yMax) {
    const positionXElement = $("#position-x");
    const positionYElement = $("#position-y");

    positionXElement.setAttribute("max", xMax);
    positionXElement.setAttribute("min", xMin);
    positionYElement.setAttribute("max", yMax);
    positionYElement.setAttribute("min", yMin);
}

function setSizeInput(xMax, xMin, yMin, yMax) {
    const inputPositionX = $("#inx");
    const inputPositionY = $("#iny");

    inputPositionX.setAttribute("max", xMax);
    inputPositionX.setAttribute("min", xMin);

    inputPositionY.setAttribute("max", yMax);
    inputPositionY.setAttribute("min", yMin);
}

export default setSizeMap;
