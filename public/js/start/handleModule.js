import { toggerMessage } from "../main.js";
import andonLight from "./andon.js";

async function handleModule() {
    try {
        const andonWrapper = document.querySelector("#light-andon-wrapper");
        setInterval(async () => {
            const dataOutputGpio = await getOutPutGpioModule();

            dataOutputGpio.data.forEach((output, index) => {
                const { out1, out2, out3 } = output;

                const currentAndon = andonWrapper.querySelector(
                    `.andon[data-module='${output.name_seri}']`
                );

                currentAndon.innerHTML = andonLight(
                    {
                        out1,
                        out2,
                        out3,
                    },
                    index
                );
            });
        }, 3000);
    } catch (error) {
        toggerMessage("error", "ERROR! " + error);
        console.log(error);
    }
}

async function getOutPutGpioModule() {
    const moduleGet = ["IB03_916b", "IB04_916b", "IB05_916b"];
    const res = await fetch(
        `/api/input-gpio/get-output-module?moduleGet=${JSON.stringify(
            moduleGet
        )}`
    );
    const data = await res.json();
    return data;
}

export default handleModule;
