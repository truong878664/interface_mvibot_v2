import { $, $$ } from "../../main.js";
import { currentMission } from "../handleStepMission.js";

const gpios = [
    "out_set",
    "out_reset",
    "in_on",
    "in_off",
    "in_pullup",
    "in_pulldown",
];

$(".save-wake-up-btn").onclick = (e) => {
    e.preventDefault();

    const dataWakeUp = {
        id_mission: currentMission,
        out_set: "",
        out_reset: "",
        in_on: "",
        in_off: "",
        in_pullup: "",
        in_pulldown: "",
    };
    gpios.forEach((item) => {
        dataWakeUp[item] = $(`.${item}_wake_up`).value;
    });

    const dataWakeUpSave = {
        ...dataWakeUp,
        data: translateGpioWakeUp(dataWakeUp),
    };

    saveHeaderMission("wake-up", dataWakeUpSave);

    $(".cancel-wake-up").click();
};

$(".save-stop-btn").onclick = (e) => {
    e.preventDefault();

    const dataStop = {
        id_mission: currentMission,
        out_set: "",
        out_reset: "",
        in_on: "",
        in_off: "",
        in_pullup: "",
        in_pulldown: "",
    };
    gpios.forEach((item) => {
        dataStop[item] = $(`.${item}_stop`).value;
    });

    const dataStopSave = {
        ...dataStop,
        data: translateGpioStop(dataStop),
    };

    saveHeaderMission("stop", dataStopSave);
    $(".cancel-stop").click();
};

function saveHeaderMission(type, data) {
    fetch(`/api/${type}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
}

function translateGpioWakeUp(dataWakeUp) {
    const out_set_wake_up = dataWakeUp.out_set
        ? `~out_set=${dataWakeUp.out_set}~`
        : "";
    const out_reset_wake_up = dataWakeUp.out_reset
        ? `~out_reset=${dataWakeUp.out_reset}~`
        : "";
    const in_on_wake_up = dataWakeUp.in_on ? `~in_on=${dataWakeUp.in_on}~` : "";
    const in_off_wake_up = dataWakeUp.in_off
        ? `~in_off=${dataWakeUp.in_off}~`
        : "";
    const in_pullup_wake_up = dataWakeUp.in_pullup
        ? `~in_pullup=${dataWakeUp.in_pullup}~`
        : "";
    const in_pulldown_wake_up = dataWakeUp.in_pulldown
        ? `~in_pulldown=${dataWakeUp.in_pulldown}~`
        : "";

    const isWakeUp = !!(
        out_set_wake_up ||
        out_reset_wake_up ||
        in_on_wake_up ||
        in_off_wake_up ||
        in_pullup_wake_up ||
        in_pulldown_wake_up
    );

    if (isWakeUp) {
        return `(name:wake_up|time_out:-1|mode:gpio|data:${out_set_wake_up}${out_reset_wake_up}${in_on_wake_up}${in_off_wake_up}${in_pullup_wake_up}${in_pulldown_wake_up})`;
    } else {
        return "";
    }
}

function translateGpioStop(dataStop) {
    const out_set_stop = dataStop.out_set
        ? `~out_set=${dataStop.out_set}~`
        : "";
    const out_reset_stop = dataStop.out_reset
        ? `~out_reset=${dataStop.out_reset}~`
        : "";
    const in_on_stop = dataStop.in_on ? `~in_on=${dataStop.in_on}~` : "";
    const in_off_stop = dataStop.in_off ? `~in_off=${dataStop.in_off}~` : "";
    const in_pullup_stop = dataStop.in_pullup
        ? `~in_pullup=${dataStop.in_pullup}~`
        : "";
    const in_pulldown_stop = dataStop.in_pulldown
        ? `~in_pulldown=${dataStop.in_pulldown}~`
        : "";

    const isStop = !!(
        out_set_stop ||
        out_reset_stop ||
        in_on_stop ||
        in_off_stop ||
        in_pullup_stop ||
        in_pulldown_stop
    );

    if (isStop) {
        return `(name:stop|time_out:-1|mode:gpio|data:${out_set_stop}${out_reset_stop}${in_on_stop}${in_off_stop}${in_pullup_stop}${in_pulldown_stop})`;
    } else {
        return "";
    }
}
