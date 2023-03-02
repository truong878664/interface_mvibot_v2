import { loaded, loading } from "../functionHandle/displayLoad.js";
import { $, $$ } from "../main.js";
import { robotActive } from "../mainLayout.js";
import subscribeTopic from "../rosModule/subscribeTopic.js";
import publishTopicString from "../rosModule/topicString.js";

$$(".name-robot").forEach((element) => {
    const robot = element.value;
    subscribeTopic(
        `/${robot}/robot_list_wifi`,
        "std_msgs/String",
        (data, nameTopic) => {
            const nameRobotActive = robotActive();
            if (nameTopic.indexOf(nameRobotActive) !== -1) {
                parseWifi(data.data);
            }
        }
    );
});

// const wifiIcon =

function wifiIcon(signal) {
    let speed;
    if (parseInt(signal) > 66) {
        speed = "height";
    } else if (parseInt(signal) > 33) {
        speed = "medium";
    } else {
        speed = "low";
    }

    return `<svg width="40" height="40" viewBox="0 0 40 20" fill="none" id="${speed}"
    xmlns="http://www.w3.org/2000/svg">
    <circle class="low medium height" fill="#9a9a9a" cx="19.9849" cy="16.9683"
        r="2.85505" />
    <path class="height medium" fill="#9a9a9a"
        d="M28.5102 12.3681C29.0941 11.8562 29.1572 10.9611 28.5843 10.437C27.5973 9.5341 26.4726 8.78972 25.2497 8.23339C23.5992 7.4825 21.8079 7.09138 19.9946 7.08599C18.1814 7.08061 16.3877 7.46109 14.7328 8.20216C13.5067 8.75121 12.3775 9.4889 11.3852 10.3859C10.8091 10.9067 10.8669 11.802 11.4478 12.3174V12.3174C12.0286 12.8329 12.9117 12.7708 13.5036 12.2681C14.2199 11.66 15.0203 11.1546 15.8821 10.7687C17.1729 10.1907 18.5719 9.89388 19.9863 9.89808C21.4006 9.90228 22.7978 10.2074 24.0852 10.793C24.9447 11.1841 25.7421 11.6942 26.4547 12.3066C27.0436 12.8127 27.9263 12.8801 28.5102 12.3681V12.3681Z" />
    <path class="height" fill="#9a9a9a"
        d="M33.7825 7.51599C34.3573 6.99541 34.4044 6.10346 33.8448 5.56666C32.171 3.96105 30.2278 2.65629 28.1007 1.71396C25.5448 0.58174 22.7801 -0.00213281 19.9847 5.85337e-06C17.1893 0.00214452 14.4255 0.590247 11.8714 1.72637C9.74564 2.67196 7.80452 3.97969 6.13312 5.58786C5.57433 6.12552 5.62286 7.01739 6.19839 7.5371V7.5371C6.77392 8.0568 7.65805 8.00678 8.22297 7.47557C9.62704 6.15529 11.2457 5.07815 13.0127 4.29213C15.2082 3.31552 17.584 2.80999 19.9868 2.80815C22.3897 2.80632 24.7663 3.30821 26.9633 4.28145C28.7315 5.06477 30.3518 6.13943 31.7578 7.45756C32.3236 7.98791 33.2078 8.03657 33.7825 7.51599V7.51599Z" />
</svg>`;
}

function parseWifi(data) {
    const arrayWifi = data
        .slice(1, data.length - 1)
        .replaceAll("\\", " ")
        .replaceAll("=", '":"')
        .split(")(");
    const listWifi = arrayWifi.map((wifi) => {
        const wifiItem = wifi.split("~").filter((item) => item);
        const data = `{"${wifiItem.join('","')}"}`;

        return JSON.parse(data);
    });
    renderWifi(listWifi);
}

let nameWifi;
const passwordWifi = $("#password-wifi");
const formPassword = $(".form-enter-password");

function renderWifiConnected(wifi) {
    $(".wifi-connected").innerText = wifi.ssid;
    //
    let speed;
    if (parseInt(wifi.signal) > 66) {
        speed = "height";
    } else if (parseInt(wifi.signal) > 33) {
        speed = "medium";
    } else {
        speed = "low";
    }

    $(".wifi-icon-connected").id = speed;
}

function renderWifi(wifi) {
    loading(".wifi-wrapper");
    const htmlWifi = [];

    wifi.map((item) => {
        let wifiItem;

        const lockWifi = {
            lock: '<i class="fa-solid fa-lock"></i>',
            open: '<i class="fa-solid fa-lock-open"></i>',
        };

        if (item.active === "yes") {
            renderWifiConnected(item);
        } else {
            wifiItem = `
            <div class="w-full h-[60px] border-b border-[rgba(67,67,67,0.1)] flex justify-between items-center hover:bg-[#cccccc39] cursor-pointer wifi-item"
            name-wifi="${item.ssid}">
            <span class="font-bold ml-4">${item.ssid}</span>
    
            <div class="text-2xl flex items-center pr-4">
                <div class="mr-2">
                ${item.security ? lockWifi.lock : lockWifi.open}
                </div>
                <div class="">
                ${wifiIcon(item.signal)}
                </div>
            </div>
        </div>
            `;
        }

        htmlWifi.push(wifiItem);
        return htmlWifi;
    });
    $(".wifi-wrapper").innerHTML = htmlWifi.join("");
    showPasswordWifi();
    handleConnectWifi();
    handleCancelWifi();
    loaded(".wifi-wrapper");
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

        sendWifi(nameWifi, password)
        formPassword.classList.add("hidden");
        $(".overlay").classList.add("hidden");

        passwordWifi.value = "";
        $(".connect-wifi-btn").setAttribute("disabled", true);



        loading(".wifi-container");
        setTimeout(() => {
            loaded(".wifi-container");
        }, 1000);
    };
}

$(".show-password-btn").onclick = (e) => {
    const typeInputPass = passwordWifi.getAttribute("type");
    e.target.classList.toggle("active");
    passwordWifi.setAttribute(
        "type",
        typeInputPass === "text" ? "password" : "text"
    );
};


function sendWifi(nameWifi, password) {
    const robot = robotActive()
    publishTopicString(`/${robot}/new_connect_wifi`, `${nameWifi}|${password}`)
}