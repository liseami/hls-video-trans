export class OutModes {
    constructor() {
        this.default = "out";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.default !== undefined) {
            this.default = data.default;
        }
        this.bottom = data.bottom ?? data.default;
        this.left = data.left ?? data.default;
        this.right = data.right ?? data.default;
        this.top = data.top ?? data.default;
    }
}
