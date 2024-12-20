import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import { GrabLinks } from "./GrabLinks.js";
import type { IGrab } from "../Interfaces/IGrab.js";
export declare class Grab implements IGrab, IOptionLoader<IGrab> {
    distance: number;
    links: GrabLinks;
    constructor();
    load(data?: RecursivePartial<IGrab>): void;
}
