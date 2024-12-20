import type { Container } from "../Core/Container";
import type { Engine } from "../Core/Engine";
import type { IOptionLoader } from "../Options/Interfaces/IOptionLoader";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions";
import type { RecursivePartial } from "../Types/RecursivePartial";
export declare function loadOptions<T>(options: IOptionLoader<T>, ...sourceOptionsArr: RecursivePartial<T | undefined>[]): void;
export declare function loadParticlesOptions(engine: Engine, container: Container, ...sourceOptionsArr: RecursivePartial<IParticlesOptions | undefined>[]): ParticlesOptions;
