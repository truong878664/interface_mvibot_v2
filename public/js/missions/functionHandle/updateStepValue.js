import { loaded, loading } from "../../functionHandle/displayLoad.js";

export default function updateStepValue(id) {
    fetch(`/api/mi/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ method: "update-step-value" }),
    })
        .then(function (res) {
            res.status == 200 || console.log("update step error");
            return res.json();
        })
        .then((data) => console.log(data))

        .catch(function (res) {
            console.log(res);
        });
}
