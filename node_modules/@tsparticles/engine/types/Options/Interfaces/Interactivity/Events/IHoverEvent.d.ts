import type { IParallax } from "./IParallax.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
export interface IHoverEvent {
    enable: boolean;
    mode: SingleOrMultiple<string>;
    parallax: IParallax;
}
