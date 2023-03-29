import setColorSticker from "./setColorSticker.js";

export default function resetSound() {
    $(".name_function_sound").value = "";
    $(".sound-stop-btn.active")?.classList.remove("active");
    $(".sound-start-btn").classList.add("active");
    $(".sound-start-btn").setAttribute("data-mode", "basic");

    $(".mode-sound").classList.add("hidden");
    setColorSticker("basic");
}
