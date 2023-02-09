import fetchCustom from "../../functionHandle/fetchCustom.js";
import { $, $$ } from "../../main.js";

updateVar()

const typeVar = ["name_variable", "command_action", "focus_value"];
typeVar.forEach((item) => {
    $(`.${item}_btn`).onclick = () => {
        $(`.item-var-ul:not(.hidden):not(.${item}_ul)`)?.classList.add(
            "hidden"
        );
        $(`.${item}_ul`).classList.toggle("hidden");
    };
});

function handleAddItemVar() {
    $$(".var-item-value").forEach((element) => {
        element.onclick = (e) => {
            const type = e.target.getAttribute("type");
            const value = e.target.getAttribute("value");
            const inputElement = $(`.${type}_input`);
            if (value != "keyboard") {
                inputElement.value = value;
            } else {
                inputElement.value = "";
                inputElement.removeAttribute("readonly");
                inputElement.focus();
                inputElement.onblur = () => {
                    inputElement.setAttribute("readonly", true);
                };
            }
            $(`.item-var-ul:not(.hidden)`)?.classList.add("hidden");
        };
    });
}
$(".create-variable-btn").onclick = () => {
    const nameVariableElement = $(".name-variable");
    if (nameVariableElement.value != "") {
        fetchCustom("/api/var", "POST", (data) => console.log(data), {
            name_var: nameVariableElement.value,
        });
        nameVariableElement.value = "";

        updateVar();
    } else {
        errorBorder(nameVariableElement);
    }
};

function errorBorder(element) {
    element.style.borderColor = "red";
    setTimeout(() => {
        element.style.borderColor = "#ccc";
    }, 2000);
}

function updateVar() {
    const itemKeyboard = `<li class="mt-1 text-center rounded-md hover:bg-stone-200 border focus_value_value var-item-value" type="focus_value" value="keyboard"><i class="fa-regular fa-keyboard"></i></li>`;
    fetchCustom("/api/var", "GET", (data) => {
        const htmlNameVariable = [];
        const htmlFocusValue = [];
        data.map((item) => {
            htmlNameVariable.push(
                `<li class="mt-1 text-center rounded-md hover:bg-stone-200 border name_variable_value var-item-value"
                    type="name_variable" value="${item.name_var}">${item.name_var}</li>`
            );
            htmlFocusValue.push(
                `<li class="mt-1 text-center rounded-md hover:bg-stone-200 border focus_value_value var-item-value"
                    type="focus_value" value="${item.name_var}">${item.name_var}</li>`
            );
            return { htmlNameVariable, htmlFocusValue };
        });

        $(".name_variable_ul").innerHTML = htmlNameVariable.join("");
        $(".focus_value_ul").innerHTML = htmlFocusValue.join("") + itemKeyboard;
        handleAddItemVar();
    });
}
