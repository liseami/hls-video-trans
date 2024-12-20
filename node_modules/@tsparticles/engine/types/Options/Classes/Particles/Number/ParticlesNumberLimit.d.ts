import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IParticlesNumberLimit } from "../../../Interfaces/Particles/Number/IParticlesNumberLimit.js";
import { LimitMode } from "../../../../Enums/Modes/LimitMode.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class ParticlesNumberLimit implements IParticlesNumberLimit, IOptionLoader<IParticlesNumberLimit> {
    mode: LimitMode | keyof typeof LimitMode;
    value: number;
    constructor();
    load(data?: RecursivePartial<IParticlesNumberLimit>): void;
}
