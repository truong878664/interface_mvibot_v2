import Step from "./Step.js";

export default class Sound extends Step {
    constructor(data) {
        super(data);
        this.type = "sound";
        this.data.name = document.querySelector(".name_function_sound");
    }
    get() {
        this.music_type = document.querySelector(".sound-item.active")?.dataset.numberSound;
        const music_mode = this.music_type ? this.music_type : 0;
        const music_start = this.music_type * 1 === 0 ? 0 : 1;
        const data = {
            name: this.data.name.value,
            music_mode,
            music_start,
        };
        const dataValidated = this.validate(data);
        dataValidated.success && this.reset();
        return dataValidated;
    }

    reset() {
        this.data.name.value = "";
        document
            .querySelector(".sound-item.active")
            ?.classList.remove("active");
    }
}
