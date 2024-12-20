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
    exports.isBoolean = isBoolean;
    exports.isString = isString;
    exports.isNumber = isNumber;
    exports.isFunction = isFunction;
    exports.isObject = isObject;
    exports.isArray = isArray;
    exports.isNull = isNull;
    function isBoolean(arg) {
        return typeof arg === "boolean";
    }
    function isString(arg) {
        return typeof arg === "string";
    }
    function isNumber(arg) {
        return typeof arg === "number";
    }
    function isFunction(arg) {
        return typeof arg === "function";
    }
    function isObject(arg) {
        return typeof arg === "object" && arg !== null;
    }
    function isArray(arg) {
        return Array.isArray(arg);
    }
    function isNull(arg) {
        return arg === null || arg === undefined;
    }
});
