export default function createNameWindow() {
    let tabId = window.name;
    if (!tabId) {
        tabId = generateRandomId();
        window.name = tabId;
    }

    function generateRandomId() {
        const chars = "0123456789abcdef";
        let randomId = "";
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            randomId += chars.charAt(randomIndex);
        }
        return randomId;
    }
}
