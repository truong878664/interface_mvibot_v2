import { ros } from '../main.js'

function createMap(height, width) {
    let viewer = new ROS3D.Viewer({
        divID: 'map',
        width: width,
        height: height,
        antialias: true
    })
    var gridClient = new ROS3D.OccupancyGridClient({
        ros: ros,
        rootObject: viewer.scene
    });

    const tfClient = new ROSLIB.TFClient({
        ros: ros,
        rate: 10,
        fixedFrame: '/map',
        angularThres: 0.08,
        transThres: 0.05,
    });
    
    return viewer
};




export default createMap