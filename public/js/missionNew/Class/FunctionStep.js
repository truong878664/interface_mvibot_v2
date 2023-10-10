export default class FunctionStep {
    data;
    constructor() {}
    async get() {
        const data = this.fetchApi();
        this.data = await data;
        return data;
    }

    async fetchApi() {
        const res = await fetch(`/api/function`);
        return await res.json();
    }
    delete({ type, id }) {
        this.data[type]?.forEach((fn, index) => {
            if (fn.id === Number(id)) {
                this.data[type]?.splice(index, 1);
            }
        });
    }
    updateItem({ type, data }) {
        this.data[type].forEach((item, index) => {
            if (item.id === data.id) {
                this.data[type].splice(
                    index,
                    1,
                    JSON.parse(JSON.stringify(data))
                );
            }
        });
    }
    pushFunctionStepToData({ type, data }) {
        this.data[type].push(data);
    }
}
