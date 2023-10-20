import { Z_LAYER } from "../trackingMission/zIndexMarkerClientMap.js";

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
    constructor(name, width, height, xo, yo, type, z = 0, w = 1) {
        this.name_layer = name;
        this.width_layer = width;
        this.height_layer = height;
        this.xo = xo;
        this.yo = yo;

        if (type == "dead_zone") this.color = new mvibot_color(1, 0, 0, 0.3);
        else if (type == "high_zone")
            this.color = new mvibot_color(0.2, 0, 0.8, 0.3);
        //
        this.scale = new mvibot_scale(width, height, 0.01);
        //
        this.pose = new mvibot_pose();
        //
        this.pose.position = new mvibot_position(xo, yo, Z_LAYER);

        this.pose.orientation = new mvibot_orientation(0, 0, z, w);
        //
    }
}
