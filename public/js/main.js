import connectRos from './rosModule/connect.js'
import createMap from './rosModule/createMap.js'

let ros
let viewer

const mapEle = document.querySelector('#map')
const heightMap = mapEle.offsetHeight
const widthMap = mapEle.offsetWidth

function start() {
    ros = connectRos()
    viewer = createMap(heightMap,widthMap)
}
start()


export {ros, viewer}
