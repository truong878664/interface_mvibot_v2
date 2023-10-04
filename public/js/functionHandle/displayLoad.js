export function loading() {
    const isHasLoader = document.querySelector(".loader-wrapper");
    if (isHasLoader) {
        return;
    }
    const loadedWrapper = document.createElement("div");
    loadedWrapper.classList.add("loader-wrapper");
    loadedWrapper.innerHTML = '<span class="loader"></span>';
    document.body.appendChild(loadedWrapper);
}
export function loaded() {
    setTimeout(() => {
        document.body.querySelector(".loader-wrapper")?.remove();
    }, 600);
}
const loadingHeaderElement = document.getElementById("loader-header");
export function loadingHeader(isLoad) {
    loadingHeaderElement.classList.toggle("!hidden", !isLoad);
}
