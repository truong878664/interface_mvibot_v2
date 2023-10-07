export default class FunctionStep {
    constructor() {}
    async get() {
        const res = await fetch(`/api/function`);
        const data = await res.json();
        this.data = data;
        return data;
    }
}
