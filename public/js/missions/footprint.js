const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export function setDefaultValueFootprint() {
    $(".default-value-footprint").onclick = (e) => {
        e.preventDefault();
        $('[name="x1_footprint"]').value = 410;
        $('[name="x2_footprint"]').value = 410;
        $('[name="y1_footprint"]').value = 345;
        $('[name="y2_footprint"]').value = 345;
    };
}
