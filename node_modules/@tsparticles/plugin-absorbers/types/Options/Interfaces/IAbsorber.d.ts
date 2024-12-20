import type { IOptionsColor, IRangedCoordinates, RecursivePartial } from "@tsparticles/engine";
import type { IAbsorberSize } from "./IAbsorberSize.js";
export interface IAbsorber {
    color: string | IOptionsColor;
    destroy: boolean;
    draggable: boolean;
    name?: string;
    opacity: number;
    orbits: boolean;
    position?: RecursivePartial<IRangedCoordinates>;
    size: IAbsorberSize;
}
