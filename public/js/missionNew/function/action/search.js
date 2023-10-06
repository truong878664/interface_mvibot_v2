import { functionWrapper } from "../../index.js";

function search() {
    functionWrapper.addEventListener("input", (e) => {
        const isInputSearch = e.target.dataset.action === "search";
        if (!isInputSearch) return;
        const type = e.target.dataset.type;
        const valueSearch = e.target.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        const currentFunctionSearchWrapper = functionWrapper.querySelector(
            `[data-list-function='${type}']`
        );
        const itemFunctionList =
            currentFunctionSearchWrapper.querySelectorAll("[data-name]");

        itemFunctionList.forEach((element) => {
            element.dataset.status = "show";
        });
        console.log(valueSearch);
        itemFunctionList.forEach((element) => {
            const dataName = element.dataset.name.toLowerCase();
            if (dataName.indexOf(valueSearch) !== -1) return;
            element.dataset.status = "hidden";
        });
    });
}

export default search;
