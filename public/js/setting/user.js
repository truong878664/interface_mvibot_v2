import { toggerMessage, } from "../main.js";
import { updateAvatarUser } from "../mainLayout.js";
import { $, $$ } from "./setting.js";

tabUser();
handleUpdateUser();
handleCreateNewUser();
handleUpdatePassword();
handleNormalUser();

function tabUser() {
    $$(".user-setting-btn").forEach((element, index) => {
        element.onclick = (e) => {
            $$(".user-setting-detail")[index].classList.remove("hidden");
        };
    });

    $$(".close-tab-user").forEach((element) => {
        element.onclick = () => {
            $(".user-setting-detail:not(.hidden)").classList.add("hidden");
        };
    });
}

function handleUpdatePassword() {
    let isUpdate = false;
    $(".confirm-password").oninput = (e) => {
        if (e.target.value !== $(".new-password").value) {
            $(".span-confirm").innerText = "password does not match";
            isUpdate = false;
        } else {
            $(".span-confirm").innerText = "";
            isUpdate = true;
        }
    };

    $(".change-pw-btn").onclick = () => {
        $(".password").value === ""
            ? ($(".span-password").innerText = "Enter your password")
            : ($(".span-password").innerText = "");

        const dataPassword = {
            password: $(".password").value,
            new_password: $(".new-password").value,
        };
        isUpdate && updatePassword(dataPassword);
    };

    function updatePassword(data) {
        fetch("/api/user/check", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == 200) {
                    toggerMessage("success", data.message);
                    $(".password").value = "";
                    $(".new-password").value = "";
                    $(".confirm-password").value = "";
                    $(".user-setting-detail:not(.hidden)").classList.add(
                        "hidden"
                    );
                } else {
                    $(".span-password").innerText = data.message;
                }
            });
    }
}

function handleUpdateUser() {
    const username = $(".change-username");
    let usernameValue = username.value;
    $(".change-username-btn").onclick = () => {
        username.removeAttribute("readonly");
        username.focus();
        username.setSelectionRange(usernameValue.length, usernameValue.length);
        username.style.borderColor = "#FF7B54";
    };

    username.onblur = (e) => {
        e.target.style.borderColor = "transparent";
        username.setAttribute("readonly", "readonly");

        if (usernameValue != username.value) {
            updateUsername({ username: username.value.replaceAll(" ", "") });
            updateAvatarUser();
            usernameValue = username.value;
        }
    };
    function updateUsername(data) {
        fetch("/api/user/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
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
    function createNewUser(data) {
        fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == 200) {
                    $(".create-username").value = "";
                    $(".create-password").value = "";
                    $(".user-setting-detail:not(.hidden)").classList.add(
                        "hidden"
                    );
                    toggerMessage("success", `create user success`);
                    handleNormalUser();
                }
            });
    }
}

function handleNormalUser() {
    fetch("/api/user/normal-user")
        .then((res) => res.json())
        .then((data) => renderNormalUser(data));
    function renderNormalUser(data) {
        const html = [];
        data.map((item) => {
            html.push(
                ` <div class="text-[16px] px-4 py-4 text-[#333] border-b border-[#e0e0e0] cursor-pointer">
                            <span class="ml-4 pointer-events-none select-none">
                               ${item.name}
        
                            </span>
                        </div>`
            );
        });
        $(".list-normal-user").innerHTML = html.join("");
    }
}
