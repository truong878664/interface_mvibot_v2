import { toggerMessage } from "../main.js";
import renderLiActive from "./renderLiActive.js";
import ulSelectComponent from "./ulSelectComponent.js";

function configStart() {
    let dataMissionSendToRobot = [];
    let dataMissionGotoToolLift = [];
    let dataPositionWithToolLift = [];
    let dataPositionNoToolLift = [];

    const buttonShow = document.querySelector("[data-name='show-label']");
    const buttonPositionToolLift = document.querySelector(
        "[data-name='option-toollift']"
    );
    const buttonPositionNoToolLift = document.querySelector(
        "[data-name='option-no-toollift']"
    );
    const buttonMissionGoToLift = document.querySelector(
        "[data-name='option-go-to-lift']"
    );
    const saveStartBtn = document.querySelector("#save-start-btn");

    getDataStart();
    async function getDataStart() {
        const res = await fetch("/api/start");
        const data = await res.json();
        if (data.error) {
            toggerMessage("error", data.message);
            return;
        }
        const {
            missions_send_robot,
            mission_go_to_toollift,
            position_with_toollift,
            position_no_toollift,
        } = data.data;

        dataMissionSendToRobot = JSON.parse(missions_send_robot);
        dataMissionGotoToolLift = JSON.parse(mission_go_to_toollift);
        dataPositionWithToolLift = JSON.parse(position_with_toollift);
        dataPositionNoToolLift = JSON.parse(position_no_toollift);
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
    }

    saveStartBtn.onclick = async () => {
        const dataStart = {
            position_with_toollift: JSON.stringify(dataPositionWithToolLift),
            position_no_toollift: JSON.stringify(dataPositionNoToolLift),
            mission_go_to_toollift: JSON.stringify(dataMissionGotoToolLift),
            missions_send_robot: JSON.stringify(dataMissionSendToRobot),
        };
        const res = await fetch("/api/start/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataStart),
        });
        const message = await res.json();
        toggerMessage(message.error ? "error" : "success", message.message);
    };

    buttonShow.addEventListener("click", handleClickMissionRobot);
    buttonPositionToolLift.addEventListener(
        "click",
        handleClickPositionToolLift
    );
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
}

export default configStart;
