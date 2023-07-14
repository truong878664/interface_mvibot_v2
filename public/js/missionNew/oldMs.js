import Mission from "./Class/Mission.js";

export default function oldMs(dataTranslate) {
    const dataMisson = [];
    const MissionClass = new Mission();
    dataTranslate.split("+").map((element) => {
        const [id, name, type, data] = element.split("^");
        if (type === "normal") {
            const dataNormal = data.split("|").filter((e) => e);
            const dataMisisonNormal = MissionClass.Normal({
                data: { normal: dataNormal },
                id,
                name,
            });
            dataMisson.push(dataMisisonNormal);
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
            dataMisson.push(dataIfelseMission);

        }
        return dataMisson;
    });
    return dataMisson;
}
// console.log(oldMs(dataOld));
