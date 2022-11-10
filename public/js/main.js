import connectRos from './rosModule/connect.js'
import createMap from './rosModule/createMap.js'

let ros
let viewer

const mapEle = document.querySelector('#map')

function start() {
    ros = connectRos()

    if (mapEle) {
        const heightMap = mapEle.offsetHeight
        const widthMap = mapEle.offsetWidth + 80

        viewer = createMap(heightMap, widthMap)
    }
}
start()


export { ros, viewer }
