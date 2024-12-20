import type { IAnimatableColor } from "../IAnimatableColor.js";
import type { IColor } from "../../../Core/Interfaces/Colors.js";
import type { RangeValue } from "../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
export interface IStroke {
    color?: string | RecursivePartial<IAnimatableColor> | RecursivePartial<IColor>;
    opacity?: RangeValue;
    width: RangeValue;
}
