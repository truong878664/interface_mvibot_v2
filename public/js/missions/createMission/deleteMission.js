import { getBookmark } from "../../bookmark.js";
import { $$ } from "../../main.js";
import dbDelete from "../functionHandle/dbDelete.js";
import fetchApi from "./fetchApi.js";

export default function handleDeleteMission() {
    $$(".delete-mission-btn").forEach((element) => {
        element.addEventListener("click", deleteMission);
    });
}

function deleteMission(e) {
    e.preventDefault();
    dbDelete(e.target, () => {
        handleDelete(e);
    });
    function handleDelete(e) {
        const idDelete = e.target.dataset.id;
        fetchApi(
            "/api/mi/delete",
            "DELETE",
            {
                method: "delete",
                idDelete: idDelete,
            },
            (data) => {
                if (data.deleted) {
                    e.target.closest(".create-misisons-item").remove();
                    getBookmark();
                }
            }
        );
    }
}
