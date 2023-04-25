import { name_sleep, time_sleep } from "../getDataFunction.js";

export default function resetSleep() {
    time_sleep.value = "";
    name_sleep.value = "";
    console.log('reder');
}
