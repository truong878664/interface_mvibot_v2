export default function showLabelInput({
    inputElement,
    labelElement,
    callback = () => {},
}) {
    const input = document.querySelector(inputElement);
    const label = document.querySelector(labelElement);
    input.addEventListener("input", handleShow);
    function handleShow(e) {
        const value = parseInt(e.target.value);
        label.textContent = value;
        callback(value);
    }
}
