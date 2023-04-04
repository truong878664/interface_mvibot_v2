import { loaded, loading } from "../../functionHandle/displayLoad.js";
import fetchCustom from "../../functionHandle/fetchCustom.js";
import { toggerMessage } from "../../main.js";
import { currentMission } from "../handleStepMission.js";
import translateWS from "./translateWS.js";

export default function saveDataToDB({ data, type }) {
    const dataRobot = translateWS({ data, type });
    const dataSave = {
        id_mission: currentMission,
        out_set: data.out_set.join(","),
        out_reset: data.out_reset.join(","),
        in_on: data.in_on.join(","),
        in_off: data.in_off.join(","),
        in_pullup: data.in_pullup.join(","),
        in_pulldown: data.in_pulldown.join(","),
        data: dataRobot,
        type: data.type,
        name_seri: data.name_seri ? data.name_seri : null,
    };

    fetchCustom(
        `/api/${type}`,
        "POST",
        () => {
            toggerMessage("success", `Save data ${type} successfully!`);
            $(`.cancel-${type}`).click();
        },
        dataSave
    );
}
