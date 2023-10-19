import ros from "../../main.js";

export function createMakerClientFootprint(tfClient, viewer) {
    new ROS3D.MarkerClient({
        ros: ros,
        tfClient: tfClient,
        topic: `/visualization_marker_footprint_${window.name}`,
        rootObject: viewer.scene,
    });
}
