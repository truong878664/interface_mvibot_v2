import { robotActive } from "../mainLayout.js";

export default async function checkChangeParameter(inputs) {
    const robot = robotActive();
    const res = await fetch(`/api/config-status?name_seri=${robot}`);
    const data = await res.json();
    const dataChanged = {};
    console.log(data);
    for (const key in inputs) {
        if (!(inputs[key] === data[key])) {
            dataChanged[key] = inputs[key];
        }
    }
  
    return dataChanged;
}
