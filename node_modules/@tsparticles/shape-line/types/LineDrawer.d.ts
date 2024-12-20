import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
export declare class LineDrawer implements IShapeDrawer {
    readonly validTypes: readonly ["line"];
    draw(data: IShapeDrawData): void;
    getSidesCount(): number;
}
