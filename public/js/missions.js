const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const navTablink = $$('.navtab-link')
let currentPathName = window.location.pathname

navTablink.forEach(element => {
    if (element.href.indexOf(currentPathName) != -1) {
        element.parentElement.classList.add('active')
    }
});

