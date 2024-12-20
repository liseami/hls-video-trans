import type { BubbleContainer, BubbleMode, IBubbleMode } from "./Types.js";
import { type Engine, ExternalInteractorBase, type IDelta, type IModes, type Modes, type Particle, type RecursivePartial } from "@tsparticles/engine";
export declare class Bubbler extends ExternalInteractorBase<BubbleContainer> {
    handleClickMode: (mode: string) => void;
    private readonly _engine;
    constructor(container: BubbleContainer, engine: Engine);
    clear(particle: Particle, delta: IDelta, force?: boolean): void;
    init(): void;
    interact(delta: IDelta): void;
    isEnabled(particle?: Particle): boolean;
    loadModeOptions(options: Modes & BubbleMode, ...sources: RecursivePartial<(IModes & IBubbleMode) | undefined>[]): void;
    reset(particle: Particle): void;
    private readonly _clickBubble;
    private readonly _hoverBubble;
    private readonly _hoverBubbleColor;
    private readonly _hoverBubbleOpacity;
    private readonly _hoverBubbleSize;
    private readonly _process;
    private readonly _singleSelectorHover;
}
