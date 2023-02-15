import fetchCustom from "../../functionHandle/fetchCustom.js";
import { $, $$, toggerMessage } from "../../main.js";

updateVar();

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
                inputElement.onblur = (e) => {
                    inputElement.setAttribute("readonly", true);
                    const input = e.target.value;
                    const input1 = input.replace(/[^0-9\.]+/g, "");

                    if (input.indexOf("-") != -1) {
                        const input2 = -input1.replaceAll("-", "");
                        !isNaN(input2)
                            ? (e.target.value = input2)
                            : (e.target.value = 0);
                    } else {
                        !isNaN(input1)
                            ? (e.target.value = Number(input1))
                            : (e.target.value = 0);
                    }
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


$(".submit-btn-variable").onclick = () => {
    const name_function_variable = $(".name_function_variable").value;
    const name_variable = $(".name_variable_input").value;
    const command_action =
        $(".command_action_input").value == "=" ? "equal" : "equal_as";
    const focus_value = $(".focus_value_input").value;

    if (name_variable && focus_value && name_function_variable) {
        const dataVariable = {
            name_function_variable,
            time_out: -1,
            mode: "variable",
            command_action,
            name_variable,
            focus_value,
        };
        console.log(dataVariable);

        fetchCustom(
            "/api/variable",
            "POST",
            handleSaveSuccessVariable,
            dataVariable
        );

        function handleSaveSuccessVariable(data) {
            toggerMessage("success", data.message);
            resetVariable()
            
            localStorage.setItem("isUpload", 1);
            
        }
    } else {
        toggerMessage("error", "Please enter all input");
    }
};

function errorBorder(element) {
    element.style.borderColor = "red";
    setTimeout(() => {
        element.style.borderColor = "#ccc";
    }, 2000);
}

export function resetVariable() {
    $(".name_function_variable").value = "";
    $(".name_variable_input").value = "";
    $(".focus_value_input").value = "";
}

function updateVar() {
    const itemKeyboard = `<li class="mt-1 text-center rounded-md hover:bg-stone-200 border focus_value_value var-item-value" type="focus_value" value="keyboard"><i class="fa-regular fa-keyboard"></i></li>`;
    fetchCustom("/api/var", "GET", (data) => {
        const htmlNameVariable = [];
        const htmlFocusValue = [];
        data.reverse();
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
        $(".focus_value_ul").innerHTML = itemKeyboard + htmlFocusValue.join("");
        handleAddItemVar();
    });
}
