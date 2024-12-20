import { CollisionMode } from "../../../../Enums/Modes/CollisionMode";
import { CollisionsAbsorb } from "./CollisionsAbsorb";
import { CollisionsOverlap } from "./CollisionsOverlap";
import type { ICollisions } from "../../../Interfaces/Particles/Collisions/ICollisions";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { ParticlesBounce } from "../Bounce/ParticlesBounce";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Collisions implements ICollisions, IOptionLoader<ICollisions> {
    absorb: CollisionsAbsorb;
    bounce: ParticlesBounce;
    enable: boolean;
    maxSpeed: RangeValue;
    mode: CollisionMode | keyof typeof CollisionMode;
    overlap: CollisionsOverlap;
    constructor();
    load(data?: RecursivePartial<ICollisions>): void;
}
