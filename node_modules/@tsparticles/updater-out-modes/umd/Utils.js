(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bounceHorizontal = bounceHorizontal;
    exports.bounceVertical = bounceVertical;
    const engine_1 = require("@tsparticles/engine");
    const minVelocity = 0, boundsMin = 0;
    function bounceHorizontal(data) {
        if ((data.outMode !== engine_1.OutMode.bounce && data.outMode !== engine_1.OutMode.split) ||
            (data.direction !== engine_1.OutModeDirection.left && data.direction !== engine_1.OutModeDirection.right)) {
            return;
        }
        if (data.bounds.right < boundsMin && data.direction === engine_1.OutModeDirection.left) {
            data.particle.position.x = data.size + data.offset.x;
        }
        else if (data.bounds.left > data.canvasSize.width && data.direction === engine_1.OutModeDirection.right) {
            data.particle.position.x = data.canvasSize.width - data.size - data.offset.x;
        }
        const velocity = data.particle.velocity.x;
        let bounced = false;
        if ((data.direction === engine_1.OutModeDirection.right &&
            data.bounds.right >= data.canvasSize.width &&
            velocity > minVelocity) ||
            (data.direction === engine_1.OutModeDirection.left && data.bounds.left <= boundsMin && velocity < minVelocity)) {
            const newVelocity = (0, engine_1.getRangeValue)(data.particle.options.bounce.horizontal.value);
            data.particle.velocity.x *= -newVelocity;
            bounced = true;
        }
        if (!bounced) {
            return;
        }
        const minPos = data.offset.x + data.size;
        if (data.bounds.right >= data.canvasSize.width && data.direction === engine_1.OutModeDirection.right) {
            data.particle.position.x = data.canvasSize.width - minPos;
        }
        else if (data.bounds.left <= boundsMin && data.direction === engine_1.OutModeDirection.left) {
            data.particle.position.x = minPos;
        }
        if (data.outMode === engine_1.OutMode.split) {
            data.particle.destroy();
        }
    }
    function bounceVertical(data) {
        if ((data.outMode !== engine_1.OutMode.bounce && data.outMode !== engine_1.OutMode.split) ||
            (data.direction !== engine_1.OutModeDirection.bottom && data.direction !== engine_1.OutModeDirection.top)) {
            return;
        }
        if (data.bounds.bottom < boundsMin && data.direction === engine_1.OutModeDirection.top) {
            data.particle.position.y = data.size + data.offset.y;
        }
        else if (data.bounds.top > data.canvasSize.height && data.direction === engine_1.OutModeDirection.bottom) {
            data.particle.position.y = data.canvasSize.height - data.size - data.offset.y;
        }
        const velocity = data.particle.velocity.y;
        let bounced = false;
        if ((data.direction === engine_1.OutModeDirection.bottom &&
            data.bounds.bottom >= data.canvasSize.height &&
            velocity > minVelocity) ||
            (data.direction === engine_1.OutModeDirection.top && data.bounds.top <= boundsMin && velocity < minVelocity)) {
            const newVelocity = (0, engine_1.getRangeValue)(data.particle.options.bounce.vertical.value);
            data.particle.velocity.y *= -newVelocity;
            bounced = true;
        }
        if (!bounced) {
            return;
        }
        const minPos = data.offset.y + data.size;
        if (data.bounds.bottom >= data.canvasSize.height && data.direction === engine_1.OutModeDirection.bottom) {
            data.particle.position.y = data.canvasSize.height - minPos;
        }
        else if (data.bounds.top <= boundsMin && data.direction === engine_1.OutModeDirection.top) {
            data.particle.position.y = minPos;
        }
        if (data.outMode === engine_1.OutMode.split) {
            data.particle.destroy();
        }
    }
});
