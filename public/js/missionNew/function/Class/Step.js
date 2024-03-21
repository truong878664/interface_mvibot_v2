import isNullOrEmpty from "../../../functionHandle/isNullOrEmpty.js";
import { toggerMessage } from "../../../main.js";

export default class Step {
    constructor() {
        this.data = {};
        this.message = {
            saved: false,
            status: "no status",
            message: `no handle ${this.type}!`,
        };
        this.currentIdUpdate = "";
    }
    display(data) {
        try {
            for (const key in this.data) {
                this.data[key].value = data[key];
            }
        } catch (error) {
            toggerMessage("error", "ERR!," + error);
        }
    }

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
        const dataValidated = this.validate(data);
        dataValidated.success && this.reset();
        return dataValidated;
    }
    validate(data) {
        const dataValidated = {
            success: true,
            data,
            message: "Get data success",
            error: null,
        };
        const { time_out, name } = data;
        dataValidated.data.name = name?.replaceAll("?", "").replaceAll("!", "");

        for (const key in data) {
            if (isNullOrEmpty(data[key])) {
                dataValidated.success = false;
                dataValidated.message = `${key} cannot be empty!`;
            }
            if (key === "token") {
                const tokenTelegram = data.token;
                const isValidToken =
                    tokenTelegram.split(":").filter((v) => v.trim()).length ===
                    2;

                if (!isValidToken) {
                    dataValidated.success = false;
                    dataValidated.message = `Invalid token, ex: 123:abc`;
                }
            }
        }

        if (time_out && isNaN(Number(time_out))) {
            dataValidated.success = false;
            dataValidated.message = "Time out is have to number!";
        }

        return dataValidated;
    }

    async save() {
        try {
            const data = this.get();
            console.log(data);
            if (!data.success) {
                this.message.message = data.message;
                return this.message;
            }
            const res = await fetch(`/api/${this.type}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data.data),
            });
            const stepSaved = await res.json();
            this.message.message = `save ${this.type} successfully!`;
            this.message.saved = true;
            this.message.status = "success";
            return { stepSaved, message: this.message };
        } catch (error) {
            console.log(error);
            return this.message;
        }
    }

    async update(data) {
        try {
            const res = await fetch(`/api/step/${this.currentIdUpdate}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(data),
            });
            const message = await res.json();
            this.reset();
            return message;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const urlDelete = "/api/" + this.type + "/" + id;
            const res = await fetch(urlDelete, { method: "DELETE" });
            const data = await res.json();
            return { message: data.message, deleted: true };
        } catch (error) {
            return { message: "ERR!, Try again!", deleted: false };
        }
    }

    addItem(item) {
        document
            .querySelector(`[data-list-function='${this.type}']`)
            .appendChild(item);
    }
    reset() {
        for (const key in this.data) {
            if (this.data[key]) {
                this.data[key].value = "";
            }
        }
    }
}
