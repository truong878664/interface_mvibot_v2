import BlockStep from "../component/BlockStep/index.js";


const renderMission = ({mission}) => {
    const html = [];
    mission.map((item) => {
        html.push(BlockStep[item.type](item));
        return html;
    });

    const blockWrapper = document.getElementById("block-step-wrapper");
    blockWrapper.innerHTML = html.join("");
};

export default renderMission;
