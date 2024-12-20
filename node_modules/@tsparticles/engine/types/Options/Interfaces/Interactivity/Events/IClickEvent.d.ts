import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
export interface IClickEvent {
    enable: boolean;
    mode: SingleOrMultiple<string>;
}
