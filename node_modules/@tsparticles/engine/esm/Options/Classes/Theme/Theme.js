import { ThemeDefault } from "./ThemeDefault.js";
import { deepExtend } from "../../../Utils/Utils.js";
import { isNull } from "../../../Utils/TypeUtils.js";
export class Theme {
    constructor() {
        this.name = "";
        this.default = new ThemeDefault();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        this.default.load(data.default);
        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options);
        }
    }
}
