import { toggerMessage } from "../main.js";
import { robotActive } from "../mainLayout.js";
import publishTopicString from "../rosModule/topicString.js";
import publishTopic from "../rosModule/pubicTopic.js";
import { $, $$ } from "../main.js";

handleRenderSound();

function handleRenderSound() {
    const pathSound = JSON.parse(document.querySelector(".pathSound").value);
    renderSound(pathSound);
    handleActionSound();
    setTimeSound();
    handleSendSound();
    actionBtn();
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

    $("#table-sound").innerHTML = $("#table-sound").innerHTML += html.join("");
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
            const nameSound = src.slice(src.lastIndexOf("/") + 1, src.length);

            const nameRobotActive = $("#robot-sound").value;

            if (!nameRobotActive) {
                toggerMessage("error", "Please choose robot!");
            } else {
                publishTopicString(
                    `/${nameRobotActive}/music_name`,
                    hrefSource
                );
                console.log(hrefSource);
                toggerMessage(
                    "success",
                    `${nameSound} sound sent successfully`
                );
            }
        };
    });
}

function secondToMinute(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return [("0" + minutes).slice(-2), ("0" + seconds).slice(-2)];
}

function actionBtn() {
    $(".stop-sound-btn").onclick = () => {
        const nameRobotActive = $("#robot-sound").value;

        if (!nameRobotActive) {
            toggerMessage("error", "Please choose robot!");
        } else {
            publishTopic(
                `/${nameRobotActive}/music_start`,
                0.0,
                "std_msgs/Float32"
            );
            toggerMessage("success", `successfully`);
        }
    };

    $(".basic-sound-btn").onclick = () => {
        const nameRobotActive = $("#robot-sound").value;

        if (!nameRobotActive) {
            toggerMessage("error", "Please choose robot!");
        } else {
            publishTopic(
                `/${nameRobotActive}/music_start`,
                3.0,
                "std_msgs/Float32"
            );
            toggerMessage("success", `successfully`);
        }
    };

    $(".custom-sound-btn").onclick = () => {
        const nameRobotActive = $("#robot-sound").value;

        if (!nameRobotActive) {
            toggerMessage("error", "Please choose robot!");
        } else {
            publishTopic(
                `/${nameRobotActive}/music_start`,
                4.0,
                "std_msgs/Float32"
            );
            toggerMessage("success", `successfully`);
        }
    };
}

$("#sound-file").onchange = (e) => {
    const pathSound = e.target.value;

    const name = pathSound.slice(
        pathSound.lastIndexOf(`\\`) + 1,
        pathSound.length
    );

    $(".name-sound-up").innerText =
        name.length > 20
            ? name.slice(0, 10) +
              "..." +
              name.slice(name.length - 10, name.length)
            : name;

};
