import Mission from "./Class/Mission.js";

export default function oldMs(dataTranslate) {
    const dataMission = [];
    const MissionClass = new Mission();
    dataTranslate.split("+").map((element) => {
        const [id, name, type, data] = element.split("^");
        if (type === "normal") {
            const dataNormal = data.split("|").filter((e) => e);
            const dataMissionNormal = MissionClass.Normal({
                data: { normal: dataNormal },
                id,
                name,
            });
            dataMission.push(dataMissionNormal);
        } else if (type === "ifelse") {
            const [condition, if_, else_] = data.split("?");
            const datacondition = condition.split("|").filter((e) => e);
            const dataIf = if_.split("|").filter((e) => e);
            const dataElse = else_.split("|").filter((e) => e);
            
            const dataIfelseMission =  MissionClass.IfElse({
                data: {
                    condition: datacondition,
                    if_: dataIf,
                    else_: dataElse
                },
                name, id
            })
            dataMission.push(dataIfelseMission);

        }
        return dataMission;
    });
    return dataMission;
}
// console.log(oldMs(dataOld));
