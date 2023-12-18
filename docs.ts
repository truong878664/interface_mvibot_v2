type Footprint = {
    name: string;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
};

type Position = {
    name_position: string;
    x: number;
    y: number;
    z: number;
    w: number;
    time_out: number;
    color_position: string;
    mode_position: "normal" | "lineFollow";
    mode_child: string;
};

type Sleep = {
    name_sleep: string;
    time_sleep: number;
};
type Gpio = {
    name: string;
    time_out: number;
    not_set_out: boolean;
    in_on: string;
    in_off: string;
    in_pullup: string;
    in_pulldown: string;
    out_set: string;
    out_reset: string;
};
type GpioModule = {
    name: string;
    name_gpio_module: string;
    time_out: number;
    not_set_out: 0 | 1;
    in_on: string;
    in_off: string;
    in_pullup: string;
    in_pulldown: string;
    out_set: string;
    out_reset: string;
};
type Variable = {
    name: string;
    time_out: number;
    command_action: string;
    name_variable: string;
    focus_value: string | number;
};
type Marker = {
    name: string;
    time_out: number;
    mode: string;
    marker_type: string;
    marker_dir: "front_ward" | "back_ward";
    off_set_x1: number;
    off_set_x2: number;
    off_set_y1: number;
    off_set_y2: number;
    off_set_dis: number;
    off_set_angle: number;
    sx1: number;
    sx2: number;
    sy1: number;
    sy2: number;
};
type Config = {
    name: string;
    mode: string;
    time_out: number;
    footprint_padding: number | "none";
    max_vel_x: number | "none";
    acc_lim_x: number | "none";
    max_vel_theta: number | "none";
    acc_lim_theta: number | "none";
    inflation_radius: number | "none";
};
type Sound = {
    name: string;
    time_out: string;
    mode: string;
    music_mode: 0 | 1 | 2 | 3 | 4;
    music_start: 0 | 1;
};


Footprint
Position
Sleep
Gpio
GpioModule
Variable
Marker
Config
Sound