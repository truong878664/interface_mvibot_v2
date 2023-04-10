import translatesStepsMission from "./functionHandle/translatesStepsMission.js";
import fullScreenBlockStep from "./blockStep/fullScreenStep.js";
import showMissionCode from "./blockStep/showMissionCode.js";
import highlineStepItem from "./blockStep/highlineStepItem.js";


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const currentMission = $("#current-id-mission").value;

translatesStepsMission({id: currentMission});
fullScreenBlockStep();
showMissionCode()
highlineStepItem();

function messageEmpty(element, message) {
    const emptyElement = `<span class="text-[60px] w-full h-full flex justify-center items-center p-4 text-slate-300">
                            <div class="relative">
                                <i class="fa-solid fa-box-open "></i>
                            </div>
                            <span class="text-[20px]">${message}</span>
                            </span>`;
    element.innerHTML = emptyElement;
}


export { messageEmpty };
