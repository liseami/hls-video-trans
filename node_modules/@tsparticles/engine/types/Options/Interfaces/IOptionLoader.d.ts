import type { RecursivePartial } from "../../Types/RecursivePartial.js";
export interface IOptionLoader<T> {
    load(data?: RecursivePartial<T>): void;
}
