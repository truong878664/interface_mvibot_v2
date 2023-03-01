import { handleDeleteStep, handleMoveStep, render, valueItemIfelse, valueItemTrycatch, valueNormalMissionArray } from "../handleTypeMission.js";
import showUpdateBtn from "./showUpdateBtn.js";

export default function editTypeMission(data) {
    switch (data.type) {
        case "normal":
            valueNormalMissionArray.length = 0;
            valueNormalMissionArray.push(...data.data.split("|"));

            $(".normal-mission-btn").click();
            $(".name-normal-mission").value = data.name;

            render(valueNormalMissionArray, ".normal-steps-wrapper");
            handleMoveStep(
                valueNormalMissionArray,
                ".normal-steps-wrapper"
            );
            handleDeleteStep(
                valueNormalMissionArray,
                ".normal-steps-wrapper"
            );
            showUpdateBtn(true, "normal");

            break;
        case "ifelse":
            valueItemIfelse.if.length = 0;
            valueItemIfelse.then.length = 0;
            valueItemIfelse.else.length = 0;

            const dataIfElse = data.data.split("?");
            const dataIf = dataIfElse[0].split("|");
            const dataThen = dataIfElse[1]
                .split("|")
                .filter((item) => item.length != 0);

            const dataElse = dataIfElse[2]
                .split("|")
                .filter((item) => item.length != 0);

            valueItemIfelse.if.push(...dataIf);
            valueItemIfelse.then.push(...dataThen);
            valueItemIfelse.else.push(...dataElse);

            $(".ifelse-mission-btn").click();
            $(".name-ifelse-mission").value = data.name;
            showUpdateBtn(true, "ifelse");

            render(valueItemIfelse.if, `.if-steps-wrapper`);
            render(valueItemIfelse.then, `.then-steps-wrapper`);
            render(valueItemIfelse.else, `.else-steps-wrapper`);

            handleMoveStep(valueItemIfelse.if, ".if-steps-wrapper");
            handleMoveStep(valueItemIfelse.then, ".then-steps-wrapper");
            handleMoveStep(valueItemIfelse.else, ".else-steps-wrapper");

            handleDeleteStep(valueItemIfelse.if, ".if-steps-wrapper");
            handleDeleteStep(valueItemIfelse.then, ".then-steps-wrapper");
            handleDeleteStep(valueItemIfelse.else, ".else-steps-wrapper");
            break;
        case "trycatch":
            valueItemTrycatch.try.length = 0;
            valueItemTrycatch.catch.length = 0;

            $(".name-trycatch-mission").value = data.name;

            const dataTryCatch = data.data.split("?");
            const dataTry = dataTryCatch[0].split("|");
            const dataCatch = dataTryCatch[1]
                .split("|")
                .filter((item) => item.length != 0);

            valueItemTrycatch.try.push(...dataTry);
            valueItemTrycatch.catch.push(...dataCatch);

            $(".trycatch-mission-btn").click();
            showUpdateBtn(true, "trycatch");

            render(valueItemTrycatch.try, `.try-steps-wrapper`);
            render(valueItemTrycatch.catch, `.catch-steps-wrapper`);

            handleMoveStep(valueItemTrycatch.try, `.try-steps-wrapper`);
            handleMoveStep(valueItemTrycatch.catch, `.catch-steps-wrapper`);

            handleDeleteStep(valueItemTrycatch.try, `.try-steps-wrapper`);
            handleDeleteStep(
                valueItemTrycatch.catch,
                `.catch-steps-wrapper`
            );
            break;
    }
}