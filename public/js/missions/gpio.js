// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

showFormGpio(".create-gpio_gpio");
showFormGpio(".create-gpio_wake_up");
showFormGpio(".create-gpio_stop");
hiddenFormGpio();

function showFormGpio(classElement) {
    const allCreateGpioBtn = $$(classElement);
    allCreateGpioBtn.forEach((element) => {
        element.onclick = (e) => {
            e.preventDefault();
            $(".data-gpio-item.show")?.classList.remove("show");
            element.parentElement.classList.add("show");
            getValueCheckbox(element.parentElement);
        };
    });
}

function hiddenFormGpio() {
    $$(".hidden-form-gpio-item").forEach((element) => {
        element.onclick = (e) => {
            e.preventDefault();
            $(".data-gpio-item.show").classList.remove("show");
        };
    });
}
export const valueGpio = {
    out_set: [],
    out_reset: [],
    in_on: [],
    in_off: [],
    in_pullup: [],
    in_pulldown: [],
};

function getValueCheckbox(element) {
    const allCheckBox = element.querySelectorAll(".gpio_checkbox");
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

const valueGpioOther = [
    {
        type: "wake_up",
        out_set: [],
        out_reset: [],
        in_on: [],
        in_off: [],
        in_pullup: [],
        in_pulldown: [],
    },
    {
        type: "stop",
        out_set: [],
        out_reset: [],
        in_on: [],
        in_off: [],
        in_pullup: [],
        in_pulldown: [],
    },
];

const currentWakeUp = JSON.parse($("#current-wake-up").value);
const currentStop = JSON.parse($("#current-stop").value);

const nameGpios = [
    "out_set",
    "out_reset",
    "in_on",
    "in_off",
    "in_pullup",
    "in_pulldown",
];

nameGpios.forEach((nameGpio) => {
    if (currentWakeUp.length > 0) {
        const dataWakeUp =
            currentWakeUp[0][nameGpio]?.split(",").map(Number) || [];
        valueGpioOther[0][nameGpio] = dataWakeUp;
    }

    if (currentStop.length > 0) {
        const dataStop = currentStop[0][nameGpio]?.split(",").map(Number) || [];
        valueGpioOther[1][nameGpio] = dataStop;
    }
});

valueGpioOther.forEach((itemOther) => {
    nameGpios.forEach((nameGpio) => {
        itemOther[nameGpio].forEach((gpio) => {
            $$(`.${nameGpio}_${itemOther.type}_checkbox`)[gpio].checked = true;
        });
        if (itemOther[nameGpio]) {
            const html = [];
            itemOther[nameGpio].map((gpio) => {
                html.push(`<div class="item-gpio">${gpio}</div>`);
            });
            $(`.${nameGpio}_${itemOther.type}_show`).innerHTML = html.join("");
            $(`.${nameGpio}_${itemOther.type}`).value =
                itemOther[nameGpio].toString();
        }
    });

    $$(`.${itemOther.type}_checkbox`).forEach((item) => {
        item.onchange = (e) => {
            const inputGpio = item
                .closest(".data-gpio-item")
                .querySelector("input");
            const type = inputGpio.getAttribute("name");
            if (e.target.checked) {
                itemOther[type].push(Number(item.defaultValue));
            } else {
                itemOther[type].splice(
                    itemOther[type].indexOf(Number(item.defaultValue)),
                    1
                );
            }
            const html = [];
            itemOther[type].map((gpio) => {
                html.push(`<div class="item-gpio">${gpio}</div>`);
            });
            $(`.${type}_${itemOther.type}_show`).innerHTML = html.join("");

            $(`.${type}_${itemOther.type}`).value = itemOther[type].toString();
        };
    });
});
