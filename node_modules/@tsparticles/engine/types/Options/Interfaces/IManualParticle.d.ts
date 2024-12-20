import type { ICoordinatesWithMode } from "../../Core/Interfaces/ICoordinates.js";
import type { IParticlesOptions } from "./Particles/IParticlesOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
export interface IManualParticle {
    options?: RecursivePartial<IParticlesOptions>;
    position?: ICoordinatesWithMode;
}
