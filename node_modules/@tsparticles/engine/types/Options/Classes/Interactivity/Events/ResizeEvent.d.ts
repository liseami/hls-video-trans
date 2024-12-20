import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IResizeEvent } from "../../../Interfaces/Interactivity/Events/IResizeEvent.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class ResizeEvent implements IResizeEvent, IOptionLoader<IResizeEvent> {
    delay: number;
    enable: boolean;
    constructor();
    load(data?: RecursivePartial<IResizeEvent>): void;
}
