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
        define(["require", "exports", "./Core/Utils/Constants.js", "./Core/Utils/ExternalInteractorBase.js", "./Core/Utils/ParticlesInteractorBase.js", "./Core/Utils/Point.js", "./Core/Utils/Ranges.js", "./Core/Utils/Vectors.js", "./Enums/Directions/MoveDirection.js", "./Enums/Directions/RotateDirection.js", "./Enums/Directions/OutModeDirection.js", "./Enums/Modes/AnimationMode.js", "./Enums/Modes/CollisionMode.js", "./Enums/Modes/LimitMode.js", "./Enums/Modes/OutMode.js", "./Enums/Modes/PixelMode.js", "./Enums/Modes/ThemeMode.js", "./Enums/Modes/ResponsiveMode.js", "./Enums/Types/AlterType.js", "./Enums/Types/DestroyType.js", "./Enums/Types/GradientType.js", "./Enums/Types/InteractorType.js", "./Enums/Types/ParticleOutType.js", "./Enums/Types/StartValueType.js", "./Enums/Types/DivType.js", "./Enums/Types/EasingType.js", "./Enums/Types/EventType.js", "./Enums/AnimationStatus.js", "./Enums/InteractivityDetect.js", "./Options/Classes/AnimatableColor.js", "./Options/Classes/AnimationOptions.js", "./Options/Classes/Background/Background.js", "./Options/Classes/BackgroundMask/BackgroundMask.js", "./Options/Classes/BackgroundMask/BackgroundMaskCover.js", "./Options/Classes/ColorAnimation.js", "./Options/Classes/FullScreen/FullScreen.js", "./Options/Classes/HslAnimation.js", "./Options/Classes/Interactivity/Events/ClickEvent.js", "./Options/Classes/Interactivity/Events/DivEvent.js", "./Options/Classes/Interactivity/Events/ClickEvent.js", "./Options/Classes/Interactivity/Events/DivEvent.js", "./Options/Classes/Interactivity/Events/Events.js", "./Options/Classes/Interactivity/Events/HoverEvent.js", "./Options/Classes/Interactivity/Events/Parallax.js", "./Options/Classes/Interactivity/Events/ResizeEvent.js", "./Options/Classes/Interactivity/Interactivity.js", "./Options/Classes/Interactivity/Modes/Modes.js", "./Options/Classes/ManualParticle.js", "./Options/Classes/Options.js", "./Options/Classes/OptionsColor.js", "./Options/Classes/Particles/Bounce/ParticlesBounce.js", "./Options/Classes/Particles/Bounce/ParticlesBounceFactor.js", "./Options/Classes/Particles/Collisions/Collisions.js", "./Options/Classes/Particles/Collisions/CollisionsAbsorb.js", "./Options/Classes/Particles/Collisions/CollisionsOverlap.js", "./Options/Classes/Particles/ParticlesOptions.js", "./Options/Classes/Particles/Shadow.js", "./Options/Classes/Particles/Stroke.js", "./Options/Classes/Particles/Move/MoveAttract.js", "./Options/Classes/Particles/Move/Move.js", "./Options/Classes/Particles/Move/MoveAngle.js", "./Options/Classes/Particles/Move/MoveCenter.js", "./Options/Classes/Particles/Move/MoveGravity.js", "./Options/Classes/Particles/Move/OutModes.js", "./Options/Classes/Particles/Move/Path/MovePath.js", "./Options/Classes/Particles/Move/Spin.js", "./Options/Classes/Particles/Move/MoveTrail.js", "./Options/Classes/Particles/Number/ParticlesNumber.js", "./Options/Classes/Particles/Number/ParticlesNumberLimit.js", "./Options/Classes/Particles/Number/ParticlesDensity.js", "./Options/Classes/Particles/Opacity/Opacity.js", "./Options/Classes/Particles/Opacity/OpacityAnimation.js", "./Options/Classes/Particles/Shape/Shape.js", "./Options/Classes/Particles/Size/Size.js", "./Options/Classes/Particles/Size/SizeAnimation.js", "./Options/Classes/Particles/ZIndex/ZIndex.js", "./Options/Classes/Responsive.js", "./Options/Classes/Theme/Theme.js", "./Options/Classes/Theme/ThemeDefault.js", "./Options/Classes/ValueWithRandom.js", "./Utils/CanvasUtils.js", "./Utils/ColorUtils.js", "./Utils/NumberUtils.js", "./Utils/OptionsUtils.js", "./Utils/Utils.js", "./Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require("./Core/Utils/Constants.js"), exports);
    __exportStar(require("./Core/Utils/ExternalInteractorBase.js"), exports);
    __exportStar(require("./Core/Utils/ParticlesInteractorBase.js"), exports);
    __exportStar(require("./Core/Utils/Point.js"), exports);
    __exportStar(require("./Core/Utils/Ranges.js"), exports);
    __exportStar(require("./Core/Utils/Vectors.js"), exports);
    __exportStar(require("./Enums/Directions/MoveDirection.js"), exports);
    __exportStar(require("./Enums/Directions/RotateDirection.js"), exports);
    __exportStar(require("./Enums/Directions/OutModeDirection.js"), exports);
    __exportStar(require("./Enums/Modes/AnimationMode.js"), exports);
    __exportStar(require("./Enums/Modes/CollisionMode.js"), exports);
    __exportStar(require("./Enums/Modes/LimitMode.js"), exports);
    __exportStar(require("./Enums/Modes/OutMode.js"), exports);
    __exportStar(require("./Enums/Modes/PixelMode.js"), exports);
    __exportStar(require("./Enums/Modes/ThemeMode.js"), exports);
    __exportStar(require("./Enums/Modes/ResponsiveMode.js"), exports);
    __exportStar(require("./Enums/Types/AlterType.js"), exports);
    __exportStar(require("./Enums/Types/DestroyType.js"), exports);
    __exportStar(require("./Enums/Types/GradientType.js"), exports);
    __exportStar(require("./Enums/Types/InteractorType.js"), exports);
    __exportStar(require("./Enums/Types/ParticleOutType.js"), exports);
    __exportStar(require("./Enums/Types/StartValueType.js"), exports);
    __exportStar(require("./Enums/Types/DivType.js"), exports);
    __exportStar(require("./Enums/Types/EasingType.js"), exports);
    __exportStar(require("./Enums/Types/EventType.js"), exports);
    __exportStar(require("./Enums/AnimationStatus.js"), exports);
    __exportStar(require("./Enums/InteractivityDetect.js"), exports);
    __exportStar(require("./Options/Classes/AnimatableColor.js"), exports);
    __exportStar(require("./Options/Classes/AnimationOptions.js"), exports);
    __exportStar(require("./Options/Classes/Background/Background.js"), exports);
    __exportStar(require("./Options/Classes/BackgroundMask/BackgroundMask.js"), exports);
    __exportStar(require("./Options/Classes/BackgroundMask/BackgroundMaskCover.js"), exports);
    __exportStar(require("./Options/Classes/ColorAnimation.js"), exports);
    __exportStar(require("./Options/Classes/FullScreen/FullScreen.js"), exports);
    __exportStar(require("./Options/Classes/HslAnimation.js"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/ClickEvent.js"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/DivEvent.js"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/ClickEvent.js"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/DivEvent.js"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/Events.js"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/HoverEvent.js"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/Parallax.js"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Events/ResizeEvent.js"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Interactivity.js"), exports);
    __exportStar(require("./Options/Classes/Interactivity/Modes/Modes.js"), exports);
    __exportStar(require("./Options/Classes/ManualParticle.js"), exports);
    __exportStar(require("./Options/Classes/Options.js"), exports);
    __exportStar(require("./Options/Classes/OptionsColor.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Bounce/ParticlesBounce.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Bounce/ParticlesBounceFactor.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Collisions/Collisions.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Collisions/CollisionsAbsorb.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Collisions/CollisionsOverlap.js"), exports);
    __exportStar(require("./Options/Classes/Particles/ParticlesOptions.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Shadow.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Stroke.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/MoveAttract.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/Move.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/MoveAngle.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/MoveCenter.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/MoveGravity.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/OutModes.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/Path/MovePath.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/Spin.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Move/MoveTrail.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Number/ParticlesNumber.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Number/ParticlesNumberLimit.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Number/ParticlesDensity.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Opacity/Opacity.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Opacity/OpacityAnimation.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Shape/Shape.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Size/Size.js"), exports);
    __exportStar(require("./Options/Classes/Particles/Size/SizeAnimation.js"), exports);
    __exportStar(require("./Options/Classes/Particles/ZIndex/ZIndex.js"), exports);
    __exportStar(require("./Options/Classes/Responsive.js"), exports);
    __exportStar(require("./Options/Classes/Theme/Theme.js"), exports);
    __exportStar(require("./Options/Classes/Theme/ThemeDefault.js"), exports);
    __exportStar(require("./Options/Classes/ValueWithRandom.js"), exports);
    __exportStar(require("./Utils/CanvasUtils.js"), exports);
    __exportStar(require("./Utils/ColorUtils.js"), exports);
    __exportStar(require("./Utils/NumberUtils.js"), exports);
    __exportStar(require("./Utils/OptionsUtils.js"), exports);
    __exportStar(require("./Utils/Utils.js"), exports);
    __exportStar(require("./Utils/TypeUtils.js"), exports);
});
