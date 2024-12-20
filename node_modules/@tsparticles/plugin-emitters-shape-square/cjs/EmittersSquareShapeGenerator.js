"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmittersSquareShapeGenerator = void 0;
const EmittersSquareShape_js_1 = require("./EmittersSquareShape.js");
class EmittersSquareShapeGenerator {
    generate(position, size, fill, options) {
        return new EmittersSquareShape_js_1.EmittersSquareShape(position, size, fill, options);
    }
}
exports.EmittersSquareShapeGenerator = EmittersSquareShapeGenerator;
