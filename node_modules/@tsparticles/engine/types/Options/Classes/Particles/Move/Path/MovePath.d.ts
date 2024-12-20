import type { IMovePath } from "../../../../Interfaces/Particles/Move/Path/IMovePath.js";
import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader.js";
import type { PathOptions } from "../../../../../Types/PathOptions.js";
import type { RecursivePartial } from "../../../../../Types/RecursivePartial.js";
import { ValueWithRandom } from "../../../ValueWithRandom.js";
export declare class MovePath implements IMovePath, IOptionLoader<IMovePath> {
    clamp: boolean;
    delay: ValueWithRandom;
    enable: boolean;
    generator?: string;
    options: PathOptions;
    constructor();
    load(data?: RecursivePartial<IMovePath>): void;
}
