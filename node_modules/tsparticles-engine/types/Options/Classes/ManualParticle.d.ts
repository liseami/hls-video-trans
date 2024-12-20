import type { ICoordinatesWithMode } from "../../Core/Interfaces/ICoordinates";
import type { IManualParticle } from "../Interfaces/IManualParticle";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IParticlesOptions } from "../Interfaces/Particles/IParticlesOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";
export declare class ManualParticle implements IManualParticle, IOptionLoader<IManualParticle> {
    options?: RecursivePartial<IParticlesOptions>;
    position?: ICoordinatesWithMode;
    load(data?: RecursivePartial<IManualParticle>): void;
}
