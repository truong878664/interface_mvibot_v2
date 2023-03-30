import translatesStepsMission from "./functionHandle/translatesStepsMission.js";
import fullScreenBlockStep from "./blockStep/fullScreenStep.js";
import showMissionCode from "./blockStep/showMissionCode.js";


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const currentMission = $("#current-id-mission").value;

translatesStepsMission({id: currentMission});
fullScreenBlockStep();
showMissionCode()

function messageEmpty(element, message) {
    const emptyElement = `<span class="text-[60px] w-full h-full flex justify-center items-center p-4 text-slate-300">
                            <div class="relative">
                                <i class="fa-solid fa-box-open "></i>
                            </div>
                            <span class="text-[20px]">${message}</span>
                            </span>`;
    element.innerHTML = emptyElement;
}
highlineStepItem();
function highlineStepItem() {
    let itemHighline;
    let timeOutDeleteHighline;
    $(".steps-wrapper").addEventListener("click", (e) => {
        const stepItem = e.target.closest(".step-item-function");
        if (!stepItem) return;
        const idStep = stepItem.dataset.id;
        const modeStep = stepItem.dataset.mode;
        const functionList = $(`.function-list-item-${modeStep}`);

        $(`.${modeStep}-function-btn`).click();

        const itemActive = functionList.querySelector(
            `[function-id="${idStep}"]`
        );

        itemActive.classList.add("highline");
        itemActive.scrollIntoView({ behavior: "smooth" });

        clearTimeout(timeOutDeleteHighline);
        itemHighline?.classList.remove("highline");
        itemHighline = $(".type-mission-function-item.highline");
        timeOutDeleteHighline = setTimeout(() => {
            itemHighline?.classList.remove("highline");
        }, 4000);
    });
}

export { messageEmpty };
