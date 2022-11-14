const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const missionCreateBtn = $('.create-missions-btn')
const mission = $('#name-mission')

missionCreateBtn.addEventListener('click', () => {
    setTimeout(() => {
        mission.focus()
    }, 1)
})
