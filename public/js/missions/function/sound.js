import fetchCustom from "../../functionHandle/fetchCustom.js";
import { $, $$, toggerMessage } from "../../main.js";
import { addFunctionStep } from "../createStepMission.js";

$$(".sound-btn").forEach((element) => {
    element.onclick = (e) => {
        $(".sound-btn.active")?.classList.remove("active");
        e.target.classList.toggle("active");
        e.target.getAttribute("type") == "start" &&
            $(".mode-sound").classList.toggle("hidden");
        e.target.getAttribute("type") == "stop" &&
            $(".mode-sound").classList.add("hidden");
    };
});

$$(".mode-music-btn").forEach((element) => {
    element.onclick = (e) => {
        $(".sound-start-btn").setAttribute(
            "data-mode",
            e.target.getAttribute("mode")
        );
        $(".mode-sound").classList.add("hidden");

        const color = getComputedStyle(e.target).backgroundColor;
        $(".sound-start-btn").setAttribute("style", `--color: ${color};`);
    };
});

$(".submit-btn-sound").onclick = () => {
    const name = $(".name_function_sound").value;
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

    const dataSound = {
        music_start,
        music_mode,
        name,
    };
    if (name) {
        addFunctionStep("sound", dataSound);
        handleSaveSuccessSound();
        function handleSaveSuccessSound() {
            toggerMessage("success", "Save sound successfully!");
            $(".name_function_sound").value = "";
            $(".sound-stop-btn.active")?.classList.remove("active");
            $(".sound-start-btn").classList.add("active");
            $(".sound-start-btn").setAttribute("data-mode", "basic");

            $(".mode-sound").classList.add("hidden");
            setColorSticker("basic");
        }
    } else {
        toggerMessage("error", "Please enter all input");
    }
};

export function setColorSticker(type) {
    let color;
    switch (type) {
        case "basic":
            color = "--color: rgb(56 189 248);";
            break;
        case "buzzer1":
            color = "--color: rgb(248 113 113);";
            break;
        case "buzzer2":
            color = "--color: rgb(248 113 113);";
            break;
        case "custom":
            color = "--color: rgb(250 204 21);";
            break;
    }
    $(".sound-start-btn").setAttribute("style", color);
}
