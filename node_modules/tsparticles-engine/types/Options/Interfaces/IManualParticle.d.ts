import type { ICoordinatesWithMode } from "../../Core/Interfaces/ICoordinates";
import type { IParticlesOptions } from "./Particles/IParticlesOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";
export interface IManualParticle {
    options?: RecursivePartial<IParticlesOptions>;
    position?: ICoordinatesWithMode;
}
