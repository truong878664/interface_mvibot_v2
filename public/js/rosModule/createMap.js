import ros from "../main.js";
import showLaser from "./showLaser.js";
import showUrd from "./showUrd.js";

var viewer;

function createMap(
    height,
    width,
    tfClient = "",
    topic = "/map",
    divID = "map",
    nameRobot = ""
) {
    const optionViewer = {
        divID: divID,
        width: width,
        height: height,
        antialias: true,
        cameraZoomSpeed: 2,
        alpha: 0.5,
        cameraPose: { x: -10, y: -10, z: 10 },
    };

    viewer = new ROS3D.Viewer(optionViewer);

    new ROS3D.OccupancyGridClient({
        ros: ros,
        rootObject: viewer.scene,
        continuous: true,
        tfClient: tfClient,
        topic: topic,
    });

    if (nameRobot) {
        showUrd(nameRobot, ros, viewer, tfClient);
        showLaser(nameRobot, ros, viewer, tfClient);
    }

    return viewer;
}

export default createMap;
