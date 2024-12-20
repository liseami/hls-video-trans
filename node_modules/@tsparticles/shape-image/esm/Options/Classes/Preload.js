import { isNull } from "@tsparticles/engine";
export class Preload {
    constructor() {
        this.src = "";
        this.gif = false;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.gif !== undefined) {
            this.gif = data.gif;
        }
        if (data.height !== undefined) {
            this.height = data.height;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.replaceColor !== undefined) {
            this.replaceColor = data.replaceColor;
        }
        if (data.src !== undefined) {
            this.src = data.src;
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}
