export default class Step {
    constructor() {
        this.data = {};
        this.message = {
            saved: false,
            status: "no status",
            message: `no handle ${this.type}!`,
        };
    }
    display() {}
    get() {
        const data = {};
        for (const key in this.data) {
            const typeData = this.data[key]?.dataset.type || "string";
            const value = this.data[key]?.value || null;
            data[key] =
                typeData === "number"
                    ? isNaN(Number(value))
                        ? 0
                        : Number(value)
                    : value;
        }
        this.reset();
        return data;
    }

    async save() {
        try {
            const data = this.get();
            const res = await fetch(`/api/${this.type}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            });
            const stepSaved = res.json();
            this.message.message = `save ${this.type} successfully!`;
            this.message.saved = true;
            this.message.status = "success";
            return { stepSaved, message: this.message };
        } catch (error) {
            return this.message;
        }
    }

    addItem(item) {
        document
            .querySelector(`[data-list-function='${this.type}']`)
            .appendChild(item);
    }
    reset() {
        for (const key in this.data) {
            this.data[key].value = "";
        }
    }
}
