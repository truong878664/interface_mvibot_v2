import displayPoint from './displayPoint.js'
import displayPose from './displayPose.js'
import mathYaw from './mathYaw.js'

let positionX = 0
let positionY = 0
let rotateZ = 0
let rotateW = 0
let rotateZdeg = 0
const positionXElement = document.querySelector('.number-position-x')
const positionYElement = document.querySelector('.number-position-y')
const positionZElement = document.querySelector('.number-rotate-z')

const controlPositionX = document.getElementById('position-x')
const controlPositionY = document.getElementById('position-y')
const controlRotateZ = document.getElementById('rotate-z')

function setPosition() {
    controlPositionX.addEventListener('input', (e) => {
        positionX = Number(e.target.value)
        displayPoint(positionX, positionY)
        displayPose(positionX, positionY, rotateZ, rotateW)
        displayValue(positionX, positionY, rotateZdeg)
    })

    controlPositionY.addEventListener('input', (e) => {
        positionY = Number(e.target.value)
        displayPoint(positionX, positionY)
        displayPose(positionX, positionY, rotateZ, rotateW)
        displayValue(positionX, positionY, rotateZdeg)
    })

    controlRotateZ.addEventListener('input', (e) => {
        rotateZdeg = e.target.value
        const degInput = Number(e.target.value) / 180 * Math.PI
        const { z, w } = mathYaw(degInput)
        rotateZ = z
        rotateW = w
        displayPoint(positionX, positionY)
        displayPose(positionX, positionY, rotateZ, rotateW)
        displayValue(positionX, positionY, rotateZdeg)
    })

    positionXElement.addEventListener('change', (e) => {
        positionX = Number(e.target.value)
        displayPoint(positionX, positionY)
        displayPose(positionX, positionY, rotateZ, rotateW)
        displayValue(positionX, positionY, rotateZdeg)
    })

    positionYElement.addEventListener('change', (e) => {
        positionY = Number(e.target.value)
        displayPoint(positionX, positionY)
        displayPose(positionX, positionY, rotateZ, rotateW)
        displayValue(positionX, positionY, rotateZdeg)
    })

    positionZElement.addEventListener('change', (e) => {
        rotateZdeg = e.target.value
        const degInput = Number(e.target.value) / 180 * Math.PI
        const { z, w } = mathYaw(degInput)
        rotateZ = z
        rotateW = w
        displayPoint(positionX, positionY)
        displayPose(positionX, positionY, rotateZ, rotateW)
        displayValue(positionX, positionY, rotateZdeg)
    })
}

function displayValue(positionX, positionY, rotateZ) {
    positionXElement.value = positionX
    positionYElement.value = positionY
    controlPositionX.value = positionX
    controlPositionY.value = positionY
    positionZElement.value = rotateZ
    controlRotateZ.value = rotateZ
}


export { setPosition }