export default function translatesStepsMission(id) {
    fetch(`/api/mi/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Types": "application/json",
        },
        body: JSON.stringify({ method: "update-type-mission" }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
}
