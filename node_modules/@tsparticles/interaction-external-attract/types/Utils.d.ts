import { type Engine, type Particle } from "@tsparticles/engine";
import type { AttractContainer } from "./Types.js";
export declare function clickAttract(engine: Engine, container: AttractContainer, enabledCb: (particle: Particle) => boolean): void;
export declare function hoverAttract(engine: Engine, container: AttractContainer, enabledCb: (particle: Particle) => boolean): void;
