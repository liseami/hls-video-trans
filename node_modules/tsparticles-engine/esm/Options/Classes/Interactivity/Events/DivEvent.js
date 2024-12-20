import { executeOnSingleOrMultiple } from "../../../../Utils/Utils";
export class DivEvent {
    constructor() {
        this.selectors = [];
        this.enable = false;
        this.mode = [];
        this.type = "circle";
    }
    get el() {
        return this.elementId;
    }
    set el(value) {
        this.elementId = value;
    }
    get elementId() {
        return this.ids;
    }
    set elementId(value) {
        this.ids = value;
    }
    get ids() {
        return executeOnSingleOrMultiple(this.selectors, (t) => t.replace("#", ""));
    }
    set ids(value) {
        this.selectors = executeOnSingleOrMultiple(value, (t) => `#${t}`);
    }
    load(data) {
        if (!data) {
            return;
        }
        const ids = data.ids ?? data.elementId ?? data.el;
        if (ids !== undefined) {
            this.ids = ids;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
