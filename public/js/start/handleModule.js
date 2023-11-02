import { toggerMessage } from "../main.js";
import andonLight from "./andon.js";

async function handleModule() {
    try {
        const andonWrapper = document.querySelector("#light-andon-wrapper");
        const currentIO = {};
        setInterval(async () => {
            const dataOutputGpio = await getOutPutGpioModule();
            // console.log(dataOutputGpio);
            dataOutputGpio.data.forEach((output, index) => {
                const { out1, out2, out3 } = output;

                if (
                    JSON.stringify({ out1, out2, out3 }) !==
                    JSON.stringify(currentIO[output.name_seri])
                ) {
                    const currentAndon = andonWrapper.querySelector(
                        `.andon[data-module='${output.name_seri}']`,
                    );
                    currentAndon.innerHTML = andonLight(
                        {
                            out1,
                            out2,
                            out3,
                        },
                        index,
                    );
                }
                currentIO[output.name_seri] = { out1, out2, out3 };
            });
        }, 1500);
    } catch (error) {
        toggerMessage("error", "ERROR! " + error);
        console.log(error);
    }
}

async function getOutPutGpioModule() {
    try {
        const moduleGet = ["IB03_916b", "IB04_916b", "IB05_916b"];
        const res = await fetch(
            `/api/input-gpio/get-output-module?moduleGet=${JSON.stringify(
                moduleGet,
            )}`,
        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default handleModule;
