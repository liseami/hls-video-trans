import type { RangeValue } from "@tsparticles/engine";
export interface IEmitterLife {
    count?: number;
    delay?: RangeValue;
    duration?: RangeValue;
    wait: boolean;
}
