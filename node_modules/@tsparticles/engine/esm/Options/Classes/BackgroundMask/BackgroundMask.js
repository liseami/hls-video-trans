import { isNull, isString } from "../../../Utils/TypeUtils.js";
import { BackgroundMaskCover } from "./BackgroundMaskCover.js";
export class BackgroundMask {
    constructor() {
        this.composite = "destination-out";
        this.cover = new BackgroundMaskCover();
        this.enable = false;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.composite !== undefined) {
            this.composite = data.composite;
        }
        if (data.cover !== undefined) {
            const cover = data.cover, color = (isString(data.cover) ? { color: data.cover } : data.cover);
            this.cover.load(cover.color !== undefined || cover.image !== undefined ? cover : { color: color });
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
