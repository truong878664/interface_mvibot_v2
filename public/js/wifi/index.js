import { loaded, loading } from "../functionHandle/displayLoad.js";
import { $, $$ } from "../main.js";

let nameWifi;
const passwordWifi = $("#password-wifi");
const formPassword = $(".form-enter-password");
const wifi = [
    "wifi_123",
    "wifi_34",
    "wifi-123_5g",
    "wifi_123_1xx"
];
const wifiConnected = 'mvp_wifi_abc'

renderWifi();
renderWifiConnected(wifiConnected)

function renderWifiConnected(wifi) {
    $('.wifi-connected').innerText = wifi
}

function renderWifi() {
    loading(".wifi-wrapper");
    const htmlWifi = [];
    wifi.map((item) => {
        const wifiItem = `<div class="w-full h-[60px] border-b border-[rgba(67,67,67,0.1)] flex justify-between items-center hover:bg-[#cccccc39] cursor-pointer wifi-item"
        name-wifi="${item}">
        <span class="font-bold ml-4">${item}</span>
        <div class="mr-10">
            <label class="text-xl pr-2">
                <i class="fa-solid fa-lock"></i>
            </label>
            <label class="text-3xl">
                <i class="fa-solid fa-wifi"></i>
            </label>
        </div>
        </div>`;
        htmlWifi.push(wifiItem);
        return htmlWifi;
    });
    setTimeout(() => {
        $(".wifi-wrapper").innerHTML = htmlWifi.join("");
        showPasswordWifi();
        handleConnectWifi();
        handleCancelWifi();
        loaded(".wifi-wrapper");
    }, 1000);
}

function showPasswordWifi() {
    $$(".wifi-item").forEach((wifiItem) => {
        wifiItem.onclick = (e) => {
            nameWifi = wifiItem.getAttribute("name-wifi");
            $(".label-wifi").innerText = nameWifi;
            formPassword.classList.remove("hidden");
            $(".overlay").classList.remove("hidden");
            passwordWifi.focus();
        };
    });
}

function handleCancelWifi() {
    $(".cancel-wifi-btn").onclick = () => {
        formPassword.classList.add("hidden");
        $(".overlay").classList.add("hidden");
    };
}

function handleConnectWifi() {
    passwordWifi.oninput = (e) => {
        e.target.value.length > 0
            ? $(".connect-wifi-btn").removeAttribute("disabled")
            : $(".connect-wifi-btn").setAttribute("disabled", true);
    };
    $(".connect-wifi-btn").onclick = () => {
        const password = passwordWifi.value;
        console.log(nameWifi, password);
        formPassword.classList.add("hidden");
        $(".overlay").classList.add("hidden");

        passwordWifi.value = "";
        loading(".wifi-container");
        setTimeout(() => {
            loaded(".wifi-container");
        }, 1000);
    };
}

$(".show-password-btn").onclick = (e) => {
    const typeInputPass = passwordWifi.getAttribute("type");
    e.target.classList.toggle('active')
    passwordWifi.setAttribute(
        "type",
        typeInputPass === "text" ? "password" : "text"
    );
};
