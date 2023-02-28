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
    // item.oninput = (e) => {
    //     const input = e.target.value;
    //     console.log(input.split(""));
    // };
    item.onblur = (e) => {
        const input = e.target.value;
        const input1 = input.replace(/[^0-9\.]+/g, "");

        if (input.indexOf("-") != -1) {
            const input2 = -input1.replaceAll("-", "");
            !isNaN(input2) ? (e.target.value = input2) : (e.target.value = 0);
        } else {
            !isNaN(input1)
                ? (e.target.value = Number(input1))
                : (e.target.value = 0);
        }
    };
});
