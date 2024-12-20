import type { ICollisionsOverlap } from "../../../Interfaces/Particles/Collisions/ICollisionsOverlap";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class CollisionsOverlap implements ICollisionsOverlap, IOptionLoader<ICollisionsOverlap> {
    enable: boolean;
    retries: number;
    constructor();
    load(data?: RecursivePartial<ICollisionsOverlap>): void;
}
