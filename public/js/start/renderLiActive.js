function renderLiActive({ data, selector }) {
    const html = [];
    data.map((item) => {
        html.push(
            `
            <span class="bg-green-100 mr-2 mb-1 px-2 py-1 text-2xl">
            ${item.name}
            </span>
            `
        );
        return html;
    });
    document.querySelector(selector).innerHTML = html.join("");
}
export default renderLiActive;
