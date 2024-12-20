import { deepExtend, isArray } from "../../../../Utils/Utils";
const charKey = "character", charAltKey = "char", imageKey = "image", imageAltKey = "images", polygonKey = "polygon", polygonAltKey = "star";
export class Shape {
    constructor() {
        this.loadShape = (item, mainKey, altKey, altOverride) => {
            if (!item) {
                return;
            }
            const itemIsArray = isArray(item), emptyValue = itemIsArray ? [] : {}, mainDifferentValues = itemIsArray !== isArray(this.options[mainKey]), altDifferentValues = itemIsArray !== isArray(this.options[altKey]);
            if (mainDifferentValues) {
                this.options[mainKey] = emptyValue;
            }
            if (altDifferentValues && altOverride) {
                this.options[altKey] = emptyValue;
            }
            this.options[mainKey] = deepExtend(this.options[mainKey] ?? emptyValue, item);
            if (!this.options[altKey] || altOverride) {
                this.options[altKey] = deepExtend(this.options[altKey] ?? emptyValue, item);
            }
        };
        this.close = true;
        this.fill = true;
        this.options = {};
        this.type = "circle";
    }
    get character() {
        return (this.options[charKey] ?? this.options[charAltKey]);
    }
    set character(value) {
        this.options[charAltKey] = this.options[charKey] = value;
    }
    get custom() {
        return this.options;
    }
    set custom(value) {
        this.options = value;
    }
    get image() {
        return (this.options[imageKey] ?? this.options[imageAltKey]);
    }
    set image(value) {
        this.options[imageAltKey] = this.options[imageKey] = value;
    }
    get images() {
        return this.image;
    }
    set images(value) {
        this.image = value;
    }
    get polygon() {
        return (this.options[polygonKey] ?? this.options[polygonAltKey]);
    }
    set polygon(value) {
        this.options[polygonAltKey] = this.options[polygonKey] = value;
    }
    get stroke() {
        return [];
    }
    set stroke(_value) {
    }
    load(data) {
        if (!data) {
            return;
        }
        const options = data.options ?? data.custom;
        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];
                if (item) {
                    this.options[shape] = deepExtend(this.options[shape] ?? {}, item);
                }
            }
        }
        this.loadShape(data.character, charKey, charAltKey, true);
        this.loadShape(data.polygon, polygonKey, polygonAltKey, false);
        this.loadShape(data.image ?? data.images, imageKey, imageAltKey, true);
        if (data.close !== undefined) {
            this.close = data.close;
        }
        if (data.fill !== undefined) {
            this.fill = data.fill;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
