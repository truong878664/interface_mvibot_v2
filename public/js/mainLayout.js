const hideNavBarEle = document.querySelector('.hine-nav-bar')
const showNavBarEle = document.querySelector('.show-nav-bar')
const navBar = hideNavBarEle.parentElement
const containerEle = document.querySelector('.container')



function start() {
    showNavBar()
    hideNavBar()
}
start()


function showNavBar() {
    showNavBarEle.addEventListener('click', () => {
        navBar.classList.remove('hide')
        showNavBarEle.classList.add('hide')
        containerEle.style.marginLeft = 80
    })
}

function hideNavBar() {
    hideNavBarEle.addEventListener('click', () => {
        navBar.classList.add('hide')
        showNavBarEle.classList.remove('hide')
        containerEle.style.marginLeft = 0
    })
}


