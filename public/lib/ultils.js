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



export const cookie = {
        set(name, value, second) {
        let expires = "";
        const ONE_SECOND = 1000;
        if (second) {
            const date = new Date();
            date.setTime(date.getTime() + second * ONE_SECOND);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }, get(name) {
        try {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        } catch (error) {
            return null
        }
    }, erase(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}