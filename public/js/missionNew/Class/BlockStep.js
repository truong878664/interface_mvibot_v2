export default class BlockStep {
    constructor() {
        this.urlApi = "/api/type-mission-v4";
    }
    async save(data) {
        const res = await fetch(this.urlApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const message = await res.json();
        return message;
    }
}
