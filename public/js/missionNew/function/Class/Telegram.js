import Step from "./Step.js";

export default class Telegram extends Step {
    constructor(data) {
        super(data);
        this.type = "telegram";
        const form = document.getElementById("function-item-form-wrapper");
        this.data.name = form?.querySelector('[name="name_telegram"]');
        this.data.token = form?.querySelector('[name="token"]');
        this.data.chat_id = form?.querySelector('[name="chat_id"]');
        this.data.msg = form?.querySelector('[name="msg"]');
    }
    validateToken(data) {
        data.token = 11111111;
        // console.log("validate token", data);
    }
}
