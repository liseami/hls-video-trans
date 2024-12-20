import type { Container } from "../Core/Container.js";
import type { Engine } from "../Core/Engine.js";
import type { IOptionLoader } from "../Options/Interfaces/IOptionLoader.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
export declare function loadOptions<T>(options: IOptionLoader<T>, ...sourceOptionsArr: RecursivePartial<T | undefined>[]): void;
export declare function loadParticlesOptions(engine: Engine, container: Container, ...sourceOptionsArr: RecursivePartial<IParticlesOptions | undefined>[]): ParticlesOptions;
