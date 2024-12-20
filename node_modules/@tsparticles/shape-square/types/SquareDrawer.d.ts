import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
export declare class SquareDrawer implements IShapeDrawer {
    readonly validTypes: readonly ["edge", "square"];
    draw(data: IShapeDrawData): void;
    getSidesCount(): number;
}
