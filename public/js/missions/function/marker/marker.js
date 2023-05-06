import changeImgMarkerDir from "./changeImgMarkerDir.js";
import createMarker from "./createMarker.js";
import sort from "./sort.js";
import tabTypeMarker from "./tabTypeMarker.js";

export default function marker() {
    tabTypeMarker()
    changeImgMarkerDir()
    createMarker()
    sort()
}