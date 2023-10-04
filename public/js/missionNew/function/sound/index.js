export default function sound() {
    $('.sound-list').addEventListener('click' , handleSetSound)
    function handleSetSound (e) {
        const soundItem = e.target.closest('.sound-item')
        if(!soundItem) return;
        $('.sound-item.active')?.classList.remove('active')
        soundItem.classList.add('active')
    }
}