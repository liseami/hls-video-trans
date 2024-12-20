import type { Container } from "../Container.js";
import type { IShapeDrawData } from "./IShapeDrawData.js";
import type { Particle } from "../Particle.js";
export interface IEffectDrawer<TParticle extends Particle = Particle> {
    destroy?: (container: Container) => void;
    draw: (data: IShapeDrawData<TParticle>) => void;
    init?: (container: Container) => Promise<void>;
    loadEffect?: (particle: TParticle) => void;
    particleInit?: (container: Container, particle: TParticle) => void;
}
