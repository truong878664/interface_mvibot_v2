import { $, $$, toggerMessage } from "../../main.js";
import { loaded, loading } from "../../functionHandle/displayLoad.js";
import inputFunction from "../functionHandle/inputFunction.js";
import { loadDataFunction } from "../handleTypeMission.js";
import { currentMission, renderBlockStep } from "../handleStepMission.js";
import translatesStepsMission from "../functionHandle/translatesStepsMission.js";
import { dataGpio, resetGpio, setDateGpio, setLightGpio } from "./gpio.js";
import { setColorSticker } from "./sound.js";
import { resetVariable } from "./var.js";
import { handleShowFormFunction } from "../handleCreateFunction.js";
import { createMapPosition, resetPosition } from "./point.js";
import displayPoint from "../../rosModule/displayPoint.js";
import displayPose from "../../rosModule/displayPose.js";
import createPose from "../../rosModule/createPose.js";
import qToYaw from "../../rosModule/qToYawn.js";

export default function handleEditFunctionType() {
    let currentIdUpdate;
    let oldName;
    const editFunctionItemBtns = $$(".edit-function-item-btn");
    editFunctionItemBtns.forEach((element) => {
        element.onclick = (e) => {
            const functionItem = e.target.closest(
                ".type-mission-function-item"
            );
            const typeFunction = functionItem.getAttribute("function-type");
            const valueFunction = JSON.parse(
                functionItem.querySelector(".value-function-item").value
            );

            handleShowFormFunction(true, typeFunction);

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

                    x1_footprint.value = valueFunction.x1;
                    x2_footprint.value = valueFunction.x2;
                    y1_footprint.value = valueFunction.y1;
                    y2_footprint.value = valueFunction.y2;
                    name_footprint.value = valueFunction.name;
                    handleUpdateStep("footprint");

                    currentIdUpdate = valueFunction.id;
                    oldName = valueFunction.name;

                    break;
                case "gpio":
                    $(".gpio-function-btn").click();

                    const name_gpio = $(".name_gpio");
                    const time_out_gpio = $(".time_out_gpio");

                    name_gpio.value = valueFunction.name;
                    time_out_gpio.value = valueFunction.time_out;

                    for (const item in dataGpio) {
                        dataGpio[item] = valueFunction[item]?.split(",") || [];
                    }

                    setLightGpio();

                    handleUpdateStep("gpio");
                    currentIdUpdate = valueFunction.id;
                    oldName = valueFunction.name;
                    break;
                case "gpio_module":
                    $(".gpio-module-function-btn").click();

                    const name_function_gpio_module = $(
                        ".name_function_gpio_module"
                    );
                    const name_gpio_module = $(".name_gpio_module");
                    const time_out_gpio_module = $(".time_out_gpio_module");

                    name_function_gpio_module.value = valueFunction.name;
                    name_gpio_module.value = valueFunction.name_gpio_module;
                    time_out_gpio_module.value = valueFunction.time_out;

                    for (const item in dataGpio) {
                        dataGpio[item] = valueFunction[item]?.split(",") || [];
                    }

                    setLightGpio();

                    handleUpdateStep("gpio_module");
                    currentIdUpdate = valueFunction.id;
                    oldName = valueFunction.name;
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

                    name_marker ? (name_marker.value = valueFunction.name) : "";
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
                    oldName = valueFunction.name;
                    break;
                case "sleep":
                    $(".sleep-function-btn").click();
                    const { name_sleep, time_sleep } = inputFunction("sleep");

                    name_sleep.value = valueFunction.name;
                    time_sleep.value = valueFunction.time_sleep;
                    handleUpdateStep("sleep");
                    currentIdUpdate = valueFunction.id;
                    oldName = valueFunction.name;
                    break;

                case "variable":
                    $(".variable-function-btn").click();
                    const name_function_variable = $(".name_function_variable");
                    const name_variable = $(".name_variable_input");
                    const command_action = $(".command_action_input");
                    const focus_value = $(".focus_value_input");

                    name_function_variable.value = valueFunction.name;
                    name_variable.value = valueFunction.name_variable;
                    command_action.value =
                        valueFunction.command_action == "equal" ? "=" : "==";

                    focus_value.value = valueFunction.focus_value;
                    if (!isNaN(Number(valueFunction.focus_value))) {
                        focus_value.removeAttribute("readonly");
                    }

                    handleUpdateStep("variable");
                    currentIdUpdate = valueFunction.id;
                    oldName = valueFunction.name;
                    break;

                case "sound":
                    $(".sound-function-btn").click();
                    $(".sound-btn.active").classList.remove("active");

                    $(".name_function_sound").value = valueFunction.name;
                    if (valueFunction.music_start == 1) {
                        $(".sound-start-btn").classList.add("active");
                        let mode;
                        
                        valueFunction.music_mode == 1 && (mode = "buzzer1");
                        valueFunction.music_mode == 2 && (mode = "buzzer2");
                        valueFunction.music_mode == 3 && (mode = "basic");
                        valueFunction.music_mode == 4 && (mode = "custom");
                        $(".sound-start-btn").setAttribute("data-mode", mode);
                        console.log(mode);
                        setColorSticker(mode);
                    } else {
                        $(".sound-stop-btn").classList.add("active");
                    }

                    handleUpdateStep("sound");
                    currentIdUpdate = valueFunction.id;
                    oldName = valueFunction.name;
                    break;

                case "position":
                    $(".point-function-btn").click();
                    $(".create-point-btn").textContent = "Update";
                    const {
                        x,
                        y,
                        z,
                        w,
                        name,
                        time_out,
                        mode_position,
                        color_position,
                        mode_child,
                    } = valueFunction;

                    const { viewer, tfClient } = createMapPosition(x, y, z, w);

                    createPose(viewer, tfClient, color_position);
                    displayPoint(x, y);
                    displayPose(x, y, z, w);

                    showControlPosition(x, y, z, w);
                    showInfoPosition(
                        name,
                        time_out,
                        mode_position,
                        color_position,
                        mode_child
                    );
                    function showControlPosition(x, y, z, w) {
                        const yaw = qToYaw(z, w);
                        $("#inx").value = x;
                        $("#position-x").value = x;
                        $("#iny").value = y;
                        $("#position-y").value = y;
                        $(".number-rotate-z").value = yaw;
                        $("#rotate-z").value = yaw;
                    }

                    function showInfoPosition(
                        name,
                        time_out,
                        mode_position,
                        color_position,
                        mode_child
                    ) {
                        $("[name=name_position]").value = name;
                        $("[name=color_position]").value = color_position;

                        if (
                            mode_position === "normal" ||
                            mode_position === "line_follow"
                        ) {
                            $("[name=mode_position]").value = mode_position;
                        } else {
                            $("[name=mode_position]").value = "other";
                            $(
                                "[name=mode_position_other]"
                            ).dataset.modePosition = "other";
                            $("[name=mode_position_other]").value =
                                mode_position;
                            console.log($("[name=mode_position]").value);
                        }
                        $("[name=time_out]").value = time_out;
                        $("[name=mode_child]").value = mode_child;
                    }

                    handleUpdateStep("position");

                    currentIdUpdate = valueFunction.id;
                    oldName = valueFunction.name;
            }
        };
    });

    function handleUpdateStep(type) {
        let updateBtnWrapper;

        updateBtnWrapper = $(`.${type}-update-btn-wrapper`);
        updateBtnWrapper.classList.remove("hidden");
        $(`.submit-btn-${type}`).classList.add("hidden");

        updateBtnWrapper.querySelector(`.${type}-update-cancel`).onclick = (
            e
        ) => {
            e.preventDefault();
            handleResetData();
            $(`.submit-btn-${type}`).classList.remove("hidden");
            handleShowFormFunction(false, type);
        };

        updateBtnWrapper.querySelector(`.${type}-update-btn`).onclick = (e) => {
            e.preventDefault();
            dataUpdateStep(type) && handleResetData();

            $(`.submit-btn-${type}`).classList.remove("hidden");
            handleShowFormFunction(false, type);
        };

        function handleResetData() {
            updateBtnWrapper.classList.add("hidden");
            $$(".input-reset").forEach((element) => {
                element.value = "";
            });

            $$(".offset-s-001").forEach((element) => {
                element.value = 0.01;
                currentIdUpdate;
            });

            (type === "gpio" || type == "gpio_module") && resetGpio();

            type === "variable" && resetVariable();
            type === "position" && resetPosition();
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
                        name: name_footprint.value,
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
                const name_gpio = $(".name_gpio");
                const time_out_gpio = $(".time_out_gpio");

                setDateGpio("gpio_normal");

                if (
                    name_gpio.value &&
                    time_out_gpio.value &&
                    (dataGpio.out_set.length ||
                        dataGpio.out_reset.length ||
                        dataGpio.in_on.length ||
                        dataGpio.in_off.length ||
                        dataGpio.in_pullup.length ||
                        dataGpio.in_pulldown.length)
                ) {
                    const data = {
                        type: "gpio",
                        name: name_gpio.value,
                        time_out: time_out_gpio.value * 1,
                        out_set: dataGpio.out_set.join(","),
                        out_reset: dataGpio.out_reset.join(","),
                        in_on: dataGpio.in_on.join(","),
                        in_off: dataGpio.in_off.join(","),
                        in_pullup: dataGpio.in_pullup.join(","),
                        in_pulldown: dataGpio.in_pulldown.join(","),
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
            case "gpio_module":
                const name_function_gpio_module = $(
                    ".name_function_gpio_module"
                );
                const name_gpio_module = $(".name_gpio_module");
                const time_out_gpio_module = $(".time_out_gpio_module");

                setDateGpio("gpio_module");

                if (
                    name_function_gpio_module.value &&
                    time_out_gpio_module.value &&
                    name_gpio_module.value &&
                    (dataGpio.out_set.length ||
                        dataGpio.out_reset.length ||
                        dataGpio.in_on.length ||
                        dataGpio.in_off.length ||
                        dataGpio.in_pullup.length ||
                        dataGpio.in_pulldown.length)
                ) {
                    const data = {
                        type: "gpio_module",
                        name: name_function_gpio_module.value,
                        name_gpio_module: name_gpio_module.value,
                        time_out: time_out_gpio_module.value * 1,
                        out_set: dataGpio.out_set.join(","),
                        out_reset: dataGpio.out_reset.join(","),
                        in_on: dataGpio.in_on.join(","),
                        in_off: dataGpio.in_off.join(","),
                        in_pullup: dataGpio.in_pullup.join(","),
                        in_pulldown: dataGpio.in_pulldown.join(","),
                    };

                    updateStep(`/api/step/${currentIdUpdate}`, data);

                    $(".data-gpio-item.show")?.classList.remove("show");
                    console.log(oldName);
                    oldName != name_function_gpio_module.value &&
                        updateNameStepAtBlockStep(
                            `${type}#${oldName}#${currentIdUpdate}`,
                            `${type}#${name_function_gpio_module.value}#${currentIdUpdate}`
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
                        name: name_marker.value,
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
                        name: name_sleep.value,
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
            case "variable":
                const name_function_variable = $(".name_function_variable");
                const name_variable = $(".name_variable_input");
                const command_action =
                    $(".command_action_input").value == "="
                        ? "equal"
                        : "equal_as";
                const focus_value = $(".focus_value_input");

                if (name_variable && focus_value && name_function_variable) {
                    const data = {
                        type: "variable",
                        name: name_function_variable.value,
                        command_action,
                        name_variable: name_variable.value,
                        focus_value: focus_value.value,
                    };
                    updateStep(`/api/step/${currentIdUpdate}`, data);
                    oldName != name_function_variable.value &&
                        updateNameStepAtBlockStep(
                            `${type}#${oldName}#${currentIdUpdate}`,
                            `${type}#${name_function_variable.value}#${currentIdUpdate}`
                        );
                    return true;
                } else {
                    toggerMessage("error", "Please enter all inputs");
                    return false;
                }
            case "sound":
                const name_sound = $(".name_function_sound").value;
                const music_type = $(".sound-btn.active")?.getAttribute("type");
                let music_mode;
                const music_start = music_type == "start" ? 1 : 0;
                if (music_type != "stop") {
                    const mode = $(".sound-btn.active")?.dataset.mode;
                    music_mode =
                        mode === "buzzer1"
                            ? 1
                            : mode === "buzzer2"
                            ? 2
                            : mode === "basic"
                            ? 3
                            : mode === "custom"
                            ? 4
                            : undefined;
                } else {
                    music_mode = 0;
                }

                if (name_sound) {
                    const data = {
                        type: "sound",
                        music_start,
                        music_mode,
                        name: name_sound,
                    };

                    console.log(data);

                    updateStep(`/api/step/${currentIdUpdate}`, data);
                    oldName != name_sound &&
                        updateNameStepAtBlockStep(
                            `${type}#${oldName}#${currentIdUpdate}`,
                            `${type}#${name_sound}#${currentIdUpdate}`
                        );
                    return true;
                } else {
                    toggerMessage("error", "Please enter all inputs");
                    return false;
                }
            case "position":
                const name = $('[name="name_position"]');
                const x = $('[name="x"]');
                const y = $('[name="y"]');
                const z = $('[name="z"]');
                const w = $('[name="w"]');
                const time_out = $('[name="time_out"]');
                const color_position = $('[name="color_position"]');
                const mode_position = $('[name="mode_position"]');
                const mode_position_other = $("[name=mode_position_other]");
                const mode_child = $('[name="mode_child"]');
                const map = $(".name-map-active");

                let mode_position_value;
                if (mode_position.value === "other") {
                    mode_position_value = mode_position_other.value;
                } else {
                    mode_position_value = mode_position.value;
                }

                const dataPosition = {
                    type: "position",
                    name: name.value,
                    x: x.value,
                    y: y.value,
                    z: z.value,
                    w: w.value,
                    time_out: time_out.value,
                    color_position: color_position.value,
                    mode_position: mode_position_value,
                    mode_child: mode_child.value,
                    map: map.innerText,
                    mode: "position",
                };

                const isValid = !!(
                    name.value &&
                    x.value &&
                    y.value &&
                    z.value &&
                    w.value &&
                    time_out.value &&
                    color_position.value &&
                    mode_position_value &&
                    mode_child.value
                );
                if (isValid) {
                    console.log("oldname", oldName);
                    updateStep(`/api/step/${currentIdUpdate}`, dataPosition);

                    oldName != name.value &&
                        updateNameStepAtBlockStep(
                            `${type}#${oldName}#${currentIdUpdate}`,
                            `${type}#${name.value}#${currentIdUpdate}`
                        );

                    name.value = "";
                    time_out.value = -1;
                    mode_position.value = "normal";
                    mode_child.value = -1;

                    return true;
                } else {
                    toggerMessage("error", "Please enter all inputs");
                    return false;
                }
        }
        // updateStepValue(currentMission);
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
                translatesStepsMission(currentMission);
                loadDataFunction();
            })
            .catch(function (res) {
                console.log(res);
            });
    }

    function updateNameStepAtBlockStep(stepOld, stepNew) {
        console.log(stepOld, stepNew);
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
                translatesStepsMission(currentMission);
                renderBlockStep();
            });
    }
}
