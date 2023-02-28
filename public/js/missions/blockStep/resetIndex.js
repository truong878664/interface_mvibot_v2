export default function resetIndex(classList) {
    $$(classList).forEach((item, index) => {
        item.setAttribute("index", index);
    });
}