import { $, $$ } from "../main.js";

const htmlDataFunction = {
    footprint: [],
    gpio: [],
    marker: [],
    sleep: [],
    position: [],
};

const typeFunction = ["footprint", "gpio", "marker", "sleep", "position"];

loadDataFunction();

export function loadDataFunction() {
    typeFunction.map((item) => {
        getDataFunction(item);
    });
}

function renderFunctionFirst() {
    const currentFunctionNormal = $(".type-mission-function-normal.active");
    $(".detail-type-mission-function-normal").innerHTML =
        htmlDataFunction[currentFunctionNormal.getAttribute("type")].join("");

    const currentFunctionIfElse = $(".type-mission-function-ifelse.active");
    $(".detail-type-mission-function-ifelse").innerHTML =
        htmlDataFunction[currentFunctionIfElse.getAttribute("type")].join("");
}

function getDataFunction(type) {
    fetch(`/api/${type}`)
        .then((res) => res.json())
        .then((data) => {
            renderDataFunction(data, type);
            renderFunctionFirst();
        });
}

$$(".type-mission-function-normal").forEach((element) => {
    element.onclick = (e) => {
        $(".type-mission-function-normal.active").classList.remove("active");
        e.target.classList.add("active");

        const type = e.target.getAttribute("type");
        $(".detail-type-mission-function-normal").innerHTML =
            htmlDataFunction[type].join("");
    };
});

$$(".type-mission-function-ifelse").forEach((element) => {
    element.onclick = (e) => {
        $(".type-mission-function-ifelse.active").classList.remove("active");

        e.target.classList.add("active");

        const type = e.target.getAttribute("type");
        $(".detail-type-mission-function-ifelse").innerHTML =
            htmlDataFunction[type].join("");
    };
});

function renderDataFunction(data, type) {
    htmlDataFunction[type].length = 0;
    data.map((item) => {
        htmlDataFunction[type].push(
            `<div
            class="point-id-1 flex justify-between items-center bg-[rgba(204,204,204,0.53)] px-5 py-3 mb-2 point-id-8">
            <div class="flex">
                <span class="type-mission-${item.mode}">${item.mode}|</span>
                <span class="name-mission-${item.mode}">${
                item.name_position ||
                item.name_gpio ||
                item.name_marker ||
                item.name_sleep ||
                item.name_footprint
            }</span>
            </div>
            <input value="${item.mode}#${
                item.name_position ||
                item.name_gpio ||
                item.name_marker ||
                item.name_sleep ||
                item.name_footprint
            }#${item.id}" type="text"/>
            <div class="">
                <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            </div>`
        );
    });
}
