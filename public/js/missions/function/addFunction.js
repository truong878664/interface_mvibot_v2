import { handleDeleteStep, handleMoveStep, render } from "../handleTypeMission.js";

//normal
export const valueNormalMissionArray = [];
export const valueItemTrycatch = {
    try: [],
    catch: [],
};
export const valueItemIfelse = {
    if: [],
    then: [],
    else: [],
};

//ifelse

let currentIf = "if";
$$(".add-ifelse-step-btn").forEach((element) => {
    element.onclick = (e) => {
        currentIf = e.target.getAttribute("type");
        $(".add-ifelse-step-btn.active").classList.remove("active");
        e.target.classList.add("active");
    };
});

//trycatch
let currentTrycatch = "try";
$$(".add-trycatch-step-btn").forEach((element) => {
    element.onclick = (e) => {
        currentTrycatch = e.target.getAttribute("type");
        $(".add-trycatch-step-btn.active").classList.remove("active");
        e.target.classList.add("active");
    };
});

export default function handleAddStep() { 
    $$(".add-mission-step-item-btn").forEach((element) => {
        element.onclick = (e) => {
            let type = "";
            $(".normal-mission-btn.active") && (type = "normal");
            $(".ifelse-mission-btn.active") && (type = "ifelse");
            $(".trycatch-mission-btn.active") && (type = "trycatch");

            const valueStep = e.target
                .closest(".type-mission-function-item")
                .querySelector(".value-type-mission-function-item").value;

            switch (type) {
                case "normal":
                    valueNormalMissionArray.push(valueStep);
                    render(valueNormalMissionArray, ".normal-steps-wrapper");
                    handleMoveStep(
                        valueNormalMissionArray,
                        ".normal-steps-wrapper"
                    );
                    handleDeleteStep(
                        valueNormalMissionArray,
                        ".normal-steps-wrapper"
                    );
                    break;

                case "ifelse":
                    valueItemIfelse[currentIf].push(valueStep);
                    render(
                        valueItemIfelse[currentIf],
                        `.${currentIf}-steps-wrapper`
                    );

                    handleMoveStep(valueItemIfelse.if, ".if-steps-wrapper");
                    handleMoveStep(valueItemIfelse.then, ".then-steps-wrapper");
                    handleMoveStep(valueItemIfelse.else, ".else-steps-wrapper");

                    handleDeleteStep(valueItemIfelse.if, ".if-steps-wrapper");
                    handleDeleteStep(
                        valueItemIfelse.then,
                        ".then-steps-wrapper"
                    );
                    handleDeleteStep(
                        valueItemIfelse.else,
                        ".else-steps-wrapper"
                    );
                    break;
                case "trycatch":
                    valueItemTrycatch[currentTrycatch].push(valueStep);
                    render(
                        valueItemTrycatch[currentTrycatch],
                        `.${currentTrycatch}-steps-wrapper`
                    );
                    handleMoveStep(valueItemTrycatch.try, ".try-steps-wrapper");
                    handleMoveStep(
                        valueItemTrycatch.catch,
                        ".catch-steps-wrapper"
                    );

                    handleDeleteStep(
                        valueItemTrycatch.try,
                        ".try-steps-wrapper"
                    );
                    handleDeleteStep(
                        valueItemTrycatch.catch,
                        ".catch-steps-wrapper"
                    );
                    break;
            }
        };
    });
}