function createAxes(viewer) {
    const axes = new ROS3D.Axes({
        scale: 1,
        shaftRadius: 0.025,
        headRadius: 0.05,
    });
    viewer.addObject(axes);
}

export default createAxes;
