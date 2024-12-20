"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmittersCircleShapeGenerator = void 0;
const EmittersCircleShape_js_1 = require("./EmittersCircleShape.js");
class EmittersCircleShapeGenerator {
    generate(position, size, fill, options) {
        return new EmittersCircleShape_js_1.EmittersCircleShape(position, size, fill, options);
    }
}
exports.EmittersCircleShapeGenerator = EmittersCircleShapeGenerator;
