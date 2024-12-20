import type { ILinksShadow } from "./ILinksShadow.js";
import type { ILinksTriangle } from "./ILinksTriangle.js";
import type { IOptionsColor } from "@tsparticles/engine";
export interface ILinks {
    blink: boolean;
    color: string | IOptionsColor;
    consent: boolean;
    distance: number;
    enable: boolean;
    frequency: number;
    id?: string;
    opacity: number;
    shadow: ILinksShadow;
    triangles: ILinksTriangle;
    warp: boolean;
    width: number;
}
