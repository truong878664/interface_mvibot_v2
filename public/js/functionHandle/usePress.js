export default function usePress({ element, time, callback }) {
    let interval;
    element.addEventListener("pointerdown", function (e) {
        interval = setInterval(() => {
            callback.call(this, e);
        }, time);
    });

    element.addEventListener("click", function (e) {
        callback.call(this, e);
    });

    document.addEventListener("pointerup", clear);
    document.addEventListener("touchend", clear);

    function clear() {
        if (!interval) return;
        clearInterval(interval);
        interval = "";
    }
}
