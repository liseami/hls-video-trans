import { EmittersSquareShape } from "./EmittersSquareShape.js";
export class EmittersSquareShapeGenerator {
    generate(position, size, fill, options) {
        return new EmittersSquareShape(position, size, fill, options);
    }
}
