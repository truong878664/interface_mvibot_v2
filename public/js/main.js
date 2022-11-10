let ros

const connectRosBtn = document.querySelector('.connect-ros-btn')

function connectRos() {
    ros = new ROSLIB.Ros({
        url: `ws:localhost:9090`
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
}
connectRos()

function connected() {
    connectRosBtn.classList.remove('connection-failed')
    connectRosBtn.classList.add('connected')
}

function connectionFailed(){
    connectRosBtn.classList.remove('connected')
    connectRosBtn.classList.add('connection-failed')
}

