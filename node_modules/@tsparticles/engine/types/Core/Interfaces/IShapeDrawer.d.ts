import type { Container } from "../Container.js";
import type { IShapeDrawData } from "./IShapeDrawData.js";
import type { Particle } from "../Particle.js";
export interface IShapeDrawer<TParticle extends Particle = Particle> {
    afterDraw?: (data: IShapeDrawData<TParticle>) => void;
    destroy?: (container: Container) => void;
    draw: (data: IShapeDrawData<TParticle>) => void;
    getSidesCount?: (particle: TParticle) => number;
    init?: (container: Container) => Promise<void>;
    loadShape?: (particle: TParticle) => void;
    particleDestroy?: (particle: TParticle) => void;
    particleInit?: (container: Container, particle: TParticle) => void;
    readonly validTypes: readonly string[];
}
