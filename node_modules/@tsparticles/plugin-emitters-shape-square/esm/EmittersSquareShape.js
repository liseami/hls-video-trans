import { EmitterShapeBase } from "@tsparticles/plugin-emitters";
import { getRandom, halfRandom } from "@tsparticles/engine";
const half = 0.5, sides = 4, double = 2;
var Sides;
(function (Sides) {
    Sides[Sides["TopLeft"] = 0] = "TopLeft";
    Sides[Sides["TopRight"] = 1] = "TopRight";
    Sides[Sides["BottomRight"] = 2] = "BottomRight";
    Sides[Sides["BottomLeft"] = 3] = "BottomLeft";
})(Sides || (Sides = {}));
function randomSquareCoordinate(position, offset) {
    return position + offset * (getRandom() - halfRandom);
}
export class EmittersSquareShape extends EmitterShapeBase {
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
            const halfW = size.width * half, halfH = size.height * half, side = Math.floor(getRandom() * sides), v = (getRandom() - halfRandom) * double;
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
