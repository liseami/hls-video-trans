import type { IMoveTrail } from "../../../Interfaces/Particles/Move/IMoveTrail";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { MoveTrailFill } from "./MoveTrailFill";
import type { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class MoveTrail implements IMoveTrail, IOptionLoader<IMoveTrail> {
    enable: boolean;
    fill: MoveTrailFill;
    length: number;
    constructor();
    get fillColor(): string | OptionsColor | undefined;
    set fillColor(value: string | OptionsColor | undefined);
    load(data?: RecursivePartial<IMoveTrail>): void;
}
