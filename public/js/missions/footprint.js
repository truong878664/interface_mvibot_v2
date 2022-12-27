const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

$(".default-value-footprint").onclick = (e) => {
    e.preventDefault();
    $('[name="x1_footprint"]').value = 110;
    $('[name="x2_footprint"]').value = 120;
    $('[name="y1_footprint"]').value = 130;
    $('[name="y2_footprint"]').value = 140;
};
