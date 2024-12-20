import type { ISourceOptions } from "../../Types/ISourceOptions";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
export interface ILoadParams {
    element?: HTMLElement;
    id?: string;
    index?: number;
    options?: SingleOrMultiple<ISourceOptions>;
    url?: SingleOrMultiple<string>;
}
