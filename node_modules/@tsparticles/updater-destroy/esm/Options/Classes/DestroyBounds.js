import { isNull, setRangeValue } from "@tsparticles/engine";
export class DestroyBounds {
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.bottom !== undefined) {
            this.bottom = setRangeValue(data.bottom);
        }
        if (data.left !== undefined) {
            this.left = setRangeValue(data.left);
        }
        if (data.right !== undefined) {
            this.right = setRangeValue(data.right);
        }
        if (data.top !== undefined) {
            this.top = setRangeValue(data.top);
        }
    }
}
