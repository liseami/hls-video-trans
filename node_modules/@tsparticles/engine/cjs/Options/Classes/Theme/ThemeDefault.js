"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeDefault = void 0;
const ThemeMode_js_1 = require("../../../Enums/Modes/ThemeMode.js");
const TypeUtils_js_1 = require("../../../Utils/TypeUtils.js");
class ThemeDefault {
    constructor() {
        this.auto = false;
        this.mode = ThemeMode_js_1.ThemeMode.any;
        this.value = false;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.auto !== undefined) {
            this.auto = data.auto;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
exports.ThemeDefault = ThemeDefault;
