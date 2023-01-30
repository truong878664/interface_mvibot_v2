export default function validateInputSubmit(
    elementInput,
    formSubmit,
    buttonSubmit,
    elementNumber = ""
) {
    let isNumber = elementNumber ? false : true;
    let isInput = false;
    validateNumber();

    function validateNumber() {
        if (elementNumber) {
            const inputNumbers = document.querySelectorAll(elementNumber);
            inputNumbers.forEach((inputNumber) => {
                inputNumber.oninput = (e) => {
                    if (
                        !isNaN(Number(e.target.value)) &&
                        e.target.value.trim() !== ""
                    ) {
                        inputNumber.nextElementSibling.innerText = "";
                        isNumber = true;
                    } else {
                        inputNumber.nextElementSibling.innerText =
                            "this field must enter a number";
                        isNumber = false;
                    }
                };
            });
        }
    }

    function validate() {
        const input = document.querySelectorAll(elementInput);
        input.forEach((element) => {
            if (element.value.trim() === "") {
                isInput = false;
            } else {
                isInput = true;
            }
        });
    }

    document.querySelector(buttonSubmit).onclick = (e) => {
        validate();
        e.preventDefault();
        isInput && isNumber && document.querySelector(formSubmit).submit();
    };
}
