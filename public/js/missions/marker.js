const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export function tabTypeMarker() {
    const allradios = $$("input[name='marker']");
    const xBtns = $$(".x-btn");
    xBtns.forEach((xBtn) => {
        xBtn.addEventListener("click", () => {
            allradios.forEach((element) => {
                element.checked = false;
            });
        });
    });
}

export function changeImgMarkerDir() {
    const markerDirs = $$(".marker_dir_input");
    const illustrationImgs = $$(".illustration-img");

    markerDirs.forEach((markerDir) => {
        markerDir.addEventListener("change", (e) => {
            illustrationImgs.forEach((illustrationImg) => {
                const typeMarker =
                    illustrationImg.parentElement.getAttribute("markerDir");
                illustrationImg.setAttribute(
                    "src",
                    `/img/marker/${typeMarker}${e.target.value}.png`
                );
            });
        });
    });
}
