import { loaded, loading } from "../../functionHandle/displayLoad.js";
import { toggerMessage } from "../../main.js";
import renderBlockStep from "./renderBlockStep.js";

export default function updateBlockStep(id, data, isRender = true) {
    isRender  && loading()
    fetch(`/api/mi/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            isRender && renderBlockStep();
            toggerMessage("success", data.message);
            isRender && loaded()
        })
        .catch((data) => console.log(data));
}
