import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IShape } from "../../../Interfaces/Particles/Shape/IShape.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { ShapeData } from "../../../../Types/ShapeData.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
export declare class Shape implements IShape, IOptionLoader<IShape> {
    close: boolean;
    fill: boolean;
    options: ShapeData;
    type: SingleOrMultiple<string>;
    constructor();
    load(data?: RecursivePartial<IShape>): void;
}
