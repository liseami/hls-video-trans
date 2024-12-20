import { Vector, Vector3d } from "./Utils/Vectors.js";
import { calcExactPositionOrRandomFromSize, clamp, degToRad, getDistance, getParticleBaseVelocity, getParticleDirectionAngle, getRandom, getRangeValue, randomInRange, setRangeValue, } from "../Utils/NumberUtils.js";
import { deepExtend, getPosition, initParticleNumericAnimationValue, isInArray, itemFromSingleOrMultiple, } from "../Utils/Utils.js";
import { errorPrefix, millisecondsToSeconds } from "./Utils/Constants.js";
import { getHslFromAnimation, rangeColorToRgb } from "../Utils/ColorUtils.js";
import { EventType } from "../Enums/Types/EventType.js";
import { Interactivity } from "../Options/Classes/Interactivity/Interactivity.js";
import { MoveDirection } from "../Enums/Directions/MoveDirection.js";
import { OutMode } from "../Enums/Modes/OutMode.js";
import { ParticleOutType } from "../Enums/Types/ParticleOutType.js";
import { PixelMode } from "../Enums/Modes/PixelMode.js";
import { alterHsl } from "../Utils/CanvasUtils.js";
import { loadParticlesOptions } from "../Utils/OptionsUtils.js";
const defaultRetryCount = 0, double = 2, half = 0.5, squareExp = 2, randomString = "random";
function loadEffectData(effect, effectOptions, id, reduceDuplicates) {
    const effectData = effectOptions.options[effect];
    if (!effectData) {
        return;
    }
    return deepExtend({
        close: effectOptions.close,
        fill: effectOptions.fill,
    }, itemFromSingleOrMultiple(effectData, id, reduceDuplicates));
}
function loadShapeData(shape, shapeOptions, id, reduceDuplicates) {
    const shapeData = shapeOptions.options[shape];
    if (!shapeData) {
        return;
    }
    return deepExtend({
        close: shapeOptions.close,
        fill: shapeOptions.fill,
    }, itemFromSingleOrMultiple(shapeData, id, reduceDuplicates));
}
function fixOutMode(data) {
    if (!isInArray(data.outMode, data.checkModes)) {
        return;
    }
    const diameter = data.radius * double;
    if (data.coord > data.maxCoord - diameter) {
        data.setCb(-data.radius);
    }
    else if (data.coord < diameter) {
        data.setCb(data.radius);
    }
}
export class Particle {
    constructor(engine, container) {
        this.container = container;
        this._calcPosition = (container, position, zIndex, tryCount = defaultRetryCount) => {
            for (const plugin of container.plugins.values()) {
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
                    checkModes: [OutMode.bounce],
                    coord: pos.x,
                    maxCoord: container.canvas.size.width,
                    setCb: (value) => (pos.x += value),
                    radius,
                });
            }, fixVertical = (outMode) => {
                fixOutMode({
                    outMode,
                    checkModes: [OutMode.bounce],
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
                const increment = 1;
                return this._calcPosition(container, undefined, zIndex, tryCount + increment);
            }
            return pos;
        };
        this._calculateVelocity = () => {
            const baseVelocity = getParticleBaseVelocity(this.direction), res = baseVelocity.copy(), moveOptions = this.options.move;
            if (moveOptions.direction === MoveDirection.inside || moveOptions.direction === MoveDirection.outside) {
                return res;
            }
            const rad = degToRad(getRangeValue(moveOptions.angle.value)), radOffset = degToRad(getRangeValue(moveOptions.angle.offset)), range = {
                left: radOffset - rad * half,
                right: radOffset + rad * half,
            };
            if (!moveOptions.straight) {
                res.angle += randomInRange(setRangeValue(range.left, range.right));
            }
            if (moveOptions.random && typeof moveOptions.speed === "number") {
                res.length *= getRandom();
            }
            return res;
        };
        this._checkOverlap = (pos, tryCount = defaultRetryCount) => {
            const collisionsOptions = this.options.collisions, radius = this.getRadius();
            if (!collisionsOptions.enable) {
                return false;
            }
            const overlapOptions = collisionsOptions.overlap;
            if (overlapOptions.enable) {
                return false;
            }
            const retries = overlapOptions.retries, minRetries = 0;
            if (retries >= minRetries && tryCount > retries) {
                throw new Error(`${errorPrefix} particle is overlapping and can't be placed`);
            }
            return !!this.container.particles.find(particle => getDistance(pos, particle.position) < radius + particle.getRadius());
        };
        this._getRollColor = color => {
            if (!color || !this.roll || (!this.backColor && !this.roll.alter)) {
                return color;
            }
            const rollFactor = 1, none = 0, backFactor = this.roll.horizontal && this.roll.vertical ? double * rollFactor : rollFactor, backSum = this.roll.horizontal ? Math.PI * half : none, rolled = Math.floor(((this.roll.angle ?? none) + backSum) / (Math.PI / backFactor)) % double;
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
        this._initPosition = position => {
            const container = this.container, zIndexValue = getRangeValue(this.options.zIndex.value), minZ = 0;
            this.position = this._calcPosition(container, position, clamp(zIndexValue, minZ, container.zLayers));
            this.initialPosition = this.position.copy();
            const canvasSize = container.canvas.size, defaultRadius = 0;
            this.moveCenter = {
                ...getPosition(this.options.move.center, canvasSize),
                radius: this.options.move.center.radius ?? defaultRadius,
                mode: this.options.move.center.mode ?? PixelMode.percent,
            };
            this.direction = getParticleDirectionAngle(this.options.move.direction, this.position, this.moveCenter);
            switch (this.options.move.direction) {
                case MoveDirection.inside:
                    this.outType = ParticleOutType.inside;
                    break;
                case MoveDirection.outside:
                    this.outType = ParticleOutType.outside;
                    break;
            }
            this.offset = Vector.origin;
        };
        this._engine = engine;
    }
    destroy(override) {
        if (this.unbreakable || this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.bubble.inRange = false;
        this.slow.inRange = false;
        const container = this.container, pathGenerator = this.pathGenerator, shapeDrawer = container.shapeDrawers.get(this.shape);
        shapeDrawer?.particleDestroy?.(this);
        for (const plugin of container.plugins.values()) {
            plugin.particleDestroyed?.(this, override);
        }
        for (const updater of container.particles.updaters) {
            updater.particleDestroyed?.(this, override);
        }
        pathGenerator?.reset(this);
        this._engine.dispatchEvent(EventType.particleDestroyed, {
            container: this.container,
            data: {
                particle: this,
            },
        });
    }
    draw(delta) {
        const container = this.container, canvas = container.canvas;
        for (const plugin of container.plugins.values()) {
            canvas.drawParticlePlugin(plugin, this, delta);
        }
        canvas.drawParticle(this, delta);
    }
    getFillColor() {
        return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.color));
    }
    getMass() {
        return this.getRadius() ** squareExp * Math.PI * half;
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
        this.effectClose = true;
        this.effectFill = true;
        this.shapeClose = true;
        this.shapeFill = true;
        this.pathRotation = false;
        this.lastPathTime = 0;
        this.destroyed = false;
        this.unbreakable = false;
        this.isRotating = false;
        this.rotation = 0;
        this.misplaced = false;
        this.retina = {
            maxDistance: {},
        };
        this.outType = ParticleOutType.normal;
        this.ignoresResizeRatio = true;
        const pxRatio = container.retina.pixelRatio, mainOptions = container.actualOptions, particlesOptions = loadParticlesOptions(this._engine, container, mainOptions.particles), { reduceDuplicates } = particlesOptions, effectType = particlesOptions.effect.type, shapeType = particlesOptions.shape.type;
        this.effect = itemFromSingleOrMultiple(effectType, this.id, reduceDuplicates);
        this.shape = itemFromSingleOrMultiple(shapeType, this.id, reduceDuplicates);
        const effectOptions = particlesOptions.effect, shapeOptions = particlesOptions.shape;
        if (overrideOptions) {
            if (overrideOptions.effect?.type) {
                const overrideEffectType = overrideOptions.effect.type, effect = itemFromSingleOrMultiple(overrideEffectType, this.id, reduceDuplicates);
                if (effect) {
                    this.effect = effect;
                    effectOptions.load(overrideOptions.effect);
                }
            }
            if (overrideOptions.shape?.type) {
                const overrideShapeType = overrideOptions.shape.type, shape = itemFromSingleOrMultiple(overrideShapeType, this.id, reduceDuplicates);
                if (shape) {
                    this.shape = shape;
                    shapeOptions.load(overrideOptions.shape);
                }
            }
        }
        if (this.effect === randomString) {
            const availableEffects = [...this.container.effectDrawers.keys()];
            this.effect = availableEffects[Math.floor(Math.random() * availableEffects.length)];
        }
        if (this.shape === randomString) {
            const availableShapes = [...this.container.shapeDrawers.keys()];
            this.shape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
        }
        this.effectData = loadEffectData(this.effect, effectOptions, this.id, reduceDuplicates);
        this.shapeData = loadShapeData(this.shape, shapeOptions, this.id, reduceDuplicates);
        particlesOptions.load(overrideOptions);
        const effectData = this.effectData;
        if (effectData) {
            particlesOptions.load(effectData.particles);
        }
        const shapeData = this.shapeData;
        if (shapeData) {
            particlesOptions.load(shapeData.particles);
        }
        const interactivity = new Interactivity(engine, container);
        interactivity.load(container.actualOptions.interactivity);
        interactivity.load(particlesOptions.interactivity);
        this.interactivity = interactivity;
        this.effectFill = effectData?.fill ?? particlesOptions.effect.fill;
        this.effectClose = effectData?.close ?? particlesOptions.effect.close;
        this.shapeFill = shapeData?.fill ?? particlesOptions.shape.fill;
        this.shapeClose = shapeData?.close ?? particlesOptions.shape.close;
        this.options = particlesOptions;
        const pathOptions = this.options.move.path;
        this.pathDelay = getRangeValue(pathOptions.delay.value) * millisecondsToSeconds;
        if (pathOptions.generator) {
            this.pathGenerator = this._engine.getPathGenerator(pathOptions.generator);
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
        const decayOffset = 1;
        this.moveDecay = decayOffset - getRangeValue(this.options.move.decay);
        const particles = container.particles;
        particles.setLastZIndex(this.position.z);
        this.zIndexFactor = this.position.z / container.zLayers;
        this.sides = 24;
        let effectDrawer = container.effectDrawers.get(this.effect);
        if (!effectDrawer) {
            effectDrawer = this._engine.getEffectDrawer(this.effect);
            if (effectDrawer) {
                container.effectDrawers.set(this.effect, effectDrawer);
            }
        }
        if (effectDrawer?.loadEffect) {
            effectDrawer.loadEffect(this);
        }
        let shapeDrawer = container.shapeDrawers.get(this.shape);
        if (!shapeDrawer) {
            shapeDrawer = this._engine.getShapeDrawer(this.shape);
            if (shapeDrawer) {
                container.shapeDrawers.set(this.shape, shapeDrawer);
            }
        }
        if (shapeDrawer?.loadShape) {
            shapeDrawer.loadShape(this);
        }
        const sideCountFunc = shapeDrawer?.getSidesCount;
        if (sideCountFunc) {
            this.sides = sideCountFunc(this);
        }
        this.spawning = false;
        this.shadowColor = rangeColorToRgb(this._engine, this.options.shadow.color);
        for (const updater of particles.updaters) {
            updater.init(this);
        }
        for (const mover of particles.movers) {
            mover.init?.(this);
        }
        effectDrawer?.particleInit?.(container, this);
        shapeDrawer?.particleInit?.(container, this);
        for (const plugin of container.plugins.values()) {
            plugin.particleCreated?.(this);
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
            updater.reset?.(this);
        }
    }
}
