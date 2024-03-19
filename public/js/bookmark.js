const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const iconBookmark = {
    home: "fa-solid fa-house",
    dashboard: "fa-solid fa-gamepad",
    user: "fa-solid fa-user-gear",
    mission: "fa-solid fa-crosshairs",
    tracking_mission: "fa-solid fa-circle-right",
    select_mission: "fa-solid fa-circle-right",
    map: "fa-solid fa-map-location-dot",
    status: "fa-solid fa-gauge-high",
    status_detail: "fa-solid fa-signal",
    joystick: "fa-solid fa-up-down-left-right",
    mapping: "fa-solid fa-map",
    localization: "fa-solid fa-location-dot",
    gpio: "fa-solid fa-toggle-on",
    sound: "fa-solid fa-volume-high",
    setting: "fa-solid fa-gear",
    other: "fa-solid fa-book-bookmark",
};

export default function bookmark() {
    handleAddBookmark();
    const dataBookmark = JSON.parse(localStorage.getItem("bookmarks"));
    renderBookmark(dataBookmark);
    checkIsBookmark(dataBookmark);
}

function handleAddBookmark() {
    $(".bookmark-btn").onclick = (e) => {
        const title = document.title;

        const isActiveBookmark = e.target.dataset.bookmark === "active";
        e.target.dataset.bookmark = isActiveBookmark ? "" : "active";
        const pathName = location.pathname + location.search;
        const nameBookmark = title.slice(title.indexOf("|") + 1, title.length);
        const nameBookmarkChange = nameBookmark
            .trim()
            .toLowerCase()
            .replaceAll("-", "_")
            .replaceAll(" ", "_");
        console.log();
        const dataBookmark = {
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
            name: nameBookmark || "Mvibot",
            icon: iconBookmark[nameBookmarkChange] || iconBookmark.other,
            link: pathName,
        };
        !isActiveBookmark
            ? saveBookmark(dataBookmark)
            : deleteBookmark(pathName);

        !isActiveBookmark && getBookmark();
    };
}

function saveBookmark(data) {
    fetch("/api/bookmark", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
}

export function getBookmark() {
    fetch("/api/bookmark")
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("bookmarks", JSON.stringify(data));
            renderBookmark(data);
            checkIsBookmark(data);
        });
}

function renderBookmark(data) {
    const htmlBookmark = [];
    const origin = location.origin;

    data?.map((item) => {
        htmlBookmark.push(
            `
            <a href="${origin + item.link}">
                <li class="w-full flex flex-col justify-evenly min-h-[3.5rem] items-center rounded-lg btn bg-stone-200 shadow lowercase py-1">
                    <span
                        class="leading-none"
                        style="color:${item.color}">
                            <i class="${item.icon}"></i>
                    </span>
                    <span class="text-xs text-center text-clamp-2 text-slate-500 capitalize">
                        ${item.name}
                    </span>
                </li>
            </a>
            `,
        );

        return htmlBookmark;
    });
    $(".bookmark-wrapper").innerHTML = htmlBookmark.join("");
}
function checkIsBookmark(data) {
    const pathName = location.pathname + location.search;
    const isBookmark = !!data?.find((item) => item.link === pathName);
    isBookmark && ($(".bookmark-btn").dataset.bookmark = "active");
}

function deleteBookmark(pathName) {
    fetch("/api/bookmark/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ pathName }),
    })
        .then((res) => res.json())
        .then((data) => getBookmark());
}
