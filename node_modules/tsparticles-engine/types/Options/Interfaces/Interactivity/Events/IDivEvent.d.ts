import type { DivMode } from "../../../../Enums/Modes/DivMode";
import type { DivType } from "../../../../Enums/Types/DivType";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export interface IDivEvent {
    el: SingleOrMultiple<string>;
    elementId: SingleOrMultiple<string>;
    enable: boolean;
    ids: SingleOrMultiple<string>;
    mode: SingleOrMultiple<DivMode | keyof typeof DivMode | string>;
    selectors: SingleOrMultiple<string>;
    type: DivType | keyof typeof DivType;
}
