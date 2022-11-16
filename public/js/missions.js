const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

activeNavTab();
showTabFunctionAction();
idMissionsCurrent();

function activeNavTab() {
    const navTablink = $$(".navtab-link");
    let currentPathName = window.location.pathname;

    navTablink.forEach((element) => {
        if (element.href.indexOf(currentPathName) != -1) {
            element.parentElement.classList.add("active");
        }
    });
}

function showTabFunctionAction() {
    const addBtns = $$(".add-f-a-icon");
    const formFunctionAction = $$(".form-missions-f-a");

    addBtns.forEach((addBtn, index) => {
        addBtn.addEventListener("click", (e) => {
            $(".misisons-f-a-item.active").classList.remove("active");
            $(".form-missions-f-a.show").classList.remove("show");

            e.target.parentElement.classList.add("active");
            formFunctionAction[index].classList.add("show");
        });
    });
}

function idMissionsCurrent() {
    const pathName = window.location.pathname;
    const currentIdMission = pathName.slice(
        pathName.lastIndexOf("/") + 1,
        pathName.length
    );
    const inputCurrentIdMission = document.querySelectorAll(
        ".current-id-mission"
    );
    inputCurrentIdMission.forEach((element) => {
        element.value = currentIdMission;
    });
}