import { drawSquare } from "./Utils.js";
const sides = 4;
export class SquareDrawer {
    constructor() {
        this.validTypes = ["edge", "square"];
    }
    draw(data) {
        drawSquare(data);
    }
    getSidesCount() {
        return sides;
    }
}
