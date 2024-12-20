import { DivType } from "../../../../Enums/Types/DivType.js";
import type { IDivEvent } from "../../../Interfaces/Interactivity/Events/IDivEvent.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
export declare class DivEvent implements IDivEvent, IOptionLoader<IDivEvent> {
    enable: boolean;
    mode: SingleOrMultiple<string>;
    selectors: SingleOrMultiple<string>;
    type: DivType | keyof typeof DivType;
    constructor();
    load(data?: RecursivePartial<IDivEvent>): void;
}
