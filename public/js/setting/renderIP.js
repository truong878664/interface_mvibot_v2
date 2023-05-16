export default function renderIp({ ipString, ipElement }) {
    const ip = ipString?.split(".");
    document.querySelectorAll(ipElement)?.forEach((element, index) => {
        if (ip) {
            element.value = ip[index];
        }
    });
}
