import { calcExactPositionOrRandomFromSize, clamp, getDistance, getParticleBaseVelocity, getParticleDirectionAngle, getRandom, getRangeValue, getValue, randomInRange, setRangeValue, } from "../Utils/NumberUtils";
import { deepExtend, getPosition, initParticleNumericAnimationValue, isInArray, itemFromSingleOrMultiple, } from "../Utils/Utils";
import { getHslFromAnimation, rangeColorToRgb } from "../Utils/ColorUtils";
import { Interactivity } from "../Options/Classes/Interactivity/Interactivity";
import { Vector } from "./Utils/Vector";
import { Vector3d } from "./Utils/Vector3d";
import { alterHsl } from "../Utils/CanvasUtils";
import { errorPrefix } from "./Utils/Constants";
import { loadParticlesOptions } from "../Utils/OptionsUtils";
const fixOutMode = (data) => {
    if (!isInArray(data.outMode, data.checkModes)) {
        return;
    }
    const diameter = data.radius * 2;
    if (data.coord > data.maxCoord - diameter) {
        data.setCb(-data.radius);
    }
    else if (data.coord < diameter) {
        data.setCb(data.radius);
    }
};
export class Particle {
    constructor(engine, id, container, position, overrideOptions, group) {
        this.container = container;
        this._calcPosition = (container, position, zIndex, tryCount = 0) => {
            for (const [, plugin] of container.plugins) {
                const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;
                if (pluginPos) {
                    return Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
                }
            }
            const canvasSize = container.canvas.size, exactPosition = calcExactPositionOrRandomFromSize({
                size: canvasSize,
                position: position,
            }), pos = Vector3d.create(exactPosition.x, exactPosition.y, zIndex), radius = this.getRadius(), outModes = this.options.move.outModes, fixHorizontal = (outMode) => {
                fixOutMode({
                    outMode,
                    checkModes: ["bounce", "bounce-horizontal"],
                    coord: pos.x,
                    maxCoord: container.canvas.size.width,
                    setCb: (value) => (pos.x += value),
                    radius,
                });
            }, fixVertical = (outMode) => {
                fixOutMode({
                    outMode,
                    checkModes: ["bounce", "bounce-vertical"],
                    coord: pos.y,
                    maxCoord: container.canvas.size.height,
                    setCb: (value) => (pos.y += value),
                    radius,
                });
            };
            fixHorizontal(outModes.left ?? outModes.default);
            fixHorizontal(outModes.right ?? outModes.default);
            fixVertical(outModes.top ?? outModes.default);
            fixVertical(outModes.bottom ?? outModes.default);
            if (this._checkOverlap(pos, tryCount)) {
                return this._calcPosition(container, undefined, zIndex, tryCount + 1);
            }
            return pos;
        };
        this._calculateVelocity = () => {
            const baseVelocity = getParticleBaseVelocity(this.direction), res = baseVelocity.copy(), moveOptions = this.options.move;
            if (moveOptions.direction === "inside" || moveOptions.direction === "outside") {
                return res;
            }
            const rad = (Math.PI / 180) * getRangeValue(moveOptions.angle.value), radOffset = (Math.PI / 180) * getRangeValue(moveOptions.angle.offset), range = {
                left: radOffset - rad / 2,
                right: radOffset + rad / 2,
            };
            if (!moveOptions.straight) {
                res.angle += randomInRange(setRangeValue(range.left, range.right));
            }
            if (moveOptions.random && typeof moveOptions.speed === "number") {
                res.length *= getRandom();
            }
            return res;
        };
        this._checkOverlap = (pos, tryCount = 0) => {
            const collisionsOptions = this.options.collisions, radius = this.getRadius();
            if (!collisionsOptions.enable) {
                return false;
            }
            const overlapOptions = collisionsOptions.overlap;
            if (overlapOptions.enable) {
                return false;
            }
            const retries = overlapOptions.retries;
            if (retries >= 0 && tryCount > retries) {
                throw new Error(`${errorPrefix} particle is overlapping and can't be placed`);
            }
            return !!this.container.particles.find((particle) => getDistance(pos, particle.position) < radius + particle.getRadius());
        };
        this._getRollColor = (color) => {
            if (!color || !this.roll || (!this.backColor && !this.roll.alter)) {
                return color;
            }
            const backFactor = this.roll.horizontal && this.roll.vertical ? 2 : 1, backSum = this.roll.horizontal ? Math.PI / 2 : 0, rolled = Math.floor(((this.roll.angle ?? 0) + backSum) / (Math.PI / backFactor)) % 2;
            if (!rolled) {
                return color;
            }
            if (this.backColor) {
                return this.backColor;
            }
            if (this.roll.alter) {
                return alterHsl(color, this.roll.alter.type, this.roll.alter.value);
            }
            return color;
        };
        this._initPosition = (position) => {
            const container = this.container, zIndexValue = getRangeValue(this.options.zIndex.value);
            this.position = this._calcPosition(container, position, clamp(zIndexValue, 0, container.zLayers));
            this.initialPosition = this.position.copy();
            const canvasSize = container.canvas.size;
            this.moveCenter = {
                ...getPosition(this.options.move.center, canvasSize),
                radius: this.options.move.center.radius ?? 0,
                mode: this.options.move.center.mode ?? "percent",
            };
            this.direction = getParticleDirectionAngle(this.options.move.direction, this.position, this.moveCenter);
            switch (this.options.move.direction) {
                case "inside":
                    this.outType = "inside";
                    break;
                case "outside":
                    this.outType = "outside";
                    break;
            }
            this.offset = Vector.origin;
        };
        this._loadShapeData = (shapeOptions, reduceDuplicates) => {
            const shapeData = shapeOptions.options[this.shape];
            if (!shapeData) {
                return;
            }
            return deepExtend({
                close: shapeOptions.close,
                fill: shapeOptions.fill,
            }, itemFromSingleOrMultiple(shapeData, this.id, reduceDuplicates));
        };
        this._engine = engine;
        this.init(id, position, overrideOptions, group);
    }
    destroy(override) {
        if (this.unbreakable || this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.bubble.inRange = false;
        this.slow.inRange = false;
        const container = this.container, pathGenerator = this.pathGenerator;
        for (const [, plugin] of container.plugins) {
            if (plugin.particleDestroyed) {
                plugin.particleDestroyed(this, override);
            }
        }
        for (const updater of container.particles.updaters) {
            if (updater.particleDestroyed) {
                updater.particleDestroyed(this, override);
            }
        }
        if (pathGenerator) {
            pathGenerator.reset(this);
        }
    }
    draw(delta) {
        const container = this.container;
        for (const [, plugin] of container.plugins) {
            container.canvas.drawParticlePlugin(plugin, this, delta);
        }
        container.canvas.drawParticle(this, delta);
    }
    getFillColor() {
        return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.color));
    }
    getMass() {
        return (this.getRadius() ** 2 * Math.PI) / 2;
    }
    getPosition() {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
            z: this.position.z,
        };
    }
    getRadius() {
        return this.bubble.radius ?? this.size.value;
    }
    getStrokeColor() {
        return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.strokeColor));
    }
    init(id, position, overrideOptions, group) {
        const container = this.container, engine = this._engine;
        this.id = id;
        this.group = group;
        this.fill = true;
        this.pathRotation = false;
        this.close = true;
        this.lastPathTime = 0;
        this.destroyed = false;
        this.unbreakable = false;
        this.rotation = 0;
        this.misplaced = false;
        this.retina = {
            maxDistance: {},
        };
        this.outType = "normal";
        this.ignoresResizeRatio = true;
        const pxRatio = container.retina.pixelRatio, mainOptions = container.actualOptions, particlesOptions = loadParticlesOptions(this._engine, container, mainOptions.particles), shapeType = particlesOptions.shape.type, { reduceDuplicates } = particlesOptions;
        this.shape = itemFromSingleOrMultiple(shapeType, this.id, reduceDuplicates);
        const shapeOptions = particlesOptions.shape;
        if (overrideOptions && overrideOptions.shape && overrideOptions.shape.type) {
            const overrideShapeType = overrideOptions.shape.type, shape = itemFromSingleOrMultiple(overrideShapeType, this.id, reduceDuplicates);
            if (shape) {
                this.shape = shape;
                shapeOptions.load(overrideOptions.shape);
            }
        }
        this.shapeData = this._loadShapeData(shapeOptions, reduceDuplicates);
        particlesOptions.load(overrideOptions);
        const shapeData = this.shapeData;
        if (shapeData) {
            particlesOptions.load(shapeData.particles);
        }
        const interactivity = new Interactivity(engine, container);
        interactivity.load(container.actualOptions.interactivity);
        interactivity.load(particlesOptions.interactivity);
        this.interactivity = interactivity;
        this.fill = shapeData?.fill ?? particlesOptions.shape.fill;
        this.close = shapeData?.close ?? particlesOptions.shape.close;
        this.options = particlesOptions;
        const pathOptions = this.options.move.path;
        this.pathDelay = getValue(pathOptions.delay) * 1000;
        if (pathOptions.generator) {
            this.pathGenerator = this._engine.plugins.getPathGenerator(pathOptions.generator);
            if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
                this.pathGenerator.init(container);
            }
        }
        container.retina.initParticle(this);
        this.size = initParticleNumericAnimationValue(this.options.size, pxRatio);
        this.bubble = {
            inRange: false,
        };
        this.slow = {
            inRange: false,
            factor: 1,
        };
        this._initPosition(position);
        this.initialVelocity = this._calculateVelocity();
        this.velocity = this.initialVelocity.copy();
        this.moveDecay = 1 - getRangeValue(this.options.move.decay);
        const particles = container.particles;
        particles.needsSort = particles.needsSort || particles.lastZIndex < this.position.z;
        particles.lastZIndex = this.position.z;
        this.zIndexFactor = this.position.z / container.zLayers;
        this.sides = 24;
        let drawer = container.drawers.get(this.shape);
        if (!drawer) {
            drawer = this._engine.plugins.getShapeDrawer(this.shape);
            if (drawer) {
                container.drawers.set(this.shape, drawer);
            }
        }
        if (drawer && drawer.loadShape) {
            drawer.loadShape(this);
        }
        const sideCountFunc = drawer?.getSidesCount;
        if (sideCountFunc) {
            this.sides = sideCountFunc(this);
        }
        this.spawning = false;
        this.shadowColor = rangeColorToRgb(this.options.shadow.color);
        for (const updater of container.particles.updaters) {
            updater.init(this);
        }
        for (const mover of container.particles.movers) {
            mover.init && mover.init(this);
        }
        if (drawer && drawer.particleInit) {
            drawer.particleInit(container, this);
        }
        for (const [, plugin] of container.plugins) {
            plugin.particleCreated && plugin.particleCreated(this);
        }
    }
    isInsideCanvas() {
        const radius = this.getRadius(), canvasSize = this.container.canvas.size, position = this.position;
        return (position.x >= -radius &&
            position.y >= -radius &&
            position.y <= canvasSize.height + radius &&
            position.x <= canvasSize.width + radius);
    }
    isVisible() {
        return !this.destroyed && !this.spawning && this.isInsideCanvas();
    }
    reset() {
        for (const updater of this.container.particles.updaters) {
            updater.reset && updater.reset(this);
        }
    }
}
