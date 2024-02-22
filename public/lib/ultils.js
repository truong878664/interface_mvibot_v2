export const Html = (tag) => {
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

export const secondToTime = (secondTotal) => {
    const secondTotalParse = isNaN(Number(secondTotal))
        ? 0
        : Number(secondTotal);
    const hourFloat = secondTotalParse / 3600;
    const hour = Math.floor(hourFloat);
    const minuteFloat = (hourFloat - hour) * 60;
    const minute = Math.floor(minuteFloat);
    const second = Math.floor((minuteFloat - minute) * 60);
    return {
        hour,
        minute,
        second,
    };
};
