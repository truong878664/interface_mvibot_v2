import renderLiActive from "./renderLiActive.js";
import ulSelectComponent from "./ulSelectComponent.js";

let dataMissionSendToRobot = [];
const dataMissionGotoToolLift = [];
const dataPositionWithToolLift = [];
const dataPositionNoToolLift = [];

const buttonShow = document.querySelector("[data-name='show-label']");
const buttonPositionToolLift = document.querySelector(
    "[data-name='option-toolift']"
);
const buttonPositionNoToolLift = document.querySelector(
    "[data-name='option-no-toolift']"
);
const buttonMissionGoToLift = document.querySelector(
    "[data-name='option-go-to-lift']"
);
const saveStartBtn = document.querySelector("#save-start-btn");

renderLiActive({
    data: dataMissionSendToRobot,
    selector: "#mission-active",
});
renderLiActive({
    data: dataPositionWithToolLift,
    selector: "#position-with-tool-active",
});
renderLiActive({
    data: dataPositionNoToolLift,
    selector: "#position-no-tool-active",
});
renderLiActive({
    data: dataMissionGotoToolLift,
    selector: "#go-to-lift-active",
});

saveStartBtn.onclick = () => {
    console.log(dataPositionWithToolLift);
};

buttonShow.addEventListener("click", handleClickMissionRobot);
buttonPositionToolLift.addEventListener("click", handleClickPositionToolLift);
buttonPositionNoToolLift.addEventListener(
    "click",
    handleClickPositionNoToolLift
);
buttonMissionGoToLift.addEventListener("click", handleClickMissionGoToLift);

async function handleClickMissionRobot() {
    const rect = this.getBoundingClientRect();
    const x = rect.x;
    const y = rect.y + rect.height;
    const datalist = await getAllMission();
    const listWrapper = await ulSelectComponent({
        x,
        y,
        dataList: datalist,
        dataListCheck: dataMissionSendToRobot,
    });
    const listLi = listWrapper.querySelectorAll(".item-li");
    listLi.forEach((li) => {
        li.onchange = (e) => {
            const id = Number(e.target.value);
            const name = e.target.dataset.name;
            const isCheck = e.target.checked;
            const data = { id, name };
            dataMissionSendToRobot = dataMissionSendToRobot.filter(
                (itemF) => itemF.id !== id
            );
            isCheck && dataMissionSendToRobot.push(data);
            renderLiActive({
                data: dataMissionSendToRobot,
                selector: "#mission-active",
            });
        };
    });
}

async function handleClickPositionToolLift() {
    const rect = this.getBoundingClientRect();
    const x = rect.x;
    const y = rect.y + rect.height;
    const datalist = await getPosition();
    const listWrapper = await ulSelectComponent({
        x,
        y,
        dataList: datalist,
        dataListCheck: dataPositionWithToolLift,
        multiple: false,
    });
    const listLi = listWrapper.querySelectorAll(".item-li");
    listLi.forEach((li) => {
        li.onchange = (e) => {
            const id = Number(e.target.value);
            const name = e.target.dataset.name;
            const data = { id, name };
            dataPositionWithToolLift.length = 0;
            dataPositionWithToolLift.push(data);
            renderLiActive({
                data: dataPositionWithToolLift,
                selector: "#position-with-tool-active",
            });
        };
    });
}
async function handleClickPositionNoToolLift() {
    const rect = this.getBoundingClientRect();
    const x = rect.x;
    const y = rect.y + rect.height;
    const datalist = await getPosition();
    const listWrapper = await ulSelectComponent({
        x,
        y,
        dataList: datalist,
        dataListCheck: dataPositionNoToolLift,
        multiple: false,
    });
    const listLi = listWrapper.querySelectorAll(".item-li");
    listLi.forEach((li) => {
        li.onchange = (e) => {
            const id = Number(e.target.value);
            const name = e.target.dataset.name;
            const data = { id, name };
            dataPositionNoToolLift.length = 0;
            dataPositionNoToolLift.push(data);
            renderLiActive({
                data: dataPositionNoToolLift,
                selector: "#position-no-tool-active",
            });
        };
    });
}

async function handleClickMissionGoToLift() {
    const rect = this.getBoundingClientRect();
    const x = rect.x;
    const y = rect.y + rect.height;
    const datalist = await getAllMission();
    const listWrapper = await ulSelectComponent({
        x,
        y,
        dataList: datalist,
        dataListCheck: dataMissionGotoToolLift,
        multiple: false,
    });
    const listLi = listWrapper.querySelectorAll(".item-li");
    listLi.forEach((li) => {
        li.onchange = (e) => {
            const id = Number(e.target.value);
            const name = e.target.dataset.name;
            const data = { id, name };
            dataMissionGotoToolLift.length = 0;
            dataMissionGotoToolLift.push(data);
            renderLiActive({
                data: dataMissionGotoToolLift,
                selector: "#go-to-lift-active",
            });
        };
    });
}
async function getAllMission() {
    const column = ["id", "name"];

    const res = await fetch(
        `/api/mi/get-column-mission?column=${JSON.stringify(column)}`
    );
    const missions = await res.json();
    return missions;
}

async function getPosition() {
    const res = await fetch(`/api/position`);
    const position = await res.json();
    return position;
}
