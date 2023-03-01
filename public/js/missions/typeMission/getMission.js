export default function getMission(id, callback) {
    fetch(`/api/type-mission/${id}`)
        .then((res) => res.json())
        .then((data) => callback(data));
}