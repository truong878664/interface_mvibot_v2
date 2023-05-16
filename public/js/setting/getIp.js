export default function getIp({ element }) {
    const ipPartials = document.querySelectorAll(element);
    const ip = [];
    Array.from(ipPartials).map((element) => {
        if (element.value) {
            ip.push(element.value);
        }
    });
    if (ip.length === 4) {
        return ip.join(".");
    } else {
        return "";
    }
}
