export default function setSound() {
    // $$(".sound-btn").forEach((element) => {
    //     element.onclick = (e) => {
    //         $(".sound-btn.active")?.classList.remove("active");
    //         e.target.classList.toggle("active");
    //         e.target.getAttribute("type") == "start" &&
    //             $(".mode-sound").classList.toggle("hidden");
    //         e.target.getAttribute("type") == "stop" &&
    //             $(".mode-sound").classList.add("hidden");
    //     };
    // });

    // $$(".mode-music-btn").forEach((element) => {
    //     element.onclick = (e) => {
    //         $(".sound-start-btn").setAttribute(
    //             "data-mode",
    //             e.target.getAttribute("mode")
    //         );
    //         $(".mode-sound").classList.add("hidden");

    //         const color = getComputedStyle(e.target).backgroundColor;
    //         $(".sound-start-btn").setAttribute("style", `--color: ${color};`);
    //     };
    // });

    $('.sound-list').addEventListener('click' , handleSetSound)
    function handleSetSound (e) {
        const soundItem = e.target.closest('.sound-item')
        if(!soundItem) return;
        $('.sound-item.active')?.classList.remove('active')
        soundItem.classList.add('active')
    }
}