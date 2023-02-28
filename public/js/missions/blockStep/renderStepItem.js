export default function renderStepItem(data, html) {
    const dataNormal = data.split("|");
    dataNormal.shift();
    dataNormal.map((step, index) => {
        const stepMode = step.slice(0, step.indexOf("#"));
        const stepName = step.slice(
            step.indexOf("#") + 1,
            step.indexOf("#", step.indexOf("#") + 1)
        );

        return html.push(`
            <div class="hidden step-item text-white step-${stepMode} step-hidden" index=${index}>
            <span class="stem-name">${stepMode}|${stepName}</span>
            </div>
        `);

    });
}