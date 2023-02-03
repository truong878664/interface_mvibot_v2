export default function inputFunction(type) {
    switch (type) {
        case "footprint":
            const x1_footprint = $('[name="x1_footprint"]');
            const x2_footprint = $('[name="x2_footprint"]');
            const y1_footprint = $('[name="y1_footprint"]');
            const y2_footprint = $('[name="y2_footprint"]');
            const name_footprint = $('[name="name_footprint"]');
        
            return {
                x1_footprint,
                x2_footprint,
                y1_footprint,
                y2_footprint,
                name_footprint,
            };
        case "gpio":
            const name_gpio = $(".name_gpio");
            const time_out_gpio = $(".time_out_gpio");
            const out_set_gpio = $(".out_set_gpio");
            const out_reset_gpio = $(".out_reset_gpio");
            const in_on_gpio = $(".in_on_gpio");
            const in_off_gpio = $(".in_off_gpio");
            const in_pullup_gpio = $(".in_pullup_gpio");
            const in_pulldown_gpio = $(".in_pulldown_gpio");
            return {
                name_gpio,
                time_out_gpio,
                out_set_gpio,
                out_reset_gpio,
                in_on_gpio,
                in_off_gpio,
                in_pullup_gpio,
                in_pulldown_gpio,
            };

        case "marker":
            const formElement = $(".marker-item:not(.hidden)");

            const name_marker = formElement.querySelector(
                '[name="name_marker"]'
            );
            const marker_type = formElement.querySelector(
                '[name="marker_type"]'
            );
            const marker_dir = formElement.querySelector('[name="marker_dir"]');
            const off_set_x1 = formElement.querySelector('[name="off_set_x1"]');
            const off_set_x2 = formElement.querySelector('[name="off_set_x2"]');
            const off_set_y1 = formElement.querySelector('[name="off_set_y1"]');
            const off_set_y2 = formElement.querySelector('[name="off_set_y2"]');
            const off_set_dis = formElement.querySelector(
                '[name="off_set_dis"]'
            );
            const off_set_angle = formElement.querySelector(
                '[name="off_set_angle"]'
            );
            const sx1 = formElement.querySelector('[name="sx1"]');
            const sx2 = formElement.querySelector('[name="sx2"]');
            const sy1 = formElement.querySelector('[name="sy1"]');
            const sy2 = formElement.querySelector('[name="sy2"]');
            return {
                name_marker,
                marker_type,
                marker_dir,
                off_set_x1,
                off_set_x2,
                off_set_y1,
                off_set_y2,
                off_set_dis,
                off_set_angle,
                sx1,
                sx2,
                sy1,
                sy2,
            };
        case "sleep":
            const name_sleep = $('[name="name_sleep"]');
            const time_sleep = $('[name="time_sleep"]');
            return { name_sleep, time_sleep };

        default:
            console.error("ERR! type");
    }
}
