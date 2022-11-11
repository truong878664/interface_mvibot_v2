import {ros} from "../main.js"

function createTfClient () {
    const tfClient = new ROSLIB.TFClient({
        ros: ros,
        rate: 10,
        fixedFrame: '/map',
        angularThres: 0.08,
        transThres: 0.05,
    });
    return tfClient
}

export default createTfClient