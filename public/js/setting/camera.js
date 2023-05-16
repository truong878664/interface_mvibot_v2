import checkChangeParameter from "./checkChangeParameter.js";
import pubSetting from "./pubSetting.js";

export default function camera(data) {
    setCamera();

    const { serial_camera1, serial_camera2 } = data;
    document.querySelector("[name=serial_camera1]").value = serial_camera1;
    document.querySelector("[name=serial_camera2]").value = serial_camera2;

    const editCameraBtn = document.querySelector(".edit-camera-btn");
    editCameraBtn.onclick = function (e) {
        const isEdit = Number(this.dataset.editCamera);
        this.dataset.editCamera = Number(!isEdit);
        document.querySelectorAll(".input-serial-camera").forEach((element) => {
            element.toggleAttribute("readonly", isEdit);
        });
    };
}

function setCamera() {
    const saveCameraBtn = document.querySelector(
        "[data-setting=camera][data-type=save]"
    );
    saveCameraBtn.onclick = handleSave;
    async function handleSave() {
        const dataCamera = getDataCamera();
        const dataChanged = await checkChangeParameter(dataCamera);
        pubSetting(dataChanged);
    }
    function getDataCamera() {
        const serial_camera1 = document.querySelector(
            "[name=serial_camera1]"
        ).value;
        const serial_camera2 = document.querySelector(
            "[name=serial_camera2]"
        ).value;
        return { serial_camera1, serial_camera2 };
    }
}
