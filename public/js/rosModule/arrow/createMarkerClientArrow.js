import ros from "../../main.js";

export default function createMarkerClientArrow(tfClient, viewer) {
    new ROS3D.MarkerClient({
        ros: ros,
        tfClient: tfClient,
        topic: `/visualization_marker_layer_arrow`,
        rootObject: viewer.scene,
    });
}
