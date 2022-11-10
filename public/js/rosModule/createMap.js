import {ros} from '../main.js'

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
    return viewer
};

export default createMap