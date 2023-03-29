export default function changeImgMarkerDir() {
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
