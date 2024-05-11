import { cookie } from "../lib/ultils.js";

const start = {
    passwordInput: null,
    usernameInput: null,
    buttonLogin: null,
    __init__() {
        this.passwordInput = document.querySelector(".password");
        this.usernameInput = document.querySelector(".username");
        this.buttonLogin = document.querySelector(".login-bt");
    },
    /**
    * @returns {void}
    */
    validate() { },
    /**
     * @returns {void}
     */
    handleLogin() {
        this.buttonLogin.addEventListener("click", () => {
            const password = this.passwordInput.value;
            const username = this.usernameInput.value;
            this.login(username, password)
        });
    },
    /** 
     * @param {string} username 
     * @param {string} password 
     * @returns {void}
     */
    login(username, password) {
        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
                name: username
            })
        })
            .then(res => res.json())
            .then(data => {
                cookie.set("token", data.access_token, data.expires_in)
                cookie.set("username", data.user.name, data.expires_in)
            })
            .then(() => {
                console.log(cookie.get('token'));
            })
            .catch(error => {
                console.error(error);
            })
    },
    /**
    * @returns {void}
    */
    run() {
        // this.__init__();
        // this.validate();
        // this.handleLogin();
    },
};
start.run();
