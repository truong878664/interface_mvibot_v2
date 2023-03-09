import { toggerMessage } from "./main.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

activeNavTab();
handleChangeImgMarker();
handleInfoFunction();

function activeNavTab() {
    const navTablink = $$(".navtab-link");
    let currentPathName = window.location.pathname;

    navTablink.forEach((element) => {
        if (element.href.indexOf(currentPathName) != -1) {
            element.parentElement.classList.add("active");
        }
    });
}

function handleChangeImgMarker() {
    $$("[name='marker_dir']").forEach((element) => {
        element.onchange = (e) => {
            const divImgMarker = e.target
                .closest(".marker-item")
                .querySelector(".marker-img");

            const typeMarker = divImgMarker.getAttribute("markerDir");
            divImgMarker.style.backgroundImage = `url('/img/marker/${typeMarker}${e.target.value}.png')`;
        };
    });
}

function handleInfoFunction() {
    $(".info-function-btn") &&
        ($(".info-function-btn").onclick = () => {
            $(".info-function-content").classList.toggle("hidden");
        });
}

$$(".input-type-number").forEach((item) => {
    item.onblur = (e) => {
        const input = e.target.value;
        const inputValid = input.replace(/[^0-9\.]+/g, "");

        const isValid = input.indexOf("-") != -1;

        e.target.value = !isNaN(inputValid)
            ? isValid
                ? -inputValid
                : Number(inputValid)
            : 0;
    };
});

validateNameFunction();
function validateNameFunction() {
    $$(".valid-input").forEach((element) => {
        element.addEventListener("input", () => valid(element));
    });

    function valid(element) {
        const pattern = /^[a-zA-Z0-9_]*$/;
        const isValid = element.value == "" || !pattern.exec(element.value);

        const buttonCreate = element
            .closest(".function-item")
            .querySelector("[data-valid]");

        isValid &&
            toggerMessage(
                "error",
                "Please enter all input & does not contain special characters like (!@#$%^&*()+-=)"
            );

        buttonCreate.dataset.valid = isValid && "disable";
    }
}
