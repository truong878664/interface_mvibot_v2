const clx = (classNameList, classList = "") => {
    const classNames = Object.keys(classNameList).filter(
        (className) => classNameList[className]
    );
    return [...classNames, classList].join(" ");
};
export default clx;
