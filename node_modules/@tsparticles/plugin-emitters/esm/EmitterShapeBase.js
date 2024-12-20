export class EmitterShapeBase {
    constructor(position, size, fill, options) {
        this.position = position;
        this.size = size;
        this.fill = fill;
        this.options = options;
    }
    resize(position, size) {
        this.position = position;
        this.size = size;
    }
}
