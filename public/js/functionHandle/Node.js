const Node = (tag) => {
    const HTMLElement = document.createElement(tag);
    return {
        props({
            id = "",
            className = "",
            children = null,
            onClick = () => {},
            style = {},
            dataset = {},
        }) {
            id && (HTMLElement.id = id);
            HTMLElement.className = className;
            HTMLElement.addEventListener("click", onClick);

            Object.assign(HTMLElement.style, style);
            Object.assign(HTMLElement.dataset, dataset);
            if (typeof children === "string" || typeof children === "number") {
                HTMLElement.innerHTML = children;
            } else {
                children && HTMLElement.append(...children);
            }
            return HTMLElement;
        },
    };
};
export default Node;
