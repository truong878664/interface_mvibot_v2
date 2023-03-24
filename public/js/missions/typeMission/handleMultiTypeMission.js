import confirmationForm from "../../functionHandle/confirmationForm.js";
import fetchCustom from "../../functionHandle/fetchCustom.js";
import { toggerMessage } from "../../main.js";
import dbDelete from "../functionHandle/dbDelete.js";
import { renderBlockStep } from "../handleStepMission.js";
import handleRenderTypeMission from "./handleRenderTypeMission.js";

export default function handleMultiTypeMission() {
    checkAllTypeMission();
    handleCheckAll();
    handleDeleteMultiTypeMission();
    handleCopyTypeMission();
}

function checkAllTypeMission() {
    $$(".check-all-input-type-mission").forEach((element) => {
        element.addEventListener("change", handleCheck);
    });

    function handleCheck(e) {
        const isCheckAll = e.target.checked;
        const type = e.target.dataset.type;
        check(
            $$(`[data-select-type-mission-id][data-type=${type}`),
            isCheckAll
        );

        function check(data, isCheckAll) {
            data.forEach((item) => (item.checked = isCheckAll));
        }
    }
}

function handleCheckAll() {
    $$(`[data-select-type-mission-id]`).forEach((element) => {
        element.onchange = (e) => {
            const type = e.target.dataset.type;
            isCheckAll(type);
        };
    });
    function isCheckAll(type) {
        const itemChecked = $$(
            `.type-mission-item-select[data-type=${type}]:checked`
        );
        const itemAll = $$(`.type-mission-item-select[data-type=${type}]`);

        $(`.check-all-input-type-mission[data-type=${type}`).checked =
            itemChecked.length === itemAll.length;
    }
}

function getItemChecked(type) {
    const idSelect = [];
    $$(`.type-mission-item-select[data-type=${type}]:checked`).forEach(
        (item) => {
            idSelect.push(item.dataset.selectTypeMissionId);
        }
    );
    return idSelect;
}

function handleDeleteMultiTypeMission() {
    const deleteBtns = $$(".delete-multi-type-mission-btn");
    console.log(deleteBtns);
    deleteBtns.forEach((element) => {
        element.onclick = (e) =>
            confirmationForm({
                message: "Do you want to delete these items?",
                callback: () => deleteFunction(e),
            });
    });

    function deleteFunction(e) {
        const type = e.target.closest("[data-type]").dataset.type;
        const idSelects = getItemChecked(type);
        removeFunctionChecked(type);
        fetchCustom(
            `/api/type-mission/delete`,
            "DELETE",
            (data) => {
                toggerMessage("success", data.message);
                renderBlockStep(true);
            },
            { deletes: idSelects, method: "multi" }
        );

        $(`.check-all-input-type-mission[data-type=${type}`).checked = false;
    }
    function removeFunctionChecked(type) {
        $$(`.type-mission-item-select[data-type=${type}]:checked`).forEach(
            (item) => {
                item.closest(".type-mission-item").remove();
            }
        );
    }
}

function handleCopyTypeMission() {
    const copyBtns = $$(".copy-multi-type-mission-btn");
    copyBtns.forEach((element) => {
        element.onclick = copyFunction;
    });
    function copyFunction(e) {
        const type = this.dataset.type;
        const idSelects = getItemChecked(type);
        console.log(idSelects);

        fetchCustom(
            `/api/type-mission`,
            "POST",
            (data) => {
                handleRenderTypeMission();
            },
            { idSelects, method: "multi" }
        );

        $(`.check-all-input-type-mission[data-type=${type}`).checked = false;
    }
}
