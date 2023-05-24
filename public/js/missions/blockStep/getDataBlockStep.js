export default function getDataBlockStep() {
    const step = [];
    Array.from($$(".mission-item")).map((item) => {
        step.push(item.getAttribute("id-mission"));
        return step;
    });
    return step;
}