import { $, $$, toggerMessage } from "../../main.js";
import { resetDataGpio } from "../createStepMission.js";
import { loaded, loading } from "../functionHandle/displayLoad.js";
import { checkboxInputGpio, nameGpios, renderGpio, valueGpio } from "./gpio.js";
import inputFunction from "../functionHandle/inputFunction.js";
import { loadDataFunction } from "../handleTypeMission.js";
import updateStepValue from "../functionHandle/updateStepValue.js";
import { currentMission, renderBlockStep } from "../handleStepMission.js";
import translatesStepsMission from "../functionHandle/translatesStepsMission.js";

export default function handleEditFunctionType() {
    let currentIdUpdate;
    let oldName;
    let refActiveTypeMission;

    $$(".edit-function-item-btn").forEach((element) => {
        element.onclick = (e) => {
            refActiveTypeMission = $(".function-btn.active");
            const functionItem = e.target.closest(
                ".type-mission-function-item"
            );
            const typeFunction = functionItem.getAttribute("function-type");
            const valueFunction = JSON.parse(
                functionItem.querySelector(".value-function-item").value
            );

            switch (typeFunction) {
                case "footprint":
                    $(".footprint-function-btn").click();

                    const {
                        x1_footprint,
                        x2_footprint,
                        y1_footprint,
                        y2_footprint,
                        name_footprint,
                    } = inputFunction("footprint");

                    x1_footprint.value = Math.abs(valueFunction.x1);
                    x2_footprint.value = Math.abs(valueFunction.x2);
                    y1_footprint.value = Math.abs(valueFunction.y1);
                    y2_footprint.value = Math.abs(valueFunction.y2);
                    name_footprint.value = valueFunction.name_footprint;
                    handleUpdateStep("footprint");

                    currentIdUpdate = valueFunction.id;
                    oldName = valueFunction.name_footprint;

                    break;
                case "gpio":
                    $(".gpio-function-btn").click();

                    const { name_gpio, time_out_gpio } = inputFunction("gpio");

                    name_gpio.value = valueFunction.name_gpio;
                    time_out_gpio.value = valueFunction.time_out;

                    nameGpios.forEach((item) => {
                        valueGpio[item] = [];
                        const dataGpioDb = valueFunction[item]?.split(",");
                        valueGpio[item].push(...(dataGpioDb || []));
                        renderGpio(item);
                    });
                    checkboxInputGpio();

                    handleUpdateStep("gpio");
                    currentIdUpdate = valueFunction.id;
                    oldName = valueFunction.name_gpio;

                    break;
                case "marker":
                    $(".marker-function-btn").click();
                    $(`.${valueFunction.marker_type}-btn`).click();

                    const {
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
                    } = inputFunction("marker");

                    name_marker
                        ? (name_marker.value = valueFunction.name_marker)
                        : "";
                    marker_type
                        ? (marker_type.value = valueFunction.marker_type)
                        : "";
                    marker_dir
                        ? (marker_dir.value = valueFunction.marker_dir)
                        : "";
                    off_set_x1
                        ? (off_set_x1.value = valueFunction.off_set_x1)
                        : "";
                    off_set_x2
                        ? (off_set_x2.value = valueFunction.off_set_x2)
                        : "";
                    off_set_y1
                        ? (off_set_y1.value = valueFunction.off_set_y1)
                        : "";
                    off_set_y2
                        ? (off_set_y2.value = valueFunction.off_set_y2)
                        : "";
                    off_set_dis
                        ? (off_set_dis.value = valueFunction.off_set_dis)
                        : "";
                    off_set_angle
                        ? (off_set_angle.value = valueFunction.off_set_angle)
                        : "";
                    sx1 ? (sx1.value = valueFunction.sx1) : "";
                    sx2 ? (sx2.value = valueFunction.sx2) : "";
                    sy1 ? (sy1.value = valueFunction.sy1) : "";
                    sy2 ? (sy2.value = valueFunction.sy2) : "";
                    handleUpdateStep("marker");
                    currentIdUpdate = valueFunction.id;
                    oldName = valueFunction.name_marker;
                    break;
                case "sleep":
                    $(".sleep-function-btn").click();
                    const { name_sleep, time_sleep } = inputFunction("sleep");

                    name_sleep.value = valueFunction.name_sleep;
                    time_sleep.value = valueFunction.time_sleep;
                    handleUpdateStep("sleep");
                    currentIdUpdate = valueFunction.id;
                    oldName = valueFunction.name_sleep;
                    break;
                case "position":
                    $(".point-function-btn").click();
            }
        };
    });

    function handleUpdateStep(type) {
        let updateBtnWrapper;
        if (type == "marker") {
            updateBtnWrapper = $(".marker-item:not(.hidden)").querySelector(
                `.${type}-update-btn-wrapper`
            );
            updateBtnWrapper.classList.remove("hidden");
            $(".marker-item:not(.hidden)")
                .querySelector(`.submit-btn-marker`)
                .classList.add("hidden");
        } else {
            updateBtnWrapper = $(`.${type}-update-btn-wrapper`);
            updateBtnWrapper.classList.remove("hidden");
            $(`.submit-btn-${type}`).classList.add("hidden");
        }

        updateBtnWrapper.querySelector(`.${type}-update-cancel`).onclick = (
            e
        ) => {
            e.preventDefault();
            handleResetData();
            $(`.submit-btn-${type}`).classList.remove("hidden");
            refActiveTypeMission.click();
        };

        updateBtnWrapper.querySelector(`.${type}-update-btn`).onclick = (e) => {
            e.preventDefault();
            dataUpdateStep(type) && handleResetData();

            loadDataFunction(type);
            refActiveTypeMission.click();
        };

        function handleResetData() {
            updateBtnWrapper.classList.add("hidden");
            $$(".input-reset").forEach((element) => {
                element.value = "";
            });

            $$(".offset-s-001").forEach((element) => {
                element.value = 0.01;
            });

            if (type == "gpio") {
                resetDataGpio();
            }
        }
    }

    function dataUpdateStep(type) {
        switch (type) {
            case "footprint":
                const {
                    x1_footprint,
                    x2_footprint,
                    y1_footprint,
                    y2_footprint,
                    name_footprint,
                } = inputFunction("footprint");
                if (
                    x1_footprint.value &&
                    x2_footprint.value &&
                    y1_footprint.value &&
                    y2_footprint.value &&
                    name_footprint.value
                ) {
                    const data = {
                        type: "footprint",
                        x1: x1_footprint.value,
                        x2: x2_footprint.value,
                        y1: y1_footprint.value,
                        y2: y2_footprint.value,
                        name_footprint: name_footprint.value,
                    };
                    updateStep(`/api/step/${currentIdUpdate}`, data);

                    oldName != name_footprint.value &&
                        updateNameStepAtBlockStep(
                            `${type}#${oldName}#${currentIdUpdate}`,
                            `${type}#${name_footprint.value}#${currentIdUpdate}`
                        );
                    return true;
                } else {
                    toggerMessage("error", "Please enter all inputs");
                    return false;
                }
            case "gpio":
                const {
                    name_gpio,
                    time_out_gpio,
                    out_set_gpio,
                    out_reset_gpio,
                    in_on_gpio,
                    in_off_gpio,
                    in_pullup_gpio,
                    in_pulldown_gpio,
                } = inputFunction("gpio");

                if (
                    name_gpio.value &&
                    time_out_gpio.value &&
                    (out_set_gpio.value ||
                        out_reset_gpio.value ||
                        in_on_gpio.value ||
                        in_off_gpio.value ||
                        in_pullup_gpio.value ||
                        in_pulldown_gpio.value)
                ) {
                    const data = {
                        type: "gpio",
                        name_gpio: name_gpio.value,
                        time_out: time_out_gpio.value,
                        out_set: out_set_gpio.value,
                        out_reset: out_reset_gpio.value,
                        in_on: in_on_gpio.value,
                        in_off: in_off_gpio.value,
                        in_pullup: in_pullup_gpio.value,
                        in_pulldown: in_pulldown_gpio.value,
                    };
                    updateStep(`/api/step/${currentIdUpdate}`, data);
                    $(".data-gpio-item.show")?.classList.remove("show");

                    oldName != name_gpio.value &&
                        updateNameStepAtBlockStep(
                            `${type}#${oldName}#${currentIdUpdate}`,
                            `${type}#${name_gpio.value}#${currentIdUpdate}`
                        );

                    return true;
                } else {
                    toggerMessage(
                        "error",
                        "Please enter name, timeout and at least one type of gpio"
                    );
                    return false;
                }
            case "marker":
                const {
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
                } = inputFunction("marker");

                if (
                    name_marker.value &&
                    (off_set_x1 ? off_set_x1.value : true) &&
                    (off_set_x2 ? off_set_x2.value : true) &&
                    (off_set_y1 ? off_set_y1.value : true) &&
                    (off_set_y2 ? off_set_y2.value : true) &&
                    (off_set_dis ? off_set_dis.value : true) &&
                    (off_set_angle ? off_set_angle.value : true)
                ) {
                    const data = {
                        type: "marker",
                        name_marker: name_marker.value,
                        marker_type: marker_type.value,
                        marker_dir: marker_dir?.value,
                        off_set_x1: Number(off_set_x1?.value),
                        off_set_x2: Number(off_set_x2?.value),
                        off_set_y1: Number(off_set_y1?.value),
                        off_set_y2: Number(off_set_y2?.value),
                        off_set_dis: Number(off_set_dis?.value),
                        off_set_angle: Number(off_set_angle?.value),
                        sx1: Number(sx1?.value),
                        sx2: Number(sx2?.value),
                        sy1: Number(sy1?.value),
                        sy2: Number(sy2?.value),
                    };
                    updateStep(`/api/step/${currentIdUpdate}`, data);

                    oldName != name_marker.value &&
                        updateNameStepAtBlockStep(
                            `${type}#${oldName}#${currentIdUpdate}`,
                            `${type}#${name_marker.value}#${currentIdUpdate}`
                        );

                    return true;
                } else {
                    toggerMessage("error", "Please enter all inputs");
                    return false;
                }

            case "sleep":
                const { name_sleep, time_sleep } = inputFunction("sleep");

                if (name_sleep.value && time_sleep.value) {
                    const data = {
                        type: "sleep",
                        name_sleep: name_sleep.value,
                        time_sleep: Number(time_sleep.value),
                    };
                    updateStep(`/api/step/${currentIdUpdate}`, data);

                    oldName != name_sleep.value &&
                        updateNameStepAtBlockStep(
                            `${type}#${oldName}#${currentIdUpdate}`,
                            `${type}#${name_sleep.value}#${currentIdUpdate}`
                        );

                    return true;
                } else {
                    toggerMessage("error", "Please enter all inputs");
                    return false;
                }
        }
        updateStepValue(currentMission);
    }

    function updateStep(url = "", stepSave) {
        loading();
        fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(stepSave),
        })
            .then(function (res) {
                loaded();
                res.status == 200
                    ? toggerMessage("success", "Update step success")
                    : toggerMessage("error", "ERR!, please try again");
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
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(123);
                translatesStepsMission(currentMission);
                renderBlockStep();
            });
    }
}
