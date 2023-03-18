import displayPoint from "./displayPoint.js";
import displayPose from "./displayPose.js";

function clickSetPointMap(xEvent, yEvent, rotateZ, rotateW, viewer) {
    const [xCameraConvert, yCameraConvert] = convertToPosition(
        xEvent,
        yEvent,
        viewer
    );
    displayPose(xCameraConvert, yCameraConvert, rotateZ, rotateW);
    displayPoint(xCameraConvert, yCameraConvert);
    return [xCameraConvert, yCameraConvert];
}

export function convertToPosition(xEvent, yEvent, viewer) {
    const zCamera = viewer.camera.position.z;
    const xCamera = viewer.camera.position.x;
    const yCamera = viewer.camera.position.y;

    const rotaryZ = viewer.camera.rotation._z;

    const a1 = viewer.camera.matrixWorld.elements[8];
    const a2 = viewer.camera.matrixWorld.elements[9];
    const a3 = viewer.camera.matrixWorld.elements[10];

    const klip = 1.45;

    const windowMap = document.getElementById("map").getBoundingClientRect();
    const kMap = windowMap.width / windowMap.height;

    const yClick = (xEvent / windowMap.width - 0.5) * kMap;
    const xClick = yEvent / windowMap.height - 0.5;

    const dis = Math.sqrt(xClick * xClick + yClick * yClick);
    const alpha = rotaryZ + Math.atan2(yClick, xClick) - Math.PI / 2;
    const xClickConvert = ((zCamera * klip) / 2) * (dis * Math.cos(alpha));
    const yClickConvert = ((zCamera * klip) / 2) * (dis * Math.sin(alpha));

    const t = -zCamera / a3;

    const xCameraConvert = Number((xCamera + xClickConvert + a1 * t).toFixed(2));
    const yCameraConvert = Number((yCamera + yClickConvert + a2 * t).toFixed(2));
    return [xCameraConvert, yCameraConvert];
}

export default clickSetPointMap;
