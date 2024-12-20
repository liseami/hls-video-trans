import type { IMoveTrail } from "../../../Interfaces/Particles/Move/IMoveTrail.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { MoveTrailFill } from "./MoveTrailFill.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class MoveTrail implements IMoveTrail, IOptionLoader<IMoveTrail> {
    enable: boolean;
    readonly fill: MoveTrailFill;
    length: number;
    constructor();
    load(data?: RecursivePartial<IMoveTrail>): void;
}
