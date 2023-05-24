import { loaded, loading } from "../../functionHandle/displayLoad.js";

export default function getTypeMission(id, callback) {
    loading();
    fetch(`/api/type-mission/${id}`)
        .then((res) => res.json())
        .then((data) => {
            callback(data);
            loaded();
        });
}
