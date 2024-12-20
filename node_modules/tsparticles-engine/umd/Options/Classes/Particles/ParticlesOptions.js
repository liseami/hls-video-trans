(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../Utils/Utils", "../AnimatableColor", "./Collisions/Collisions", "./Move/Move", "./Opacity/Opacity", "./Bounce/ParticlesBounce", "./Number/ParticlesNumber", "./Shadow", "./Shape/Shape", "./Size/Size", "./Stroke", "./ZIndex/ZIndex"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParticlesOptions = void 0;
    const Utils_1 = require("../../../Utils/Utils");
    const AnimatableColor_1 = require("../AnimatableColor");
    const Collisions_1 = require("./Collisions/Collisions");
    const Move_1 = require("./Move/Move");
    const Opacity_1 = require("./Opacity/Opacity");
    const ParticlesBounce_1 = require("./Bounce/ParticlesBounce");
    const ParticlesNumber_1 = require("./Number/ParticlesNumber");
    const Shadow_1 = require("./Shadow");
    const Shape_1 = require("./Shape/Shape");
    const Size_1 = require("./Size/Size");
    const Stroke_1 = require("./Stroke");
    const ZIndex_1 = require("./ZIndex/ZIndex");
    class ParticlesOptions {
        constructor(engine, container) {
            this._engine = engine;
            this._container = container;
            this.bounce = new ParticlesBounce_1.ParticlesBounce();
            this.collisions = new Collisions_1.Collisions();
            this.color = new AnimatableColor_1.AnimatableColor();
            this.color.value = "#fff";
            this.groups = {};
            this.move = new Move_1.Move();
            this.number = new ParticlesNumber_1.ParticlesNumber();
            this.opacity = new Opacity_1.Opacity();
            this.reduceDuplicates = false;
            this.shadow = new Shadow_1.Shadow();
            this.shape = new Shape_1.Shape();
            this.size = new Size_1.Size();
            this.stroke = new Stroke_1.Stroke();
            this.zIndex = new ZIndex_1.ZIndex();
        }
        load(data) {
            if (!data) {
                return;
            }
            this.bounce.load(data.bounce);
            this.color.load(AnimatableColor_1.AnimatableColor.create(this.color, data.color));
            if (data.groups !== undefined) {
                for (const group in data.groups) {
                    const item = data.groups[group];
                    if (item !== undefined) {
                        this.groups[group] = (0, Utils_1.deepExtend)(this.groups[group] ?? {}, item);
                    }
                }
            }
            this.move.load(data.move);
            this.number.load(data.number);
            this.opacity.load(data.opacity);
            if (data.reduceDuplicates !== undefined) {
                this.reduceDuplicates = data.reduceDuplicates;
            }
            this.shape.load(data.shape);
            this.size.load(data.size);
            this.shadow.load(data.shadow);
            this.zIndex.load(data.zIndex);
            const collisions = data.move?.collisions ?? data.move?.bounce;
            if (collisions !== undefined) {
                this.collisions.enable = collisions;
            }
            this.collisions.load(data.collisions);
            if (data.interactivity !== undefined) {
                this.interactivity = (0, Utils_1.deepExtend)({}, data.interactivity);
            }
            const strokeToLoad = data.stroke ?? data.shape?.stroke;
            if (strokeToLoad) {
                this.stroke = (0, Utils_1.executeOnSingleOrMultiple)(strokeToLoad, (t) => {
                    const tmp = new Stroke_1.Stroke();
                    tmp.load(t);
                    return tmp;
                });
            }
            if (this._container) {
                const updaters = this._engine.plugins.updaters.get(this._container);
                if (updaters) {
                    for (const updater of updaters) {
                        if (updater.loadOptions) {
                            updater.loadOptions(this, data);
                        }
                    }
                }
                const interactors = this._engine.plugins.interactors.get(this._container);
                if (interactors) {
                    for (const interactor of interactors) {
                        if (interactor.loadParticlesOptions) {
                            interactor.loadParticlesOptions(this, data);
                        }
                    }
                }
            }
        }
    }
    exports.ParticlesOptions = ParticlesOptions;
});
