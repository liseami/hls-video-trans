import { ThemeDefault } from "./ThemeDefault";
import { deepExtend } from "../../../Utils/Utils";
export class Theme {
    constructor() {
        this.name = "";
        this.default = new ThemeDefault();
    }
    load(data) {
        if (!data) {
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
