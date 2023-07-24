import TypeMission from "../Class/TypeMission.js";
import handleActionTypeMission from "./handleActionTypeMission.js";

export const typeMissionClass = new TypeMission();

export default function () {
    typeMissionClass.render();
    handleActionTypeMission()
}
