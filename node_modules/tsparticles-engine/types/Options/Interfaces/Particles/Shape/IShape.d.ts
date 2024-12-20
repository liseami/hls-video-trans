import type { ICharacterShape } from "./ICharacterShape";
import type { IImageShape } from "./IImageShape";
import type { IPolygonShape } from "./IPolygonShape";
import type { IStroke } from "../IStroke";
import type { ShapeData } from "../../../../Types/ShapeData";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export interface IShape {
    character: SingleOrMultiple<ICharacterShape>;
    close: boolean;
    custom: ShapeData;
    fill: boolean;
    image: SingleOrMultiple<IImageShape>;
    images: SingleOrMultiple<IImageShape>;
    options: ShapeData;
    polygon: SingleOrMultiple<IPolygonShape>;
    stroke: SingleOrMultiple<IStroke>;
    type: SingleOrMultiple<string>;
}
