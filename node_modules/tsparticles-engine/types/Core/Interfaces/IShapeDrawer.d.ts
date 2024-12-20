import type { ShapeDrawerAfterEffectFunction, ShapeDrawerDestroyFunction, ShapeDrawerDrawFunction, ShapeDrawerInitFunction, ShapeDrawerLoadFunction, ShapeDrawerParticleInitFunction, ShapeDrawerSidesCountFunction } from "../../Types/ShapeDrawerFunctions";
export interface IShapeDrawer {
    afterEffect?: ShapeDrawerAfterEffectFunction;
    destroy?: ShapeDrawerDestroyFunction;
    draw: ShapeDrawerDrawFunction;
    getSidesCount?: ShapeDrawerSidesCountFunction;
    init?: ShapeDrawerInitFunction;
    loadShape?: ShapeDrawerLoadFunction;
    particleInit?: ShapeDrawerParticleInitFunction;
}
