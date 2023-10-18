import splitTwoChar from "../functionHandle/splitTwoChar.js";

const convertTopic = {
    mission_action_infor(data) {
        const dataMission = splitTwoChar(data, "(", ")");
        const dataMissionObject = {};
        dataMission.map((item) => {
            const [key, value] = item.split(":");
            dataMissionObject[key] = isNaN(Number(value))
                ? value
                : Number(value);
            return dataMissionObject;
        });
        return dataMissionObject;
    },
    local_variable(data) {
        const dataMission = splitTwoChar(data, "(", ")");
        const dataMissionObject = {};
        dataMission.map((item) => {
            const [key, value] = item.split(":");
            dataMissionObject[key] = value;
            return dataMissionObject;
        });
        return dataMissionObject;
    },
    mission_memory(data) {
        const dataMemory = data.split("/").filter((item) => item);
        const dataMissionObject = {};
        dataMemory.map((item) => {
            const [key, value] = item.split(":");
            dataMissionObject[key] = value;
            return dataMissionObject;
        });
        return dataMissionObject;
    },
};
export default convertTopic;
