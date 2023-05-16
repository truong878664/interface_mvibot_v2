export default function dispatchEvent({ event, element }) {
    let e = new Event(event);
    element?.dispatchEvent(e);
}
