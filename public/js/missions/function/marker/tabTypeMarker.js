export default function tabTypeMarker() {
    const allradios = $$("input[name='marker']");
    const xBtns = $$(".x-btn");
    console.log(xBtns);
    xBtns.forEach((xBtn) => {
        xBtn.addEventListener("click", () => {
            allradios.forEach((element) => {
                // element.checked = false;
                console.log(element);
            });
        });
    });
}