(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventDispatcher = void 0;
    class EventDispatcher {
        constructor() {
            this._listeners = new Map();
        }
        addEventListener(type, listener) {
            this.removeEventListener(type, listener);
            let arr = this._listeners.get(type);
            if (!arr) {
                arr = [];
                this._listeners.set(type, arr);
            }
            arr.push(listener);
        }
        dispatchEvent(type, args) {
            const listeners = this._listeners.get(type);
            listeners?.forEach(handler => handler(args));
        }
        hasEventListener(type) {
            return !!this._listeners.get(type);
        }
        removeAllEventListeners(type) {
            if (!type) {
                this._listeners = new Map();
            }
            else {
                this._listeners.delete(type);
            }
        }
        removeEventListener(type, listener) {
            const arr = this._listeners.get(type);
            if (!arr) {
                return;
            }
            const length = arr.length, idx = arr.indexOf(listener), minIndex = 0;
            if (idx < minIndex) {
                return;
            }
            const deleteCount = 1;
            if (length === deleteCount) {
                this._listeners.delete(type);
            }
            else {
                arr.splice(idx, deleteCount);
            }
        }
    }
    exports.EventDispatcher = EventDispatcher;
});
