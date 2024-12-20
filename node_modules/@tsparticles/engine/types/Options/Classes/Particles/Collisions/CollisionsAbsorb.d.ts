import type { ICollisionsAbsorb } from "../../../Interfaces/Particles/Collisions/ICollisionsAbsorb.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class CollisionsAbsorb implements ICollisionsAbsorb, IOptionLoader<ICollisionsAbsorb> {
    speed: number;
    constructor();
    load(data?: RecursivePartial<ICollisionsAbsorb>): void;
}
