import { Circle, Rectangle } from "@tsparticles/engine";
const double = 2;
export class CircleWarp extends Circle {
    constructor(x, y, radius, canvasSize) {
        super(x, y, radius);
        this.canvasSize = canvasSize;
        this.canvasSize = { ...canvasSize };
    }
    contains(point) {
        const { width, height } = this.canvasSize, { x, y } = point;
        return (super.contains(point) ||
            super.contains({ x: x - width, y }) ||
            super.contains({ x: x - width, y: y - height }) ||
            super.contains({ x, y: y - height }));
    }
    intersects(range) {
        if (super.intersects(range)) {
            return true;
        }
        const rect = range, circle = range, newPos = {
            x: range.position.x - this.canvasSize.width,
            y: range.position.y - this.canvasSize.height,
        };
        if (circle.radius !== undefined) {
            const biggerCircle = new Circle(newPos.x, newPos.y, circle.radius * double);
            return super.intersects(biggerCircle);
        }
        else if (rect.size !== undefined) {
            const rectSW = new Rectangle(newPos.x, newPos.y, rect.size.width * double, rect.size.height * double);
            return super.intersects(rectSW);
        }
        return false;
    }
}
