import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import { DestroyBounds } from "./DestroyBounds.js";
import { DestroyMode } from "../../Enums/DestroyMode.js";
import type { IDestroy } from "../Interfaces/IDestroy.js";
import { Split } from "./Split.js";
export declare class Destroy implements IDestroy, IOptionLoader<IDestroy> {
    bounds: DestroyBounds;
    mode: DestroyMode | keyof typeof DestroyMode;
    split: Split;
    constructor();
    load(data?: RecursivePartial<IDestroy>): void;
}
