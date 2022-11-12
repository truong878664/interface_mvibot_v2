const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const navTablist = $$('.navtab-item')
const contentTablist = $$('.nav-content')
let currentHash = window.location.hash


reloadActiveTab()
activeTab()

function activeTab() {
    navTablist.forEach((navTabItem, index) => {
        navTabItem.addEventListener('click', () => {
            $('.navtab-item.active').classList.remove("active")
            $('.nav-content.show').classList.remove("show")
            navTabItem.classList.add("active")
            contentTablist[index].classList.add("show")
        })
    });
}

function reloadActiveTab() {
    if (currentHash) {
        const navContentActive = $(currentHash)
        const navTabActive = $(`[href="${currentHash}"]`)
        $('.navtab-item.active').classList.remove("active")
        $('.nav-content.show').classList.remove("show")
        navTabActive.parentElement.classList.add('active')
        navContentActive.classList.add("show")
    }
}