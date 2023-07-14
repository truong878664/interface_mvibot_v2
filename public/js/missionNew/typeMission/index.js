import TypeMission from "../Class/TypeMission.js";
import add from "./add.js";

export const typeMissionClass = new TypeMission();

export default function () {
    typeMissionClass.render();
    add();
}
