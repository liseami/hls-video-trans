import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IResizeEvent } from "../../../Interfaces/Interactivity/Events/IResizeEvent";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class ResizeEvent implements IResizeEvent, IOptionLoader<IResizeEvent> {
    delay: number;
    enable: boolean;
    constructor();
    load(data?: RecursivePartial<IResizeEvent>): void;
}
