import { ros, viewer, tfClient } from '../main.js'

function createPoint() {

    new ROS3D.Point({
        ros: ros,
        rootObject: viewer.scene,
        tfClient: tfClient,
        topic: "/point_pub",
        color: '#FD841F',
        queue_size: 1,
        throttle_rate: 1000,
        radius: 0.1,
    }); 

}
export default createPoint