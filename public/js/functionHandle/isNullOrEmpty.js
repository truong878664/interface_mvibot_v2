function isNullOrEmpty(value) {
    return (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "")
    );
}

export default isNullOrEmpty;
