import { ThemeMode } from "../../../Enums/Modes/ThemeMode.js";
import { isNull } from "../../../Utils/TypeUtils.js";
export class ThemeDefault {
    constructor() {
        this.auto = false;
        this.mode = ThemeMode.any;
        this.value = false;
    }
    load(data) {
        if (isNull(data)) {
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
