import confirmationForm from "../../functionHandle/confirmationForm.js";
import fetchCustom from "../../functionHandle/fetchCustom.js";
import { $, $$, toggerMessage } from "../../main.js";
import translatesStepsMission from "../functionHandle/translatesStepsMission.js";
import { currentMission } from "../handleStepMission.js";
import { loadDataFunction } from "../handleTypeMission.js";
import sortFunction from "./sortFunction/sortFunction.js";

export default function handleMultiFunction() {
    checkAll();
    handleCheckAll();
    handleDeleteMultiFunction();
    handleCopyFunction();
    sortFunction();
}

function checkAll() {
    $$(".check-all-input").forEach((element) => {
        element.addEventListener("change", handleCheck);
    });

    function handleCheck(e) {
        const isCheckAll = e.target.checked;
        const type = e.target.dataset.type;
        check(
            $$(`[data-select-function-id][data-type=${type}]`),
            isCheckAll
        );

        function check(data, isCheckAll) {
            data.forEach((item) => {
                const isItemHidden = item.closest('.type-mission-function-item').classList.contains('hidden')
                if(!isItemHidden) {
                    item.checked = isCheckAll;
                }
            });
        }
    }
}

function handleCheckAll() {
    $$(`[data-select-function-id]`).forEach((element) => {
        element.onchange = (e) => {
            const type = e.target.dataset.type;
            isCheckAll(type);
        };
    });
}

function isCheckAll(type) {
    const itemChecked = $$(`.function-item-select[data-type=${type}]:checked`);
    const itemAll = $$(`.function-item-select[data-type=${type}]`);

    $(`.check-all-input[data-type=${type}`).checked =
        itemChecked.length === itemAll.length;
}

function getItemChecked(type) {
    const idSelect = [];
    $$(`.function-item-select[data-type=${type}]:checked`).forEach((item) => {
        idSelect.push(item.dataset.selectFunctionId);
    });
    return idSelect;
}

function removeFunctionChecked(type) {
    $$(`.function-item-select[data-type=${type}]:checked`).forEach((item) => {
        item.closest(".type-mission-function-item").remove();
    });
}

function handleDeleteMultiFunction() {
    const deleteBtns = $$(".delete-multi-function-btn");
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
            `/api/function/mission_${type}s`,
            "DELETE",
            (data) => {
                toggerMessage("success", data.message);
                data.deleted && translatesStepsMission({ id: currentMission });
            },
            { deletes: idSelects }
        );

        $(`.check-all-input[data-type=${type}`).checked = false;
    }
}

function handleCopyFunction() {
    const copyBtns = $$(".copy-multi-function-btn");
    copyBtns.forEach((element) => {
        element.onclick = copyFunction;
    });
    function copyFunction(e) {
        const type = this.dataset.type;
        const idSelects = getItemChecked(type);
        console.log(idSelects);

        fetchCustom(`/api/function`, "POST", () => loadDataFunction(), {
            idSelects,
            table: `mission_${type}s`,
        });

        $(`.check-all-input[data-type=${type}`).checked = false;
    }
}
