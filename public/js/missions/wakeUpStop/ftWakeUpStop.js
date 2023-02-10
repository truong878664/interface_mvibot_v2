import { $ } from "../../main.js";
import { dataGpioWakeUpStop } from "./gpioWakeUpStop.js";

function getValueWakeUpStop() {
    const out_set_wake_up =
        dataGpioWakeUpStop.wake_up.out_set.length != 0
            ? `~out_set=${dataGpioWakeUpStop.wake_up.out_set}~`
            : "";
    const out_reset_wake_up =
        dataGpioWakeUpStop.wake_up.out_reset.length != 0
            ? `~out_reset=${dataGpioWakeUpStop.wake_up.out_reset}~`
            : "";
    const in_on_wake_up =
        dataGpioWakeUpStop.wake_up.in_on.length != 0
            ? `~in_on=${dataGpioWakeUpStop.wake_up.in_on}~`
            : "";
    const in_off_wake_up =
        dataGpioWakeUpStop.wake_up.in_off.length != 0
            ? `~in_off=${dataGpioWakeUpStop.wake_up.in_off}~`
            : "";
    const in_pullup_wake_up =
        dataGpioWakeUpStop.wake_up.in_pullup.length != 0
            ? `~in_pullup=${dataGpioWakeUpStop.wake_up.in_pullup}~`
            : "";
    const in_pulldown_wake_up =
        dataGpioWakeUpStop.wake_up.in_pulldown.length != 0
            ? `~in_pulldown=${dataGpioWakeUpStop.wake_up.in_pulldown}~`
            : "";

    const out_set_stop =
        dataGpioWakeUpStop.stop.out_set.length != 0
            ? `~out_set=${dataGpioWakeUpStop.stop.out_set}~`
            : "";
    const out_reset_stop =
        dataGpioWakeUpStop.stop.out_reset.length != 0
            ? `~out_reset=${dataGpioWakeUpStop.stop.out_reset}~`
            : "";
    const in_on_stop =
        dataGpioWakeUpStop.stop.in_on.length != 0
            ? `~in_on=${dataGpioWakeUpStop.stop.in_on}~`
            : "";
    const in_off_stop =
        dataGpioWakeUpStop.stop.in_off.length != 0
            ? `~in_off=${dataGpioWakeUpStop.stop.in_off}~`
            : "";
    const in_pullup_stop =
        dataGpioWakeUpStop.stop.in_pullup.length != 0
            ? `~in_pullup=${dataGpioWakeUpStop.stop.in_pullup}~`
            : "";
    const in_pulldown_stop =
        dataGpioWakeUpStop.stop.in_pulldown.length != 0
            ? `~in_pulldown=${dataGpioWakeUpStop.stop.in_pulldown}~`
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
    const dataHeader = [wake_up, stop];
    return dataHeader;
}
export default getValueWakeUpStop;
