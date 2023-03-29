import { loadDataFunction } from "../handleTypeMission.js";

export default function saveFunctionItem(type, data) {
    fetch(`/api/${type}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            $(".function-item-form-wrapper").click();
            loadDataFunction();
        }) 
        .catch(function (res) {
            console.log(res);
        });
}
