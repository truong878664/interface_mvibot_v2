import ros from "../main.js";

var viewer;

function createMap(
    height,
    width,
    tfClient = "",
    topic = "/map",
    divID = "map"
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

    const occup = new ROS3D.OccupancyGridClient({
        ros: ros,
        rootObject: viewer.scene,
        continuous: true,
        tfClient: tfClient,
        topic: topic,
    });

    console.log(occup);
    return viewer;
}

export default createMap;
