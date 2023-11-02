function renderLiActive({ data, selector }) {
    const html = [];
    data.map((item) => {
        html.push(
            `
            <span class="bg-green-100 px-2 py-1 min-w-[50px] text-center rounded-sm my-0.5">
            ${item.name}
            </span>
            `,
        );
        return html;
    });
    document.querySelector(selector).innerHTML = html.join("");
}
export default renderLiActive;
