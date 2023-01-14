import { loaded, loading } from "./displayLoad.js";

export default function updateStepValue(id) {
    loading();
    fetch(`/api/mi/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ method: "update-step-value" }),
    })
        .then(function (res) {
            loaded();
            res.status == 200 || console.log("update step error");
            return res.json();
        })
        .then((data) => console.log(data))

        .catch(function (res) {
            console.log(res);
        });
}
