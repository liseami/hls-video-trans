import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";
export interface ILoadParams {
    element?: HTMLElement;
    id?: string;
    index?: number;
    options?: SingleOrMultiple<ISourceOptions>;
    url?: SingleOrMultiple<string>;
}
