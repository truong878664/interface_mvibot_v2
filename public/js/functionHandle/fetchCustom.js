import { loaded, loading } from "./displayLoad.js";

export default function fetchCustom(
    url,
    method = "POST",
    callback = () => {},
    data
) {
    loading();
    fetch(url, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            callback(data);
            loaded()
        })
        .catch(function (res) {});
}


