import { toggerMessage } from "../../../main.js";
import saveFunctionItem from "../saveFunction.js";
import setColorSticker from "./setColorSticker.js";

export default function createSound() {
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
            saveFunctionItem("sound", dataSound);
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
}
