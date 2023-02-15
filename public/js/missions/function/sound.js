import fetchCustom from "../../functionHandle/fetchCustom.js";
import { $, $$, toggerMessage } from "../../main.js";

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
    const name_sound = $(".name_function_sound").value;
    const music_type = $(".sound-btn.active")?.getAttribute("type");
    let music_mode;
    const music_start = music_type == "start" ? 1 : 0;
    if (music_type != "stop") {
        $(".sound-btn.active")?.getAttribute("data-mode") == "buzzer1" &&
            (music_mode = 1);
        $(".sound-btn.active")?.getAttribute("data-mode") == "buzzer2" &&
            (music_mode = 2);
        $(".sound-btn.active")?.getAttribute("data-mode") == "basic" &&
            (music_mode = 3);
        $(".sound-btn.active")?.getAttribute("data-mode") == "custom" &&
            (music_mode = 4);
    } else {
        music_mode = 0;
    }

    const dataSound = {
        music_start,
        music_mode,
        name_sound,
    };
    if (name_sound) {
        fetchCustom("/api/sound", "POST", handleSaveSuccessSound, dataSound);

        function handleSaveSuccessSound(data) {
            toggerMessage("success", data.message);

            localStorage.setItem("isUpload", 1);

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
        case "error":
            color = "--color: rgb(248 113 113);";
            break;
        case "custom":
            color = "--color: rgb(250 204 21);";
            break;
    }
    $(".sound-start-btn").setAttribute("style", color);
}
