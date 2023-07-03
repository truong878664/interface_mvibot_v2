export default function variable() {
    selectCommandAction();
}

function selectCommandAction() {
    const select = document.querySelector("[name='command_action']");
    select.addEventListener("change", (e) => {
        select.dataset.value = select.value;
    });
}
