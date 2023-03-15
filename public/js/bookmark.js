const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export default function bookmark() {
    handleAddBookmark();
    const dataBookmark = JSON.parse(localStorage.getItem("bookmarks"));
    renderBookmark(dataBookmark);
    checkIsBookmark(dataBookmark);
}

function handleAddBookmark() {
    $(".bookmark-btn").onclick = (e) => {
        const isActiveBookmark = e.target.dataset.bookmark === "active";
        e.target.dataset.bookmark = isActiveBookmark ? "" : "active";
        const pathName = location.pathname + location.search;
        const dataBookmark = {
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
            name: 'Mvibot',
            icon: "fa-solid fa-book-bookmark",
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

    data.map((item) => {
        htmlBookmark.push(
            `
                <li class=" mt-6 mx-2 py-2 w-[80%] min-h-[60px]  rounded-lg btn bg-[#cccccc40] last:mb-[100px] shadow-sm shadow-[#ccc] hover:shadow-md">
                <a href="${
                    origin + item.link
                }" class="flex flex-col items-center h-full">
                    <div class="leading-[0px] icon-bookmark" style="color:${
                        item.color
                    }">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="w-full flex-1 flex justify-center items-center">
                        <p class="text-base text-center text-clamp-2">${
                            item.name
                        }</p>
                    </div>
                </a>
                </li>
                `
        );

        return htmlBookmark;
    });
    $(".bookmark-wrapper").innerHTML = htmlBookmark.join("");
}
function checkIsBookmark(data) {
    const pathName = location.pathname;
    const isBookmark = !!data.find((item) => item.link === pathName);
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
