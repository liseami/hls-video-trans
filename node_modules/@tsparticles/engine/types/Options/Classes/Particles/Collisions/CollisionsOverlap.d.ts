import type { ICollisionsOverlap } from "../../../Interfaces/Particles/Collisions/ICollisionsOverlap.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class CollisionsOverlap implements ICollisionsOverlap, IOptionLoader<ICollisionsOverlap> {
    enable: boolean;
    retries: number;
    constructor();
    load(data?: RecursivePartial<ICollisionsOverlap>): void;
}
