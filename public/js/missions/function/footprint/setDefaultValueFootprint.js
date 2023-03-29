export default function setDefaultValueFootprint() {
    $(".default-value-footprint").onclick = (e) => {
        e.preventDefault();
        $('[name="x1_footprint"]').value = 0.410;
        $('[name="x2_footprint"]').value = 0.410;
        $('[name="y1_footprint"]').value = 0.345;
        $('[name="y2_footprint"]').value = 0.345;
    };
}
