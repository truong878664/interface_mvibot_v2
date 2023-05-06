export default function sort() {
    $(".sort-marker-wrapper").onclick = (e) => {
        const sortMarkerItem = e.target.closest(".sort-marker-btn");
        if (!sortMarkerItem) return;
        $(".sort-marker-btn.active")?.classList.remove("active");
        sortMarkerItem.classList.add("active");
        const typeSort = sortMarkerItem.dataset.type;

        $$("[data-type-maker].hidden")?.forEach((element) => {
            element.classList.remove("hidden");
        });
        if (typeSort === "all") return;
        const markerNotSelect = $$(
            `[data-type-maker]:not([data-type-maker=${typeSort}])`
        );
        markerNotSelect.forEach((element) => {
            element.classList.add("hidden");
        });
    };
}
