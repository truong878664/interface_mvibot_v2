import confirmationForm from "../../functionHandle/confirmationForm.js";
import { $, $$, toggerMessage } from "../../main.js";
import fetchApi from "./fetchApi.js";

export default function handleDeleteMultiMission() {
    $(".delete-btn").onclick = () => {
        confirmationForm({
            message: "Do you want to delete these missions?",
            callback: deleteMulti,
        });
    };
    function deleteMulti() {
        const idDelete = [];
        const versionMission =
            document.querySelector("[data-version]").dataset.version;
        $$(".select-mission").forEach((element) => {
            if (element.checked) {
                idDelete.push(element.value);
                element.closest(".create-misisons-item").remove();
            }
        });
        fetchApi(
            "/api/mi/delete-multi",
            "DELETE",
            {
                method: "delete",
                idDelete: idDelete,
                version: versionMission,
            },
            checkDelete
        );

        function checkDelete(data) {
            if (data.status == 200) {
                toggerMessage("success", data.message);
            } else {
                toggerMessage("error", data.message);
            }
        }
    }
}
