import fetchCustom from "../../../functionHandle/fetchCustom.js";
import handleAddItemVar from "./addItemVariable.js";

export default function createNameVariable() {
    $(".create-variable-btn").onclick = () => {
        const nameVariableElement = $(".name-variable");
        if (nameVariableElement.value != "") {
            fetchCustom("/api/var", "POST", updateVar, {
                name_var: nameVariableElement.value,
            })

            nameVariableElement.value = "";

            // updateVar();
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
}

export function updateVar() {
    const itemKeyboard = `<li class="mt-1 text-center rounded-md hover:bg-stone-200 border focus_value_value var-item-value bg-[#fff]" type="focus_value" value="keyboard"><i class="fa-regular fa-keyboard"></i></li>`;
    fetchCustom("/api/var", "GET", (data) => {
        const htmlNameVariable = [];
        const htmlFocusValue = [];
        data.reverse();
        data.map((item) => {
            htmlNameVariable.push(
                `<li class="mt-1 text-center rounded-md hover:bg-stone-200 border name_variable_value var-item-value bg-[#fff] z-10"
                    type="name_variable" value="${item.name_var}">${item.name_var}</li>`
            );
            htmlFocusValue.push(
                `<li class="mt-1 text-center rounded-md hover:bg-stone-200 border focus_value_value var-item-value bg-[#fff] z-10"
                    type="focus_value" value="${item.name_var}">${item.name_var}</li>`
            );
            return { htmlNameVariable, htmlFocusValue };
        });

        $(".name_variable_ul").innerHTML = htmlNameVariable.join("");
        $(".focus_value_ul").innerHTML = itemKeyboard + htmlFocusValue.join("");
        handleAddItemVar();
    });
}
