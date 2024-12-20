import type { CustomEventArgs } from "../Types/CustomEventArgs.js";
import type { CustomEventListener } from "../Types/CustomEventListener.js";
export declare class EventDispatcher {
    private _listeners;
    constructor();
    addEventListener(type: string, listener: CustomEventListener): void;
    dispatchEvent(type: string, args: CustomEventArgs): void;
    hasEventListener(type: string): boolean;
    removeAllEventListeners(type?: string): void;
    removeEventListener(type: string, listener: CustomEventListener): void;
}
