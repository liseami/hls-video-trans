import type { ShapeData } from "../../../../Types/ShapeData.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
export interface IShape {
    close: boolean;
    fill: boolean;
    options: ShapeData;
    type: SingleOrMultiple<string>;
}
