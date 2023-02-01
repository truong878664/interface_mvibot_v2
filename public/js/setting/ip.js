import { $ } from "../main.js";

const ipLocal = localStorage.getItem("ip");

if(ipLocal) {
    $(".address-ip").value = ipLocal
} else {
    $(".address-ip").value = '127.0.1.1'
    localStorage.setItem("ip", '127.0.1.1');
}

$(".set-ip-master-btn").onclick = () => {
    const ip = $(".address-ip").value;
    localStorage.setItem("ip", ip);

    console.log(localStorage.getItem("ip"));
};
