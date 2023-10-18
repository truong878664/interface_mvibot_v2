const splitTwoChar = (string, first, second) => {
    const result = [];
    let indexFirst;
    let indexSecond;
    while (true) {
        indexFirst = string.indexOf(first, indexFirst + 1);
        indexSecond = string.indexOf(second, indexSecond + 1);
        if (indexFirst === -1 && indexFirst === -1) break;
        result.push(string.slice(indexFirst + 1, indexSecond));
    }
    return result;
};
export default splitTwoChar;
