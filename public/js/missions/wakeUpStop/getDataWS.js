export default function getDataWS({ type, typeModule }) {
    const nameGpio = [
        "in_on",
        "in_off",
        "out_set",
        "out_reset",
        "in_pullup",
        "in_pulldown",
    ];
    const data = {
        type: typeModule,
        in_on: [],
        in_off: [],
        out_set: [],
        out_reset: [],
        in_pullup: [],
        in_pulldown: [],
    };
    const getDataGpioWakeUpStop = new Promise((resolve, reject) => {
        nameGpio.map((item) => {
            $(`#${type}-wrapper`)
                .querySelectorAll(
                    `.${
                        item.indexOf("in") !== -1 ? "input-gpio" : "output-gpio"
                    }.${item}`
                )
                .forEach((element) => {
                    data[item].push(element.getAttribute("gpio"));
                });
            return data;
        });

        typeModule === "gpio_module" &&
            (data.name_seri = $(`[data-ws-module-name=gpio_${type}]`).value);

        resolve(data);
    });

    return getDataGpioWakeUpStop;
}
