(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../Utils/Utils.js", "../AnimatableColor.js", "./Collisions/Collisions.js", "./Effect/Effect.js", "./Move/Move.js", "./Opacity/Opacity.js", "./Bounce/ParticlesBounce.js", "./Number/ParticlesNumber.js", "./Shadow.js", "./Shape/Shape.js", "./Size/Size.js", "./Stroke.js", "./ZIndex/ZIndex.js", "../../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParticlesOptions = void 0;
    const Utils_js_1 = require("../../../Utils/Utils.js");
    const AnimatableColor_js_1 = require("../AnimatableColor.js");
    const Collisions_js_1 = require("./Collisions/Collisions.js");
    const Effect_js_1 = require("./Effect/Effect.js");
    const Move_js_1 = require("./Move/Move.js");
    const Opacity_js_1 = require("./Opacity/Opacity.js");
    const ParticlesBounce_js_1 = require("./Bounce/ParticlesBounce.js");
    const ParticlesNumber_js_1 = require("./Number/ParticlesNumber.js");
    const Shadow_js_1 = require("./Shadow.js");
    const Shape_js_1 = require("./Shape/Shape.js");
    const Size_js_1 = require("./Size/Size.js");
    const Stroke_js_1 = require("./Stroke.js");
    const ZIndex_js_1 = require("./ZIndex/ZIndex.js");
    const TypeUtils_js_1 = require("../../../Utils/TypeUtils.js");
    class ParticlesOptions {
        constructor(engine, container) {
            this._engine = engine;
            this._container = container;
            this.bounce = new ParticlesBounce_js_1.ParticlesBounce();
            this.collisions = new Collisions_js_1.Collisions();
            this.color = new AnimatableColor_js_1.AnimatableColor();
            this.color.value = "#fff";
            this.effect = new Effect_js_1.Effect();
            this.groups = {};
            this.move = new Move_js_1.Move();
            this.number = new ParticlesNumber_js_1.ParticlesNumber();
            this.opacity = new Opacity_js_1.Opacity();
            this.reduceDuplicates = false;
            this.shadow = new Shadow_js_1.Shadow();
            this.shape = new Shape_js_1.Shape();
            this.size = new Size_js_1.Size();
            this.stroke = new Stroke_js_1.Stroke();
            this.zIndex = new ZIndex_js_1.ZIndex();
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (data.groups !== undefined) {
                for (const group of Object.keys(data.groups)) {
                    if (!Object.hasOwn(data.groups, group)) {
                        continue;
                    }
                    const item = data.groups[group];
                    if (item !== undefined) {
                        this.groups[group] = (0, Utils_js_1.deepExtend)(this.groups[group] ?? {}, item);
                    }
                }
            }
            if (data.reduceDuplicates !== undefined) {
                this.reduceDuplicates = data.reduceDuplicates;
            }
            this.bounce.load(data.bounce);
            this.color.load(AnimatableColor_js_1.AnimatableColor.create(this.color, data.color));
            this.effect.load(data.effect);
            this.move.load(data.move);
            this.number.load(data.number);
            this.opacity.load(data.opacity);
            this.shape.load(data.shape);
            this.size.load(data.size);
            this.shadow.load(data.shadow);
            this.zIndex.load(data.zIndex);
            this.collisions.load(data.collisions);
            if (data.interactivity !== undefined) {
                this.interactivity = (0, Utils_js_1.deepExtend)({}, data.interactivity);
            }
            const strokeToLoad = data.stroke;
            if (strokeToLoad) {
                this.stroke = (0, Utils_js_1.executeOnSingleOrMultiple)(strokeToLoad, t => {
                    const tmp = new Stroke_js_1.Stroke();
                    tmp.load(t);
                    return tmp;
                });
            }
            if (this._container) {
                const updaters = this._engine.updaters.get(this._container);
                if (updaters) {
                    for (const updater of updaters) {
                        if (updater.loadOptions) {
                            updater.loadOptions(this, data);
                        }
                    }
                }
                const interactors = this._engine.interactors.get(this._container);
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
