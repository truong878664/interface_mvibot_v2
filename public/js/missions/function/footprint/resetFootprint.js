import { name_footprint, x1_footprint, x2_footprint, y1_footprint, y2_footprint } from "../getDataFunction.js";

export default function resetFootprint() {
    x1_footprint.value = "";
    x2_footprint.value = "";
    y1_footprint.value = "";
    y2_footprint.value = "";
    name_footprint.value = "";
}