function debouche() {
    let timeoutId;
    return {
        run(cb, delay = 800) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                cb();
            }, delay);
        },
    };
}

export default debouche;
