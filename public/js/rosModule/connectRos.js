const connectRosBtn = document.querySelector('.connect-ros-btn')

function connectRos() {
    const ros = new ROSLIB.Ros({
        url: `ws://127.0.0.1:9090`
    });

    ros.on('connection', function () {
        console.log('Connected to websocket server.');
        connected()
    });

    ros.on('error', function (error) {
        console.log('Error connecting to websocket server: ', error);
        connectionFailed()
    });

    ros.on('close', function () {
        console.log('Connection to websocket server closed.');
        connectionFailed()
    });
    return ros
}

function connected() {
    connectRosBtn.classList.remove('connection-failed')
    connectRosBtn.classList.add('connected')
}

function connectionFailed(){
    connectRosBtn.classList.remove('connected')
    connectRosBtn.classList.add('connection-failed')
}
export default connectRos