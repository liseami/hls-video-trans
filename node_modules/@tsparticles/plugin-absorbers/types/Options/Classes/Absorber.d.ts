import { type IOptionLoader, type IRangedCoordinates, OptionsColor, type RecursivePartial } from "@tsparticles/engine";
import { AbsorberSize } from "./AbsorberSize.js";
import type { IAbsorber } from "../Interfaces/IAbsorber.js";
export declare class Absorber implements IAbsorber, IOptionLoader<IAbsorber> {
    color: OptionsColor;
    destroy: boolean;
    draggable: boolean;
    name?: string;
    opacity: number;
    orbits: boolean;
    position?: RecursivePartial<IRangedCoordinates>;
    size: AbsorberSize;
    constructor();
    load(data?: RecursivePartial<IAbsorber>): void;
}
