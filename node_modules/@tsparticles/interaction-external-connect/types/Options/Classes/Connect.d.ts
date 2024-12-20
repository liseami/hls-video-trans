import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import { ConnectLinks } from "./ConnectLinks.js";
import type { IConnect } from "../Interfaces/IConnect.js";
export declare class Connect implements IConnect, IOptionLoader<IConnect> {
    distance: number;
    links: ConnectLinks;
    radius: number;
    constructor();
    load(data?: RecursivePartial<IConnect>): void;
}
