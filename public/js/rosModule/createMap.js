import ros from "../main.js";

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
        // console.log(nameRobot);
        new ROS3D.UrdfClient({
            ros: ros,
            tfClient: tfClient,
            param: "/" + nameRobot + "/robot_description_web",
            rootObject: viewer.scene,
            loader: ROS3D.COLLADA_LOADER_2,
        });

        new ROS3D.LaserScan({
            ros: ros,
            topic: "/" + nameRobot + "/laser/scan",
            rootObject: viewer.scene,
            tfClient: tfClient,
            material: { size: 0.5, color: 0xff0000 },
            rate: 1,
        });
    }

    return viewer;
}

export default createMap;
