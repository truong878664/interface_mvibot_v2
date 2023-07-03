export function showListPosition(show) {
    $("[data-type-position]").dataset.typePosition = show ? "show" : "";
    $("[data-list-position]").dataset.listPosition = show ? "show" : "";
    $("[data-status-switch]").dataset.statusSwitch = show ? "hidden" : "";
}

export function resetMapPosition() {
    $("#map").remove();
    $(".map-position-wrapper").innerHTML =
        '<div id="map" class="w-full h-full"></div>';
}
