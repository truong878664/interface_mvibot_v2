import { $, toggerMessage } from "../../main.js";
import { currentMission } from "../handleStepMission.js";
import { translateDataMission } from "../sendMission.js";

export default function showMissionCode() {
    const showMissionBtn = $(".show-mission-code-btn");
    showMissionBtn.addEventListener("click", handleShowMission);

    function handleShowMission() {
        const showMissionForm = document.createElement("div");
        showMissionForm.classList.add(
            "fixed",
            "top-0",
            "z-[30]",
            "left-0",
            "right-0",
            "bottom-0",
            "bg-[rgba(0,0,0,0.2)]",
            "show-mission-form-wrapper",
            "flex",
            "justify-center",
            "items-center"
        );
        fetch(`/api/mi/${currentMission}`)
            .then((res) => res.json())
            .then((data) => {
                const stepMission = data.steps_mission;
                if (!stepMission) {
                    toggerMessage("error", "Empty mission!");
                    return;
                }
                const htmlStep =
                    "<p>" +
                    stepMission?.split("%@&").join("%@</p><br><p>&") +
                    "</p>";

                const htmlMission = `
                <div class="bg-[#fff] rounded-md flex flex-col text-2xl show-mission-form w-2/3 max-h-[500px] h- relative">
                    <button class="absolute top-2 right-2 p-2 btn copy-mission-btn">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                    <div class="p-4 h-full w-full overflow-y-auto">
                        <div>
                            <span class="font-bold mr-2">Wake up:</span>
                            <span>${data.wake_up}</span>
                        </div>
                        <div>
                            <span class="font-bold mr-2">Stop:</span>
                            <span>${data.stop}</span>
                        </div>
                        <div>
                            <span class="font-bold mr-2">Data:</span>
                            <div class="text-justify">${htmlStep}</div>
                        </div>
                    </div>
                </div>`;

                showMissionForm.innerHTML = htmlMission;
                document.body.appendChild(showMissionForm);
                const formShowMission = $(".show-mission-form-wrapper");
                formShowMission.onclick = (e) => {
                    const isOverlay = e.target.closest(".show-mission-form");
                    !isOverlay && formShowMission.remove();
                };
                return data;
            })
            .then((data) => {
                handleCopyMission(data);
            });
    }
    function handleCopyMission(data) {
        const copyMissionBtn = $(".copy-mission-btn");
        copyMissionBtn &&
            (copyMissionBtn.onclick = (e) => {
                const dataMission = new Promise((resolve, reject) => {
                    resolve(translateDataMission(data));
                });
                dataMission.then((data) => {
                    window.navigator.clipboard.writeText(data);
                    toggerMessage("success", "Copied!");
                });
            });
    }
}
