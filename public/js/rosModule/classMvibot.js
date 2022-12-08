export class mvibot_color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

export class mvibot_position {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
export class mvibot_orientation {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}
export class mvibot_pose {
    constructor() {
        this.position = new mvibot_position(0, 0, 0);
        this.orientation = new mvibot_orientation(0, 0, 0, 1);
    }
}
export class mvibot_scale {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
export class mvibot_layer {
    constructor(name, x1, y1, x2, y2, type, z = 0, w = 1) {
        this.name = name;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        //
        if (type == "dead_zone") this.color = new mvibot_color(1, 0, 0, 0.3);
        else if (type == "lowspeed_zone")
            this.color = new mvibot_color(0.2, 0, 0.8, 0.3);
        //
        this.scale = new mvibot_scale(
            Math.abs(x1 - x2),
            Math.abs(y1 - y2),
            0.01
        );
        //
        this.pose = new mvibot_pose();
        //
        this.pose.position = new mvibot_position(
            (x1 + x2) / 2,
            (y1 + y2) / 2,
            0.01
        );

        this.pose.orientation = new mvibot_orientation(0, 0, z, w);
        //
    }
}
