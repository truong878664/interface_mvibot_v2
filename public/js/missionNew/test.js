import { MissionClass } from "./index.js";
const getNode = document.querySelector.bind(document);
const getNodeList = document.querySelectorAll.bind(document);

const buttonTest = getNode("#button-test-1");
let to = 1;
function test() {
    buttonTest.addEventListener("click", (e) => {
        const stepList = getNodeList("[data-name='step']");
        getNodeList("[data-name='step'].ring-4").forEach((element) => {
            element.classList.remove("ring-4", "opacity-50");
        });
        stepList.forEach((element, index) => {
            if (index + 1 > to) return;
            stepList[index - 1]?.classList.remove(
                "shadow-2xl",
                "shadow-red-500"
            );

            stepList[index - 1]?.classList.add("opacity-50");

            element.classList.add("ring-4", "shadow-2xl", "shadow-red-500");
        });
        to++;
    });
    return 123;
}

export default test;
