function isNullOrEmpty(value) {
    return value === null || value === undefined || value.trim() === "";
}

export default isNullOrEmpty;
