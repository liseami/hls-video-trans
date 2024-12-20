"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalInteractorBase = void 0;
const InteractorType_js_1 = require("../../Enums/Types/InteractorType.js");
class ExternalInteractorBase {
    constructor(container) {
        this.type = InteractorType_js_1.InteractorType.external;
        this.container = container;
    }
}
exports.ExternalInteractorBase = ExternalInteractorBase;
