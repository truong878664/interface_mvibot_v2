export default function showLaser(
    nameRobot,
    ros,
    viewer,
    tfClient,
    color = 0x008000,
) {
    const laser = new ROS3D.LaserScan({
        ros: ros,
        topic: "/" + nameRobot + "/laser/scan",
        rootObject: viewer.scene,
        tfClient: tfClient,
        material: { size: 0.5, color: color },
        rate: 1,
    });
    return laser;
}

export const COLOR_CAMERA = {
    default: {
        hex: 0xffe600,
        rgb: { r: 255 / 255, g: 230 / 255, b: 0 / 255 },
    },
    active: {
        hex: 0xd0ff00,
        rgb: { r: 208 / 255, g: 255 / 255, b: 0 / 255 },
    },
};

export function showLaserCamera(
    nameRobot,
    ros,
    viewer,
    tfClient,
    color = COLOR_CAMERA.default.hex,
) {
    const laser = new ROS3D.LaserScan({
        ros: ros,
        topic: "/" + nameRobot + "/camera/scan",
        rootObject: viewer.scene,
        tfClient: tfClient,
        material: { size: 0.3, color: color },
        rate: 1,
    });
    return laser;
}
