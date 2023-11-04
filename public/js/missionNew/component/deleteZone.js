export default function deleteZone() {
    const HTMLDivElement = document.createElement("div");
    const div = document.createElement("div");
    div.innerHTML = `
    <div id="delete-zone" data-status="" class="group w-[30px] z-1 aspect-square rounded-full bg-red-300 text-white absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all grid place-content-center data-[status='active']:w-[60px] data-[status='active']:">
        <i class="fa-regular fa-trash-can group-data-[status='']:[animation-play-state:paused] fa-bounce "></i>
    </div>`;

    return div.firstElementChild;
}
