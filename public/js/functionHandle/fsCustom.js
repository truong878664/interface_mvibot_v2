export const getNodeByName = (name) => {
    return document.querySelector(`[data-name='${name}']`);
};
export const getNode = document.querySelector.bind(document);
export const getNodeList = document.querySelectorAll.bind(document);
