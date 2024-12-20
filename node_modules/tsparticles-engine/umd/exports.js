var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Core/Utils/Circle", "./Core/Utils/Constants", "./Core/Utils/ExternalInteractorBase", "./Core/Utils/ParticlesInteractorBase", "./Core/Utils/Point", "./Core/Utils/Range", "./Core/Utils/Rectangle", "./Core/Utils/Vector", "./Core/Utils/Vector3d", "./Enums/Directions/MoveDirection", "./Enums/Directions/RotateDirection", "./Enums/Directions/OutModeDirection", "./Enums/Modes/AnimationMode", "./Enums/Modes/ClickMode", "./Enums/Modes/DivMode", "./Enums/Modes/HoverMode", "./Enums/Modes/CollisionMode", "./Enums/Modes/OutMode", "./Enums/Modes/PixelMode", "./Enums/Modes/ThemeMode", "./Enums/Modes/ResponsiveMode", "./Enums/Types/AlterType", "./Enums/Types/DestroyType", "./Enums/Types/GradientType", "./Enums/Types/InteractorType", "./Enums/Types/ParticleOutType", "./Enums/Types/StartValueType", "./Enums/Types/DivType", "./Enums/Types/EasingType", "./Enums/Types/EventType", "./Enums/AnimationStatus", "./Enums/InteractivityDetect", "./Options/Classes/AnimatableColor", "./Options/Classes/AnimationOptions", "./Options/Classes/Background/Background", "./Options/Classes/BackgroundMask/BackgroundMask", "./Options/Classes/BackgroundMask/BackgroundMaskCover", "./Options/Classes/ColorAnimation", "./Options/Classes/FullScreen/FullScreen", "./Options/Classes/HslAnimation", "./Options/Classes/Interactivity/Events/ClickEvent", "./Options/Classes/Interactivity/Events/DivEvent", "./Options/Classes/Interactivity/Events/ClickEvent", "./Options/Classes/Interactivity/Events/DivEvent", "./Options/Classes/Interactivity/Events/Events", "./Options/Classes/Interactivity/Events/HoverEvent", "./Options/Classes/Interactivity/Events/Parallax", "./Options/Classes/Interactivity/Events/ResizeEvent", "./Options/Classes/Interactivity/Interactivity", "./Options/Classes/Interactivity/Modes/Modes", "./Options/Classes/ManualParticle", "./Options/Classes/Options", "./Options/Classes/OptionsColor", "./Options/Classes/Particles/Bounce/ParticlesBounce", "./Options/Classes/Particles/Bounce/ParticlesBounceFactor", "./Options/Classes/Particles/Collisions/Collisions", "./Options/Classes/Particles/Collisions/CollisionsAbsorb", "./Options/Classes/Particles/Collisions/CollisionsOverlap", "./Options/Classes/Particles/ParticlesOptions", "./Options/Classes/Particles/Shadow", "./Options/Classes/Particles/Stroke", "./Options/Classes/Particles/Move/MoveAttract", "./Options/Classes/Particles/Move/Move", "./Options/Classes/Particles/Move/MoveAngle", "./Options/Classes/Particles/Move/MoveCenter", "./Options/Classes/Particles/Move/MoveGravity", "./Options/Classes/Particles/Move/OutModes", "./Options/Classes/Particles/Move/Path/MovePath", "./Options/Classes/Particles/Move/Spin", "./Options/Classes/Particles/Move/MoveTrail", "./Options/Classes/Particles/Number/ParticlesNumber", "./Options/Classes/Particles/Number/ParticlesDensity", "./Options/Classes/Particles/Opacity/Opacity", "./Options/Classes/Particles/Opacity/OpacityAnimation", "./Options/Classes/Particles/Shape/Shape", "./Options/Classes/Particles/Size/Size", "./Options/Classes/Particles/Size/SizeAnimation", "./Options/Classes/Particles/ZIndex/ZIndex", "./Options/Classes/Responsive", "./Options/Classes/Theme/Theme", "./Options/Classes/Theme/ThemeDefault", "./Options/Classes/ValueWithRandom", "./Utils/CanvasUtils", "./Utils/ColorUtils", "./Utils/HslColorManager", "./Utils/NumberUtils", "./Utils/OptionsUtils", "./Utils/RgbColorManager", "./Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require("./Core/Utils/Circle"), exports);
    __exportStar(require("./Core/Utils/Constants"), exports);
    __exportStar(require("./Core/Utils/ExternalInteractorBase"), exports);
    __exportStar(require("./Core/Utils/ParticlesInteractorBase"), exports);
    __exportStar(require("./Core/Utils/Point"), exports);
    __exportStar(require("./Core/Utils/Range"), exports);
    __exportStar(require("./Core/Utils/Rectangle"), exports);
    __exportStar(require("./Core/Utils/Vector"), exports);
    __exportStar(require("./Core/Utils/Vector3d"), exports);
    __exportStar(require("./Enums/Directions/MoveDirection"), exports);
    __exportStar(require("./Enums/Directions/RotateDirection"), exports);
    __exportStar(require("./Enums/Directions/OutModeDirection"), exports);
    __exportStar(require("./Enums/Modes/AnimationMode"), exports);
    __exportStar(require("./Enums/Modes/ClickMode"), exports);
    __exportStar(require("./Enums/Modes/DivMode"), exports);
    __exportStar(require("./Enums/Modes/HoverMode"), exports);
    __exportStar(require("./Enums/Modes/CollisionMode"), exports);
    __exportStar(require("./Enums/Modes/OutMode"), exports);
    __exportStar(require("./Enums/Modes/PixelMode"), exports);
    __exportStar(require("./Enums/Modes/ThemeMode"), exports);
    __exportStar(require("./Enums/Modes/ResponsiveMode"), exports);
    __exportStar(require("./Enums/Types/AlterType"), exports);
    __exportStar(require("./Enums/Types/DestroyType"), exports);
    __exportStar(require("./Enums/Types/GradientType"), exports);
    __exportStar(require("./Enums/Types/InteractorType"), exports);
    __exportStar(require("./Enums/Types/ParticleOutType"), exports);
    __exportStar(require("./Enums/Types/StartValueType"), exports);
    __exportStar(require("./Enums/Types/DivType"), exports);
    __exportStar(require("./Enums/Types/EasingType"), exports);
    __exportStar(require("./Enums/Types/EventType"), exports);
    __exportStar(require("./Enums/AnimationStatus"), exports);
    __exportStar(require("./Enums/InteractivityDetect"), exports);
    __exportStar(require("./Options/Classes/AnimatableColor"), exports);
    __exportStar(require("./Options/Classes/AnimationOptions"), exports);
    __exportStar(require("./Options/Classes/Background/Background"), exports);
    __exportStar(require("./Options/Classes/BackgroundMask/BackgroundMask"), exports);
    __exportStar(require("./Options/Classes/BackgroundMask/BackgroundMaskCover"), exports);
    __exportStar(require("./Options/Classes/ColorAnimation"), exports);
    __exportStar(require("./Options/Classes/FullScreen/FullScreen"), exports);
    __exportStar(require("./Options/Classes/HslAnimation"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/ClickEvent"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/DivEvent"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/ClickEvent"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/DivEvent"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/Events"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/HoverEvent"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/Parallax"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/ResizeEvent"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Interactivity"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Modes/Modes"), exports);
    __exportStar(require("./Options/Classes/ManualParticle"), exports);
    __exportStar(require("./Options/Classes/Options"), exports);
    __exportStar(require("./Options/Classes/OptionsColor"), exports);
    __exportStar(require("./Options/Classes/Particles/Bounce/ParticlesBounce"), exports);
    __exportStar(require("./Options/Classes/Particles/Bounce/ParticlesBounceFactor"), exports);
    __exportStar(require("./Options/Classes/Particles/Collisions/Collisions"), exports);
    __exportStar(require("./Options/Classes/Particles/Collisions/CollisionsAbsorb"), exports);
    __exportStar(require("./Options/Classes/Particles/Collisions/CollisionsOverlap"), exports);
    __exportStar(require("./Options/Classes/Particles/ParticlesOptions"), exports);
    __exportStar(require("./Options/Classes/Particles/Shadow"), exports);
    __exportStar(require("./Options/Classes/Particles/Stroke"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/MoveAttract"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/Move"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/MoveAngle"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/MoveCenter"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/MoveGravity"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/OutModes"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/Path/MovePath"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/Spin"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/MoveTrail"), exports);
    __exportStar(require("./Options/Classes/Particles/Number/ParticlesNumber"), exports);
    __exportStar(require("./Options/Classes/Particles/Number/ParticlesDensity"), exports);
    __exportStar(require("./Options/Classes/Particles/Opacity/Opacity"), exports);
    __exportStar(require("./Options/Classes/Particles/Opacity/OpacityAnimation"), exports);
    __exportStar(require("./Options/Classes/Particles/Shape/Shape"), exports);
    __exportStar(require("./Options/Classes/Particles/Size/Size"), exports);
    __exportStar(require("./Options/Classes/Particles/Size/SizeAnimation"), exports);
    __exportStar(require("./Options/Classes/Particles/ZIndex/ZIndex"), exports);
    __exportStar(require("./Options/Classes/Responsive"), exports);
    __exportStar(require("./Options/Classes/Theme/Theme"), exports);
    __exportStar(require("./Options/Classes/Theme/ThemeDefault"), exports);
    __exportStar(require("./Options/Classes/ValueWithRandom"), exports);
    __exportStar(require("./Utils/CanvasUtils"), exports);
    __exportStar(require("./Utils/ColorUtils"), exports);
    __exportStar(require("./Utils/HslColorManager"), exports);
    __exportStar(require("./Utils/NumberUtils"), exports);
    __exportStar(require("./Utils/OptionsUtils"), exports);
    __exportStar(require("./Utils/RgbColorManager"), exports);
    __exportStar(require("./Utils/Utils"), exports);
});
