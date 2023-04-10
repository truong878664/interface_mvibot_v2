export default function highlineStepItem() {
    let itemHighline;
    let timeOutDeleteHighline;

    let itemHighlineType;
    let timeOutDeleteHighlineType;

    $(".steps-wrapper").addEventListener("click", (e) => {
        const stepItem = e.target.closest(".step-item-function");
        const typeMissionItem = e.target.closest(".type-mission-btn");

        if (stepItem) {
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
        } else if (typeMissionItem) {
            const type = typeMissionItem.dataset.type;
            const idTypeMission = typeMissionItem.dataset.idTypeMission;

            $(`[data-type-mission="${type}"]`).click();

            const typeMissionActive = $(`[type-mission-id="${idTypeMission}"]`);

            typeMissionActive.classList.add("highline");
            typeMissionActive.scrollIntoView({ behavior: "smooth" });

            clearTimeout(timeOutDeleteHighlineType);
            itemHighlineType?.classList.remove("highline");
            itemHighlineType = $(".type-mission-item.highline");
            timeOutDeleteHighlineType = setTimeout(() => {
                itemHighlineType?.classList.remove("highline");
            }, 4000);
        } else {
            return;
        }
    });
}
