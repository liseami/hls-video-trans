import type { ICoordinatesWithMode } from "../../Core/Interfaces/ICoordinates.js";
import type { IManualParticle } from "../Interfaces/IManualParticle.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { IParticlesOptions } from "../Interfaces/Particles/IParticlesOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
export declare class ManualParticle implements IManualParticle, IOptionLoader<IManualParticle> {
    options?: RecursivePartial<IParticlesOptions>;
    position?: ICoordinatesWithMode;
    load(data?: RecursivePartial<IManualParticle>): void;
}
