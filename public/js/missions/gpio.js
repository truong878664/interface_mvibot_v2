const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

showFormGpio();
hiddeFormGpio();
addIdInputCheckbox();

function showFormGpio() {
    const allCreateGpioBtn = $$(".create-gpio");
    allCreateGpioBtn.forEach((element) => {
        element.onclick = (e) => {
            e.preventDefault();
            $(".data-gpio-item.show")?.classList.remove("show");
            element.parentElement.classList.add("show");
            getValueCheckbox(element.parentElement);
        };
    });
}

function hiddeFormGpio() {
    $$(".hidden-form-gpio-item").forEach((element) => {
        element.onclick = (e) => {
            e.preventDefault();
            $(".data-gpio-item.show").classList.remove("show");
        };
    });
}
const valueGpio = {
    out_set: [],
    out_reset: [],
    in_on: [],
    in_off: [],
    in_pullup: [],
    in_pulldown: [],
};

function getValueCheckbox(element) {
    const allCheckBox = element.querySelectorAll("input[type='checkbox']");

    Array.prototype.map.call(allCheckBox, (item) => {
        item.onchange = () => {
            const inputGpio = item
                .closest(".data-gpio-item")
                .querySelector("input");
            const typeGpio = inputGpio.getAttribute("name");
            if (item.checked) {
                valueGpio[typeGpio].push(item.defaultValue);
            } else {
                valueGpio[typeGpio].splice(
                    valueGpio[typeGpio].indexOf(item.defaultValue),
                    1
                );
            }
            const html = [];
            valueGpio[typeGpio].sort((x, y) => {
                return Number(x) - Number(y);
            });
            console.log(valueGpio[typeGpio]);
            valueGpio[typeGpio].map((item) => {
                html.push(`<div class="item-gpio">${item}</div>`);
            });
            element.querySelector(".show-gpio-wrapper").innerHTML =
                html.join("");
            inputGpio.value = valueGpio[typeGpio].toString();
        };
    });
}

function addIdInputCheckbox() {
    const allLabel = $$(".label-for-checkbox-gpio");
    $$(".checkbox-gpio").forEach((element, index) => {
        element.setAttribute("id", index);
        allLabel[index].setAttribute("for", index);
    });
}
