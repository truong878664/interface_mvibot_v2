import { loaded, loading } from "../../functionHandle/displayLoad.js";
import { toggerMessage } from "../../main.js";
import translatesStepsMission from "../functionHandle/translatesStepsMission.js";
import { currentMission } from "../handleStepMission.js";
import { loadDataFunction } from "../handleTypeMission.js";
import getDataFunction from "./getDataFunction.js";
import setDataGpio from "./gpio/setDataGpio.js";
import { currentIdUpdate, oldName } from "./showDataFunction.js";

export default function updateDataFunction(type) {
    type === "gpio" && setDataGpio("gpio_normal");
    type === "gpio_module" && setDataGpio("gpio_module");

    const { isValid, data } = getDataFunction(type);
    data.type = type;

    if (isValid) {
        const isChangeName = oldName != data.name;
        updateStep(`/api/step/${currentIdUpdate}`, data, isChangeName);

        return true;
    } else {
        toggerMessage("error", "Please enter all inputs");
        return false;
    }

    function updateStep(url = "", stepSave, isChangeName) {
        loading();
        fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(stepSave),
        })
            .then((res) => {
                isChangeName &&
                    updateNameStepAtBlockStep(
                        `${type}#${oldName}#${currentIdUpdate}`,
                        `${type}#${data.name}#${currentIdUpdate}`
                    );
                return res;
            })
            .then((res) => {
                res.status == 200
                    ? toggerMessage("success", "Update step success")
                    : toggerMessage("error", "ERR!, please try again");

                translatesStepsMission({ id: currentMission, renderBlockType: isChangeName });
                loadDataFunction();
                loaded();
            })
            .catch(function (res) {
                console.log(res);
            });
    }

    function updateNameStepAtBlockStep(stepOld, stepNew) {
        fetch(`/api/type-mission/update-name-step`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ stepOld, stepNew }),
        });
    }
}
