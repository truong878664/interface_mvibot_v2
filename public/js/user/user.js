import { toggerMessage } from "../main.js";
import { $, $$ } from "../main.js";
import renderUser from "./renderUser.js";

const userSettingBtns = $$(".user-setting-btn");
const closeTabUsers = $$(".close-tab-user");
const confirmPassWord = $(".confirm-password");
const changPwBtn = $(".change-pw-btn");

tabUser();
handleCreateNewUser();
handleUpdatePassword();
handleNormalUser();

function tabUser() {
    userSettingBtns.forEach((element, index) => {
        element.onclick = (e) => {
            $$(".user-setting-detail")[index].classList.remove("hidden");
        };
    });

    closeTabUsers.forEach((element) => {
        element.onclick = () => {
            $(".user-setting-detail:not(.hidden)").classList.add("hidden");
        };
    });
}

function handleUpdatePassword() {
    let isUpdate = false;
    confirmPassWord.oninput = (e) => {
        if (e.target.value !== $(".new-password").value) {
            $(".span-confirm").innerText = "password does not match";
            isUpdate = false;
        } else {
            $(".span-confirm").innerText = "";
            isUpdate = true;
        }
    };

    changPwBtn.onclick = () => {
        $(".password").value === ""
            ? ($(".span-password").innerText = "Enter your password")
            : ($(".span-password").innerText = "");

        const dataPassword = {
            password: $(".password").value,
            new_password: $(".new-password").value,
        };
        isUpdate && updatePassword(dataPassword);
    };

    async function updatePassword(data) {
        const res = await fetch("/api/user/check", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });
        const dataRes = res.json();
        if (dataRes.status == 200) {
            toggerMessage("success", dataRes.message);
            $(".password").value = "";
            $(".new-password").value = "";
            $(".confirm-password").value = "";
            $(".user-setting-detail:not(.hidden)").classList.add("hidden");
        } else {
            $(".span-password").innerText = dataRes.message;
        }
    }
}

function handleCreateNewUser() {
    $(".create-btn").onclick = () => {
        const username = $(".create-username").value;
        const password = $(".create-password").value;

        $(".span-create-username").innerText =
            username == "" ? "Enter username" : "";

        $(".span-create-password").innerText =
            password == "" ? "Enter password" : "";

        if (username != "" && password != "") {
            const dataUser = {
                username: username,
                password: password,
            };
            createNewUser(dataUser);
        }
    };
}
async function createNewUser(data) {
    const res = await fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    });
    const dataRes = await res.json();

    if (!dataRes.error) {
        $(".create-username").value = "";
        $(".create-password").value = "";
        $(".user-setting-detail:not(.hidden)").classList.add("hidden");
        handleNormalUser();
    }

    toggerMessage(dataRes.error ? "error" : "success", dataRes.message);
}

async function handleNormalUser() {
    const res = await fetch("/api/user/normal-user");
    const data = await res.json();
    renderUser(data);
    // console.log(document.querySelector("[data-button='action-user']"));
}
