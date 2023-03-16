export default function qToYaw(z, w) {
    const yaw = 2 * Math.atan2(z, w);
    return Math.floor((yaw * 180) / Math.PI);
}
