function renderUser(data) {
    const html = [];
    data.map((item) => {
        html.push(
            `
            <div class="text-[16px] px-4 py-4 text-[#333] border-b border-[#e0e0e0] cursor-pointer flex justify-between">
                <span class="ml-4 pointer-events-none select-none">
                    ${item.name}
                </span>
                <button class="btn" data-button="action-user">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            `
        );
    });
    document.querySelector(".list-normal-user").innerHTML = html.join("");
}

export default renderUser;
