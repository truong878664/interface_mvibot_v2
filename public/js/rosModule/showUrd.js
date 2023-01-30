export default function showUrd(nameRobot, ros, viewer, tfClient) {
    new ROS3D.UrdfClient({
        ros: ros,
        tfClient: tfClient,
        param: "/" + nameRobot + "/robot_description_web",
        rootObject: viewer.scene,
        loader: ROS3D.COLLADA_LOADER_2,
    });
}
