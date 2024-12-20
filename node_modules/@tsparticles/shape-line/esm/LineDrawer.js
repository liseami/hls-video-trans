import { drawLine } from "./Utils.js";
const sides = 1;
export class LineDrawer {
    constructor() {
        this.validTypes = ["line"];
    }
    draw(data) {
        drawLine(data);
    }
    getSidesCount() {
        return sides;
    }
}
