import Footprint from "../Class/Footprint.js";

export default function footprint() {
    setDefault();
}

const setDefault = () => {
    const defaultBtn = document.querySelector(".default-value-footprint");
    defaultBtn.onclick = () => {
        new Footprint().default();
    };
};
