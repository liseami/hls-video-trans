import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import type { IConnectLinks } from "../Interfaces/IConnectLinks.js";
export declare class ConnectLinks implements IConnectLinks, IOptionLoader<IConnectLinks> {
    opacity: number;
    constructor();
    load(data?: RecursivePartial<IConnectLinks>): void;
}
