const sendMissionBtn = $("label[for=select-robot]");

export function loading(element = '.step-render') {
    $(element).querySelector(".loader-wrapper")?.remove();

    const loadedWrapper =  document.createElement('div')
    loadedWrapper.classList.add('loader-wrapper')
    loadedWrapper.innerHTML = '<span class="loader"></span>'

    $(element).appendChild(loadedWrapper);
}
export function loaded(element = '.step-render') {
    setTimeout(() => {
        $(element).querySelector(".loader-wrapper")?.remove();
    }, 600) 
}


