export default function dbDelete(ref, callback) {
    if (ref.classList.contains("db-click")) {
        callback();
    }
    ref.classList.add("db-click");
    setTimeout(() => {
        ref.classList.remove("db-click");
    }, 3000);
}
