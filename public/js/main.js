import connectRos from './rosModule/connect.js'
import createMap from './rosModule/createMap.js'
import createAxes from './rosModule/createAxes.js'
import createTfClient from './rosModule/createTfClient.js'
import displayPoint from './rosModule/displayPoint.js'

let ros
let viewer
let tfClient

const mapElement = document.querySelector('#map')

function start() {
    ros = connectRos()

    if (mapElement) {
        const heightMap = mapElement.offsetHeight
        const widthMap = mapElement.offsetWidth + 80
        viewer = createMap(heightMap, widthMap)
    }

    createAxes()

    tfClient = createTfClient()

    displayPoint(0,1)

}
start()





export { ros, viewer, tfClient }
