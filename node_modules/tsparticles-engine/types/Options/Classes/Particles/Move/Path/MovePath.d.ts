import type { IMovePath } from "../../../../Interfaces/Particles/Move/Path/IMovePath";
import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader";
import type { PathOptions } from "../../../../../Types/PathOptions";
import type { RecursivePartial } from "../../../../../Types/RecursivePartial";
import { ValueWithRandom } from "../../../ValueWithRandom";
export declare class MovePath implements IMovePath, IOptionLoader<IMovePath> {
    clamp: boolean;
    delay: ValueWithRandom;
    enable: boolean;
    generator?: string;
    options: PathOptions;
    constructor();
    load(data?: RecursivePartial<IMovePath>): void;
}
