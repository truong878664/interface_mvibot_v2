const Step = (step, addressIndex = "") => {
    const arrayStep = step.split("#");
    const type = arrayStep[0];
    const name = arrayStep[1];
    const id = arrayStep[2];
    const stepItems = {
        footprint: `
        <div draggable="true" data-name="step" data-id=${id} data-address-index="${addressIndex}" data-type="footprint" data-action-block-step="step" data-sticky="hidden" class="data-[sticky='show']:z-10 relative cursor-pointer h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
            <span>${name}</span>
        </div>`,
        gpio: `
        <div draggable="true" data-name="step" data-id=${id} data-address-index="${addressIndex}" data-type="gpio" data-action-block-step="step" data-sticky="hidden" class="data-[sticky='show']:z-10 relative cursor-pointer h-[30px] mr-2 mb-2 bg-[#30C93033] text-[#30C930] rounded-lg inline-flex items-center px-4 text-[16px]">
            <span class="mr-4"><i class="fa-solid fa-microchip"></i></span>
            <span>${name}</span>
        </div>`,
        gpio_module: `
        <div draggable="true" data-name="step" data-id=${id} data-address-index="${addressIndex}" data-type="gpio_module" data-action-block-step="step" data-sticky="hidden" class="data-[sticky='show']:z-10 relative cursor-pointer h-[30px] mr-2 mb-2 bg-[#EE5E8B33] text-[#EE5E8B] rounded-lg inline-flex items-center px-4 text-[16px]">
            <span class="mr-4"><i class="fa-solid fa-microchip"></i></span>
            <span>${name}</span>
        </div>`,
        marker: `
        <div draggable="true" data-name="step" data-id=${id} data-address-index="${addressIndex}" data-type="marker" data-action-block-step="step" data-sticky="hidden" class="data-[sticky='show']:z-10 relative cursor-pointer h-[30px] mr-2 mb-2 bg-[#432C7A33] text-[#432C7A] rounded-lg inline-flex items-center px-4 text-[16px]">
            <span class="mr-4"><i class="fa-solid fa-arrows-up-to-line"></i></span>
            <span>${name}</span>
        </div>`,
        sleep: `
        <div draggable="true" data-name="step" data-id=${id} data-address-index="${addressIndex}" data-type="sleep" data-action-block-step="step" data-sticky="hidden" class="data-[sticky='show']:z-10 relative cursor-pointer h-[30px] mr-2 mb-2 bg-[#DC262633] text-[#DC2626] rounded-lg inline-flex items-center px-4 text-[16px]">
            <span class="mr-4"><i class="fa-solid fa-mattress-pillow"></i></span>
            <span>${name}</span>
        </div>`,
        sound: `
        <div draggable="true" data-name="step" data-id=${id} data-address-index="${addressIndex}" data-type="sound" data-action-block-step="step" data-sticky="hidden" class="data-[sticky='show']:z-10 relative cursor-pointer h-[30px] mr-2 mb-2 bg-[#9333EA33] text-[#9333EA] rounded-lg inline-flex items-center px-4 text-[16px]">
            <span class="mr-4"><i class="fa-solid fa-volume-high"></i></span>
            <span>${name}</span>
        </div>`,
        position: `
        <div draggable="true" data-name="step" data-id=${id} data-address-index="${addressIndex}" data-type="position" class=" text-[16px] mr-2 mb-2 flex">
            <span class="text-green-500">
                <i class="fa-solid fa-arrow-right-long"></i>
            </span>
            <div data-action-block-step="step" data-sticky="hidden" class="data-[sticky='show']:z-10 relative cursor-pointer h-[30px] bg-[#57534E33] text-[#57534E] rounded-lg inline-flex items-center px-4">
                <span class="mr-4"><i class="fa-solid fa-location-dot"></i></span>
                <span>${name}</span>
            </div>
        </div>`,
        variable: `
        <div draggable="true" data-name="step" data-id=${id} data-address-index="${addressIndex}" data-type="variable" data-action-block-step="step" data-sticky="hidden" class="data-[sticky='show']:z-10 relative cursor-pointer h-[30px] mr-2 mb-2 bg-[#EA580C33] text-[#EA580C] rounded-lg inline-flex items-center px-4 text-[16px]">
            <span class="mr-4"><i class="fa-solid fa-file-code"></i></span>
            <span>${name}</span>
        </div>`,
        break: `
        <div draggable="true" data-name="step" data-address-index="${addressIndex}" data-type="break" data-action-block-step="step" data-sticky="hidden" class="data-[sticky='show']:z-10 relative cursor-pointer h-[30px] mr-2 mb-2 bg-[#C9000C33] text-[#C9000C] rounded-lg inline-flex items-center px-4 text-[16px]">
            <span class="mr-4"><i class="fa-solid fa-link-slash"></i></span>
            <span>break;</span>
        </div>`,
    };
    const stepItem = stepItems[type] || "No Step";
    return stepItem;
};

export default Step;
