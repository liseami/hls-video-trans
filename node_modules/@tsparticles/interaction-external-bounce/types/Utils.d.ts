import { type DivEvent, type Particle, type SingleOrMultiple } from "@tsparticles/engine";
import type { BounceContainer } from "./Types.js";
export declare function divBounce(container: BounceContainer, divs: SingleOrMultiple<DivEvent>, bounceMode: string, enabledCb: (p: Particle) => boolean): void;
export declare function mouseBounce(container: BounceContainer, enabledCb: (p: Particle) => boolean): void;
