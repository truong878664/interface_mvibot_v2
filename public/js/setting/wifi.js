import dispatchEvent from "../functionHandle/dispatchEvent.js";
import { loaded, loading } from "../functionHandle/displayLoad.js";
import { $, $$ } from "../main.js";
import { robotActive } from "../mainLayout.js";
import subscribeTopic from "../rosModule/subscribeTopic.js";
import publishTopicString from "../rosModule/topicString.js";
import getIp from "./getIp.js";

let nameWifi;
const passwordWifi = $("#password-wifi");
const formPassword = $(".form-enter-password");

let isValidName = false;
let isValidPass = false;

export default function wifi() {
    resetWifi();
    subscribeTopicWifi();
    otherWifi();
    handleChangeWifi();
    handleConnectWifi();
}

export function renderTypeWifi(data) {
    const { wifi_type } = data;
    const idWifiType = wifi_type === "hots_pot" ? "hots-pot" : "wifi-connect";
    const wifiTypeElement = document.querySelector("#" + idWifiType);
    wifiTypeElement.checked = true;
    $("[data-wifi-connect]").dataset.wifiConnect = wifi_type;
    dispatchEvent({ event: "change", element: wifiTypeElement });
}

function handleChangeWifi() {
    const switchType = $$("[name=wifi-type]");
    switchType.forEach((element) => {
        element.addEventListener("change", (e) => {
            const currentTypeWifi = e.target.id;
            $(".wifi-container").dataset.wifiConnect = currentTypeWifi;
        });
    });
    $("[name=wifi-type]#hots-pot").addEventListener("input", (e) => {
        if (!e.target.checked) return;
        const robot = robotActive();
        publishTopicString(`/${robot}/set_config`, "(wifi_type|hots_pot)");
    });
}

// setInterval(() => {
//     publishTopicString(
//         "/Mb23_946/robot_list_wifi",
//         "(~ssid=Tenda_MB22_916b~~signal=100~~active=no~~security=WPA1 WPA2~)(~ssid=Tenda_MB22_916b_5G~~signal=100~~active=no~~security=WPA1\
//          WPA2~)(~ssid=MVP_GUEST~~signal=50~~active=no~~security=~)(~ssid=Mb23_946~~signal=49~~active=yes~~security=WPA2~)(~ssid=IOT\
//          System~~signal=45~~active=no~~security=WPA2~)(~ssid=CS_NM1~~signal=45~~active=no~~security=WPA2~)(~ssid=MARUEI\
//          VIP~~signal=37~~active=no~~security=WPA2~)(~ssid=MVP_OFFICE~~signal=37~~active=no~~security=WPA2~)(~ssid=MVP~~signal=25~~active=no~~security=WPA2\
//          802.1X~)"
//     );

//     publishTopicString(
//         "/Mb23_94/robot_list_wifi",
//         "(~ssid=Tenda_MB22_916b~~signal=100~~active=no~~security=WPA1 WPA2~)(~ssid=Tenda_MB22_916b_5G~~signal=100~~active=no~~security=WPA1\
//          WPA2~)(~ssid=MVP_GUEST~~signal=50~~active=no~~security=~)(~ssid=Mb23_94~~signal=90~~active=yes~~security=WPA2~)(~ssid=IOT\
//          System~~signal=45~~active=no~~security=WPA2~)(~ssid=CS_NM1~~signal=45~~active=no~~security=WPA2~)(~ssid=MARUEI\
//          VIP~~signal=37~~active=no~~security=WPA2~)(~ssid=MVP_OFFICE~~signal=37~~active=no~~security=WPA2~)(~ssid=MVP~~signal=25~~active=no~~security=WPA2\
//          802.1X~)"
//     );
// }, 1000);

let dataWifiScan;
let timeoutWifi;
function subscribeTopicWifi() {
    $$(".name-robot").forEach((element) => {
        const robot = element.value;
        subscribeTopic(
            `${robot}/robot_list_wifi`,
            "std_msgs/String",
            (data, nameTopic) => {
                const nameRobotActive = robotActive();
                const robotPub = nameTopic.slice(0, nameTopic.indexOf("/", 2));
                if (nameRobotActive !== robotPub) {
                    return;
                }
                clearTimeout(timeoutWifi);
                timeoutWifi = setTimeout(() => {
                    removeWifi();
                }, 2000);
                // dataWifiScan = "";

                dataWifiScan !== data.data && parseWifi(data.data);
                dataWifiScan = data.data;
            }
        );
    });
}

function parseWifi(data) {
    const arrayWifi = data
        .slice(1, data.length - 1)
        .replaceAll("\\", " ")
        .replaceAll("  ", "")
        .replaceAll("=", '":"')
        .split(")(");

    const listWifi = arrayWifi.map((wifi) => {
        const wifiItem = wifi.split("~").filter((item) => item);
        const data = `{"${wifiItem.join('","')}"}`;

        return JSON.parse(data);
    });
    renderWifi(listWifi);
}

function renderWifiConnected(wifi) {
    const WIFI_HEIGH = 66;
    const WIFI_MEDIUM = 33;

    $(".wifi-connect-item").classList.remove("hidden");
    $(".wifi-connected").innerText = wifi.ssid;

    const speed =
        parseInt(wifi.signal) > WIFI_HEIGH
            ? "height"
            : parseInt(wifi.signal) > WIFI_MEDIUM
            ? "medium"
            : "low";

    $(".wifi-icon-connected").id = speed;
}

function renderWifi(wifi) {
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
            <div security="${item.security ? "lock" : "open"}"
                class="w-full h-[60px] border-b border-[rgba(67,67,67,0.1)] flex justify-between items-center hover:bg-[#cccccc39] cursor-pointer wifi-item" name-wifi="${
                    item.ssid
                }">
                <span class="font-bold ml-4">${item.ssid}</span>
                <div class="text-2xl flex items-center pr-4">
                    <div class="mr-2"> ${
                        item.security ? lockWifi.lock : lockWifi.open
                    } </div>
                    <div class="">${wifiIcon(item.signal)}</div>
                </div>
            </div>
            `;
        }

        htmlWifi.push(wifiItem);
        return htmlWifi;
    });

    $(".wifi-wrapper").innerHTML = htmlWifi.join("");
    showPasswordWifi();
    handleHideFormWifi();
}

const overlay = $(".overlay-wifi");
function showPasswordWifi() {
    $(".wifi-wrapper").onclick = (e) => {
        const wifiItem = e.target.closest(".wifi-item");
        if (!wifiItem) {
            return;
        }
        nameWifi = wifiItem.getAttribute("name-wifi");
        $(".label-wifi").textContent = `for "${nameWifi}"`;
        $("#name-wifi").value = nameWifi;
        formPassword.classList.remove("hidden");
        overlay.classList.remove("hidden");
        if (wifiItem.getAttribute("security") !== "lock") {
            $(".connect-wifi-btn").removeAttribute("disabled");
        } else {
            passwordWifi.focus();
        }
    };

    $(".show-password-btn").onclick = (e) => {
        const typeInputPass = passwordWifi.getAttribute("type");
        e.target.classList.toggle("active");
        passwordWifi.setAttribute(
            "type",
            typeInputPass === "text" ? "password" : "text"
        );
    };
}

handleHideFormWifi();
validConnect();

function handleConnectWifi() {
    $(".connect-wifi-btn").onclick = () => {
        const wifi_ssid = $("#name-wifi").value;
        const wifi_password = passwordWifi.value;
        const wifi_type = $("[name=wifi_type]:checked").value;
        const wifi_ipv4 = getIp({ element: ".wifi_ipv4" });
        const wifi_ipv4_gateway = getIp({ element: ".wifi_ipv4_gateway" });
        const wifi_ipv4_dns = $(".wifi_ipv4_dns").value;

        const dataWifi =
            wifi_type === "auto"
                ? {
                      wifi_ssid,
                      wifi_password,
                      wifi_type,
                  }
                : {
                      wifi_ssid,
                      wifi_password,
                      wifi_type,
                      wifi_ipv4,
                      wifi_ipv4_gateway,
                      wifi_ipv4_dns,
                  };

        sendWifi(dataWifi);
        hideFormWifi();
    };
}


function validConnect() {
    $("#name-wifi").oninput = (e) => {
        isValidName = e.target.value.length > 0;
        console.log(isValidName);
        isValidName
            ? $(".connect-wifi-btn").removeAttribute("disabled")
            : $(".connect-wifi-btn").setAttribute("disabled", true);
    };
    passwordWifi.oninput = (e) => {
        isValidPass = e.target.value.length >= 8 ||  e.target.value.length == 0;

        const isValid = isValidPass && (isValidName || $("#name-wifi").value);
        isValid
            ? $(".connect-wifi-btn").removeAttribute("disabled")
            : $(".connect-wifi-btn").setAttribute("disabled", true);
    };
}

function sendWifi(dataWifi) {
    loading(".wifi-wrapper");
    const robot = robotActive();
    const wifiTopic = [];
    for (const key in dataWifi) {
        wifiTopic.push(`(${key}|${dataWifi[key]})`);
    }
    publishTopicString(`/${robot}/set_config`, wifiTopic.join(""));
    resetFormWifi();
    setTimeout(() => {
        loaded(".wifi-wrapper");
    }, 2000);
}

function wifiIcon(signal) {
    let speed;
    if (parseInt(signal) > 66) {
        speed = "height";
    } else if (parseInt(signal) > 33) {
        speed = "medium";
    } else {
        speed = "low";
    }

    return `<svg width="40" height="40" viewBox="0 0 40 20" fill="none" id="${speed}" xmlns="http://www.w3.org/2000/svg">
    <circle class="low medium height" fill="#9a9a9a" cx="19.9849" cy="16.9683" r="2.85505" />
        <path class="height medium" fill="#9a9a9a"
            d="M28.5102 12.3681C29.0941 11.8562 29.1572 10.9611 28.5843 10.437C27.5973 9.5341 26.4726 8.78972 25.2497 8.23339C23.5992 7.4825 21.8079
             7.09138 19.9946 7.08599C18.1814 7.08061 16.3877 7.46109 14.7328 8.20216C13.5067 8.75121 12.3775 9.4889 11.3852 10.3859C10.8091 10.9067
              10.8669 11.802 11.4478 12.3174V12.3174C12.0286 12.8329 12.9117 12.7708 13.5036 12.2681C14.2199 11.66 15.0203 11.1546 15.8821 10.7687C17.1729
               10.1907 18.5719 9.89388 19.9863 9.89808C21.4006 9.90228 22.7978 10.2074 24.0852 10.793C24.9447 11.1841 25.7421 11.6942 26.4547 12.3066C27.0436
                12.8127 27.9263 12.8801 28.5102 12.3681V12.3681Z" />
        <path class="height" fill="#9a9a9a"
            d="M33.7825 7.51599C34.3573 6.99541 34.4044 6.10346 33.8448 5.56666C32.171 3.96105 30.2278 2.65629 28.1007 1.71396C25.5448 0.58174 22.7801 -0.00213281
         19.9847 5.85337e-06C17.1893 0.00214452 14.4255 0.590247 11.8714 1.72637C9.74564 2.67196 7.80452 3.97969 6.13312 5.58786C5.57433 6.12552 5.62286
          7.01739 6.19839 7.5371V7.5371C6.77392 8.0568 7.65805 8.00678 8.22297 7.47557C9.62704 6.15529 11.2457 5.07815 13.0127 4.29213C15.2082 3.31552
           17.584 2.80999 19.9868 2.80815C22.3897 2.80632 24.7663 3.30821 26.9633 4.28145C28.7315 5.06477 30.3518 6.13943 31.7578 7.45756C32.3236
            7.98791 33.2078 8.03657 33.7825 7.51599V7.51599Z" />
    </svg>`;
}

function removeWifi() {
    $$(".wifi-item").forEach((element) => {
        element.remove();
    });
    $(".wifi-connect-item").classList.add("hidden");
    dataWifiScan = "";
}

function resetWifi() {
    let timeOut;
    $(".reset-wifi-btn").onclick = (e) => {
        loadingWifi(true);
        // /MB/scan_wifi string '2'
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            loadingWifi(false);
        }, 4000);

        // /name_seri/scan_wifi
        const robot = robotActive();
        publishTopicString(`/${robot}/scan_wifi`, "1");
    };
}

const loaderWifi = $(".loader-wifi");
function loadingWifi(load) {
    loaderWifi.classList.toggle("hidden", !load);
}

function otherWifi() {
    $(".other-wifi-btn").onclick = (e) => {
        formPassword.classList.remove("hidden");
        overlay.classList.remove("hidden");
        $(".name-wifi-wrapper").classList.remove("hidden");
    };
}

function handleHideFormWifi() {
    $(".cancel-wifi-btn").onclick = hideFormWifi;
}

function hideFormWifi() {
    formPassword.classList.add("hidden");
    overlay.classList.add("hidden");
    $(".name-wifi-wrapper")?.classList.add("hidden");
    $(".label-wifi").textContent = "";
    $("#name-wifi").value = "";
    $(".connect-wifi-btn").setAttribute("disabled", true);
    $("#password-wifi").value = "";
}

const PUB_WIFI = `rostopic pub /Mb23_946/robot_list_wifi std_msgs/String "data: '(~ssid=hitech_router~~signal=82~~active=yes~~security=WPA1 WPA2~)(~ssid=MViBot_server~~signal=37~~active=no~~security=WPA2~)(~ssid=MARUEI\ \ VIP~~signal=35~~active=no~~security=WPA2~)(~ssid=MVP_OFFICE~~signal=35~~active=no~~security=WPA2~)(~ssid=MVP_GUEST~~signal=34~~active=no~~security=~)'" -r 1`;

function resetFormWifi() {
    $$(".wifi_ipv4").forEach((element, index) => {
        element.value = "";
        $$(".wifi_ipv4_gateway")[index].value = "";
    });
    $(".wifi_ipv4_dns").value = "";
    const inputWifiAuto = $("#wifi-auto");
    inputWifiAuto.checked = true;
    dispatchEvent({ event: "change", element: inputWifiAuto });
}
