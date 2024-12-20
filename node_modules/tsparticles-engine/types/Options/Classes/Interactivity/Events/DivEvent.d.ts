import type { DivMode } from "../../../../Enums/Modes/DivMode";
import { DivType } from "../../../../Enums/Types/DivType";
import type { IDivEvent } from "../../../Interfaces/Interactivity/Events/IDivEvent";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export declare class DivEvent implements IDivEvent, IOptionLoader<IDivEvent> {
    enable: boolean;
    mode: SingleOrMultiple<DivMode | keyof typeof DivMode | string>;
    selectors: SingleOrMultiple<string>;
    type: DivType | keyof typeof DivType;
    constructor();
    get el(): SingleOrMultiple<string>;
    set el(value: SingleOrMultiple<string>);
    get elementId(): SingleOrMultiple<string>;
    set elementId(value: SingleOrMultiple<string>);
    get ids(): SingleOrMultiple<string>;
    set ids(value: SingleOrMultiple<string>);
    load(data?: RecursivePartial<IDivEvent>): void;
}
