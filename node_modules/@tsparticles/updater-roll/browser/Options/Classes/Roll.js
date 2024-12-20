import { OptionsColor, isNull, setRangeValue, } from "@tsparticles/engine";
import { RollLight } from "./RollLight.js";
import { RollMode } from "../../RollMode.js";
export class Roll {
    constructor() {
        this.darken = new RollLight();
        this.enable = false;
        this.enlighten = new RollLight();
        this.mode = RollMode.vertical;
        this.speed = 25;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.backColor !== undefined) {
            this.backColor = OptionsColor.create(this.backColor, data.backColor);
        }
        this.darken.load(data.darken);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.enlighten.load(data.enlighten);
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }
    }
}
