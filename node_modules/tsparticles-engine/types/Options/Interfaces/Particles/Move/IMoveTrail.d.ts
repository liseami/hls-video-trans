import type { IMoveTrailFill } from "./IMoveTrailFill";
import type { IOptionsColor } from "../../IOptionsColor";
export interface IMoveTrail {
    enable: boolean;
    fill: IMoveTrailFill;
    fillColor?: string | IOptionsColor;
    length: number;
}
