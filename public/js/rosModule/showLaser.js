export default function showLaser(
    nameRobot,
    ros,
    viewer,
    tfClient,
    color = 0x008000
) {
    const laser = new ROS3D.LaserScan({
        ros: ros,
        topic: "/" + nameRobot + "/laser/scan",
        rootObject: viewer.scene,
        tfClient: tfClient,
        material: { size: 0.5, color: color },
        rate: 1,
    });
    // console.log(laser.points);
    return laser;
}
