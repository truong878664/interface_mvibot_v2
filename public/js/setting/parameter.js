import publishTopic from "../rosModule/topicString.js";
import { robotActive } from "../mainLayout.js";
import { $, $$ } from "../main.js";

export default function parameter() {
    const SPEED_MATH_INITIAL = 0.001;
    const SPEED_MATH_MEDIUM = 0.1;
    const SPEED_MATH_HIGH = 0.5;
    const TIME_DELAY_UP = 400;
    const TIME_DELAY_MATH = 100;
    const TIME_UP_SPEEDS_MEDIUM = 1000;
    const TIME_UP_SPEEDS_HIGH = 2000;

    const parameterChange = {};
    const parameterItems = $$(".parameter-item");
    const mathParameterBtns = $$(".math-parameter-btn");
    const sendParameterBtn = $(".add-parameter-btn");
    const timeOutUpSpeed = [];

    function handleClickParameter(e) {
        const typeParameter = e.target.dataset.parameter;
        const typeMath = e.target.dataset.math;
        pathParameter(typeMath, typeParameter, speedMath);
        parameterChange[typeParameter] = true;

        timeOut = setTimeout(() => {
            timeInterval = setInterval(() => {
                pathParameter(typeMath, typeParameter, speedMath);
            }, TIME_DELAY_MATH);
        }, TIME_DELAY_UP);

        timeOutUpSpeed.push(
            setTimeout(() => {
                speedMath = SPEED_MATH_MEDIUM;
            }, TIME_UP_SPEEDS_MEDIUM)
        );

        timeOutUpSpeed.push(
            setTimeout(() => {
                speedMath = SPEED_MATH_HIGH;
            }, TIME_UP_SPEEDS_HIGH)
        );
    }

    function handlePointerUp() {
        clearTimeout(timeOut);
        clearInterval(timeInterval);
        speedMath = SPEED_MATH_INITIAL;

        timeOutUpSpeed.forEach((ID) => clearTimeout(ID));
        timeOutUpSpeed.length = 0;
    }

    mathParameterBtns.forEach((item) => {
        item.addEventListener("pointerdown", handleClickParameter);
        item.addEventListener("pointerup", handlePointerUp);
    });

    parameterItems.forEach((item) => {
        item.addEventListener("change", handleChangeParameter);
    });
    function handleChangeParameter(e) {
        const typeParameter = e.target.name;
        parameterChange[typeParameter] = true;
    }

    function pathParameter(typeMath, typeParameter, speedMath) {
        const inputParameter = $(`[name=${typeParameter}]`);
        inputParameter.value = (
            typeMath === "plus"
                ? inputParameter.value * 1 + speedMath
                : inputParameter.value * 1 - speedMath
        ).toFixed(4);
    }

    sendParameterBtn.addEventListener("click", handleSendParameter);

    function handleSendParameter() {
        const dataParameter = [];
        Object.keys(parameterChange).forEach((key) => {
            const valueParameter = $(`[name=${key}]`).value
            dataParameter.push(`(${key}:${valueParameter * 1})`);
            delete parameterChange[key];
        });

        const robotSelect = robotActive();
        const dataTopic = dataParameter.join("");
        dataTopic && publishTopic(`${robotSelect}/set_config`, dataTopic);
    }

    let speedMath = SPEED_MATH_INITIAL;
    let timeInterval;
    let timeOut;
}
