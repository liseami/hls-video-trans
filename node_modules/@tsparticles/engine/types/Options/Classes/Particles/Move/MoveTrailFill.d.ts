import type { IMoveTrailFill } from "../../../Interfaces/Particles/Move/IMoveTrailFill.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { OptionsColor } from "../../OptionsColor.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class MoveTrailFill implements IMoveTrailFill, IOptionLoader<IMoveTrailFill> {
    color?: OptionsColor;
    image?: string;
    load(data?: RecursivePartial<IMoveTrailFill>): void;
}
