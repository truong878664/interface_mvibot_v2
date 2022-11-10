const rotateEle = document.querySelector('.rotate-btn')
const body = document.querySelector('body')
let rotatevar = 0
console.log([rotateEle])
rotateEle.addEventListener('mousedown', () => {
    rotateEle.addEventListener('mousemove', rotate)
    // console.log(2)

})

rotateEle.addEventListener('mouseup', () => {
    rotateEle.removeEventListener('mousemove', rotate)
    // console.log(1)
})

rotateEle.addEventListener('mouseout', () => {
    rotateEle.removeEventListener('mousemove', rotate)

})

function rotate(e) {
    console.log(e.screenX)
}
//     rotatevar = rotatevar + 1
//     if (rotatevar > 180) {
//         rotatevar = 0
//     }
//     // console.log(rotatevar)
//     rotateEle.style.transform =  `rotate(${rotatevar}deg)`
// }
