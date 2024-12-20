import type { ShapeDrawerAfterEffectFunction, ShapeDrawerDestroyFunction, ShapeDrawerDrawFunction, ShapeDrawerInitFunction } from "../Types/ShapeDrawerFunctions";
import { Container } from "./Container";
import type { CustomEventArgs } from "../Types/CustomEventArgs";
import type { CustomEventListener } from "../Types/CustomEventListener";
import type { IInteractor } from "./Interfaces/IInteractor";
import type { ILoadParams } from "./Interfaces/ILoadParams";
import type { IMovePathGenerator } from "./Interfaces/IMovePathGenerator";
import type { IOptions } from "../Options/Interfaces/IOptions";
import type { IParticleMover } from "./Interfaces/IParticleMover";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater";
import type { IPlugin } from "./Interfaces/IPlugin";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer";
import type { ISourceOptions } from "../Types/ISourceOptions";
import type { Particle } from "./Particle";
import { Plugins } from "./Utils/Plugins";
import type { RecursivePartial } from "../Types/RecursivePartial";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple";
declare global {
    interface Window {
        tsParticles: Engine;
    }
}
export declare class Engine {
    readonly plugins: Plugins;
    private readonly _configs;
    private readonly _domArray;
    private readonly _eventDispatcher;
    private _initialized;
    constructor();
    get configs(): Record<string, ISourceOptions>;
    get version(): string;
    addConfig(nameOrConfig: string | ISourceOptions, config?: ISourceOptions): void;
    addEventListener(type: string, listener: CustomEventListener): void;
    addInteractor(name: string, interactorInitializer: (container: Container) => IInteractor, refresh?: boolean): Promise<void>;
    addMover(name: string, moverInitializer: (container: Container) => IParticleMover, refresh?: boolean): Promise<void>;
    addParticleUpdater(name: string, updaterInitializer: (container: Container) => IParticleUpdater, refresh?: boolean): Promise<void>;
    addPathGenerator(name: string, generator: IMovePathGenerator, refresh?: boolean): Promise<void>;
    addPlugin(plugin: IPlugin, refresh?: boolean): Promise<void>;
    addPreset(preset: string, options: RecursivePartial<IOptions>, override?: boolean, refresh?: boolean): Promise<void>;
    addShape(shape: SingleOrMultiple<string>, drawer: IShapeDrawer | ShapeDrawerDrawFunction, initOrRefresh?: ShapeDrawerInitFunction | boolean, afterEffectOrRefresh?: ShapeDrawerAfterEffectFunction | boolean, destroyOrRefresh?: ShapeDrawerDestroyFunction | boolean, refresh?: boolean): Promise<void>;
    dispatchEvent(type: string, args: CustomEventArgs): void;
    dom(): Container[];
    domItem(index: number): Container | undefined;
    init(): void;
    load(tagIdOrOptionsOrParams: string | SingleOrMultiple<RecursivePartial<IOptions>> | ILoadParams, options?: SingleOrMultiple<RecursivePartial<IOptions>>): Promise<Container | undefined>;
    loadFromArray(tagIdOrOptionsOrParams: string | SingleOrMultiple<RecursivePartial<IOptions>> | ILoadParams, optionsOrIndex?: SingleOrMultiple<RecursivePartial<IOptions>> | number, index?: number): Promise<Container | undefined>;
    loadJSON(tagId: string | SingleOrMultiple<string>, pathConfigJson?: SingleOrMultiple<string> | number, index?: number): Promise<Container | undefined>;
    refresh(refresh?: boolean): Promise<void>;
    removeEventListener(type: string, listener: CustomEventListener): void;
    set(id: string | HTMLElement, element: HTMLElement | RecursivePartial<IOptions>, options?: SingleOrMultiple<RecursivePartial<IOptions>> | number, index?: number): Promise<Container | undefined>;
    setJSON(id: string | HTMLElement, element: HTMLElement | SingleOrMultiple<string>, pathConfigJson?: SingleOrMultiple<string> | number, index?: number): Promise<Container | undefined>;
    setOnClickHandler(callback: (e: Event, particles?: Particle[]) => void): void;
    private _loadParams;
}
