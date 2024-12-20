(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/plugin-emitters", "@tsparticles/engine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EmittersSquareShape = void 0;
    const plugin_emitters_1 = require("@tsparticles/plugin-emitters");
    const engine_1 = require("@tsparticles/engine");
    const half = 0.5, sides = 4, double = 2;
    var Sides;
    (function (Sides) {
        Sides[Sides["TopLeft"] = 0] = "TopLeft";
        Sides[Sides["TopRight"] = 1] = "TopRight";
        Sides[Sides["BottomRight"] = 2] = "BottomRight";
        Sides[Sides["BottomLeft"] = 3] = "BottomLeft";
    })(Sides || (Sides = {}));
    function randomSquareCoordinate(position, offset) {
        return position + offset * ((0, engine_1.getRandom)() - engine_1.halfRandom);
    }
    class EmittersSquareShape extends plugin_emitters_1.EmitterShapeBase {
        constructor(position, size, fill, options) {
            super(position, size, fill, options);
        }
        async init() {
        }
        randomPosition() {
            const fill = this.fill, position = this.position, size = this.size;
            if (fill) {
                return {
                    position: {
                        x: randomSquareCoordinate(position.x, size.width),
                        y: randomSquareCoordinate(position.y, size.height),
                    },
                };
            }
            else {
                const halfW = size.width * half, halfH = size.height * half, side = Math.floor((0, engine_1.getRandom)() * sides), v = ((0, engine_1.getRandom)() - engine_1.halfRandom) * double;
                switch (side) {
                    case Sides.TopLeft:
                        return {
                            position: {
                                x: position.x + v * halfW,
                                y: position.y - halfH,
                            },
                        };
                    case Sides.TopRight:
                        return {
                            position: {
                                x: position.x - halfW,
                                y: position.y + v * halfH,
                            },
                        };
                    case Sides.BottomRight:
                        return {
                            position: {
                                x: position.x + v * halfW,
                                y: position.y + halfH,
                            },
                        };
                    case Sides.BottomLeft:
                    default:
                        return {
                            position: {
                                x: position.x + halfW,
                                y: position.y + v * halfH,
                            },
                        };
                }
            }
        }
    }
    exports.EmittersSquareShape = EmittersSquareShape;
});
