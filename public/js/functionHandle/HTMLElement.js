export default class HTMLElement {
    _node;
    constructor(tag) {
        this._node = document.createElement(tag);
    }
    get node() {
        return this._node;
    }
    props(attributesList) {
        const { id, className, children, ...restAttributesList } =
            attributesList;

        for (const attributes in restAttributesList) {
            Object.assign(
                this._node[attributes],
                restAttributesList[attributes],
            );
        }
        id && (this._node.id = id);
        className && (this._node.className = className);

        if (typeof children === "string" || typeof children === "number") {
            this._node.innerHTML = children;
        } else {
            children && this._node.append(...children);
        }

        return this._node;
    }
}
