import type { IAnimatableColor } from "../IAnimatableColor";
import type { IColor } from "../../../Core/Interfaces/Colors";
import type { RangeValue } from "../../../Types/RangeValue";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
export interface IStroke {
    color?: string | RecursivePartial<IAnimatableColor> | RecursivePartial<IColor>;
    opacity?: RangeValue;
    width: RangeValue;
}
