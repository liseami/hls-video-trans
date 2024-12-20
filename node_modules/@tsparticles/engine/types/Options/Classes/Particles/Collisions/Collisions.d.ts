import { CollisionMode } from "../../../../Enums/Modes/CollisionMode.js";
import { CollisionsAbsorb } from "./CollisionsAbsorb.js";
import { CollisionsOverlap } from "./CollisionsOverlap.js";
import type { ICollisions } from "../../../Interfaces/Particles/Collisions/ICollisions.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { ParticlesBounce } from "../Bounce/ParticlesBounce.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class Collisions implements ICollisions, IOptionLoader<ICollisions> {
    readonly absorb: CollisionsAbsorb;
    readonly bounce: ParticlesBounce;
    enable: boolean;
    maxSpeed: RangeValue;
    mode: CollisionMode | keyof typeof CollisionMode;
    readonly overlap: CollisionsOverlap;
    constructor();
    load(data?: RecursivePartial<ICollisions>): void;
}
