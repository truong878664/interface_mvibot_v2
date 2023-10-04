let timeOutId;
function useDebounce({ cb, delay = 1000 }) {
    clearTimeout(timeOutId);

    timeOutId = setTimeout(() => {
        cb();
    }, delay);
}

export default useDebounce;
