import ros from "../../main.js";

export function createMarkerClientPath(tfClient, viewer) {
    new ROS3D.MarkerClient({
        ros: ros,
        tfClient: tfClient,
        topic: `/visualization_marker_path_${window.name}`,
        rootObject: viewer.scene,
    });
}
