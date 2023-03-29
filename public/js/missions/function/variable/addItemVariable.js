export default function handleAddItemVar() {
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
