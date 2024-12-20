import type { ICollisionsAbsorb } from "../../../Interfaces/Particles/Collisions/ICollisionsAbsorb";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class CollisionsAbsorb implements ICollisionsAbsorb, IOptionLoader<ICollisionsAbsorb> {
    speed: number;
    constructor();
    load(data?: RecursivePartial<ICollisionsAbsorb>): void;
}
