function ulSelectComponent({ x, y, dataList, dataListCheck, multiple = true }) {
    const div = document.createElement("div");
    div.onclick = (e) => {
        if (!e.target.classList.contains("overlay-start")) return;
        e.target.remove();
    };
    const className = [
        "fixed",
        "top-0",
        "left-0",
        "right-0",
        "bottom-0",
        "overlay-start",
    ];

    div.classList.add(...className);
    const htmlLi = [];

    dataList.map((item) => {
        const isLiActive = !!dataListCheck.find((i) => i.id === item.id);
        htmlLi.push(`
        <li class="w-full border-b border-gray-200 rounded-t-lg">
            <div class="flex items-center pl-3">
                <input id="checkbox-${item.id}" type="${
            multiple ? "checkbox" : "radio"
        }" ${multiple ? "" : "name='radio'"}  class="item-li" value="${
            item.id
        }" data-name="${item.name}" ${isLiActive ? "checked" : ""}
                    class="w-[16px] aspect-square text-blue-600 rounded-3xl bg-gray-100 border-gray-300"/>
                <label for="checkbox-${item.id}"
                    class="w-full text-[12px] py-3 ml-2 font-medium text-gray-900">
                    ${item.name}
                </label>
            </div>
        </li>
        `);
        return htmlLi;
    });

    div.innerHTML = `
    <ul style="left: ${x}px; top: ${y}px" class="fixed w-full max-w-[400px] mt-[10px] font-medium text-gray-900 bg-white border border-gray-200 rounded-lg max-h-[300px] overflow-y-auto">
        ${htmlLi.join("")}
    </ul>`;
    return Promise.resolve(document.body.appendChild(div));
}

export default ulSelectComponent;
