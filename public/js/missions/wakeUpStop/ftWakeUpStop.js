import { $ } from "../../main.js";

function getValueWakeUpStop() {
    const out_set_wake_up = $(".out_set_wake_up").value
        ? `~out_set=${$(".out_set_wake_up").value}~`
        : "";
    const out_reset_wake_up = $(".out_reset_wake_up").value
        ? `~out_reset=${$(".out_reset_wake_up").value}~`
        : "";
    const in_on_wake_up = $(".in_on_wake_up").value
        ? `~in_on=${$(".in_on_wake_up").value}~`
        : "";
    const in_off_wake_up = $(".in_off_wake_up").value
        ? `~in_off=${$(".in_off_wake_up").value}~`
        : "";
    const in_pullup_wake_up = $(".in_pullup_wake_up").value
        ? `~in_pullup=${$(".in_pullup_wake_up").value}~`
        : "";
    const in_pulldown_wake_up = $(".in_pulldown_wake_up").value
        ? `~in_pulldown=${$(".in_pulldown_wake_up").value}~`
        : "";

    const out_set_stop = $(".out_set_stop").value
        ? `~out_set=${$(".out_set_stop").value}~`
        : "";
    const out_reset_stop = $(".out_reset_stop").value
        ? `~out_reset=${$(".out_reset_stop").value}~`
        : "";
    const in_on_stop = $(".in_on_stop").value
        ? `~in_on=${$(".in_on_stop").value}~`
        : "";
    const in_off_stop = $(".in_off_stop").value
        ? `~in_off=${$(".in_off_stop").value}~`
        : "";
    const in_pullup_stop = $(".in_pullup_stop").value
        ? `~in_pullup=${$(".in_pullup_stop").value}~`
        : "";
    const in_pulldown_stop = $(".in_pulldown_stop").value
        ? `~in_pulldown=${$(".in_pulldown_stop").value}~`
        : "";

    const isWakeUp = !!(
        out_set_wake_up ||
        out_reset_wake_up ||
        in_on_wake_up ||
        in_off_wake_up ||
        in_pullup_wake_up ||
        in_pulldown_wake_up
    );

    const isStop = !!(
        out_set_stop ||
        out_reset_stop ||
        in_on_stop ||
        in_off_stop ||
        in_pullup_stop ||
        in_pulldown_stop
    );

    let wake_up;
    let stop;

    if (!isWakeUp && !isStop) {
        wake_up = "";
        stop = "";
    } else if (!isWakeUp) {
        wake_up = "";
        stop = `(name:stop|time_out:-1|mode:gpio|data:${out_set_stop}${out_reset_stop}${in_on_stop}${in_off_stop}${in_pullup_stop}${in_pulldown_stop})`;
    } else if (!isStop) {
        stop = "";
        wake_up = `(name:wake_up|time_out:-1|mode:gpio|data:${out_set_wake_up}${out_reset_wake_up}${in_on_wake_up}${in_off_wake_up}${in_pullup_wake_up}${in_pulldown_wake_up})`;
    } else {
        wake_up = `(name:wake_up|time_out:-1|mode:gpio|data:${out_set_wake_up}${out_reset_wake_up}${in_on_wake_up}${in_off_wake_up}${in_pullup_wake_up}${in_pulldown_wake_up})`;
        stop = `(name:stop|time_out:-1|mode:gpio|data:${out_set_stop}${out_reset_stop}${in_on_stop}${in_off_stop}${in_pullup_stop}${in_pulldown_stop})`;
    }
    const dataHeader = `${wake_up}${stop}`;
    return dataHeader;
}
export default getValueWakeUpStop;
