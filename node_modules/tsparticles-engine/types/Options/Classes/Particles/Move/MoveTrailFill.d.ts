import type { IMoveTrailFill } from "../../../Interfaces/Particles/Move/IMoveTrailFill";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class MoveTrailFill implements IMoveTrailFill, IOptionLoader<IMoveTrailFill> {
    color?: OptionsColor;
    image?: string;
    load(data?: RecursivePartial<IMoveTrailFill>): void;
}
