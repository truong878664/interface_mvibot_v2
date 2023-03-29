import { name_marker, off_set_angle, off_set_dis, off_set_x1, off_set_x2, off_set_y1, off_set_y2, sx1, sx2, sy1, sy2 } from "../getDataFunction.js";

export default function resetMarker() {
    name_marker ? (name_marker.value = "") : "";
    off_set_x1 ? (off_set_x1.value = "") : "";
    off_set_x2 ? (off_set_x2.value = "") : "";
    off_set_y1 ? (off_set_y1.value = "") : "";
    off_set_y2 ? (off_set_y2.value = "") : "";
    off_set_dis ? (off_set_dis.value = "") : "";
    off_set_angle ? (off_set_angle.value = "") : "";

    sx1.value = 0.01;
    sx2.value = 0.01;
    sy1.value = 0.01;
    sy2.value = 0.01;
}
