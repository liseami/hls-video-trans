import { EmittersCircleShape } from "./EmittersCircleShape.js";
export class EmittersCircleShapeGenerator {
    generate(position, size, fill, options) {
        return new EmittersCircleShape(position, size, fill, options);
    }
}
