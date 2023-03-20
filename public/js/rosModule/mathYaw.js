function mathYaw(yaw) {
    const roll = 0,
        pitch = 0;
    const qx =
        Math.sin(roll / 2) * Math.cos(pitch / 2) * Math.cos(yaw / 2) -
        Math.cos(roll / 2) * Math.sin(pitch / 2) * Math.sin(yaw / 2);
    const qy =
        Math.cos(roll / 2) * Math.sin(pitch / 2) * Math.cos(yaw / 2) +
        Math.sin(roll / 2) * Math.cos(pitch / 2) * Math.sin(yaw / 2);
    const qz =
        Math.cos(roll / 2) * Math.cos(pitch / 2) * Math.sin(yaw / 2) -
        Math.sin(roll / 2) * Math.sin(pitch / 2) * Math.cos(yaw / 2);
    const qw =
        Math.cos(roll / 2) * Math.cos(pitch / 2) * Math.cos(yaw / 2) +
        Math.sin(roll / 2) * Math.sin(pitch / 2) * Math.sin(yaw / 2);
    const z = qz.toFixed(3) * 1;
    const w = qw.toFixed(3) * 1;
    return { z, w };
}

export default mathYaw;
