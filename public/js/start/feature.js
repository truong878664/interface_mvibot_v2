import confirmationForm from "../functionHandle/confirmationForm.js";
import { toggerMessage } from "../main.js";
import publishTopicString from "../rosModule/topicString.js";

const featureWrapper = document.querySelector("#feature-wrapper-button");

function feature() {
    featureWrapper.onclick = (e) => {
        const typeButton = e.target.dataset.typeButton;
        const robots = document.querySelector("#robot-tool-lift");
        const moduleGpios = document.querySelector("#module_gpio_list");
        if (!typeButton) return;
        const message = {
            upToolLift: "Bạn có muốn nâng tool lift?",
            downToolLift: "Bạn có muốn hạ tool lift?",
            setYellowSx: "Bạn có muốn set các module ở SX đèn vàng?",
            setRedSx: "Bạn có muốn set các module ở SX đèn đỏ?",
        };
        const robotActive = robots.value;
        const moduleSet = ["IB03_916b", "IB04_916b", "IB05_916b"];

        const actions = {
            upToolLift() {
                if (!robotActive) {
                    toggerMessage("error", "Vui lòng chọn robot!");
                    return;
                }
                publishTopicString(`/${robotActive}/output_user_set`, "(0|0)");
                toggerMessage("success", "Nâng tool lift thành công!");
            },
            downToolLift() {
                if (!robotActive) {
                    toggerMessage("error", "Vui lòng chọn robot!");
                    return;
                }
                publishTopicString(`/${robotActive}/output_user_set`, "(0|1)");
                toggerMessage("success", "Hạ tool lift thành công!");
            },
            setYellowSx() {
                const dataGpioModule = JSON.parse(moduleGpios.value);
                dataGpioModule.forEach((moduleGpio) => {
                    if (moduleSet.indexOf(moduleGpio.name_seri) !== -1) {
                        publishTopicString(
                            `/${moduleGpio.name_seri}/output_user_set`,
                            "(0|1)(7|0)"
                        );
                    }
                });
                publishTopicString(`/MB22_916b/output_user_set`, "(5|0)");
                toggerMessage("success", "Đã kích đèn vàng module ở SX!");
            },
            setRedSx() {
                const dataGpioModule = JSON.parse(moduleGpios.value);
                dataGpioModule.forEach((moduleGpio) => {
                    if (moduleSet.indexOf(moduleGpio.name_seri) !== -1) {
                        publishTopicString(
                            `/${moduleGpio.name_seri}/output_user_set`,
                            "(2|1)(7|1)"
                        );
                    }
                });
                publishTopicString(`/MB22_916b/output_user_set`, "(5|1)");
                toggerMessage("success", "Đã kích đèn đỏ module ở SX!");
            },
        };
        confirmationForm({
            callback: actions[typeButton],
            message: message[typeButton],
        });
    };
    return 123;
}
export default feature;
