import type { IEffect } from "../../../Interfaces/Particles/Effect/IEffect.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { ShapeData } from "../../../../Types/ShapeData.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
export declare class Effect implements IEffect, IOptionLoader<IEffect> {
    close: boolean;
    fill: boolean;
    options: ShapeData;
    type: SingleOrMultiple<string>;
    constructor();
    load(data?: RecursivePartial<IEffect>): void;
}
