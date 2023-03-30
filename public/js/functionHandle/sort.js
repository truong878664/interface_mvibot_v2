export default function sort({data,type, sort}) {
    data.sort((a, b) => {
        const nameA = a[type];
        const nameB = b[type];
        if (nameA < nameB) {
            return sort === "asc" ? -1 : 1;
        }
        if (nameA > nameB) {
            return sort === 'asc' ? 1 : -1;
        }
        return 0;
    });
}