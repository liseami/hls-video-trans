export function isBoolean(arg) {
    return typeof arg === "boolean";
}
export function isString(arg) {
    return typeof arg === "string";
}
export function isNumber(arg) {
    return typeof arg === "number";
}
export function isFunction(arg) {
    return typeof arg === "function";
}
export function isObject(arg) {
    return typeof arg === "object" && arg !== null;
}
export function isArray(arg) {
    return Array.isArray(arg);
}
export function isNull(arg) {
    return arg === null || arg === undefined;
}
