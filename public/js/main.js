import connectRos from './rosModule/connectRos.js'
import createMap from './rosModule/createMap.js'
import createAxes from './rosModule/createAxes.js'
import createTfClient from './rosModule/createTfClient.js'
import displayPoint from './rosModule/displayPoint.js'
import displayPose from './rosModule/displayPose.js'
import createPoint from './rosModule/createPoint.js'
import createPose from './rosModule/createPose.js'
import {setPosition} from './rosModule/functionHandler.js'


let viewer
let tfClient
const ros = connectRos()
const mapElement = document.querySelector('#map')

function start() {
    if (mapElement) {
        const heightMap = mapElement.offsetHeight
        const widthMap = mapElement.offsetWidth + 80

        viewer = createMap(heightMap, widthMap)
        tfClient = createTfClient()
        createAxes()

        createPoint()
        createPose()

        displayPoint(0, 0)
        displayPose(0, 0, 0, 0)

        setPosition()
    }
}
start()

export { ros, viewer, tfClient }



