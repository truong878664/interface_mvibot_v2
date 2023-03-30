import { toggerMessage } from "../../../main.js";
import { loadDataFunction } from "../../handleTypeMission.js";

let sortNumber = 0;
let timeClearSort;
const MAX_TIMES_SORT = 10;

export default function sortFunction() {
    setIconSortFunction();
    const sortNameBtns = document.querySelectorAll(".sort-name-btn");
    const sortDateBtns = document.querySelectorAll(".sort-date-btn");
    sortNameBtns.forEach((sortNameBtn, index) => {
        sortNameBtn.onclick = handleSort;
        sortDateBtns[index].onclick = handleSort;
    });
}

function handleSort(e) {
    sortNumber++;
    $$(".sort-btn.active").forEach((element) => {
        element.classList.remove("active");
    });

    const item = e.target;
    const oleSort = item.dataset.sort;
    const typeSort = item.dataset.typeSort;

    const typeSortElement = document.querySelectorAll(
        `[data-type-sort="${typeSort}"]`
    );

    typeSortElement.forEach((element) => {
        element.dataset.sort = oleSort === "asc" ? "dsc" : "asc";
        element.classList.add("active");
    });

    const sort = item.dataset.sort;
    localStorage.setItem("sortFunction", JSON.stringify({ typeSort, sort }));
    sortNumber < MAX_TIMES_SORT
        ? loadDataFunction()
        : toggerMessage("error", "Please sort slow down!");

    clearTimeout(timeClearSort);
    timeClearSort = setTimeout(() => {
        sortNumber = 0;
    }, 4000);
}

function setIconSortFunction() {
    $$(".sort-btn.active").forEach((element) => {
        element.classList.remove("active");
    });
    const { typeSort, sort } = JSON.parse(localStorage.getItem("sortFunction"));
    const typeSortElement = document.querySelectorAll(
        `[data-type-sort="${typeSort}"]`
    );
    typeSortElement.forEach((element) => {
        element.dataset.sort = sort;
        element.classList.add("active");
    });
}
