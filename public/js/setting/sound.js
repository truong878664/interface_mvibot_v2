import { $, $$, toggerMessage } from "../main.js";
import publishTopic from "../rosModule/topicString.js";

handleRenderSound();

function handleRenderSound() {
    getPathSound();
    const pathSound = JSON.parse(document.querySelector(".pathSound").value);
    renderSound(pathSound);
    handleActionSound();
    setTimeSound();

    handleSendSound();
}

function renderSound(pathSound) {
    let i = 1;
    const html = [];
    pathSound.map((item) => {
        const nameSound = item.slice(item.indexOf("/") + 1, item.length);

        return html.push(`
        <tr class="text-center sound-item">
            <td class="border border-solit border-[#ccc]">${i++}</td>
            <td class="border border-solit border-[#ccc]">${nameSound}
                <audio class="sound-${nameSound} audio-item">
                    <source src="/${item}" type="audio/mpeg" class="source-sound">
                </audio>
            </td>
            <td class="border border-solit border-[#ccc] time-sound">00:00</td>
            <td class="border border-solit border-[#ccc]">
                <button
                    class="text-2xl h-[30px] w-[30px] text-center leading-[30px] m-2 bg-white hover:bg-main btn rounded-md hover:bg-[#e0e0e0] play-sound-btn">
                    <i class="fa-solid fa-play"></i>
                </button>
                
                <button
                    class="text-2xl h-[30px] w-[30px] text-center leading-[30px] m-2 bg-white hover:bg-main btn rounded-md hover:bg-[#e0e0e0] send-sound-btn">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>

            </td>
        </tr>`);
    });
    const tr = ` <tr class="text-center">
                    <th class="border border-solit border-[#ccc] py-2">STT</th>
                    <th class="border border-solit border-[#ccc] py-2">Name</th>
                    <th class="border border-solit border-[#ccc] py-2">Time</th>
                    <th class="border border-solit border-[#ccc] py-2">Action</th>
                </tr>`;
    $("#table-sound").innerHTML = tr + html.join("");
}

function setTimeSound() {
    $$(".audio-item").forEach((item) => {
        item.onloadedmetadata = () => {
            const time = item.duration;
            const [minutes, seconds] = secondToMinute(time);

            item
                .closest(".sound-item")
                .querySelector(
                    ".time-sound"
                ).innerText = `${minutes}:${seconds}`;
        };
        item.ontimeupdate = () => {
            const time = item.duration - item.currentTime;
            const [minutes, seconds] = secondToMinute(time);
            item
                .closest(".sound-item")
                .querySelector(
                    ".time-sound"
                ).innerText = `${minutes}:${seconds}`;
        };
    });
}

function handleActionSound() {
    const playSoundBtns = $$(".play-sound-btn");
    let isPlay = false;
    for (let i = 0; i < playSoundBtns.length; i++) {
        playSoundBtns[i].onclick = (e) => {
            $$(".audio-item").forEach((item, index) => {
                if (isPlay) {
                    item.pause();
                    $$(".play-sound-btn")[index].innerHTML =
                        '<i class="fa-solid fa-play"></i>';
                }
            });

            isPlay ? pause(e) : play(e);
        };
    }

    function play(e) {
        e.target.closest(".sound-item").querySelector(".audio-item").play();
        e.target.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isPlay = true;
    }

    function pause(e) {
        e.target.closest(".sound-item").querySelector(".audio-item").pause();
        e.target.innerHTML = '<i class="fa-solid fa-play"></i>';
        isPlay = false;
    }
}

function handleSendSound() {
    $$(".send-sound-btn").forEach((element) => {
        element.onclick = (e) => {
            const src = e.target
                .closest(".sound-item")
                .querySelector(".source-sound")
                .getAttribute("src");
            const hrefSource = window.location.origin + src;
            const nameSound = src.slice(src.lastIndexOf('/')+1, src.length)
            console.log(hrefSource);

            publishTopic("nametopic", hrefSource);
            toggerMessage('success',  `${nameSound} sound sent successfully`)
        };
    });
}

function secondToMinute(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return [("0" + minutes).slice(-2), ("0" + seconds).slice(-2)];
}

