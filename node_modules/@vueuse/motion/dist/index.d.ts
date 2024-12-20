import * as vue from 'vue';
import { Ref, CSSProperties, UnwrapRef, Directive, App, PropType, VNode } from 'vue';
import { VueInstance, MaybeRef } from '@vueuse/core';
import { Component } from '@nuxt/schema';
import * as csstype from 'csstype';
import { MaybeRef as MaybeRef$1 } from '@vueuse/shared';

type GenericHandler = (...args: any) => void;
/**
 * A generic subscription manager.
 */
declare class SubscriptionManager<Handler extends GenericHandler> {
    private subscriptions;
    add(handler: Handler): () => boolean;
    notify(
    /**
     * Using ...args would be preferable but it's array creation and this
     * might be fired every frame.
     */
    a?: Parameters<Handler>[0], b?: Parameters<Handler>[1], c?: Parameters<Handler>[2]): void;
    clear(): void;
}

/**
 * `MotionValue` is used to track the state and velocity of motion values.
 */
declare class MotionValue<V = any> {
    /**
     * The current state of the `MotionValue`.
     */
    private current;
    /**
     * The previous state of the `MotionValue`.
     */
    private prev;
    /**
     * Duration, in milliseconds, since last updating frame.
     */
    private timeDelta;
    /**
     * Timestamp of the last time this `MotionValue` was updated.
     */
    private lastUpdated;
    /**
     * Functions to notify when the `MotionValue` updates.
     */
    updateSubscribers: SubscriptionManager<Subscriber<V>>;
    /**
     * A reference to the currently-controlling Popmotion animation
     */
    private stopAnimation?;
    /**
     * Tracks whether this value can output a velocity.
     */
    private canTrackVelocity;
    /**
     * init - The initiating value
     * config - Optional configuration options
     */
    constructor(init: V);
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     */
    onChange(subscription: Subscriber<V>): () => void;
    clearListeners(): void;
    /**
     * Sets the state of the `MotionValue`.
     *
     * @param v
     * @param render
     */
    set(v: V): void;
    /**
     * Update and notify `MotionValue` subscribers.
     *
     * @param v
     * @param render
     */
    updateAndNotify: (v: V) => void;
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     */
    get(): V;
    /**
     * Get previous value.
     *
     * @returns - The previous latest state of `MotionValue`
     */
    getPrevious(): V;
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     */
    getVelocity(): number;
    /**
     * Schedule a velocity check for the next frame.
     */
    private scheduleVelocityCheck;
    /**
     * Updates `prev` with `current` if the value hasn't been updated this frame.
     * This ensures velocity calculations return `0`.
     */
    private velocityCheck;
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     */
    start(animation: StartAnimation): Promise<void>;
    /**
     * Stop the currently active animation.
     */
    stop(): void;
    /**
     * Returns `true` if this value is currently animating.
     */
    isAnimating(): boolean;
    /**
     * Clear the current animation reference.
     */
    private clearAnimation;
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     */
    destroy(): void;
}

type ResolvedKeyframesTarget = [null, ...number[]] | number[] | [null, ...string[]] | string[];
type KeyframesTarget = ResolvedKeyframesTarget | [null, ...CustomValueType[]] | CustomValueType[];
type ResolvedSingleTarget = string | number;
type SingleTarget = ResolvedSingleTarget | CustomValueType;
type ResolvedValueTarget = ResolvedSingleTarget | ResolvedKeyframesTarget;
type ValueTarget = SingleTarget | KeyframesTarget;
type Props = Record<string, any>;
type EasingFunction = (v: number) => number;
type Easing = [number, number, number, number] | 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'circIn' | 'circOut' | 'circInOut' | 'backIn' | 'backOut' | 'backInOut' | 'anticipate' | EasingFunction;
interface Orchestration {
    /**
     * Delay the animation by this duration (in seconds). Defaults to `0`.
     */
    delay?: number;
    /**
     * Callback triggered on animation complete.
     */
    onComplete?: () => void;
    /**
     * Should the value be set imediately
     */
    immediate?: boolean;
}
interface Repeat {
    /**
     * The number of times to repeat the transition. Set to `Infinity` for perpetual repeating.
     *
     * Without setting `repeatType`, this will loop the animation.
     */
    repeat?: number;
    /**
     * How to repeat the animation. This can be either:
     *
     * "loop": Repeats the animation from the start
     *
     * "reverse": Alternates between forward and backwards playback
     *
     * "mirror": Switchs `from` and `to` alternately
     */
    repeatType?: 'loop' | 'reverse' | 'mirror';
    /**
     * When repeating an animation, `repeatDelay` will set the
     * duration of the time to wait, in seconds, between each repetition.
     */
    repeatDelay?: number;
}
/**
 * An animation that animates between two or more values over a specific duration of time.
 * This is the default animation for non-physical values like `color` and `opacity`.
 */
interface Tween extends Repeat {
    /**
     * Set `type` to `"tween"` to use a duration-based tween animation.
     * If any non-orchestration `transition` values are set without a `type` property,
     * this is used as the default animation.
     */
    type?: 'tween';
    /**
     * The duration of the tween animation. Set to `0.3` by default, 0r `0.8` if animating a series of keyframes.
     */
    duration?: number;
    /**
     * The easing function to use. Set as one of the below.
     *
     * - The name of an existing easing function.
     * - An array of four numbers to define a cubic bezier curve.
     * - An easing function, that accepts and returns a value `0-1`.
     *
     * If the animating value is set as an array of multiple values for a keyframes
     * animation, `ease` can be set as an array of easing functions to set different easings between
     * each of those values.
     */
    ease?: Easing | Easing[];
    /**
     * The duration of time already elapsed in the animation. Set to `0` by
     * default.
     */
    elapsed?: number;
    /**
     * When animating keyframes, `times` can be used to determine where in the animation each keyframe is reached.
     * Each value in `times` is a value between `0` and `1`, representing `duration`.
     *
     * There must be the same number of `times` as there are keyframes.
     * Defaults to an array of evenly-spread durations.
     */
    times?: number[];
    /**
     * When animating keyframes, `easings` can be used to define easing functions between each keyframe. This array should be one item fewer than the number of keyframes, as these easings apply to the transitions between the keyframes.
     */
    easings?: Easing[];
    /**
     * The value to animate from.
     * By default, this is the current state of the animating value.
     */
    from?: number | string;
    to?: number | string | ValueTarget;
    velocity?: number;
    delay?: number;
}
/**
 * An animation that simulates spring physics for realistic motion.
 * This is the default animation for physical values like `x`, `y`, `scale` and `rotate`.
 */
interface Spring extends Repeat {
    /**
     * Set `type` to `"spring"` to animate using spring physics for natural
     * movement. Type is set to `"spring"` by default.
     */
    type: 'spring';
    /**
     * Stiffness of the spring. Higher values will create more sudden movement.
     * Set to `100` by default.
     */
    stiffness?: number;
    /**
     * Strength of opposing force. If set to 0, spring will oscillate
     * indefinitely. Set to `10` by default.
     */
    damping?: number;
    /**
     * Mass of the moving object. Higher values will result in more lethargic
     * movement. Set to `1` by default.
     */
    mass?: number;
    /**
     * The duration of the animation, defined in seconds. Spring animations can be a maximum of 10 seconds.
     *
     * If `bounce` is set, this defaults to `0.8`.
     *
     * Note: `duration` and `bounce` will be overridden if `stiffness`, `damping` or `mass` are set.
     */
    duration?: number;
    /**
     * `bounce` determines the "bounciness" of a spring animation.
     *
     * `0` is no bounce, and `1` is extremely bouncy.
     *
     * If `duration` is set, this defaults to `0.25`.
     *
     * Note: `bounce` and `duration` will be overridden if `stiffness`, `damping` or `mass` are set.
     */
    bounce?: number;
    /**
     * End animation if absolute speed (in units per second) drops below this
     * value and delta is smaller than `restDelta`. Set to `0.01` by default.
     */
    restSpeed?: number;
    /**
     * End animation if distance is below this value and speed is below
     * `restSpeed`. When animation ends, spring gets “snapped” to. Set to
     * `0.01` by default.
     */
    restDelta?: number;
    /**
     * The value to animate from.
     * By default, this is the initial state of the animating value.
     */
    from?: number | string;
    to?: number | string | ValueTarget;
    /**
     * The initial velocity of the spring. By default this is the current velocity of the component.
     */
    velocity?: number;
    delay?: number;
}
/**
 * An animation that decelerates a value based on its initial velocity,
 * usually used to implement inertial scrolling.
 *
 * Optionally, `min` and `max` boundaries can be defined, and inertia
 * will snap to these with a spring animation.
 *
 * This animation will automatically precalculate a target value,
 * which can be modified with the `modifyTarget` property.
 *
 * This allows you to add snap-to-grid or similar functionality.
 *
 * Inertia is also the animation used for `dragTransition`, and can be configured via that prop.
 */
interface Inertia {
    /**
     * Set `type` to animate using the inertia animation. Set to `"tween"` by
     * default. This can be used for natural deceleration, like momentum scrolling.
     */
    type: 'inertia';
    /**
     * A function that receives the automatically-calculated target and returns a new one. Useful for snapping the target to a grid.
     */
    modifyTarget?: (v: number) => number;
    /**
     * If `min` or `max` is set, this affects the stiffness of the bounce
     * spring. Higher values will create more sudden movement. Set to `500` by
     * default.
     */
    bounceStiffness?: number;
    /**
     * If `min` or `max` is set, this affects the damping of the bounce spring.
     * If set to `0`, spring will oscillate indefinitely. Set to `10` by
     * default.
     */
    bounceDamping?: number;
    /**
     * A higher power value equals a further target. Set to `0.8` by default.
     */
    power?: number;
    /**
     * Adjusting the time constant will change the duration of the
     * deceleration, thereby affecting its feel. Set to `700` by default.
     */
    timeConstant?: number;
    /**
     * End the animation if the distance to the animation target is below this value, and the absolute speed is below `restSpeed`.
     * When the animation ends, the value gets snapped to the animation target. Set to `0.01` by default.
     * Generally the default values provide smooth animation endings, only in rare cases should you need to customize these.
     */
    restDelta?: number;
    /**
     * Minimum constraint. If set, the value will "bump" against this value (or immediately spring to it if the animation starts as less than this value).
     */
    min?: number;
    /**
     * Maximum constraint. If set, the value will "bump" against this value (or immediately snap to it, if the initial animation value exceeds this value).
     */
    max?: number;
    /**
     * The value to animate from. By default, this is the current state of the animating value.
     */
    from?: number | string;
    /**
     * The initial velocity of the animation.
     * By default this is the current velocity of the component.
     */
    velocity?: number;
    delay?: number;
}
/**
 * Keyframes tweens between multiple `values`.
 *
 * These tweens can be arranged using the `duration`, `easings`, and `times` properties.
 */
interface Keyframes {
    /**
     * Set `type` to `"keyframes"` to animate using the keyframes animation.
     * Set to `"tween"` by default. This can be used to animate between a series of values.
     */
    type: 'keyframes';
    /**
     * An array of values to animate between.
     */
    values: KeyframesTarget;
    /**
     * An array of numbers between 0 and 1, where `1` represents the `total` duration.
     *
     * Each value represents at which point during the animation each item in the animation target should be hit, so the array should be the same length as `values`.
     *
     * Defaults to an array of evenly-spread durations.
     */
    times?: number[];
    /**
     * An array of easing functions for each generated tween, or a single easing function applied to all tweens.
     *
     * This array should be one item less than `values`, as these easings apply to the transitions *between* the `values`.
     */
    ease?: Easing | Easing[];
    /**
     * Popmotion's easing prop to define individual easings. `ease` will be mapped to this prop in keyframes animations.
     */
    easings?: Easing | Easing[];
    elapsed?: number;
    /**
     * The total duration of the animation. Set to `0.3` by default.
     */
    duration?: number;
    repeatDelay?: number;
    from?: number | string;
    to?: number | string | ValueTarget;
    velocity?: number;
    delay?: number;
}
type PopmotionTransitionProps = Tween | Spring | Keyframes | Inertia;
type PermissiveTransitionDefinition = Record<string, any>;
type TransitionDefinition = Tween | Spring | Keyframes | Inertia | PermissiveTransitionDefinition;
type TransitionMap = Orchestration & Record<string, TransitionDefinition>;
/**
 * Transition props
 */
type Transition = (Orchestration & Repeat & TransitionDefinition) | (Orchestration & Repeat & TransitionMap);
type MakeCustomValueType<T> = {
    [K in keyof T]: T[K] | CustomValueType;
};
type Target = MakeCustomValueType<MotionProperties>;
type MakeKeyframes<T> = {
    [K in keyof T]: T[K] | T[K][] | [null, ...T[K][]];
};
type TargetWithKeyframes = MakeKeyframes<Target>;
/**
 * An object that specifies values to animate to. Each value may be set either as
 * a single value, or an array of values.
 */
type TargetAndTransition = TargetWithKeyframes & {
    transition?: Transition;
    transitionEnd?: Target;
};
type TargetResolver = (custom: any, current: Target, velocity: Target) => TargetAndTransition;
interface CustomValueType {
    mix: (from: any, to: any) => (p: number) => number | string;
    toValue: () => number | string;
}
type MotionValuesMap = {
    [key in keyof PermissiveMotionProperties]: MotionValue;
};
interface MotionTransitions {
    /**
     * Stop ongoing transitions for the current element.
     */
    stop: (keys?: string | string[]) => void;
    /**
     * Start a transition, push it to the `transitions` array.
     *
     * @param transition
     * @param values
     */
    push: (key: string, value: ResolvedValueTarget, target: MotionProperties, transition: Transition, onComplete?: () => void) => void;
    /**
     * @internal
     */
    motionValues: Ref<MotionValuesMap>;
}

/**
 * Permissive properties keys
 */
type PropertiesKeys = Record<string, string | number | undefined | any>;
/**
 * SVG Supported properties
 */
interface SVGPathProperties {
    pathLength?: number;
    pathOffset?: number;
    pathSpacing?: number;
}
/**
 * Transform properties
 */
type TransformValue = string | number;
interface TransformProperties {
    x?: TransformValue | TransformValue[];
    y?: TransformValue | TransformValue[];
    z?: TransformValue | TransformValue[];
    translateX?: TransformValue | TransformValue[];
    translateY?: TransformValue | TransformValue[];
    translateZ?: TransformValue | TransformValue[];
    rotate?: TransformValue | TransformValue[];
    rotateX?: TransformValue | TransformValue[];
    rotateY?: TransformValue | TransformValue[];
    rotateZ?: TransformValue | TransformValue[];
    scale?: TransformValue | TransformValue[];
    scaleX?: TransformValue | TransformValue[];
    scaleY?: TransformValue | TransformValue[];
    scaleZ?: TransformValue | TransformValue[];
    skew?: TransformValue | TransformValue[];
    skewX?: TransformValue | TransformValue[];
    skewY?: TransformValue | TransformValue[];
    originX?: TransformValue | TransformValue[];
    originY?: TransformValue | TransformValue[];
    originZ?: TransformValue | TransformValue[];
    perspective?: TransformValue | TransformValue[];
    transformPerspective?: TransformValue | TransformValue[];
}
/**
 * Relevant styling properties
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type StyleProperties = Omit<CSSProperties, 'transition' | 'rotate' | 'scale' | 'perspective' | 'transform' | 'transformBox' | 'transformOrigin' | 'transformStyle'>;
/**
 * Available properties for useMotion variants
 */
type MotionProperties = StyleProperties | TransformProperties | SVGPathProperties;
/**
 * Permissive properties for useSpring
 */
type PermissiveMotionProperties = MotionProperties & Record<string, ResolvedSingleTarget>;
/**
 * Variant
 */
type Variant = {
    transition?: Transition;
} & MotionProperties;
/**
 * Motion variants object
 */
type MotionVariants<T extends string> = {
    initial?: Variant;
    enter?: Variant;
    leave?: Variant;
    visible?: Variant;
    visibleOnce?: Variant;
    hovered?: Variant;
    tapped?: Variant;
    focused?: Variant;
} & {
    [key in T]?: Variant;
};

type PermissiveTarget = VueInstance | MotionTarget;
type MotionTarget = HTMLElement | SVGElement | null | undefined;
interface MotionInstance<T extends string, V extends MotionVariants<T>> extends MotionControls<T, V> {
    target: MaybeRef<PermissiveTarget>;
    variants: MaybeRef<V>;
    variant: Ref<keyof V>;
    state: Ref<Variant | undefined>;
    motionProperties: UnwrapRef<MotionProperties>;
}
interface UseMotionOptions {
    syncVariants?: boolean;
    lifeCycleHooks?: boolean;
    visibilityHooks?: boolean;
    eventListeners?: boolean;
}
interface MotionControls<T extends string, V extends MotionVariants<T>> {
    /**
     * Apply a variant declaration and execute the resolved transitions.
     *
     * @param variant
     * @returns Promise<void[]>
     */
    apply: (variant: Variant | keyof V) => Promise<void[]> | undefined;
    /**
     * Apply a variant declaration without transitions.
     *
     * @param variant
     */
    set: (variant: Variant | keyof V) => void;
    /**
     * Stop all the ongoing transitions for the current element.
     */
    stop: (keys?: string | string[]) => void;
    /**
     * Helper to be passed to <transition> leave event.
     *
     * @param done
     */
    leave: (done: () => void) => void;
    /**
     * Computed reference reactive to the animation state of motion controls.
     */
    isAnimating: any;
}
interface SpringControls {
    /**
     * Apply new values with transitions.
     *
     * @param variant
     */
    set: (properties: MotionProperties) => void;
    /**
     * Stop all transitions.
     *
     * @param variant
     */
    stop: (key?: string | string[]) => void;
    /**
     * Object containing all the current values of the spring.
     *
     * @param
     */
    values: MotionProperties;
}
type MotionInstanceBindings<T extends string, V extends MotionVariants<T>> = Record<string, MotionInstance<T, V>>;
declare module 'vue' {
    interface ComponentCustomProperties {
        $motions?: MotionInstanceBindings<any, any>;
    }
}
declare module '@vue/runtime-dom' {
    interface HTMLAttributes {
        variants?: MotionVariants<any>;
        initial?: Variant;
        enter?: Variant;
        leave?: Variant;
        visible?: Variant;
        visibleOnce?: Variant;
        hovered?: Variant;
        tapped?: Variant;
        focused?: Variant;
    }
}

interface MotionPluginOptions<T extends string> {
    directives?: Record<T, MotionVariants<T>>;
    excludePresets?: boolean;
}

interface StopAnimation {
    stop: () => void;
}
type Transformer<T> = (v: T) => T;
type Subscriber<T> = (v: T) => void;
type PassiveEffect<T> = (v: T, safeSetter: (v: T) => void) => void;
type StartAnimation = (complete?: () => void) => StopAnimation;

interface ModuleOptions<T extends string> {
    directives?: Record<T, MotionVariants<T>>;
    excludePresets?: boolean;
}

declare function directive<T extends string>(variants?: MotionVariants<T>, isPreset?: boolean): Directive<HTMLElement | SVGElement>;

declare const MotionPlugin: {
    install(app: App, options?: MotionPluginOptions<string>): void;
};

/**
 * Convert a string to a slug.
 *
 * Source: https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
 * Credits: @hagemann
 *
 * Edited to transform camel naming to slug with `-`.
 */
declare function slugify(str: string): string;

/**
 * Check whether an object is a Motion Instance or not.
 *
 * Can be useful while building packages based on @vueuse/motion.
 *
 * @param obj
 * @returns bool
 */
declare function isMotionInstance<T extends string, V extends MotionVariants<T>>(obj: any): obj is MotionInstance<T, V>;

declare const fade: MotionVariants<never>;
declare const fadeVisible: MotionVariants<never>;
declare const fadeVisibleOnce: MotionVariants<never>;

declare const pop: MotionVariants<never>;
declare const popVisible: MotionVariants<never>;
declare const popVisibleOnce: MotionVariants<never>;

declare const rollLeft: MotionVariants<never>;
declare const rollVisibleLeft: MotionVariants<never>;
declare const rollVisibleOnceLeft: MotionVariants<never>;
declare const rollRight: MotionVariants<never>;
declare const rollVisibleRight: MotionVariants<never>;
declare const rollVisibleOnceRight: MotionVariants<never>;
declare const rollTop: MotionVariants<never>;
declare const rollVisibleTop: MotionVariants<never>;
declare const rollVisibleOnceTop: MotionVariants<never>;
declare const rollBottom: MotionVariants<never>;
declare const rollVisibleBottom: MotionVariants<never>;
declare const rollVisibleOnceBottom: MotionVariants<never>;

declare const slideLeft: MotionVariants<never>;
declare const slideVisibleLeft: MotionVariants<never>;
declare const slideVisibleOnceLeft: MotionVariants<never>;
declare const slideRight: MotionVariants<never>;
declare const slideVisibleRight: MotionVariants<never>;
declare const slideVisibleOnceRight: MotionVariants<never>;
declare const slideTop: MotionVariants<never>;
declare const slideVisibleTop: MotionVariants<never>;
declare const slideVisibleOnceTop: MotionVariants<never>;
declare const slideBottom: MotionVariants<never>;
declare const slideVisibleBottom: MotionVariants<never>;
declare const slideVisibleOnceBottom: MotionVariants<never>;

declare const _default$1: vue.DefineComponent<{
    is: {
        type: PropType<string | Component>;
        default: string;
    };
    preset: {
        type: PropType<string>;
        required: boolean;
    };
    instance: {
        type: PropType<MotionInstance<string, MotionVariants<string>>>;
        required: boolean;
    };
    variants: {
        type: PropType<MotionVariants<string>>;
        required: boolean;
    };
    initial: {
        type: PropType<Variant>;
        required: boolean;
    };
    enter: {
        type: PropType<Variant>;
        required: boolean;
    };
    leave: {
        type: PropType<Variant>;
        required: boolean;
    };
    visible: {
        type: PropType<Variant>;
        required: boolean;
    };
    visibleOnce: {
        type: PropType<Variant>;
        required: boolean;
    };
    hovered: {
        type: PropType<Variant>;
        required: boolean;
    };
    tapped: {
        type: PropType<Variant>;
        required: boolean;
    };
    focused: {
        type: PropType<Variant>;
        required: boolean;
    };
    delay: {
        type: PropType<string | number>;
        required: boolean;
    };
    duration: {
        type: PropType<string | number>;
        required: boolean;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    is: {
        type: PropType<string | Component>;
        default: string;
    };
    preset: {
        type: PropType<string>;
        required: boolean;
    };
    instance: {
        type: PropType<MotionInstance<string, MotionVariants<string>>>;
        required: boolean;
    };
    variants: {
        type: PropType<MotionVariants<string>>;
        required: boolean;
    };
    initial: {
        type: PropType<Variant>;
        required: boolean;
    };
    enter: {
        type: PropType<Variant>;
        required: boolean;
    };
    leave: {
        type: PropType<Variant>;
        required: boolean;
    };
    visible: {
        type: PropType<Variant>;
        required: boolean;
    };
    visibleOnce: {
        type: PropType<Variant>;
        required: boolean;
    };
    hovered: {
        type: PropType<Variant>;
        required: boolean;
    };
    tapped: {
        type: PropType<Variant>;
        required: boolean;
    };
    focused: {
        type: PropType<Variant>;
        required: boolean;
    };
    delay: {
        type: PropType<string | number>;
        required: boolean;
    };
    duration: {
        type: PropType<string | number>;
        required: boolean;
    };
}>>, {
    is: string | Component;
}, {}>;

declare const _default: vue.DefineComponent<{
    is: {
        type: PropType<string | Component>;
        required: false;
    };
    preset: {
        type: PropType<string>;
        required: boolean;
    };
    instance: {
        type: PropType<MotionInstance<string, MotionVariants<string>>>;
        required: boolean;
    };
    variants: {
        type: PropType<MotionVariants<string>>;
        required: boolean;
    };
    initial: {
        type: PropType<Variant>;
        required: boolean;
    };
    enter: {
        type: PropType<Variant>;
        required: boolean;
    };
    leave: {
        type: PropType<Variant>;
        required: boolean;
    };
    visible: {
        type: PropType<Variant>;
        required: boolean;
    };
    visibleOnce: {
        type: PropType<Variant>;
        required: boolean;
    };
    hovered: {
        type: PropType<Variant>;
        required: boolean;
    };
    tapped: {
        type: PropType<Variant>;
        required: boolean;
    };
    focused: {
        type: PropType<Variant>;
        required: boolean;
    };
    delay: {
        type: PropType<string | number>;
        required: boolean;
    };
    duration: {
        type: PropType<string | number>;
        required: boolean;
    };
}, () => VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}> | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[], unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    is: {
        type: PropType<string | Component>;
        required: false;
    };
    preset: {
        type: PropType<string>;
        required: boolean;
    };
    instance: {
        type: PropType<MotionInstance<string, MotionVariants<string>>>;
        required: boolean;
    };
    variants: {
        type: PropType<MotionVariants<string>>;
        required: boolean;
    };
    initial: {
        type: PropType<Variant>;
        required: boolean;
    };
    enter: {
        type: PropType<Variant>;
        required: boolean;
    };
    leave: {
        type: PropType<Variant>;
        required: boolean;
    };
    visible: {
        type: PropType<Variant>;
        required: boolean;
    };
    visibleOnce: {
        type: PropType<Variant>;
        required: boolean;
    };
    hovered: {
        type: PropType<Variant>;
        required: boolean;
    };
    tapped: {
        type: PropType<Variant>;
        required: boolean;
    };
    focused: {
        type: PropType<Variant>;
        required: boolean;
    };
    delay: {
        type: PropType<string | number>;
        required: boolean;
    };
    duration: {
        type: PropType<string | number>;
        required: boolean;
    };
}>>, {}, {}>;

/**
 * Reactive style object implementing all native CSS properties.
 *
 * @param props
 */
declare function reactiveStyle(props?: StyleProperties): {
    state: {
        [x: `--${string}`]: string | number | undefined;
        filter?: csstype.Property.Filter | undefined;
        fill?: csstype.Property.Fill | undefined;
        accentColor?: csstype.Property.AccentColor | undefined;
        alignContent?: csstype.Property.AlignContent | undefined;
        alignItems?: csstype.Property.AlignItems | undefined;
        alignSelf?: csstype.Property.AlignSelf | undefined;
        alignTracks?: csstype.Property.AlignTracks | undefined;
        animationComposition?: csstype.Property.AnimationComposition | undefined;
        animationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        animationDirection?: csstype.Property.AnimationDirection | undefined;
        animationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        animationFillMode?: csstype.Property.AnimationFillMode | undefined;
        animationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        animationName?: csstype.Property.AnimationName | undefined;
        animationPlayState?: csstype.Property.AnimationPlayState | undefined;
        animationRangeEnd?: csstype.Property.AnimationRangeEnd<string | number> | undefined;
        animationRangeStart?: csstype.Property.AnimationRangeStart<string | number> | undefined;
        animationTimeline?: csstype.Property.AnimationTimeline | undefined;
        animationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        appearance?: csstype.Property.Appearance | undefined;
        aspectRatio?: csstype.Property.AspectRatio | undefined;
        backdropFilter?: csstype.Property.BackdropFilter | undefined;
        backfaceVisibility?: csstype.Property.BackfaceVisibility | undefined;
        backgroundAttachment?: csstype.Property.BackgroundAttachment | undefined;
        backgroundBlendMode?: csstype.Property.BackgroundBlendMode | undefined;
        backgroundClip?: csstype.Property.BackgroundClip | undefined;
        backgroundColor?: csstype.Property.BackgroundColor | undefined;
        backgroundImage?: csstype.Property.BackgroundImage | undefined;
        backgroundOrigin?: csstype.Property.BackgroundOrigin | undefined;
        backgroundPositionX?: csstype.Property.BackgroundPositionX<string | number> | undefined;
        backgroundPositionY?: csstype.Property.BackgroundPositionY<string | number> | undefined;
        backgroundRepeat?: csstype.Property.BackgroundRepeat | undefined;
        backgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        blockOverflow?: csstype.Property.BlockOverflow | undefined;
        blockSize?: csstype.Property.BlockSize<string | number> | undefined;
        borderBlockColor?: csstype.Property.BorderBlockColor | undefined;
        borderBlockEndColor?: csstype.Property.BorderBlockEndColor | undefined;
        borderBlockEndStyle?: csstype.Property.BorderBlockEndStyle | undefined;
        borderBlockEndWidth?: csstype.Property.BorderBlockEndWidth<string | number> | undefined;
        borderBlockStartColor?: csstype.Property.BorderBlockStartColor | undefined;
        borderBlockStartStyle?: csstype.Property.BorderBlockStartStyle | undefined;
        borderBlockStartWidth?: csstype.Property.BorderBlockStartWidth<string | number> | undefined;
        borderBlockStyle?: csstype.Property.BorderBlockStyle | undefined;
        borderBlockWidth?: csstype.Property.BorderBlockWidth<string | number> | undefined;
        borderBottomColor?: csstype.Property.BorderBottomColor | undefined;
        borderBottomLeftRadius?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        borderBottomRightRadius?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        borderBottomStyle?: csstype.Property.BorderBottomStyle | undefined;
        borderBottomWidth?: csstype.Property.BorderBottomWidth<string | number> | undefined;
        borderCollapse?: csstype.Property.BorderCollapse | undefined;
        borderEndEndRadius?: csstype.Property.BorderEndEndRadius<string | number> | undefined;
        borderEndStartRadius?: csstype.Property.BorderEndStartRadius<string | number> | undefined;
        borderImageOutset?: csstype.Property.BorderImageOutset<string | number> | undefined;
        borderImageRepeat?: csstype.Property.BorderImageRepeat | undefined;
        borderImageSlice?: csstype.Property.BorderImageSlice | undefined;
        borderImageSource?: csstype.Property.BorderImageSource | undefined;
        borderImageWidth?: csstype.Property.BorderImageWidth<string | number> | undefined;
        borderInlineColor?: csstype.Property.BorderInlineColor | undefined;
        borderInlineEndColor?: csstype.Property.BorderInlineEndColor | undefined;
        borderInlineEndStyle?: csstype.Property.BorderInlineEndStyle | undefined;
        borderInlineEndWidth?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        borderInlineStartColor?: csstype.Property.BorderInlineStartColor | undefined;
        borderInlineStartStyle?: csstype.Property.BorderInlineStartStyle | undefined;
        borderInlineStartWidth?: csstype.Property.BorderInlineStartWidth<string | number> | undefined;
        borderInlineStyle?: csstype.Property.BorderInlineStyle | undefined;
        borderInlineWidth?: csstype.Property.BorderInlineWidth<string | number> | undefined;
        borderLeftColor?: csstype.Property.BorderLeftColor | undefined;
        borderLeftStyle?: csstype.Property.BorderLeftStyle | undefined;
        borderLeftWidth?: csstype.Property.BorderLeftWidth<string | number> | undefined;
        borderRightColor?: csstype.Property.BorderRightColor | undefined;
        borderRightStyle?: csstype.Property.BorderRightStyle | undefined;
        borderRightWidth?: csstype.Property.BorderRightWidth<string | number> | undefined;
        borderSpacing?: csstype.Property.BorderSpacing<string | number> | undefined;
        borderStartEndRadius?: csstype.Property.BorderStartEndRadius<string | number> | undefined;
        borderStartStartRadius?: csstype.Property.BorderStartStartRadius<string | number> | undefined;
        borderTopColor?: csstype.Property.BorderTopColor | undefined;
        borderTopLeftRadius?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        borderTopRightRadius?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        borderTopStyle?: csstype.Property.BorderTopStyle | undefined;
        borderTopWidth?: csstype.Property.BorderTopWidth<string | number> | undefined;
        bottom?: csstype.Property.Bottom<string | number> | undefined;
        boxDecorationBreak?: csstype.Property.BoxDecorationBreak | undefined;
        boxShadow?: csstype.Property.BoxShadow | undefined;
        boxSizing?: csstype.Property.BoxSizing | undefined;
        breakAfter?: csstype.Property.BreakAfter | undefined;
        breakBefore?: csstype.Property.BreakBefore | undefined;
        breakInside?: csstype.Property.BreakInside | undefined;
        captionSide?: csstype.Property.CaptionSide | undefined;
        caretColor?: csstype.Property.CaretColor | undefined;
        caretShape?: csstype.Property.CaretShape | undefined;
        clear?: csstype.Property.Clear | undefined;
        clipPath?: csstype.Property.ClipPath | undefined;
        color?: csstype.Property.Color | undefined;
        colorAdjust?: csstype.Property.PrintColorAdjust | undefined;
        colorScheme?: csstype.Property.ColorScheme | undefined;
        columnCount?: csstype.Property.ColumnCount | undefined;
        columnFill?: csstype.Property.ColumnFill | undefined;
        columnGap?: csstype.Property.ColumnGap<string | number> | undefined;
        columnRuleColor?: csstype.Property.ColumnRuleColor | undefined;
        columnRuleStyle?: csstype.Property.ColumnRuleStyle | undefined;
        columnRuleWidth?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        columnSpan?: csstype.Property.ColumnSpan | undefined;
        columnWidth?: csstype.Property.ColumnWidth<string | number> | undefined;
        contain?: csstype.Property.Contain | undefined;
        containIntrinsicBlockSize?: csstype.Property.ContainIntrinsicBlockSize<string | number> | undefined;
        containIntrinsicHeight?: csstype.Property.ContainIntrinsicHeight<string | number> | undefined;
        containIntrinsicInlineSize?: csstype.Property.ContainIntrinsicInlineSize<string | number> | undefined;
        containIntrinsicWidth?: csstype.Property.ContainIntrinsicWidth<string | number> | undefined;
        containerName?: csstype.Property.ContainerName | undefined;
        containerType?: csstype.Property.ContainerType | undefined;
        content?: csstype.Property.Content | undefined;
        contentVisibility?: csstype.Property.ContentVisibility | undefined;
        counterIncrement?: csstype.Property.CounterIncrement | undefined;
        counterReset?: csstype.Property.CounterReset | undefined;
        counterSet?: csstype.Property.CounterSet | undefined;
        cursor?: csstype.Property.Cursor | undefined;
        direction?: csstype.Property.Direction | undefined;
        display?: csstype.Property.Display | undefined;
        emptyCells?: csstype.Property.EmptyCells | undefined;
        flexBasis?: csstype.Property.FlexBasis<string | number> | undefined;
        flexDirection?: csstype.Property.FlexDirection | undefined;
        flexGrow?: csstype.Property.FlexGrow | undefined;
        flexShrink?: csstype.Property.FlexShrink | undefined;
        flexWrap?: csstype.Property.FlexWrap | undefined;
        float?: csstype.Property.Float | undefined;
        fontFamily?: csstype.Property.FontFamily | undefined;
        fontFeatureSettings?: csstype.Property.FontFeatureSettings | undefined;
        fontKerning?: csstype.Property.FontKerning | undefined;
        fontLanguageOverride?: csstype.Property.FontLanguageOverride | undefined;
        fontOpticalSizing?: csstype.Property.FontOpticalSizing | undefined;
        fontPalette?: csstype.Property.FontPalette | undefined;
        fontSize?: csstype.Property.FontSize<string | number> | undefined;
        fontSizeAdjust?: csstype.Property.FontSizeAdjust | undefined;
        fontSmooth?: csstype.Property.FontSmooth<string | number> | undefined;
        fontStretch?: csstype.Property.FontStretch | undefined;
        fontStyle?: csstype.Property.FontStyle | undefined;
        fontSynthesis?: csstype.Property.FontSynthesis | undefined;
        fontSynthesisPosition?: csstype.Property.FontSynthesisPosition | undefined;
        fontSynthesisSmallCaps?: csstype.Property.FontSynthesisSmallCaps | undefined;
        fontSynthesisStyle?: csstype.Property.FontSynthesisStyle | undefined;
        fontSynthesisWeight?: csstype.Property.FontSynthesisWeight | undefined;
        fontVariant?: csstype.Property.FontVariant | undefined;
        fontVariantAlternates?: csstype.Property.FontVariantAlternates | undefined;
        fontVariantCaps?: csstype.Property.FontVariantCaps | undefined;
        fontVariantEastAsian?: csstype.Property.FontVariantEastAsian | undefined;
        fontVariantEmoji?: csstype.Property.FontVariantEmoji | undefined;
        fontVariantLigatures?: csstype.Property.FontVariantLigatures | undefined;
        fontVariantNumeric?: csstype.Property.FontVariantNumeric | undefined;
        fontVariantPosition?: csstype.Property.FontVariantPosition | undefined;
        fontVariationSettings?: csstype.Property.FontVariationSettings | undefined;
        fontWeight?: csstype.Property.FontWeight | undefined;
        forcedColorAdjust?: csstype.Property.ForcedColorAdjust | undefined;
        gridAutoColumns?: csstype.Property.GridAutoColumns<string | number> | undefined;
        gridAutoFlow?: csstype.Property.GridAutoFlow | undefined;
        gridAutoRows?: csstype.Property.GridAutoRows<string | number> | undefined;
        gridColumnEnd?: csstype.Property.GridColumnEnd | undefined;
        gridColumnStart?: csstype.Property.GridColumnStart | undefined;
        gridRowEnd?: csstype.Property.GridRowEnd | undefined;
        gridRowStart?: csstype.Property.GridRowStart | undefined;
        gridTemplateAreas?: csstype.Property.GridTemplateAreas | undefined;
        gridTemplateColumns?: csstype.Property.GridTemplateColumns<string | number> | undefined;
        gridTemplateRows?: csstype.Property.GridTemplateRows<string | number> | undefined;
        hangingPunctuation?: csstype.Property.HangingPunctuation | undefined;
        height?: csstype.Property.Height<string | number> | undefined;
        hyphenateCharacter?: csstype.Property.HyphenateCharacter | undefined;
        hyphenateLimitChars?: csstype.Property.HyphenateLimitChars | undefined;
        hyphens?: csstype.Property.Hyphens | undefined;
        imageOrientation?: csstype.Property.ImageOrientation | undefined;
        imageRendering?: csstype.Property.ImageRendering | undefined;
        imageResolution?: csstype.Property.ImageResolution | undefined;
        initialLetter?: csstype.Property.InitialLetter | undefined;
        inlineSize?: csstype.Property.InlineSize<string | number> | undefined;
        inputSecurity?: csstype.Property.InputSecurity | undefined;
        insetBlockEnd?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        insetBlockStart?: csstype.Property.InsetBlockStart<string | number> | undefined;
        insetInlineEnd?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        insetInlineStart?: csstype.Property.InsetInlineStart<string | number> | undefined;
        isolation?: csstype.Property.Isolation | undefined;
        justifyContent?: csstype.Property.JustifyContent | undefined;
        justifyItems?: csstype.Property.JustifyItems | undefined;
        justifySelf?: csstype.Property.JustifySelf | undefined;
        justifyTracks?: csstype.Property.JustifyTracks | undefined;
        left?: csstype.Property.Left<string | number> | undefined;
        letterSpacing?: csstype.Property.LetterSpacing<string | number> | undefined;
        lineBreak?: csstype.Property.LineBreak | undefined;
        lineHeight?: csstype.Property.LineHeight<string | number> | undefined;
        lineHeightStep?: csstype.Property.LineHeightStep<string | number> | undefined;
        listStyleImage?: csstype.Property.ListStyleImage | undefined;
        listStylePosition?: csstype.Property.ListStylePosition | undefined;
        listStyleType?: csstype.Property.ListStyleType | undefined;
        marginBlockEnd?: csstype.Property.MarginBlockEnd<string | number> | undefined;
        marginBlockStart?: csstype.Property.MarginBlockStart<string | number> | undefined;
        marginBottom?: csstype.Property.MarginBottom<string | number> | undefined;
        marginInlineEnd?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        marginInlineStart?: csstype.Property.MarginInlineStart<string | number> | undefined;
        marginLeft?: csstype.Property.MarginLeft<string | number> | undefined;
        marginRight?: csstype.Property.MarginRight<string | number> | undefined;
        marginTop?: csstype.Property.MarginTop<string | number> | undefined;
        marginTrim?: csstype.Property.MarginTrim | undefined;
        maskBorderMode?: csstype.Property.MaskBorderMode | undefined;
        maskBorderOutset?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        maskBorderRepeat?: csstype.Property.MaskBorderRepeat | undefined;
        maskBorderSlice?: csstype.Property.MaskBorderSlice | undefined;
        maskBorderSource?: csstype.Property.MaskBorderSource | undefined;
        maskBorderWidth?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        maskClip?: csstype.Property.MaskClip | undefined;
        maskComposite?: csstype.Property.MaskComposite | undefined;
        maskImage?: csstype.Property.MaskImage | undefined;
        maskMode?: csstype.Property.MaskMode | undefined;
        maskOrigin?: csstype.Property.MaskOrigin | undefined;
        maskPosition?: csstype.Property.MaskPosition<string | number> | undefined;
        maskRepeat?: csstype.Property.MaskRepeat | undefined;
        maskSize?: csstype.Property.MaskSize<string | number> | undefined;
        maskType?: csstype.Property.MaskType | undefined;
        masonryAutoFlow?: csstype.Property.MasonryAutoFlow | undefined;
        mathDepth?: csstype.Property.MathDepth | undefined;
        mathShift?: csstype.Property.MathShift | undefined;
        mathStyle?: csstype.Property.MathStyle | undefined;
        maxBlockSize?: csstype.Property.MaxBlockSize<string | number> | undefined;
        maxHeight?: csstype.Property.MaxHeight<string | number> | undefined;
        maxInlineSize?: csstype.Property.MaxInlineSize<string | number> | undefined;
        maxLines?: csstype.Property.MaxLines | undefined;
        maxWidth?: csstype.Property.MaxWidth<string | number> | undefined;
        minBlockSize?: csstype.Property.MinBlockSize<string | number> | undefined;
        minHeight?: csstype.Property.MinHeight<string | number> | undefined;
        minInlineSize?: csstype.Property.MinInlineSize<string | number> | undefined;
        minWidth?: csstype.Property.MinWidth<string | number> | undefined;
        mixBlendMode?: csstype.Property.MixBlendMode | undefined;
        motionDistance?: csstype.Property.OffsetDistance<string | number> | undefined;
        motionPath?: csstype.Property.OffsetPath | undefined;
        motionRotation?: csstype.Property.OffsetRotate | undefined;
        objectFit?: csstype.Property.ObjectFit | undefined;
        objectPosition?: csstype.Property.ObjectPosition<string | number> | undefined;
        offsetAnchor?: csstype.Property.OffsetAnchor<string | number> | undefined;
        offsetDistance?: csstype.Property.OffsetDistance<string | number> | undefined;
        offsetPath?: csstype.Property.OffsetPath | undefined;
        offsetPosition?: csstype.Property.OffsetPosition<string | number> | undefined;
        offsetRotate?: csstype.Property.OffsetRotate | undefined;
        offsetRotation?: csstype.Property.OffsetRotate | undefined;
        opacity?: csstype.Property.Opacity | undefined;
        order?: csstype.Property.Order | undefined;
        orphans?: csstype.Property.Orphans | undefined;
        outlineColor?: csstype.Property.OutlineColor | undefined;
        outlineOffset?: csstype.Property.OutlineOffset<string | number> | undefined;
        outlineStyle?: csstype.Property.OutlineStyle | undefined;
        outlineWidth?: csstype.Property.OutlineWidth<string | number> | undefined;
        overflowAnchor?: csstype.Property.OverflowAnchor | undefined;
        overflowBlock?: csstype.Property.OverflowBlock | undefined;
        overflowClipBox?: csstype.Property.OverflowClipBox | undefined;
        overflowClipMargin?: csstype.Property.OverflowClipMargin<string | number> | undefined;
        overflowInline?: csstype.Property.OverflowInline | undefined;
        overflowWrap?: csstype.Property.OverflowWrap | undefined;
        overflowX?: csstype.Property.OverflowX | undefined;
        overflowY?: csstype.Property.OverflowY | undefined;
        overlay?: csstype.Property.Overlay | undefined;
        overscrollBehaviorBlock?: csstype.Property.OverscrollBehaviorBlock | undefined;
        overscrollBehaviorInline?: csstype.Property.OverscrollBehaviorInline | undefined;
        overscrollBehaviorX?: csstype.Property.OverscrollBehaviorX | undefined;
        overscrollBehaviorY?: csstype.Property.OverscrollBehaviorY | undefined;
        paddingBlockEnd?: csstype.Property.PaddingBlockEnd<string | number> | undefined;
        paddingBlockStart?: csstype.Property.PaddingBlockStart<string | number> | undefined;
        paddingBottom?: csstype.Property.PaddingBottom<string | number> | undefined;
        paddingInlineEnd?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        paddingInlineStart?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        paddingLeft?: csstype.Property.PaddingLeft<string | number> | undefined;
        paddingRight?: csstype.Property.PaddingRight<string | number> | undefined;
        paddingTop?: csstype.Property.PaddingTop<string | number> | undefined;
        page?: csstype.Property.Page | undefined;
        pageBreakAfter?: csstype.Property.PageBreakAfter | undefined;
        pageBreakBefore?: csstype.Property.PageBreakBefore | undefined;
        pageBreakInside?: csstype.Property.PageBreakInside | undefined;
        paintOrder?: csstype.Property.PaintOrder | undefined;
        perspectiveOrigin?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        pointerEvents?: csstype.Property.PointerEvents | undefined;
        position?: csstype.Property.Position | undefined;
        printColorAdjust?: csstype.Property.PrintColorAdjust | undefined;
        quotes?: csstype.Property.Quotes | undefined;
        resize?: csstype.Property.Resize | undefined;
        right?: csstype.Property.Right<string | number> | undefined;
        rowGap?: csstype.Property.RowGap<string | number> | undefined;
        rubyAlign?: csstype.Property.RubyAlign | undefined;
        rubyMerge?: csstype.Property.RubyMerge | undefined;
        rubyPosition?: csstype.Property.RubyPosition | undefined;
        scrollBehavior?: csstype.Property.ScrollBehavior | undefined;
        scrollMarginBlockEnd?: csstype.Property.ScrollMarginBlockEnd<string | number> | undefined;
        scrollMarginBlockStart?: csstype.Property.ScrollMarginBlockStart<string | number> | undefined;
        scrollMarginBottom?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        scrollMarginInlineEnd?: csstype.Property.ScrollMarginInlineEnd<string | number> | undefined;
        scrollMarginInlineStart?: csstype.Property.ScrollMarginInlineStart<string | number> | undefined;
        scrollMarginLeft?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        scrollMarginRight?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        scrollMarginTop?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        scrollPaddingBlockEnd?: csstype.Property.ScrollPaddingBlockEnd<string | number> | undefined;
        scrollPaddingBlockStart?: csstype.Property.ScrollPaddingBlockStart<string | number> | undefined;
        scrollPaddingBottom?: csstype.Property.ScrollPaddingBottom<string | number> | undefined;
        scrollPaddingInlineEnd?: csstype.Property.ScrollPaddingInlineEnd<string | number> | undefined;
        scrollPaddingInlineStart?: csstype.Property.ScrollPaddingInlineStart<string | number> | undefined;
        scrollPaddingLeft?: csstype.Property.ScrollPaddingLeft<string | number> | undefined;
        scrollPaddingRight?: csstype.Property.ScrollPaddingRight<string | number> | undefined;
        scrollPaddingTop?: csstype.Property.ScrollPaddingTop<string | number> | undefined;
        scrollSnapAlign?: csstype.Property.ScrollSnapAlign | undefined;
        scrollSnapMarginBottom?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        scrollSnapMarginLeft?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        scrollSnapMarginRight?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        scrollSnapMarginTop?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        scrollSnapStop?: csstype.Property.ScrollSnapStop | undefined;
        scrollSnapType?: csstype.Property.ScrollSnapType | undefined;
        scrollTimelineAxis?: csstype.Property.ScrollTimelineAxis | undefined;
        scrollTimelineName?: csstype.Property.ScrollTimelineName | undefined;
        scrollbarColor?: csstype.Property.ScrollbarColor | undefined;
        scrollbarGutter?: csstype.Property.ScrollbarGutter | undefined;
        scrollbarWidth?: csstype.Property.ScrollbarWidth | undefined;
        shapeImageThreshold?: csstype.Property.ShapeImageThreshold | undefined;
        shapeMargin?: csstype.Property.ShapeMargin<string | number> | undefined;
        shapeOutside?: csstype.Property.ShapeOutside | undefined;
        tabSize?: csstype.Property.TabSize<string | number> | undefined;
        tableLayout?: csstype.Property.TableLayout | undefined;
        textAlign?: csstype.Property.TextAlign | undefined;
        textAlignLast?: csstype.Property.TextAlignLast | undefined;
        textCombineUpright?: csstype.Property.TextCombineUpright | undefined;
        textDecorationColor?: csstype.Property.TextDecorationColor | undefined;
        textDecorationLine?: csstype.Property.TextDecorationLine | undefined;
        textDecorationSkip?: csstype.Property.TextDecorationSkip | undefined;
        textDecorationSkipInk?: csstype.Property.TextDecorationSkipInk | undefined;
        textDecorationStyle?: csstype.Property.TextDecorationStyle | undefined;
        textDecorationThickness?: csstype.Property.TextDecorationThickness<string | number> | undefined;
        textEmphasisColor?: csstype.Property.TextEmphasisColor | undefined;
        textEmphasisPosition?: csstype.Property.TextEmphasisPosition | undefined;
        textEmphasisStyle?: csstype.Property.TextEmphasisStyle | undefined;
        textIndent?: csstype.Property.TextIndent<string | number> | undefined;
        textJustify?: csstype.Property.TextJustify | undefined;
        textOrientation?: csstype.Property.TextOrientation | undefined;
        textOverflow?: csstype.Property.TextOverflow | undefined;
        textRendering?: csstype.Property.TextRendering | undefined;
        textShadow?: csstype.Property.TextShadow | undefined;
        textSizeAdjust?: csstype.Property.TextSizeAdjust | undefined;
        textTransform?: csstype.Property.TextTransform | undefined;
        textUnderlineOffset?: csstype.Property.TextUnderlineOffset<string | number> | undefined;
        textUnderlinePosition?: csstype.Property.TextUnderlinePosition | undefined;
        textWrap?: csstype.Property.TextWrap | undefined;
        timelineScope?: csstype.Property.TimelineScope | undefined;
        top?: csstype.Property.Top<string | number> | undefined;
        touchAction?: csstype.Property.TouchAction | undefined;
        transitionBehavior?: csstype.Property.TransitionBehavior | undefined;
        transitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        transitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        transitionProperty?: csstype.Property.TransitionProperty | undefined;
        transitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        translate?: csstype.Property.Translate<string | number> | undefined;
        unicodeBidi?: csstype.Property.UnicodeBidi | undefined;
        userSelect?: csstype.Property.UserSelect | undefined;
        verticalAlign?: csstype.Property.VerticalAlign<string | number> | undefined;
        viewTimelineAxis?: csstype.Property.ViewTimelineAxis | undefined;
        viewTimelineInset?: csstype.Property.ViewTimelineInset<string | number> | undefined;
        viewTimelineName?: csstype.Property.ViewTimelineName | undefined;
        viewTransitionName?: csstype.Property.ViewTransitionName | undefined;
        visibility?: csstype.Property.Visibility | undefined;
        whiteSpace?: csstype.Property.WhiteSpace | undefined;
        whiteSpaceCollapse?: csstype.Property.WhiteSpaceCollapse | undefined;
        whiteSpaceTrim?: csstype.Property.WhiteSpaceTrim | undefined;
        widows?: csstype.Property.Widows | undefined;
        width?: csstype.Property.Width<string | number> | undefined;
        willChange?: csstype.Property.WillChange | undefined;
        wordBreak?: csstype.Property.WordBreak | undefined;
        wordSpacing?: csstype.Property.WordSpacing<string | number> | undefined;
        wordWrap?: csstype.Property.WordWrap | undefined;
        writingMode?: csstype.Property.WritingMode | undefined;
        zIndex?: csstype.Property.ZIndex | undefined;
        zoom?: csstype.Property.Zoom | undefined;
        all?: csstype.Globals | undefined;
        animation?: csstype.Property.Animation<string & {}> | undefined;
        animationRange?: csstype.Property.AnimationRange<string | number> | undefined;
        background?: csstype.Property.Background<string | number> | undefined;
        backgroundPosition?: csstype.Property.BackgroundPosition<string | number> | undefined;
        border?: csstype.Property.Border<string | number> | undefined;
        borderBlock?: csstype.Property.BorderBlock<string | number> | undefined;
        borderBlockEnd?: csstype.Property.BorderBlockEnd<string | number> | undefined;
        borderBlockStart?: csstype.Property.BorderBlockStart<string | number> | undefined;
        borderBottom?: csstype.Property.BorderBottom<string | number> | undefined;
        borderColor?: csstype.Property.BorderColor | undefined;
        borderImage?: csstype.Property.BorderImage | undefined;
        borderInline?: csstype.Property.BorderInline<string | number> | undefined;
        borderInlineEnd?: csstype.Property.BorderInlineEnd<string | number> | undefined;
        borderInlineStart?: csstype.Property.BorderInlineStart<string | number> | undefined;
        borderLeft?: csstype.Property.BorderLeft<string | number> | undefined;
        borderRadius?: csstype.Property.BorderRadius<string | number> | undefined;
        borderRight?: csstype.Property.BorderRight<string | number> | undefined;
        borderStyle?: csstype.Property.BorderStyle | undefined;
        borderTop?: csstype.Property.BorderTop<string | number> | undefined;
        borderWidth?: csstype.Property.BorderWidth<string | number> | undefined;
        caret?: csstype.Property.Caret | undefined;
        columnRule?: csstype.Property.ColumnRule<string | number> | undefined;
        columns?: csstype.Property.Columns<string | number> | undefined;
        containIntrinsicSize?: csstype.Property.ContainIntrinsicSize<string | number> | undefined;
        container?: csstype.Property.Container | undefined;
        flex?: csstype.Property.Flex<string | number> | undefined;
        flexFlow?: csstype.Property.FlexFlow | undefined;
        font?: csstype.Property.Font | undefined;
        gap?: csstype.Property.Gap<string | number> | undefined;
        grid?: csstype.Property.Grid | undefined;
        gridArea?: csstype.Property.GridArea | undefined;
        gridColumn?: csstype.Property.GridColumn | undefined;
        gridRow?: csstype.Property.GridRow | undefined;
        gridTemplate?: csstype.Property.GridTemplate | undefined;
        inset?: csstype.Property.Inset<string | number> | undefined;
        insetBlock?: csstype.Property.InsetBlock<string | number> | undefined;
        insetInline?: csstype.Property.InsetInline<string | number> | undefined;
        lineClamp?: csstype.Property.LineClamp | undefined;
        listStyle?: csstype.Property.ListStyle | undefined;
        margin?: csstype.Property.Margin<string | number> | undefined;
        marginBlock?: csstype.Property.MarginBlock<string | number> | undefined;
        marginInline?: csstype.Property.MarginInline<string | number> | undefined;
        mask?: csstype.Property.Mask<string | number> | undefined;
        maskBorder?: csstype.Property.MaskBorder | undefined;
        motion?: csstype.Property.Offset<string | number> | undefined;
        offset?: csstype.Property.Offset<string | number> | undefined;
        outline?: csstype.Property.Outline<string | number> | undefined;
        overflow?: csstype.Property.Overflow | undefined;
        overscrollBehavior?: csstype.Property.OverscrollBehavior | undefined;
        padding?: csstype.Property.Padding<string | number> | undefined;
        paddingBlock?: csstype.Property.PaddingBlock<string | number> | undefined;
        paddingInline?: csstype.Property.PaddingInline<string | number> | undefined;
        placeContent?: csstype.Property.PlaceContent | undefined;
        placeItems?: csstype.Property.PlaceItems | undefined;
        placeSelf?: csstype.Property.PlaceSelf | undefined;
        scrollMargin?: csstype.Property.ScrollMargin<string | number> | undefined;
        scrollMarginBlock?: csstype.Property.ScrollMarginBlock<string | number> | undefined;
        scrollMarginInline?: csstype.Property.ScrollMarginInline<string | number> | undefined;
        scrollPadding?: csstype.Property.ScrollPadding<string | number> | undefined;
        scrollPaddingBlock?: csstype.Property.ScrollPaddingBlock<string | number> | undefined;
        scrollPaddingInline?: csstype.Property.ScrollPaddingInline<string | number> | undefined;
        scrollSnapMargin?: csstype.Property.ScrollMargin<string | number> | undefined;
        scrollTimeline?: csstype.Property.ScrollTimeline | undefined;
        textDecoration?: csstype.Property.TextDecoration<string | number> | undefined;
        textEmphasis?: csstype.Property.TextEmphasis | undefined;
        viewTimeline?: csstype.Property.ViewTimeline | undefined;
        MozAnimationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        MozAnimationDirection?: csstype.Property.AnimationDirection | undefined;
        MozAnimationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        MozAnimationFillMode?: csstype.Property.AnimationFillMode | undefined;
        MozAnimationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        MozAnimationName?: csstype.Property.AnimationName | undefined;
        MozAnimationPlayState?: csstype.Property.AnimationPlayState | undefined;
        MozAnimationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        MozAppearance?: csstype.Property.MozAppearance | undefined;
        MozBinding?: csstype.Property.MozBinding | undefined;
        MozBorderBottomColors?: csstype.Property.MozBorderBottomColors | undefined;
        MozBorderEndColor?: csstype.Property.BorderInlineEndColor | undefined;
        MozBorderEndStyle?: csstype.Property.BorderInlineEndStyle | undefined;
        MozBorderEndWidth?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        MozBorderLeftColors?: csstype.Property.MozBorderLeftColors | undefined;
        MozBorderRightColors?: csstype.Property.MozBorderRightColors | undefined;
        MozBorderStartColor?: csstype.Property.BorderInlineStartColor | undefined;
        MozBorderStartStyle?: csstype.Property.BorderInlineStartStyle | undefined;
        MozBorderTopColors?: csstype.Property.MozBorderTopColors | undefined;
        MozBoxSizing?: csstype.Property.BoxSizing | undefined;
        MozColumnCount?: csstype.Property.ColumnCount | undefined;
        MozColumnFill?: csstype.Property.ColumnFill | undefined;
        MozColumnRuleColor?: csstype.Property.ColumnRuleColor | undefined;
        MozColumnRuleStyle?: csstype.Property.ColumnRuleStyle | undefined;
        MozColumnRuleWidth?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        MozColumnWidth?: csstype.Property.ColumnWidth<string | number> | undefined;
        MozContextProperties?: csstype.Property.MozContextProperties | undefined;
        MozFontFeatureSettings?: csstype.Property.FontFeatureSettings | undefined;
        MozFontLanguageOverride?: csstype.Property.FontLanguageOverride | undefined;
        MozHyphens?: csstype.Property.Hyphens | undefined;
        MozImageRegion?: csstype.Property.MozImageRegion | undefined;
        MozMarginEnd?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        MozMarginStart?: csstype.Property.MarginInlineStart<string | number> | undefined;
        MozOrient?: csstype.Property.MozOrient | undefined;
        MozOsxFontSmoothing?: csstype.Property.FontSmooth<string | number> | undefined;
        MozOutlineRadiusBottomleft?: csstype.Property.MozOutlineRadiusBottomleft<string | number> | undefined;
        MozOutlineRadiusBottomright?: csstype.Property.MozOutlineRadiusBottomright<string | number> | undefined;
        MozOutlineRadiusTopleft?: csstype.Property.MozOutlineRadiusTopleft<string | number> | undefined;
        MozOutlineRadiusTopright?: csstype.Property.MozOutlineRadiusTopright<string | number> | undefined;
        MozPaddingEnd?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        MozPaddingStart?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        MozStackSizing?: csstype.Property.MozStackSizing | undefined;
        MozTabSize?: csstype.Property.TabSize<string | number> | undefined;
        MozTextBlink?: csstype.Property.MozTextBlink | undefined;
        MozTextSizeAdjust?: csstype.Property.TextSizeAdjust | undefined;
        MozUserFocus?: csstype.Property.MozUserFocus | undefined;
        MozUserModify?: csstype.Property.MozUserModify | undefined;
        MozUserSelect?: csstype.Property.UserSelect | undefined;
        MozWindowDragging?: csstype.Property.MozWindowDragging | undefined;
        MozWindowShadow?: csstype.Property.MozWindowShadow | undefined;
        msAccelerator?: csstype.Property.MsAccelerator | undefined;
        msBlockProgression?: csstype.Property.MsBlockProgression | undefined;
        msContentZoomChaining?: csstype.Property.MsContentZoomChaining | undefined;
        msContentZoomLimitMax?: csstype.Property.MsContentZoomLimitMax | undefined;
        msContentZoomLimitMin?: csstype.Property.MsContentZoomLimitMin | undefined;
        msContentZoomSnapPoints?: csstype.Property.MsContentZoomSnapPoints | undefined;
        msContentZoomSnapType?: csstype.Property.MsContentZoomSnapType | undefined;
        msContentZooming?: csstype.Property.MsContentZooming | undefined;
        msFilter?: csstype.Property.MsFilter | undefined;
        msFlexDirection?: csstype.Property.FlexDirection | undefined;
        msFlexPositive?: csstype.Property.FlexGrow | undefined;
        msFlowFrom?: csstype.Property.MsFlowFrom | undefined;
        msFlowInto?: csstype.Property.MsFlowInto | undefined;
        msGridColumns?: csstype.Property.MsGridColumns<string | number> | undefined;
        msGridRows?: csstype.Property.MsGridRows<string | number> | undefined;
        msHighContrastAdjust?: csstype.Property.MsHighContrastAdjust | undefined;
        msHyphenateLimitChars?: csstype.Property.MsHyphenateLimitChars | undefined;
        msHyphenateLimitLines?: csstype.Property.MsHyphenateLimitLines | undefined;
        msHyphenateLimitZone?: csstype.Property.MsHyphenateLimitZone<string | number> | undefined;
        msHyphens?: csstype.Property.Hyphens | undefined;
        msImeAlign?: csstype.Property.MsImeAlign | undefined;
        msLineBreak?: csstype.Property.LineBreak | undefined;
        msOrder?: csstype.Property.Order | undefined;
        msOverflowStyle?: csstype.Property.MsOverflowStyle | undefined;
        msOverflowX?: csstype.Property.OverflowX | undefined;
        msOverflowY?: csstype.Property.OverflowY | undefined;
        msScrollChaining?: csstype.Property.MsScrollChaining | undefined;
        msScrollLimitXMax?: csstype.Property.MsScrollLimitXMax<string | number> | undefined;
        msScrollLimitXMin?: csstype.Property.MsScrollLimitXMin<string | number> | undefined;
        msScrollLimitYMax?: csstype.Property.MsScrollLimitYMax<string | number> | undefined;
        msScrollLimitYMin?: csstype.Property.MsScrollLimitYMin<string | number> | undefined;
        msScrollRails?: csstype.Property.MsScrollRails | undefined;
        msScrollSnapPointsX?: csstype.Property.MsScrollSnapPointsX | undefined;
        msScrollSnapPointsY?: csstype.Property.MsScrollSnapPointsY | undefined;
        msScrollSnapType?: csstype.Property.MsScrollSnapType | undefined;
        msScrollTranslation?: csstype.Property.MsScrollTranslation | undefined;
        msScrollbar3dlightColor?: csstype.Property.MsScrollbar3dlightColor | undefined;
        msScrollbarArrowColor?: csstype.Property.MsScrollbarArrowColor | undefined;
        msScrollbarBaseColor?: csstype.Property.MsScrollbarBaseColor | undefined;
        msScrollbarDarkshadowColor?: csstype.Property.MsScrollbarDarkshadowColor | undefined;
        msScrollbarFaceColor?: csstype.Property.MsScrollbarFaceColor | undefined;
        msScrollbarHighlightColor?: csstype.Property.MsScrollbarHighlightColor | undefined;
        msScrollbarShadowColor?: csstype.Property.MsScrollbarShadowColor | undefined;
        msScrollbarTrackColor?: csstype.Property.MsScrollbarTrackColor | undefined;
        msTextAutospace?: csstype.Property.MsTextAutospace | undefined;
        msTextCombineHorizontal?: csstype.Property.TextCombineUpright | undefined;
        msTextOverflow?: csstype.Property.TextOverflow | undefined;
        msTouchAction?: csstype.Property.TouchAction | undefined;
        msTouchSelect?: csstype.Property.MsTouchSelect | undefined;
        msTransform?: csstype.Property.Transform | undefined;
        msTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        msTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        msTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        msTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        msTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        msUserSelect?: csstype.Property.MsUserSelect | undefined;
        msWordBreak?: csstype.Property.WordBreak | undefined;
        msWrapFlow?: csstype.Property.MsWrapFlow | undefined;
        msWrapMargin?: csstype.Property.MsWrapMargin<string | number> | undefined;
        msWrapThrough?: csstype.Property.MsWrapThrough | undefined;
        msWritingMode?: csstype.Property.WritingMode | undefined;
        WebkitAlignContent?: csstype.Property.AlignContent | undefined;
        WebkitAlignItems?: csstype.Property.AlignItems | undefined;
        WebkitAlignSelf?: csstype.Property.AlignSelf | undefined;
        WebkitAnimationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        WebkitAnimationDirection?: csstype.Property.AnimationDirection | undefined;
        WebkitAnimationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        WebkitAnimationFillMode?: csstype.Property.AnimationFillMode | undefined;
        WebkitAnimationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        WebkitAnimationName?: csstype.Property.AnimationName | undefined;
        WebkitAnimationPlayState?: csstype.Property.AnimationPlayState | undefined;
        WebkitAnimationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        WebkitAppearance?: csstype.Property.WebkitAppearance | undefined;
        WebkitBackdropFilter?: csstype.Property.BackdropFilter | undefined;
        WebkitBackfaceVisibility?: csstype.Property.BackfaceVisibility | undefined;
        WebkitBackgroundClip?: csstype.Property.BackgroundClip | undefined;
        WebkitBackgroundOrigin?: csstype.Property.BackgroundOrigin | undefined;
        WebkitBackgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        WebkitBorderBeforeColor?: csstype.Property.WebkitBorderBeforeColor | undefined;
        WebkitBorderBeforeStyle?: csstype.Property.WebkitBorderBeforeStyle | undefined;
        WebkitBorderBeforeWidth?: csstype.Property.WebkitBorderBeforeWidth<string | number> | undefined;
        WebkitBorderBottomLeftRadius?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        WebkitBorderBottomRightRadius?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        WebkitBorderImageSlice?: csstype.Property.BorderImageSlice | undefined;
        WebkitBorderTopLeftRadius?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        WebkitBorderTopRightRadius?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        WebkitBoxDecorationBreak?: csstype.Property.BoxDecorationBreak | undefined;
        WebkitBoxReflect?: csstype.Property.WebkitBoxReflect<string | number> | undefined;
        WebkitBoxShadow?: csstype.Property.BoxShadow | undefined;
        WebkitBoxSizing?: csstype.Property.BoxSizing | undefined;
        WebkitClipPath?: csstype.Property.ClipPath | undefined;
        WebkitColumnCount?: csstype.Property.ColumnCount | undefined;
        WebkitColumnFill?: csstype.Property.ColumnFill | undefined;
        WebkitColumnRuleColor?: csstype.Property.ColumnRuleColor | undefined;
        WebkitColumnRuleStyle?: csstype.Property.ColumnRuleStyle | undefined;
        WebkitColumnRuleWidth?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        WebkitColumnSpan?: csstype.Property.ColumnSpan | undefined;
        WebkitColumnWidth?: csstype.Property.ColumnWidth<string | number> | undefined;
        WebkitFilter?: csstype.Property.Filter | undefined;
        WebkitFlexBasis?: csstype.Property.FlexBasis<string | number> | undefined;
        WebkitFlexDirection?: csstype.Property.FlexDirection | undefined;
        WebkitFlexGrow?: csstype.Property.FlexGrow | undefined;
        WebkitFlexShrink?: csstype.Property.FlexShrink | undefined;
        WebkitFlexWrap?: csstype.Property.FlexWrap | undefined;
        WebkitFontFeatureSettings?: csstype.Property.FontFeatureSettings | undefined;
        WebkitFontKerning?: csstype.Property.FontKerning | undefined;
        WebkitFontSmoothing?: csstype.Property.FontSmooth<string | number> | undefined;
        WebkitFontVariantLigatures?: csstype.Property.FontVariantLigatures | undefined;
        WebkitHyphenateCharacter?: csstype.Property.HyphenateCharacter | undefined;
        WebkitHyphens?: csstype.Property.Hyphens | undefined;
        WebkitInitialLetter?: csstype.Property.InitialLetter | undefined;
        WebkitJustifyContent?: csstype.Property.JustifyContent | undefined;
        WebkitLineBreak?: csstype.Property.LineBreak | undefined;
        WebkitLineClamp?: csstype.Property.WebkitLineClamp | undefined;
        WebkitMarginEnd?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        WebkitMarginStart?: csstype.Property.MarginInlineStart<string | number> | undefined;
        WebkitMaskAttachment?: csstype.Property.WebkitMaskAttachment | undefined;
        WebkitMaskBoxImageOutset?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        WebkitMaskBoxImageRepeat?: csstype.Property.MaskBorderRepeat | undefined;
        WebkitMaskBoxImageSlice?: csstype.Property.MaskBorderSlice | undefined;
        WebkitMaskBoxImageSource?: csstype.Property.MaskBorderSource | undefined;
        WebkitMaskBoxImageWidth?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        WebkitMaskClip?: csstype.Property.WebkitMaskClip | undefined;
        WebkitMaskComposite?: csstype.Property.WebkitMaskComposite | undefined;
        WebkitMaskImage?: csstype.Property.WebkitMaskImage | undefined;
        WebkitMaskOrigin?: csstype.Property.WebkitMaskOrigin | undefined;
        WebkitMaskPosition?: csstype.Property.WebkitMaskPosition<string | number> | undefined;
        WebkitMaskPositionX?: csstype.Property.WebkitMaskPositionX<string | number> | undefined;
        WebkitMaskPositionY?: csstype.Property.WebkitMaskPositionY<string | number> | undefined;
        WebkitMaskRepeat?: csstype.Property.WebkitMaskRepeat | undefined;
        WebkitMaskRepeatX?: csstype.Property.WebkitMaskRepeatX | undefined;
        WebkitMaskRepeatY?: csstype.Property.WebkitMaskRepeatY | undefined;
        WebkitMaskSize?: csstype.Property.WebkitMaskSize<string | number> | undefined;
        WebkitMaxInlineSize?: csstype.Property.MaxInlineSize<string | number> | undefined;
        WebkitOrder?: csstype.Property.Order | undefined;
        WebkitOverflowScrolling?: csstype.Property.WebkitOverflowScrolling | undefined;
        WebkitPaddingEnd?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        WebkitPaddingStart?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        WebkitPerspective?: csstype.Property.Perspective<string | number> | undefined;
        WebkitPerspectiveOrigin?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        WebkitPrintColorAdjust?: csstype.Property.PrintColorAdjust | undefined;
        WebkitRubyPosition?: csstype.Property.RubyPosition | undefined;
        WebkitScrollSnapType?: csstype.Property.ScrollSnapType | undefined;
        WebkitShapeMargin?: csstype.Property.ShapeMargin<string | number> | undefined;
        WebkitTapHighlightColor?: csstype.Property.WebkitTapHighlightColor | undefined;
        WebkitTextCombine?: csstype.Property.TextCombineUpright | undefined;
        WebkitTextDecorationColor?: csstype.Property.TextDecorationColor | undefined;
        WebkitTextDecorationLine?: csstype.Property.TextDecorationLine | undefined;
        WebkitTextDecorationSkip?: csstype.Property.TextDecorationSkip | undefined;
        WebkitTextDecorationStyle?: csstype.Property.TextDecorationStyle | undefined;
        WebkitTextEmphasisColor?: csstype.Property.TextEmphasisColor | undefined;
        WebkitTextEmphasisPosition?: csstype.Property.TextEmphasisPosition | undefined;
        WebkitTextEmphasisStyle?: csstype.Property.TextEmphasisStyle | undefined;
        WebkitTextFillColor?: csstype.Property.WebkitTextFillColor | undefined;
        WebkitTextOrientation?: csstype.Property.TextOrientation | undefined;
        WebkitTextSizeAdjust?: csstype.Property.TextSizeAdjust | undefined;
        WebkitTextStrokeColor?: csstype.Property.WebkitTextStrokeColor | undefined;
        WebkitTextStrokeWidth?: csstype.Property.WebkitTextStrokeWidth<string | number> | undefined;
        WebkitTextUnderlinePosition?: csstype.Property.TextUnderlinePosition | undefined;
        WebkitTouchCallout?: csstype.Property.WebkitTouchCallout | undefined;
        WebkitTransform?: csstype.Property.Transform | undefined;
        WebkitTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        WebkitTransformStyle?: csstype.Property.TransformStyle | undefined;
        WebkitTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        WebkitTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        WebkitTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        WebkitTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        WebkitUserModify?: csstype.Property.WebkitUserModify | undefined;
        WebkitUserSelect?: csstype.Property.UserSelect | undefined;
        WebkitWritingMode?: csstype.Property.WritingMode | undefined;
        MozAnimation?: csstype.Property.Animation<string & {}> | undefined;
        MozBorderImage?: csstype.Property.BorderImage | undefined;
        MozColumnRule?: csstype.Property.ColumnRule<string | number> | undefined;
        MozColumns?: csstype.Property.Columns<string | number> | undefined;
        MozOutlineRadius?: csstype.Property.MozOutlineRadius<string | number> | undefined;
        msContentZoomLimit?: csstype.Property.MsContentZoomLimit | undefined;
        msContentZoomSnap?: csstype.Property.MsContentZoomSnap | undefined;
        msFlex?: csstype.Property.Flex<string | number> | undefined;
        msScrollLimit?: csstype.Property.MsScrollLimit | undefined;
        msScrollSnapX?: csstype.Property.MsScrollSnapX | undefined;
        msScrollSnapY?: csstype.Property.MsScrollSnapY | undefined;
        msTransition?: csstype.Property.Transition<string & {}> | undefined;
        WebkitAnimation?: csstype.Property.Animation<string & {}> | undefined;
        WebkitBorderBefore?: csstype.Property.WebkitBorderBefore<string | number> | undefined;
        WebkitBorderImage?: csstype.Property.BorderImage | undefined;
        WebkitBorderRadius?: csstype.Property.BorderRadius<string | number> | undefined;
        WebkitColumnRule?: csstype.Property.ColumnRule<string | number> | undefined;
        WebkitColumns?: csstype.Property.Columns<string | number> | undefined;
        WebkitFlex?: csstype.Property.Flex<string | number> | undefined;
        WebkitFlexFlow?: csstype.Property.FlexFlow | undefined;
        WebkitMask?: csstype.Property.WebkitMask<string | number> | undefined;
        WebkitMaskBoxImage?: csstype.Property.MaskBorder | undefined;
        WebkitTextEmphasis?: csstype.Property.TextEmphasis | undefined;
        WebkitTextStroke?: csstype.Property.WebkitTextStroke<string | number> | undefined;
        WebkitTransition?: csstype.Property.Transition<string & {}> | undefined;
        azimuth?: csstype.Property.Azimuth | undefined;
        boxAlign?: csstype.Property.BoxAlign | undefined;
        boxDirection?: csstype.Property.BoxDirection | undefined;
        boxFlex?: csstype.Property.BoxFlex | undefined;
        boxFlexGroup?: csstype.Property.BoxFlexGroup | undefined;
        boxLines?: csstype.Property.BoxLines | undefined;
        boxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        boxOrient?: csstype.Property.BoxOrient | undefined;
        boxPack?: csstype.Property.BoxPack | undefined;
        clip?: csstype.Property.Clip | undefined;
        gridColumnGap?: csstype.Property.GridColumnGap<string | number> | undefined;
        gridGap?: csstype.Property.GridGap<string | number> | undefined;
        gridRowGap?: csstype.Property.GridRowGap<string | number> | undefined;
        imeMode?: csstype.Property.ImeMode | undefined;
        offsetBlock?: csstype.Property.InsetBlock<string | number> | undefined;
        offsetBlockEnd?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        offsetBlockStart?: csstype.Property.InsetBlockStart<string | number> | undefined;
        offsetInline?: csstype.Property.InsetInline<string | number> | undefined;
        offsetInlineEnd?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        offsetInlineStart?: csstype.Property.InsetInlineStart<string | number> | undefined;
        scrollSnapCoordinate?: csstype.Property.ScrollSnapCoordinate<string | number> | undefined;
        scrollSnapDestination?: csstype.Property.ScrollSnapDestination<string | number> | undefined;
        scrollSnapPointsX?: csstype.Property.ScrollSnapPointsX | undefined;
        scrollSnapPointsY?: csstype.Property.ScrollSnapPointsY | undefined;
        scrollSnapTypeX?: csstype.Property.ScrollSnapTypeX | undefined;
        scrollSnapTypeY?: csstype.Property.ScrollSnapTypeY | undefined;
        KhtmlBoxAlign?: csstype.Property.BoxAlign | undefined;
        KhtmlBoxDirection?: csstype.Property.BoxDirection | undefined;
        KhtmlBoxFlex?: csstype.Property.BoxFlex | undefined;
        KhtmlBoxFlexGroup?: csstype.Property.BoxFlexGroup | undefined;
        KhtmlBoxLines?: csstype.Property.BoxLines | undefined;
        KhtmlBoxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        KhtmlBoxOrient?: csstype.Property.BoxOrient | undefined;
        KhtmlBoxPack?: csstype.Property.BoxPack | undefined;
        KhtmlLineBreak?: csstype.Property.LineBreak | undefined;
        KhtmlOpacity?: csstype.Property.Opacity | undefined;
        KhtmlUserSelect?: csstype.Property.UserSelect | undefined;
        MozBackfaceVisibility?: csstype.Property.BackfaceVisibility | undefined;
        MozBackgroundClip?: csstype.Property.BackgroundClip | undefined;
        MozBackgroundInlinePolicy?: csstype.Property.BoxDecorationBreak | undefined;
        MozBackgroundOrigin?: csstype.Property.BackgroundOrigin | undefined;
        MozBackgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        MozBorderRadius?: csstype.Property.BorderRadius<string | number> | undefined;
        MozBorderRadiusBottomleft?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        MozBorderRadiusBottomright?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        MozBorderRadiusTopleft?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        MozBorderRadiusTopright?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        MozBoxAlign?: csstype.Property.BoxAlign | undefined;
        MozBoxDirection?: csstype.Property.BoxDirection | undefined;
        MozBoxFlex?: csstype.Property.BoxFlex | undefined;
        MozBoxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        MozBoxOrient?: csstype.Property.BoxOrient | undefined;
        MozBoxPack?: csstype.Property.BoxPack | undefined;
        MozBoxShadow?: csstype.Property.BoxShadow | undefined;
        MozFloatEdge?: csstype.Property.MozFloatEdge | undefined;
        MozForceBrokenImageIcon?: csstype.Property.MozForceBrokenImageIcon | undefined;
        MozOpacity?: csstype.Property.Opacity | undefined;
        MozOutline?: csstype.Property.Outline<string | number> | undefined;
        MozOutlineColor?: csstype.Property.OutlineColor | undefined;
        MozOutlineStyle?: csstype.Property.OutlineStyle | undefined;
        MozOutlineWidth?: csstype.Property.OutlineWidth<string | number> | undefined;
        MozPerspective?: csstype.Property.Perspective<string | number> | undefined;
        MozPerspectiveOrigin?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        MozTextAlignLast?: csstype.Property.TextAlignLast | undefined;
        MozTextDecorationColor?: csstype.Property.TextDecorationColor | undefined;
        MozTextDecorationLine?: csstype.Property.TextDecorationLine | undefined;
        MozTextDecorationStyle?: csstype.Property.TextDecorationStyle | undefined;
        MozTransform?: csstype.Property.Transform | undefined;
        MozTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        MozTransformStyle?: csstype.Property.TransformStyle | undefined;
        MozTransition?: csstype.Property.Transition<string & {}> | undefined;
        MozTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        MozTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        MozTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        MozTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        MozUserInput?: csstype.Property.MozUserInput | undefined;
        msImeMode?: csstype.Property.ImeMode | undefined;
        OAnimation?: csstype.Property.Animation<string & {}> | undefined;
        OAnimationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        OAnimationDirection?: csstype.Property.AnimationDirection | undefined;
        OAnimationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        OAnimationFillMode?: csstype.Property.AnimationFillMode | undefined;
        OAnimationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        OAnimationName?: csstype.Property.AnimationName | undefined;
        OAnimationPlayState?: csstype.Property.AnimationPlayState | undefined;
        OAnimationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        OBackgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        OBorderImage?: csstype.Property.BorderImage | undefined;
        OObjectFit?: csstype.Property.ObjectFit | undefined;
        OObjectPosition?: csstype.Property.ObjectPosition<string | number> | undefined;
        OTabSize?: csstype.Property.TabSize<string | number> | undefined;
        OTextOverflow?: csstype.Property.TextOverflow | undefined;
        OTransform?: csstype.Property.Transform | undefined;
        OTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        OTransition?: csstype.Property.Transition<string & {}> | undefined;
        OTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        OTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        OTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        OTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        WebkitBoxAlign?: csstype.Property.BoxAlign | undefined;
        WebkitBoxDirection?: csstype.Property.BoxDirection | undefined;
        WebkitBoxFlex?: csstype.Property.BoxFlex | undefined;
        WebkitBoxFlexGroup?: csstype.Property.BoxFlexGroup | undefined;
        WebkitBoxLines?: csstype.Property.BoxLines | undefined;
        WebkitBoxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        WebkitBoxOrient?: csstype.Property.BoxOrient | undefined;
        WebkitBoxPack?: csstype.Property.BoxPack | undefined;
        alignmentBaseline?: csstype.Property.AlignmentBaseline | undefined;
        baselineShift?: csstype.Property.BaselineShift<string | number> | undefined;
        clipRule?: csstype.Property.ClipRule | undefined;
        colorInterpolation?: csstype.Property.ColorInterpolation | undefined;
        colorRendering?: csstype.Property.ColorRendering | undefined;
        dominantBaseline?: csstype.Property.DominantBaseline | undefined;
        fillOpacity?: csstype.Property.FillOpacity | undefined;
        fillRule?: csstype.Property.FillRule | undefined;
        floodColor?: csstype.Property.FloodColor | undefined;
        floodOpacity?: csstype.Property.FloodOpacity | undefined;
        glyphOrientationVertical?: csstype.Property.GlyphOrientationVertical | undefined;
        lightingColor?: csstype.Property.LightingColor | undefined;
        marker?: csstype.Property.Marker | undefined;
        markerEnd?: csstype.Property.MarkerEnd | undefined;
        markerMid?: csstype.Property.MarkerMid | undefined;
        markerStart?: csstype.Property.MarkerStart | undefined;
        shapeRendering?: csstype.Property.ShapeRendering | undefined;
        stopColor?: csstype.Property.StopColor | undefined;
        stopOpacity?: csstype.Property.StopOpacity | undefined;
        stroke?: csstype.Property.Stroke | undefined;
        strokeDasharray?: csstype.Property.StrokeDasharray<string | number> | undefined;
        strokeDashoffset?: csstype.Property.StrokeDashoffset<string | number> | undefined;
        strokeLinecap?: csstype.Property.StrokeLinecap | undefined;
        strokeLinejoin?: csstype.Property.StrokeLinejoin | undefined;
        strokeMiterlimit?: csstype.Property.StrokeMiterlimit | undefined;
        strokeOpacity?: csstype.Property.StrokeOpacity | undefined;
        strokeWidth?: csstype.Property.StrokeWidth<string | number> | undefined;
        textAnchor?: csstype.Property.TextAnchor | undefined;
        vectorEffect?: csstype.Property.VectorEffect | undefined;
        "accent-color"?: csstype.Property.AccentColor | undefined;
        "align-content"?: csstype.Property.AlignContent | undefined;
        "align-items"?: csstype.Property.AlignItems | undefined;
        "align-self"?: csstype.Property.AlignSelf | undefined;
        "align-tracks"?: csstype.Property.AlignTracks | undefined;
        "animation-composition"?: csstype.Property.AnimationComposition | undefined;
        "animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "animation-name"?: csstype.Property.AnimationName | undefined;
        "animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "animation-range-end"?: csstype.Property.AnimationRangeEnd<string | number> | undefined;
        "animation-range-start"?: csstype.Property.AnimationRangeStart<string | number> | undefined;
        "animation-timeline"?: csstype.Property.AnimationTimeline | undefined;
        "animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "aspect-ratio"?: csstype.Property.AspectRatio | undefined;
        "backdrop-filter"?: csstype.Property.BackdropFilter | undefined;
        "backface-visibility"?: csstype.Property.BackfaceVisibility | undefined;
        "background-attachment"?: csstype.Property.BackgroundAttachment | undefined;
        "background-blend-mode"?: csstype.Property.BackgroundBlendMode | undefined;
        "background-clip"?: csstype.Property.BackgroundClip | undefined;
        "background-color"?: csstype.Property.BackgroundColor | undefined;
        "background-image"?: csstype.Property.BackgroundImage | undefined;
        "background-origin"?: csstype.Property.BackgroundOrigin | undefined;
        "background-position-x"?: csstype.Property.BackgroundPositionX<string | number> | undefined;
        "background-position-y"?: csstype.Property.BackgroundPositionY<string | number> | undefined;
        "background-repeat"?: csstype.Property.BackgroundRepeat | undefined;
        "background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "block-overflow"?: csstype.Property.BlockOverflow | undefined;
        "block-size"?: csstype.Property.BlockSize<string | number> | undefined;
        "border-block-color"?: csstype.Property.BorderBlockColor | undefined;
        "border-block-end-color"?: csstype.Property.BorderBlockEndColor | undefined;
        "border-block-end-style"?: csstype.Property.BorderBlockEndStyle | undefined;
        "border-block-end-width"?: csstype.Property.BorderBlockEndWidth<string | number> | undefined;
        "border-block-start-color"?: csstype.Property.BorderBlockStartColor | undefined;
        "border-block-start-style"?: csstype.Property.BorderBlockStartStyle | undefined;
        "border-block-start-width"?: csstype.Property.BorderBlockStartWidth<string | number> | undefined;
        "border-block-style"?: csstype.Property.BorderBlockStyle | undefined;
        "border-block-width"?: csstype.Property.BorderBlockWidth<string | number> | undefined;
        "border-bottom-color"?: csstype.Property.BorderBottomColor | undefined;
        "border-bottom-left-radius"?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        "border-bottom-right-radius"?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        "border-bottom-style"?: csstype.Property.BorderBottomStyle | undefined;
        "border-bottom-width"?: csstype.Property.BorderBottomWidth<string | number> | undefined;
        "border-collapse"?: csstype.Property.BorderCollapse | undefined;
        "border-end-end-radius"?: csstype.Property.BorderEndEndRadius<string | number> | undefined;
        "border-end-start-radius"?: csstype.Property.BorderEndStartRadius<string | number> | undefined;
        "border-image-outset"?: csstype.Property.BorderImageOutset<string | number> | undefined;
        "border-image-repeat"?: csstype.Property.BorderImageRepeat | undefined;
        "border-image-slice"?: csstype.Property.BorderImageSlice | undefined;
        "border-image-source"?: csstype.Property.BorderImageSource | undefined;
        "border-image-width"?: csstype.Property.BorderImageWidth<string | number> | undefined;
        "border-inline-color"?: csstype.Property.BorderInlineColor | undefined;
        "border-inline-end-color"?: csstype.Property.BorderInlineEndColor | undefined;
        "border-inline-end-style"?: csstype.Property.BorderInlineEndStyle | undefined;
        "border-inline-end-width"?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        "border-inline-start-color"?: csstype.Property.BorderInlineStartColor | undefined;
        "border-inline-start-style"?: csstype.Property.BorderInlineStartStyle | undefined;
        "border-inline-start-width"?: csstype.Property.BorderInlineStartWidth<string | number> | undefined;
        "border-inline-style"?: csstype.Property.BorderInlineStyle | undefined;
        "border-inline-width"?: csstype.Property.BorderInlineWidth<string | number> | undefined;
        "border-left-color"?: csstype.Property.BorderLeftColor | undefined;
        "border-left-style"?: csstype.Property.BorderLeftStyle | undefined;
        "border-left-width"?: csstype.Property.BorderLeftWidth<string | number> | undefined;
        "border-right-color"?: csstype.Property.BorderRightColor | undefined;
        "border-right-style"?: csstype.Property.BorderRightStyle | undefined;
        "border-right-width"?: csstype.Property.BorderRightWidth<string | number> | undefined;
        "border-spacing"?: csstype.Property.BorderSpacing<string | number> | undefined;
        "border-start-end-radius"?: csstype.Property.BorderStartEndRadius<string | number> | undefined;
        "border-start-start-radius"?: csstype.Property.BorderStartStartRadius<string | number> | undefined;
        "border-top-color"?: csstype.Property.BorderTopColor | undefined;
        "border-top-left-radius"?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        "border-top-right-radius"?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        "border-top-style"?: csstype.Property.BorderTopStyle | undefined;
        "border-top-width"?: csstype.Property.BorderTopWidth<string | number> | undefined;
        "box-decoration-break"?: csstype.Property.BoxDecorationBreak | undefined;
        "box-shadow"?: csstype.Property.BoxShadow | undefined;
        "box-sizing"?: csstype.Property.BoxSizing | undefined;
        "break-after"?: csstype.Property.BreakAfter | undefined;
        "break-before"?: csstype.Property.BreakBefore | undefined;
        "break-inside"?: csstype.Property.BreakInside | undefined;
        "caption-side"?: csstype.Property.CaptionSide | undefined;
        "caret-color"?: csstype.Property.CaretColor | undefined;
        "caret-shape"?: csstype.Property.CaretShape | undefined;
        "clip-path"?: csstype.Property.ClipPath | undefined;
        "color-adjust"?: csstype.Property.PrintColorAdjust | undefined;
        "color-scheme"?: csstype.Property.ColorScheme | undefined;
        "column-count"?: csstype.Property.ColumnCount | undefined;
        "column-fill"?: csstype.Property.ColumnFill | undefined;
        "column-gap"?: csstype.Property.ColumnGap<string | number> | undefined;
        "column-rule-color"?: csstype.Property.ColumnRuleColor | undefined;
        "column-rule-style"?: csstype.Property.ColumnRuleStyle | undefined;
        "column-rule-width"?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        "column-span"?: csstype.Property.ColumnSpan | undefined;
        "column-width"?: csstype.Property.ColumnWidth<string | number> | undefined;
        "contain-intrinsic-block-size"?: csstype.Property.ContainIntrinsicBlockSize<string | number> | undefined;
        "contain-intrinsic-height"?: csstype.Property.ContainIntrinsicHeight<string | number> | undefined;
        "contain-intrinsic-inline-size"?: csstype.Property.ContainIntrinsicInlineSize<string | number> | undefined;
        "contain-intrinsic-width"?: csstype.Property.ContainIntrinsicWidth<string | number> | undefined;
        "container-name"?: csstype.Property.ContainerName | undefined;
        "container-type"?: csstype.Property.ContainerType | undefined;
        "content-visibility"?: csstype.Property.ContentVisibility | undefined;
        "counter-increment"?: csstype.Property.CounterIncrement | undefined;
        "counter-reset"?: csstype.Property.CounterReset | undefined;
        "counter-set"?: csstype.Property.CounterSet | undefined;
        "empty-cells"?: csstype.Property.EmptyCells | undefined;
        "flex-basis"?: csstype.Property.FlexBasis<string | number> | undefined;
        "flex-direction"?: csstype.Property.FlexDirection | undefined;
        "flex-grow"?: csstype.Property.FlexGrow | undefined;
        "flex-shrink"?: csstype.Property.FlexShrink | undefined;
        "flex-wrap"?: csstype.Property.FlexWrap | undefined;
        "font-family"?: csstype.Property.FontFamily | undefined;
        "font-feature-settings"?: csstype.Property.FontFeatureSettings | undefined;
        "font-kerning"?: csstype.Property.FontKerning | undefined;
        "font-language-override"?: csstype.Property.FontLanguageOverride | undefined;
        "font-optical-sizing"?: csstype.Property.FontOpticalSizing | undefined;
        "font-palette"?: csstype.Property.FontPalette | undefined;
        "font-size"?: csstype.Property.FontSize<string | number> | undefined;
        "font-size-adjust"?: csstype.Property.FontSizeAdjust | undefined;
        "font-smooth"?: csstype.Property.FontSmooth<string | number> | undefined;
        "font-stretch"?: csstype.Property.FontStretch | undefined;
        "font-style"?: csstype.Property.FontStyle | undefined;
        "font-synthesis"?: csstype.Property.FontSynthesis | undefined;
        "font-synthesis-position"?: csstype.Property.FontSynthesisPosition | undefined;
        "font-synthesis-small-caps"?: csstype.Property.FontSynthesisSmallCaps | undefined;
        "font-synthesis-style"?: csstype.Property.FontSynthesisStyle | undefined;
        "font-synthesis-weight"?: csstype.Property.FontSynthesisWeight | undefined;
        "font-variant"?: csstype.Property.FontVariant | undefined;
        "font-variant-alternates"?: csstype.Property.FontVariantAlternates | undefined;
        "font-variant-caps"?: csstype.Property.FontVariantCaps | undefined;
        "font-variant-east-asian"?: csstype.Property.FontVariantEastAsian | undefined;
        "font-variant-emoji"?: csstype.Property.FontVariantEmoji | undefined;
        "font-variant-ligatures"?: csstype.Property.FontVariantLigatures | undefined;
        "font-variant-numeric"?: csstype.Property.FontVariantNumeric | undefined;
        "font-variant-position"?: csstype.Property.FontVariantPosition | undefined;
        "font-variation-settings"?: csstype.Property.FontVariationSettings | undefined;
        "font-weight"?: csstype.Property.FontWeight | undefined;
        "forced-color-adjust"?: csstype.Property.ForcedColorAdjust | undefined;
        "grid-auto-columns"?: csstype.Property.GridAutoColumns<string | number> | undefined;
        "grid-auto-flow"?: csstype.Property.GridAutoFlow | undefined;
        "grid-auto-rows"?: csstype.Property.GridAutoRows<string | number> | undefined;
        "grid-column-end"?: csstype.Property.GridColumnEnd | undefined;
        "grid-column-start"?: csstype.Property.GridColumnStart | undefined;
        "grid-row-end"?: csstype.Property.GridRowEnd | undefined;
        "grid-row-start"?: csstype.Property.GridRowStart | undefined;
        "grid-template-areas"?: csstype.Property.GridTemplateAreas | undefined;
        "grid-template-columns"?: csstype.Property.GridTemplateColumns<string | number> | undefined;
        "grid-template-rows"?: csstype.Property.GridTemplateRows<string | number> | undefined;
        "hanging-punctuation"?: csstype.Property.HangingPunctuation | undefined;
        "hyphenate-character"?: csstype.Property.HyphenateCharacter | undefined;
        "hyphenate-limit-chars"?: csstype.Property.HyphenateLimitChars | undefined;
        "image-orientation"?: csstype.Property.ImageOrientation | undefined;
        "image-rendering"?: csstype.Property.ImageRendering | undefined;
        "image-resolution"?: csstype.Property.ImageResolution | undefined;
        "initial-letter"?: csstype.Property.InitialLetter | undefined;
        "inline-size"?: csstype.Property.InlineSize<string | number> | undefined;
        "input-security"?: csstype.Property.InputSecurity | undefined;
        "inset-block-end"?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        "inset-block-start"?: csstype.Property.InsetBlockStart<string | number> | undefined;
        "inset-inline-end"?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        "inset-inline-start"?: csstype.Property.InsetInlineStart<string | number> | undefined;
        "justify-content"?: csstype.Property.JustifyContent | undefined;
        "justify-items"?: csstype.Property.JustifyItems | undefined;
        "justify-self"?: csstype.Property.JustifySelf | undefined;
        "justify-tracks"?: csstype.Property.JustifyTracks | undefined;
        "letter-spacing"?: csstype.Property.LetterSpacing<string | number> | undefined;
        "line-break"?: csstype.Property.LineBreak | undefined;
        "line-height"?: csstype.Property.LineHeight<string | number> | undefined;
        "line-height-step"?: csstype.Property.LineHeightStep<string | number> | undefined;
        "list-style-image"?: csstype.Property.ListStyleImage | undefined;
        "list-style-position"?: csstype.Property.ListStylePosition | undefined;
        "list-style-type"?: csstype.Property.ListStyleType | undefined;
        "margin-block-end"?: csstype.Property.MarginBlockEnd<string | number> | undefined;
        "margin-block-start"?: csstype.Property.MarginBlockStart<string | number> | undefined;
        "margin-bottom"?: csstype.Property.MarginBottom<string | number> | undefined;
        "margin-inline-end"?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        "margin-inline-start"?: csstype.Property.MarginInlineStart<string | number> | undefined;
        "margin-left"?: csstype.Property.MarginLeft<string | number> | undefined;
        "margin-right"?: csstype.Property.MarginRight<string | number> | undefined;
        "margin-top"?: csstype.Property.MarginTop<string | number> | undefined;
        "margin-trim"?: csstype.Property.MarginTrim | undefined;
        "mask-border-mode"?: csstype.Property.MaskBorderMode | undefined;
        "mask-border-outset"?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        "mask-border-repeat"?: csstype.Property.MaskBorderRepeat | undefined;
        "mask-border-slice"?: csstype.Property.MaskBorderSlice | undefined;
        "mask-border-source"?: csstype.Property.MaskBorderSource | undefined;
        "mask-border-width"?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        "mask-clip"?: csstype.Property.MaskClip | undefined;
        "mask-composite"?: csstype.Property.MaskComposite | undefined;
        "mask-image"?: csstype.Property.MaskImage | undefined;
        "mask-mode"?: csstype.Property.MaskMode | undefined;
        "mask-origin"?: csstype.Property.MaskOrigin | undefined;
        "mask-position"?: csstype.Property.MaskPosition<string | number> | undefined;
        "mask-repeat"?: csstype.Property.MaskRepeat | undefined;
        "mask-size"?: csstype.Property.MaskSize<string | number> | undefined;
        "mask-type"?: csstype.Property.MaskType | undefined;
        "masonry-auto-flow"?: csstype.Property.MasonryAutoFlow | undefined;
        "math-depth"?: csstype.Property.MathDepth | undefined;
        "math-shift"?: csstype.Property.MathShift | undefined;
        "math-style"?: csstype.Property.MathStyle | undefined;
        "max-block-size"?: csstype.Property.MaxBlockSize<string | number> | undefined;
        "max-height"?: csstype.Property.MaxHeight<string | number> | undefined;
        "max-inline-size"?: csstype.Property.MaxInlineSize<string | number> | undefined;
        "max-lines"?: csstype.Property.MaxLines | undefined;
        "max-width"?: csstype.Property.MaxWidth<string | number> | undefined;
        "min-block-size"?: csstype.Property.MinBlockSize<string | number> | undefined;
        "min-height"?: csstype.Property.MinHeight<string | number> | undefined;
        "min-inline-size"?: csstype.Property.MinInlineSize<string | number> | undefined;
        "min-width"?: csstype.Property.MinWidth<string | number> | undefined;
        "mix-blend-mode"?: csstype.Property.MixBlendMode | undefined;
        "motion-distance"?: csstype.Property.OffsetDistance<string | number> | undefined;
        "motion-path"?: csstype.Property.OffsetPath | undefined;
        "motion-rotation"?: csstype.Property.OffsetRotate | undefined;
        "object-fit"?: csstype.Property.ObjectFit | undefined;
        "object-position"?: csstype.Property.ObjectPosition<string | number> | undefined;
        "offset-anchor"?: csstype.Property.OffsetAnchor<string | number> | undefined;
        "offset-distance"?: csstype.Property.OffsetDistance<string | number> | undefined;
        "offset-path"?: csstype.Property.OffsetPath | undefined;
        "offset-position"?: csstype.Property.OffsetPosition<string | number> | undefined;
        "offset-rotate"?: csstype.Property.OffsetRotate | undefined;
        "offset-rotation"?: csstype.Property.OffsetRotate | undefined;
        "outline-color"?: csstype.Property.OutlineColor | undefined;
        "outline-offset"?: csstype.Property.OutlineOffset<string | number> | undefined;
        "outline-style"?: csstype.Property.OutlineStyle | undefined;
        "outline-width"?: csstype.Property.OutlineWidth<string | number> | undefined;
        "overflow-anchor"?: csstype.Property.OverflowAnchor | undefined;
        "overflow-block"?: csstype.Property.OverflowBlock | undefined;
        "overflow-clip-box"?: csstype.Property.OverflowClipBox | undefined;
        "overflow-clip-margin"?: csstype.Property.OverflowClipMargin<string | number> | undefined;
        "overflow-inline"?: csstype.Property.OverflowInline | undefined;
        "overflow-wrap"?: csstype.Property.OverflowWrap | undefined;
        "overflow-x"?: csstype.Property.OverflowX | undefined;
        "overflow-y"?: csstype.Property.OverflowY | undefined;
        "overscroll-behavior-block"?: csstype.Property.OverscrollBehaviorBlock | undefined;
        "overscroll-behavior-inline"?: csstype.Property.OverscrollBehaviorInline | undefined;
        "overscroll-behavior-x"?: csstype.Property.OverscrollBehaviorX | undefined;
        "overscroll-behavior-y"?: csstype.Property.OverscrollBehaviorY | undefined;
        "padding-block-end"?: csstype.Property.PaddingBlockEnd<string | number> | undefined;
        "padding-block-start"?: csstype.Property.PaddingBlockStart<string | number> | undefined;
        "padding-bottom"?: csstype.Property.PaddingBottom<string | number> | undefined;
        "padding-inline-end"?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        "padding-inline-start"?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        "padding-left"?: csstype.Property.PaddingLeft<string | number> | undefined;
        "padding-right"?: csstype.Property.PaddingRight<string | number> | undefined;
        "padding-top"?: csstype.Property.PaddingTop<string | number> | undefined;
        "page-break-after"?: csstype.Property.PageBreakAfter | undefined;
        "page-break-before"?: csstype.Property.PageBreakBefore | undefined;
        "page-break-inside"?: csstype.Property.PageBreakInside | undefined;
        "paint-order"?: csstype.Property.PaintOrder | undefined;
        "perspective-origin"?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        "pointer-events"?: csstype.Property.PointerEvents | undefined;
        "print-color-adjust"?: csstype.Property.PrintColorAdjust | undefined;
        "row-gap"?: csstype.Property.RowGap<string | number> | undefined;
        "ruby-align"?: csstype.Property.RubyAlign | undefined;
        "ruby-merge"?: csstype.Property.RubyMerge | undefined;
        "ruby-position"?: csstype.Property.RubyPosition | undefined;
        "scroll-behavior"?: csstype.Property.ScrollBehavior | undefined;
        "scroll-margin-block-end"?: csstype.Property.ScrollMarginBlockEnd<string | number> | undefined;
        "scroll-margin-block-start"?: csstype.Property.ScrollMarginBlockStart<string | number> | undefined;
        "scroll-margin-bottom"?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        "scroll-margin-inline-end"?: csstype.Property.ScrollMarginInlineEnd<string | number> | undefined;
        "scroll-margin-inline-start"?: csstype.Property.ScrollMarginInlineStart<string | number> | undefined;
        "scroll-margin-left"?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        "scroll-margin-right"?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        "scroll-margin-top"?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        "scroll-padding-block-end"?: csstype.Property.ScrollPaddingBlockEnd<string | number> | undefined;
        "scroll-padding-block-start"?: csstype.Property.ScrollPaddingBlockStart<string | number> | undefined;
        "scroll-padding-bottom"?: csstype.Property.ScrollPaddingBottom<string | number> | undefined;
        "scroll-padding-inline-end"?: csstype.Property.ScrollPaddingInlineEnd<string | number> | undefined;
        "scroll-padding-inline-start"?: csstype.Property.ScrollPaddingInlineStart<string | number> | undefined;
        "scroll-padding-left"?: csstype.Property.ScrollPaddingLeft<string | number> | undefined;
        "scroll-padding-right"?: csstype.Property.ScrollPaddingRight<string | number> | undefined;
        "scroll-padding-top"?: csstype.Property.ScrollPaddingTop<string | number> | undefined;
        "scroll-snap-align"?: csstype.Property.ScrollSnapAlign | undefined;
        "scroll-snap-margin-bottom"?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        "scroll-snap-margin-left"?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        "scroll-snap-margin-right"?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        "scroll-snap-margin-top"?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        "scroll-snap-stop"?: csstype.Property.ScrollSnapStop | undefined;
        "scroll-snap-type"?: csstype.Property.ScrollSnapType | undefined;
        "scroll-timeline-axis"?: csstype.Property.ScrollTimelineAxis | undefined;
        "scroll-timeline-name"?: csstype.Property.ScrollTimelineName | undefined;
        "scrollbar-color"?: csstype.Property.ScrollbarColor | undefined;
        "scrollbar-gutter"?: csstype.Property.ScrollbarGutter | undefined;
        "scrollbar-width"?: csstype.Property.ScrollbarWidth | undefined;
        "shape-image-threshold"?: csstype.Property.ShapeImageThreshold | undefined;
        "shape-margin"?: csstype.Property.ShapeMargin<string | number> | undefined;
        "shape-outside"?: csstype.Property.ShapeOutside | undefined;
        "tab-size"?: csstype.Property.TabSize<string | number> | undefined;
        "table-layout"?: csstype.Property.TableLayout | undefined;
        "text-align"?: csstype.Property.TextAlign | undefined;
        "text-align-last"?: csstype.Property.TextAlignLast | undefined;
        "text-combine-upright"?: csstype.Property.TextCombineUpright | undefined;
        "text-decoration-color"?: csstype.Property.TextDecorationColor | undefined;
        "text-decoration-line"?: csstype.Property.TextDecorationLine | undefined;
        "text-decoration-skip"?: csstype.Property.TextDecorationSkip | undefined;
        "text-decoration-skip-ink"?: csstype.Property.TextDecorationSkipInk | undefined;
        "text-decoration-style"?: csstype.Property.TextDecorationStyle | undefined;
        "text-decoration-thickness"?: csstype.Property.TextDecorationThickness<string | number> | undefined;
        "text-emphasis-color"?: csstype.Property.TextEmphasisColor | undefined;
        "text-emphasis-position"?: csstype.Property.TextEmphasisPosition | undefined;
        "text-emphasis-style"?: csstype.Property.TextEmphasisStyle | undefined;
        "text-indent"?: csstype.Property.TextIndent<string | number> | undefined;
        "text-justify"?: csstype.Property.TextJustify | undefined;
        "text-orientation"?: csstype.Property.TextOrientation | undefined;
        "text-overflow"?: csstype.Property.TextOverflow | undefined;
        "text-rendering"?: csstype.Property.TextRendering | undefined;
        "text-shadow"?: csstype.Property.TextShadow | undefined;
        "text-size-adjust"?: csstype.Property.TextSizeAdjust | undefined;
        "text-transform"?: csstype.Property.TextTransform | undefined;
        "text-underline-offset"?: csstype.Property.TextUnderlineOffset<string | number> | undefined;
        "text-underline-position"?: csstype.Property.TextUnderlinePosition | undefined;
        "text-wrap"?: csstype.Property.TextWrap | undefined;
        "timeline-scope"?: csstype.Property.TimelineScope | undefined;
        "touch-action"?: csstype.Property.TouchAction | undefined;
        "transform-box"?: csstype.Property.TransformBox | undefined;
        "transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "transform-style"?: csstype.Property.TransformStyle | undefined;
        "transition-behavior"?: csstype.Property.TransitionBehavior | undefined;
        "transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "transition-property"?: csstype.Property.TransitionProperty | undefined;
        "transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "unicode-bidi"?: csstype.Property.UnicodeBidi | undefined;
        "user-select"?: csstype.Property.UserSelect | undefined;
        "vertical-align"?: csstype.Property.VerticalAlign<string | number> | undefined;
        "view-timeline-axis"?: csstype.Property.ViewTimelineAxis | undefined;
        "view-timeline-inset"?: csstype.Property.ViewTimelineInset<string | number> | undefined;
        "view-timeline-name"?: csstype.Property.ViewTimelineName | undefined;
        "view-transition-name"?: csstype.Property.ViewTransitionName | undefined;
        "white-space"?: csstype.Property.WhiteSpace | undefined;
        "white-space-collapse"?: csstype.Property.WhiteSpaceCollapse | undefined;
        "white-space-trim"?: csstype.Property.WhiteSpaceTrim | undefined;
        "will-change"?: csstype.Property.WillChange | undefined;
        "word-break"?: csstype.Property.WordBreak | undefined;
        "word-spacing"?: csstype.Property.WordSpacing<string | number> | undefined;
        "word-wrap"?: csstype.Property.WordWrap | undefined;
        "writing-mode"?: csstype.Property.WritingMode | undefined;
        "z-index"?: csstype.Property.ZIndex | undefined;
        "animation-range"?: csstype.Property.AnimationRange<string | number> | undefined;
        "background-position"?: csstype.Property.BackgroundPosition<string | number> | undefined;
        "border-block"?: csstype.Property.BorderBlock<string | number> | undefined;
        "border-block-end"?: csstype.Property.BorderBlockEnd<string | number> | undefined;
        "border-block-start"?: csstype.Property.BorderBlockStart<string | number> | undefined;
        "border-bottom"?: csstype.Property.BorderBottom<string | number> | undefined;
        "border-color"?: csstype.Property.BorderColor | undefined;
        "border-image"?: csstype.Property.BorderImage | undefined;
        "border-inline"?: csstype.Property.BorderInline<string | number> | undefined;
        "border-inline-end"?: csstype.Property.BorderInlineEnd<string | number> | undefined;
        "border-inline-start"?: csstype.Property.BorderInlineStart<string | number> | undefined;
        "border-left"?: csstype.Property.BorderLeft<string | number> | undefined;
        "border-radius"?: csstype.Property.BorderRadius<string | number> | undefined;
        "border-right"?: csstype.Property.BorderRight<string | number> | undefined;
        "border-style"?: csstype.Property.BorderStyle | undefined;
        "border-top"?: csstype.Property.BorderTop<string | number> | undefined;
        "border-width"?: csstype.Property.BorderWidth<string | number> | undefined;
        "column-rule"?: csstype.Property.ColumnRule<string | number> | undefined;
        "contain-intrinsic-size"?: csstype.Property.ContainIntrinsicSize<string | number> | undefined;
        "flex-flow"?: csstype.Property.FlexFlow | undefined;
        "grid-area"?: csstype.Property.GridArea | undefined;
        "grid-column"?: csstype.Property.GridColumn | undefined;
        "grid-row"?: csstype.Property.GridRow | undefined;
        "grid-template"?: csstype.Property.GridTemplate | undefined;
        "inset-block"?: csstype.Property.InsetBlock<string | number> | undefined;
        "inset-inline"?: csstype.Property.InsetInline<string | number> | undefined;
        "line-clamp"?: csstype.Property.LineClamp | undefined;
        "list-style"?: csstype.Property.ListStyle | undefined;
        "margin-block"?: csstype.Property.MarginBlock<string | number> | undefined;
        "margin-inline"?: csstype.Property.MarginInline<string | number> | undefined;
        "mask-border"?: csstype.Property.MaskBorder | undefined;
        "overscroll-behavior"?: csstype.Property.OverscrollBehavior | undefined;
        "padding-block"?: csstype.Property.PaddingBlock<string | number> | undefined;
        "padding-inline"?: csstype.Property.PaddingInline<string | number> | undefined;
        "place-content"?: csstype.Property.PlaceContent | undefined;
        "place-items"?: csstype.Property.PlaceItems | undefined;
        "place-self"?: csstype.Property.PlaceSelf | undefined;
        "scroll-margin"?: csstype.Property.ScrollMargin<string | number> | undefined;
        "scroll-margin-block"?: csstype.Property.ScrollMarginBlock<string | number> | undefined;
        "scroll-margin-inline"?: csstype.Property.ScrollMarginInline<string | number> | undefined;
        "scroll-padding"?: csstype.Property.ScrollPadding<string | number> | undefined;
        "scroll-padding-block"?: csstype.Property.ScrollPaddingBlock<string | number> | undefined;
        "scroll-padding-inline"?: csstype.Property.ScrollPaddingInline<string | number> | undefined;
        "scroll-snap-margin"?: csstype.Property.ScrollMargin<string | number> | undefined;
        "scroll-timeline"?: csstype.Property.ScrollTimeline | undefined;
        "text-decoration"?: csstype.Property.TextDecoration<string | number> | undefined;
        "text-emphasis"?: csstype.Property.TextEmphasis | undefined;
        "view-timeline"?: csstype.Property.ViewTimeline | undefined;
        "-moz-animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "-moz-animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "-moz-animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "-moz-animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "-moz-animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "-moz-animation-name"?: csstype.Property.AnimationName | undefined;
        "-moz-animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "-moz-animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "-moz-appearance"?: csstype.Property.MozAppearance | undefined;
        "-moz-binding"?: csstype.Property.MozBinding | undefined;
        "-moz-border-bottom-colors"?: csstype.Property.MozBorderBottomColors | undefined;
        "-moz-border-end-color"?: csstype.Property.BorderInlineEndColor | undefined;
        "-moz-border-end-style"?: csstype.Property.BorderInlineEndStyle | undefined;
        "-moz-border-end-width"?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        "-moz-border-left-colors"?: csstype.Property.MozBorderLeftColors | undefined;
        "-moz-border-right-colors"?: csstype.Property.MozBorderRightColors | undefined;
        "-moz-border-start-color"?: csstype.Property.BorderInlineStartColor | undefined;
        "-moz-border-start-style"?: csstype.Property.BorderInlineStartStyle | undefined;
        "-moz-border-top-colors"?: csstype.Property.MozBorderTopColors | undefined;
        "-moz-box-sizing"?: csstype.Property.BoxSizing | undefined;
        "-moz-column-count"?: csstype.Property.ColumnCount | undefined;
        "-moz-column-fill"?: csstype.Property.ColumnFill | undefined;
        "-moz-column-rule-color"?: csstype.Property.ColumnRuleColor | undefined;
        "-moz-column-rule-style"?: csstype.Property.ColumnRuleStyle | undefined;
        "-moz-column-rule-width"?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        "-moz-column-width"?: csstype.Property.ColumnWidth<string | number> | undefined;
        "-moz-context-properties"?: csstype.Property.MozContextProperties | undefined;
        "-moz-font-feature-settings"?: csstype.Property.FontFeatureSettings | undefined;
        "-moz-font-language-override"?: csstype.Property.FontLanguageOverride | undefined;
        "-moz-hyphens"?: csstype.Property.Hyphens | undefined;
        "-moz-image-region"?: csstype.Property.MozImageRegion | undefined;
        "-moz-margin-end"?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        "-moz-margin-start"?: csstype.Property.MarginInlineStart<string | number> | undefined;
        "-moz-orient"?: csstype.Property.MozOrient | undefined;
        "-moz-osx-font-smoothing"?: csstype.Property.FontSmooth<string | number> | undefined;
        "-moz-outline-radius-bottomleft"?: csstype.Property.MozOutlineRadiusBottomleft<string | number> | undefined;
        "-moz-outline-radius-bottomright"?: csstype.Property.MozOutlineRadiusBottomright<string | number> | undefined;
        "-moz-outline-radius-topleft"?: csstype.Property.MozOutlineRadiusTopleft<string | number> | undefined;
        "-moz-outline-radius-topright"?: csstype.Property.MozOutlineRadiusTopright<string | number> | undefined;
        "-moz-padding-end"?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        "-moz-padding-start"?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        "-moz-stack-sizing"?: csstype.Property.MozStackSizing | undefined;
        "-moz-tab-size"?: csstype.Property.TabSize<string | number> | undefined;
        "-moz-text-blink"?: csstype.Property.MozTextBlink | undefined;
        "-moz-text-size-adjust"?: csstype.Property.TextSizeAdjust | undefined;
        "-moz-user-focus"?: csstype.Property.MozUserFocus | undefined;
        "-moz-user-modify"?: csstype.Property.MozUserModify | undefined;
        "-moz-user-select"?: csstype.Property.UserSelect | undefined;
        "-moz-window-dragging"?: csstype.Property.MozWindowDragging | undefined;
        "-moz-window-shadow"?: csstype.Property.MozWindowShadow | undefined;
        "-ms-accelerator"?: csstype.Property.MsAccelerator | undefined;
        "-ms-block-progression"?: csstype.Property.MsBlockProgression | undefined;
        "-ms-content-zoom-chaining"?: csstype.Property.MsContentZoomChaining | undefined;
        "-ms-content-zoom-limit-max"?: csstype.Property.MsContentZoomLimitMax | undefined;
        "-ms-content-zoom-limit-min"?: csstype.Property.MsContentZoomLimitMin | undefined;
        "-ms-content-zoom-snap-points"?: csstype.Property.MsContentZoomSnapPoints | undefined;
        "-ms-content-zoom-snap-type"?: csstype.Property.MsContentZoomSnapType | undefined;
        "-ms-content-zooming"?: csstype.Property.MsContentZooming | undefined;
        "-ms-filter"?: csstype.Property.MsFilter | undefined;
        "-ms-flex-direction"?: csstype.Property.FlexDirection | undefined;
        "-ms-flex-positive"?: csstype.Property.FlexGrow | undefined;
        "-ms-flow-from"?: csstype.Property.MsFlowFrom | undefined;
        "-ms-flow-into"?: csstype.Property.MsFlowInto | undefined;
        "-ms-grid-columns"?: csstype.Property.MsGridColumns<string | number> | undefined;
        "-ms-grid-rows"?: csstype.Property.MsGridRows<string | number> | undefined;
        "-ms-high-contrast-adjust"?: csstype.Property.MsHighContrastAdjust | undefined;
        "-ms-hyphenate-limit-chars"?: csstype.Property.MsHyphenateLimitChars | undefined;
        "-ms-hyphenate-limit-lines"?: csstype.Property.MsHyphenateLimitLines | undefined;
        "-ms-hyphenate-limit-zone"?: csstype.Property.MsHyphenateLimitZone<string | number> | undefined;
        "-ms-hyphens"?: csstype.Property.Hyphens | undefined;
        "-ms-ime-align"?: csstype.Property.MsImeAlign | undefined;
        "-ms-line-break"?: csstype.Property.LineBreak | undefined;
        "-ms-order"?: csstype.Property.Order | undefined;
        "-ms-overflow-style"?: csstype.Property.MsOverflowStyle | undefined;
        "-ms-overflow-x"?: csstype.Property.OverflowX | undefined;
        "-ms-overflow-y"?: csstype.Property.OverflowY | undefined;
        "-ms-scroll-chaining"?: csstype.Property.MsScrollChaining | undefined;
        "-ms-scroll-limit-x-max"?: csstype.Property.MsScrollLimitXMax<string | number> | undefined;
        "-ms-scroll-limit-x-min"?: csstype.Property.MsScrollLimitXMin<string | number> | undefined;
        "-ms-scroll-limit-y-max"?: csstype.Property.MsScrollLimitYMax<string | number> | undefined;
        "-ms-scroll-limit-y-min"?: csstype.Property.MsScrollLimitYMin<string | number> | undefined;
        "-ms-scroll-rails"?: csstype.Property.MsScrollRails | undefined;
        "-ms-scroll-snap-points-x"?: csstype.Property.MsScrollSnapPointsX | undefined;
        "-ms-scroll-snap-points-y"?: csstype.Property.MsScrollSnapPointsY | undefined;
        "-ms-scroll-snap-type"?: csstype.Property.MsScrollSnapType | undefined;
        "-ms-scroll-translation"?: csstype.Property.MsScrollTranslation | undefined;
        "-ms-scrollbar-3dlight-color"?: csstype.Property.MsScrollbar3dlightColor | undefined;
        "-ms-scrollbar-arrow-color"?: csstype.Property.MsScrollbarArrowColor | undefined;
        "-ms-scrollbar-base-color"?: csstype.Property.MsScrollbarBaseColor | undefined;
        "-ms-scrollbar-darkshadow-color"?: csstype.Property.MsScrollbarDarkshadowColor | undefined;
        "-ms-scrollbar-face-color"?: csstype.Property.MsScrollbarFaceColor | undefined;
        "-ms-scrollbar-highlight-color"?: csstype.Property.MsScrollbarHighlightColor | undefined;
        "-ms-scrollbar-shadow-color"?: csstype.Property.MsScrollbarShadowColor | undefined;
        "-ms-scrollbar-track-color"?: csstype.Property.MsScrollbarTrackColor | undefined;
        "-ms-text-autospace"?: csstype.Property.MsTextAutospace | undefined;
        "-ms-text-combine-horizontal"?: csstype.Property.TextCombineUpright | undefined;
        "-ms-text-overflow"?: csstype.Property.TextOverflow | undefined;
        "-ms-touch-action"?: csstype.Property.TouchAction | undefined;
        "-ms-touch-select"?: csstype.Property.MsTouchSelect | undefined;
        "-ms-transform"?: csstype.Property.Transform | undefined;
        "-ms-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-ms-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-ms-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-ms-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-ms-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-ms-user-select"?: csstype.Property.MsUserSelect | undefined;
        "-ms-word-break"?: csstype.Property.WordBreak | undefined;
        "-ms-wrap-flow"?: csstype.Property.MsWrapFlow | undefined;
        "-ms-wrap-margin"?: csstype.Property.MsWrapMargin<string | number> | undefined;
        "-ms-wrap-through"?: csstype.Property.MsWrapThrough | undefined;
        "-ms-writing-mode"?: csstype.Property.WritingMode | undefined;
        "-webkit-align-content"?: csstype.Property.AlignContent | undefined;
        "-webkit-align-items"?: csstype.Property.AlignItems | undefined;
        "-webkit-align-self"?: csstype.Property.AlignSelf | undefined;
        "-webkit-animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "-webkit-animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "-webkit-animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "-webkit-animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "-webkit-animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "-webkit-animation-name"?: csstype.Property.AnimationName | undefined;
        "-webkit-animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "-webkit-animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "-webkit-appearance"?: csstype.Property.WebkitAppearance | undefined;
        "-webkit-backdrop-filter"?: csstype.Property.BackdropFilter | undefined;
        "-webkit-backface-visibility"?: csstype.Property.BackfaceVisibility | undefined;
        "-webkit-background-clip"?: csstype.Property.BackgroundClip | undefined;
        "-webkit-background-origin"?: csstype.Property.BackgroundOrigin | undefined;
        "-webkit-background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "-webkit-border-before-color"?: csstype.Property.WebkitBorderBeforeColor | undefined;
        "-webkit-border-before-style"?: csstype.Property.WebkitBorderBeforeStyle | undefined;
        "-webkit-border-before-width"?: csstype.Property.WebkitBorderBeforeWidth<string | number> | undefined;
        "-webkit-border-bottom-left-radius"?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        "-webkit-border-bottom-right-radius"?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        "-webkit-border-image-slice"?: csstype.Property.BorderImageSlice | undefined;
        "-webkit-border-top-left-radius"?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        "-webkit-border-top-right-radius"?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        "-webkit-box-decoration-break"?: csstype.Property.BoxDecorationBreak | undefined;
        "-webkit-box-reflect"?: csstype.Property.WebkitBoxReflect<string | number> | undefined;
        "-webkit-box-shadow"?: csstype.Property.BoxShadow | undefined;
        "-webkit-box-sizing"?: csstype.Property.BoxSizing | undefined;
        "-webkit-clip-path"?: csstype.Property.ClipPath | undefined;
        "-webkit-column-count"?: csstype.Property.ColumnCount | undefined;
        "-webkit-column-fill"?: csstype.Property.ColumnFill | undefined;
        "-webkit-column-rule-color"?: csstype.Property.ColumnRuleColor | undefined;
        "-webkit-column-rule-style"?: csstype.Property.ColumnRuleStyle | undefined;
        "-webkit-column-rule-width"?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        "-webkit-column-span"?: csstype.Property.ColumnSpan | undefined;
        "-webkit-column-width"?: csstype.Property.ColumnWidth<string | number> | undefined;
        "-webkit-filter"?: csstype.Property.Filter | undefined;
        "-webkit-flex-basis"?: csstype.Property.FlexBasis<string | number> | undefined;
        "-webkit-flex-direction"?: csstype.Property.FlexDirection | undefined;
        "-webkit-flex-grow"?: csstype.Property.FlexGrow | undefined;
        "-webkit-flex-shrink"?: csstype.Property.FlexShrink | undefined;
        "-webkit-flex-wrap"?: csstype.Property.FlexWrap | undefined;
        "-webkit-font-feature-settings"?: csstype.Property.FontFeatureSettings | undefined;
        "-webkit-font-kerning"?: csstype.Property.FontKerning | undefined;
        "-webkit-font-smoothing"?: csstype.Property.FontSmooth<string | number> | undefined;
        "-webkit-font-variant-ligatures"?: csstype.Property.FontVariantLigatures | undefined;
        "-webkit-hyphenate-character"?: csstype.Property.HyphenateCharacter | undefined;
        "-webkit-hyphens"?: csstype.Property.Hyphens | undefined;
        "-webkit-initial-letter"?: csstype.Property.InitialLetter | undefined;
        "-webkit-justify-content"?: csstype.Property.JustifyContent | undefined;
        "-webkit-line-break"?: csstype.Property.LineBreak | undefined;
        "-webkit-line-clamp"?: csstype.Property.WebkitLineClamp | undefined;
        "-webkit-margin-end"?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        "-webkit-margin-start"?: csstype.Property.MarginInlineStart<string | number> | undefined;
        "-webkit-mask-attachment"?: csstype.Property.WebkitMaskAttachment | undefined;
        "-webkit-mask-box-image-outset"?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        "-webkit-mask-box-image-repeat"?: csstype.Property.MaskBorderRepeat | undefined;
        "-webkit-mask-box-image-slice"?: csstype.Property.MaskBorderSlice | undefined;
        "-webkit-mask-box-image-source"?: csstype.Property.MaskBorderSource | undefined;
        "-webkit-mask-box-image-width"?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        "-webkit-mask-clip"?: csstype.Property.WebkitMaskClip | undefined;
        "-webkit-mask-composite"?: csstype.Property.WebkitMaskComposite | undefined;
        "-webkit-mask-image"?: csstype.Property.WebkitMaskImage | undefined;
        "-webkit-mask-origin"?: csstype.Property.WebkitMaskOrigin | undefined;
        "-webkit-mask-position"?: csstype.Property.WebkitMaskPosition<string | number> | undefined;
        "-webkit-mask-position-x"?: csstype.Property.WebkitMaskPositionX<string | number> | undefined;
        "-webkit-mask-position-y"?: csstype.Property.WebkitMaskPositionY<string | number> | undefined;
        "-webkit-mask-repeat"?: csstype.Property.WebkitMaskRepeat | undefined;
        "-webkit-mask-repeat-x"?: csstype.Property.WebkitMaskRepeatX | undefined;
        "-webkit-mask-repeat-y"?: csstype.Property.WebkitMaskRepeatY | undefined;
        "-webkit-mask-size"?: csstype.Property.WebkitMaskSize<string | number> | undefined;
        "-webkit-max-inline-size"?: csstype.Property.MaxInlineSize<string | number> | undefined;
        "-webkit-order"?: csstype.Property.Order | undefined;
        "-webkit-overflow-scrolling"?: csstype.Property.WebkitOverflowScrolling | undefined;
        "-webkit-padding-end"?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        "-webkit-padding-start"?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        "-webkit-perspective"?: csstype.Property.Perspective<string | number> | undefined;
        "-webkit-perspective-origin"?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        "-webkit-print-color-adjust"?: csstype.Property.PrintColorAdjust | undefined;
        "-webkit-ruby-position"?: csstype.Property.RubyPosition | undefined;
        "-webkit-scroll-snap-type"?: csstype.Property.ScrollSnapType | undefined;
        "-webkit-shape-margin"?: csstype.Property.ShapeMargin<string | number> | undefined;
        "-webkit-tap-highlight-color"?: csstype.Property.WebkitTapHighlightColor | undefined;
        "-webkit-text-combine"?: csstype.Property.TextCombineUpright | undefined;
        "-webkit-text-decoration-color"?: csstype.Property.TextDecorationColor | undefined;
        "-webkit-text-decoration-line"?: csstype.Property.TextDecorationLine | undefined;
        "-webkit-text-decoration-skip"?: csstype.Property.TextDecorationSkip | undefined;
        "-webkit-text-decoration-style"?: csstype.Property.TextDecorationStyle | undefined;
        "-webkit-text-emphasis-color"?: csstype.Property.TextEmphasisColor | undefined;
        "-webkit-text-emphasis-position"?: csstype.Property.TextEmphasisPosition | undefined;
        "-webkit-text-emphasis-style"?: csstype.Property.TextEmphasisStyle | undefined;
        "-webkit-text-fill-color"?: csstype.Property.WebkitTextFillColor | undefined;
        "-webkit-text-orientation"?: csstype.Property.TextOrientation | undefined;
        "-webkit-text-size-adjust"?: csstype.Property.TextSizeAdjust | undefined;
        "-webkit-text-stroke-color"?: csstype.Property.WebkitTextStrokeColor | undefined;
        "-webkit-text-stroke-width"?: csstype.Property.WebkitTextStrokeWidth<string | number> | undefined;
        "-webkit-text-underline-position"?: csstype.Property.TextUnderlinePosition | undefined;
        "-webkit-touch-callout"?: csstype.Property.WebkitTouchCallout | undefined;
        "-webkit-transform"?: csstype.Property.Transform | undefined;
        "-webkit-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-webkit-transform-style"?: csstype.Property.TransformStyle | undefined;
        "-webkit-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-webkit-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-webkit-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-webkit-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-webkit-user-modify"?: csstype.Property.WebkitUserModify | undefined;
        "-webkit-user-select"?: csstype.Property.UserSelect | undefined;
        "-webkit-writing-mode"?: csstype.Property.WritingMode | undefined;
        "-moz-animation"?: csstype.Property.Animation<string & {}> | undefined;
        "-moz-border-image"?: csstype.Property.BorderImage | undefined;
        "-moz-column-rule"?: csstype.Property.ColumnRule<string | number> | undefined;
        "-moz-columns"?: csstype.Property.Columns<string | number> | undefined;
        "-moz-outline-radius"?: csstype.Property.MozOutlineRadius<string | number> | undefined;
        "-ms-content-zoom-limit"?: csstype.Property.MsContentZoomLimit | undefined;
        "-ms-content-zoom-snap"?: csstype.Property.MsContentZoomSnap | undefined;
        "-ms-flex"?: csstype.Property.Flex<string | number> | undefined;
        "-ms-scroll-limit"?: csstype.Property.MsScrollLimit | undefined;
        "-ms-scroll-snap-x"?: csstype.Property.MsScrollSnapX | undefined;
        "-ms-scroll-snap-y"?: csstype.Property.MsScrollSnapY | undefined;
        "-ms-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "-webkit-animation"?: csstype.Property.Animation<string & {}> | undefined;
        "-webkit-border-before"?: csstype.Property.WebkitBorderBefore<string | number> | undefined;
        "-webkit-border-image"?: csstype.Property.BorderImage | undefined;
        "-webkit-border-radius"?: csstype.Property.BorderRadius<string | number> | undefined;
        "-webkit-column-rule"?: csstype.Property.ColumnRule<string | number> | undefined;
        "-webkit-columns"?: csstype.Property.Columns<string | number> | undefined;
        "-webkit-flex"?: csstype.Property.Flex<string | number> | undefined;
        "-webkit-flex-flow"?: csstype.Property.FlexFlow | undefined;
        "-webkit-mask"?: csstype.Property.WebkitMask<string | number> | undefined;
        "-webkit-mask-box-image"?: csstype.Property.MaskBorder | undefined;
        "-webkit-text-emphasis"?: csstype.Property.TextEmphasis | undefined;
        "-webkit-text-stroke"?: csstype.Property.WebkitTextStroke<string | number> | undefined;
        "-webkit-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "box-align"?: csstype.Property.BoxAlign | undefined;
        "box-direction"?: csstype.Property.BoxDirection | undefined;
        "box-flex"?: csstype.Property.BoxFlex | undefined;
        "box-flex-group"?: csstype.Property.BoxFlexGroup | undefined;
        "box-lines"?: csstype.Property.BoxLines | undefined;
        "box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "box-orient"?: csstype.Property.BoxOrient | undefined;
        "box-pack"?: csstype.Property.BoxPack | undefined;
        "grid-column-gap"?: csstype.Property.GridColumnGap<string | number> | undefined;
        "grid-gap"?: csstype.Property.GridGap<string | number> | undefined;
        "grid-row-gap"?: csstype.Property.GridRowGap<string | number> | undefined;
        "ime-mode"?: csstype.Property.ImeMode | undefined;
        "offset-block"?: csstype.Property.InsetBlock<string | number> | undefined;
        "offset-block-end"?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        "offset-block-start"?: csstype.Property.InsetBlockStart<string | number> | undefined;
        "offset-inline"?: csstype.Property.InsetInline<string | number> | undefined;
        "offset-inline-end"?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        "offset-inline-start"?: csstype.Property.InsetInlineStart<string | number> | undefined;
        "scroll-snap-coordinate"?: csstype.Property.ScrollSnapCoordinate<string | number> | undefined;
        "scroll-snap-destination"?: csstype.Property.ScrollSnapDestination<string | number> | undefined;
        "scroll-snap-points-x"?: csstype.Property.ScrollSnapPointsX | undefined;
        "scroll-snap-points-y"?: csstype.Property.ScrollSnapPointsY | undefined;
        "scroll-snap-type-x"?: csstype.Property.ScrollSnapTypeX | undefined;
        "scroll-snap-type-y"?: csstype.Property.ScrollSnapTypeY | undefined;
        "-khtml-box-align"?: csstype.Property.BoxAlign | undefined;
        "-khtml-box-direction"?: csstype.Property.BoxDirection | undefined;
        "-khtml-box-flex"?: csstype.Property.BoxFlex | undefined;
        "-khtml-box-flex-group"?: csstype.Property.BoxFlexGroup | undefined;
        "-khtml-box-lines"?: csstype.Property.BoxLines | undefined;
        "-khtml-box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "-khtml-box-orient"?: csstype.Property.BoxOrient | undefined;
        "-khtml-box-pack"?: csstype.Property.BoxPack | undefined;
        "-khtml-line-break"?: csstype.Property.LineBreak | undefined;
        "-khtml-opacity"?: csstype.Property.Opacity | undefined;
        "-khtml-user-select"?: csstype.Property.UserSelect | undefined;
        "-moz-backface-visibility"?: csstype.Property.BackfaceVisibility | undefined;
        "-moz-background-clip"?: csstype.Property.BackgroundClip | undefined;
        "-moz-background-inline-policy"?: csstype.Property.BoxDecorationBreak | undefined;
        "-moz-background-origin"?: csstype.Property.BackgroundOrigin | undefined;
        "-moz-background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "-moz-border-radius"?: csstype.Property.BorderRadius<string | number> | undefined;
        "-moz-border-radius-bottomleft"?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        "-moz-border-radius-bottomright"?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        "-moz-border-radius-topleft"?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        "-moz-border-radius-topright"?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        "-moz-box-align"?: csstype.Property.BoxAlign | undefined;
        "-moz-box-direction"?: csstype.Property.BoxDirection | undefined;
        "-moz-box-flex"?: csstype.Property.BoxFlex | undefined;
        "-moz-box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "-moz-box-orient"?: csstype.Property.BoxOrient | undefined;
        "-moz-box-pack"?: csstype.Property.BoxPack | undefined;
        "-moz-box-shadow"?: csstype.Property.BoxShadow | undefined;
        "-moz-float-edge"?: csstype.Property.MozFloatEdge | undefined;
        "-moz-force-broken-image-icon"?: csstype.Property.MozForceBrokenImageIcon | undefined;
        "-moz-opacity"?: csstype.Property.Opacity | undefined;
        "-moz-outline"?: csstype.Property.Outline<string | number> | undefined;
        "-moz-outline-color"?: csstype.Property.OutlineColor | undefined;
        "-moz-outline-style"?: csstype.Property.OutlineStyle | undefined;
        "-moz-outline-width"?: csstype.Property.OutlineWidth<string | number> | undefined;
        "-moz-perspective"?: csstype.Property.Perspective<string | number> | undefined;
        "-moz-perspective-origin"?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        "-moz-text-align-last"?: csstype.Property.TextAlignLast | undefined;
        "-moz-text-decoration-color"?: csstype.Property.TextDecorationColor | undefined;
        "-moz-text-decoration-line"?: csstype.Property.TextDecorationLine | undefined;
        "-moz-text-decoration-style"?: csstype.Property.TextDecorationStyle | undefined;
        "-moz-transform"?: csstype.Property.Transform | undefined;
        "-moz-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-moz-transform-style"?: csstype.Property.TransformStyle | undefined;
        "-moz-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "-moz-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-moz-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-moz-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-moz-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-moz-user-input"?: csstype.Property.MozUserInput | undefined;
        "-ms-ime-mode"?: csstype.Property.ImeMode | undefined;
        "-o-animation"?: csstype.Property.Animation<string & {}> | undefined;
        "-o-animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "-o-animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "-o-animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "-o-animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "-o-animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "-o-animation-name"?: csstype.Property.AnimationName | undefined;
        "-o-animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "-o-animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "-o-background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "-o-border-image"?: csstype.Property.BorderImage | undefined;
        "-o-object-fit"?: csstype.Property.ObjectFit | undefined;
        "-o-object-position"?: csstype.Property.ObjectPosition<string | number> | undefined;
        "-o-tab-size"?: csstype.Property.TabSize<string | number> | undefined;
        "-o-text-overflow"?: csstype.Property.TextOverflow | undefined;
        "-o-transform"?: csstype.Property.Transform | undefined;
        "-o-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-o-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "-o-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-o-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-o-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-o-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-webkit-box-align"?: csstype.Property.BoxAlign | undefined;
        "-webkit-box-direction"?: csstype.Property.BoxDirection | undefined;
        "-webkit-box-flex"?: csstype.Property.BoxFlex | undefined;
        "-webkit-box-flex-group"?: csstype.Property.BoxFlexGroup | undefined;
        "-webkit-box-lines"?: csstype.Property.BoxLines | undefined;
        "-webkit-box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "-webkit-box-orient"?: csstype.Property.BoxOrient | undefined;
        "-webkit-box-pack"?: csstype.Property.BoxPack | undefined;
        "alignment-baseline"?: csstype.Property.AlignmentBaseline | undefined;
        "baseline-shift"?: csstype.Property.BaselineShift<string | number> | undefined;
        "clip-rule"?: csstype.Property.ClipRule | undefined;
        "color-interpolation"?: csstype.Property.ColorInterpolation | undefined;
        "color-rendering"?: csstype.Property.ColorRendering | undefined;
        "dominant-baseline"?: csstype.Property.DominantBaseline | undefined;
        "fill-opacity"?: csstype.Property.FillOpacity | undefined;
        "fill-rule"?: csstype.Property.FillRule | undefined;
        "flood-color"?: csstype.Property.FloodColor | undefined;
        "flood-opacity"?: csstype.Property.FloodOpacity | undefined;
        "glyph-orientation-vertical"?: csstype.Property.GlyphOrientationVertical | undefined;
        "lighting-color"?: csstype.Property.LightingColor | undefined;
        "marker-end"?: csstype.Property.MarkerEnd | undefined;
        "marker-mid"?: csstype.Property.MarkerMid | undefined;
        "marker-start"?: csstype.Property.MarkerStart | undefined;
        "shape-rendering"?: csstype.Property.ShapeRendering | undefined;
        "stop-color"?: csstype.Property.StopColor | undefined;
        "stop-opacity"?: csstype.Property.StopOpacity | undefined;
        "stroke-dasharray"?: csstype.Property.StrokeDasharray<string | number> | undefined;
        "stroke-dashoffset"?: csstype.Property.StrokeDashoffset<string | number> | undefined;
        "stroke-linecap"?: csstype.Property.StrokeLinecap | undefined;
        "stroke-linejoin"?: csstype.Property.StrokeLinejoin | undefined;
        "stroke-miterlimit"?: csstype.Property.StrokeMiterlimit | undefined;
        "stroke-opacity"?: csstype.Property.StrokeOpacity | undefined;
        "stroke-width"?: csstype.Property.StrokeWidth<string | number> | undefined;
        "text-anchor"?: csstype.Property.TextAnchor | undefined;
        "vector-effect"?: csstype.Property.VectorEffect | undefined;
    };
    style: Ref<StyleProperties>;
};

/**
 * Reactive transform string implementing all native CSS transform properties.
 *
 * @param props
 * @param enableHardwareAcceleration
 */
declare function reactiveTransform(props?: TransformProperties, enableHardwareAcceleration?: boolean): {
    state: {
        x?: TransformValue | TransformValue[] | undefined;
        y?: TransformValue | TransformValue[] | undefined;
        z?: TransformValue | TransformValue[] | undefined;
        translateX?: TransformValue | TransformValue[] | undefined;
        translateY?: TransformValue | TransformValue[] | undefined;
        translateZ?: TransformValue | TransformValue[] | undefined;
        rotate?: TransformValue | TransformValue[] | undefined;
        rotateX?: TransformValue | TransformValue[] | undefined;
        rotateY?: TransformValue | TransformValue[] | undefined;
        rotateZ?: TransformValue | TransformValue[] | undefined;
        scale?: TransformValue | TransformValue[] | undefined;
        scaleX?: TransformValue | TransformValue[] | undefined;
        scaleY?: TransformValue | TransformValue[] | undefined;
        scaleZ?: TransformValue | TransformValue[] | undefined;
        skew?: TransformValue | TransformValue[] | undefined;
        skewX?: TransformValue | TransformValue[] | undefined;
        skewY?: TransformValue | TransformValue[] | undefined;
        originX?: TransformValue | TransformValue[] | undefined;
        originY?: TransformValue | TransformValue[] | undefined;
        originZ?: TransformValue | TransformValue[] | undefined;
        perspective?: TransformValue | TransformValue[] | undefined;
        transformPerspective?: TransformValue | TransformValue[] | undefined;
    };
    transform: vue.Ref<string>;
};

/**
 * A Composable giving access to a StyleProperties object, and binding the generated style object to a target.
 *
 * @param target
 */
declare function useElementStyle(target: MaybeRef<PermissiveTarget>, onInit?: (initData: Partial<StyleProperties>) => void): {
    style: {
        [x: `--${string}`]: string | number | undefined;
        filter?: csstype.Property.Filter | undefined;
        fill?: csstype.Property.Fill | undefined;
        accentColor?: csstype.Property.AccentColor | undefined;
        alignContent?: csstype.Property.AlignContent | undefined;
        alignItems?: csstype.Property.AlignItems | undefined;
        alignSelf?: csstype.Property.AlignSelf | undefined;
        alignTracks?: csstype.Property.AlignTracks | undefined;
        animationComposition?: csstype.Property.AnimationComposition | undefined;
        animationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        animationDirection?: csstype.Property.AnimationDirection | undefined;
        animationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        animationFillMode?: csstype.Property.AnimationFillMode | undefined;
        animationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        animationName?: csstype.Property.AnimationName | undefined;
        animationPlayState?: csstype.Property.AnimationPlayState | undefined;
        animationRangeEnd?: csstype.Property.AnimationRangeEnd<string | number> | undefined;
        animationRangeStart?: csstype.Property.AnimationRangeStart<string | number> | undefined;
        animationTimeline?: csstype.Property.AnimationTimeline | undefined;
        animationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        appearance?: csstype.Property.Appearance | undefined;
        aspectRatio?: csstype.Property.AspectRatio | undefined;
        backdropFilter?: csstype.Property.BackdropFilter | undefined;
        backfaceVisibility?: csstype.Property.BackfaceVisibility | undefined;
        backgroundAttachment?: csstype.Property.BackgroundAttachment | undefined;
        backgroundBlendMode?: csstype.Property.BackgroundBlendMode | undefined;
        backgroundClip?: csstype.Property.BackgroundClip | undefined;
        backgroundColor?: csstype.Property.BackgroundColor | undefined;
        backgroundImage?: csstype.Property.BackgroundImage | undefined;
        backgroundOrigin?: csstype.Property.BackgroundOrigin | undefined;
        backgroundPositionX?: csstype.Property.BackgroundPositionX<string | number> | undefined;
        backgroundPositionY?: csstype.Property.BackgroundPositionY<string | number> | undefined;
        backgroundRepeat?: csstype.Property.BackgroundRepeat | undefined;
        backgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        blockOverflow?: csstype.Property.BlockOverflow | undefined;
        blockSize?: csstype.Property.BlockSize<string | number> | undefined;
        borderBlockColor?: csstype.Property.BorderBlockColor | undefined;
        borderBlockEndColor?: csstype.Property.BorderBlockEndColor | undefined;
        borderBlockEndStyle?: csstype.Property.BorderBlockEndStyle | undefined;
        borderBlockEndWidth?: csstype.Property.BorderBlockEndWidth<string | number> | undefined;
        borderBlockStartColor?: csstype.Property.BorderBlockStartColor | undefined;
        borderBlockStartStyle?: csstype.Property.BorderBlockStartStyle | undefined;
        borderBlockStartWidth?: csstype.Property.BorderBlockStartWidth<string | number> | undefined;
        borderBlockStyle?: csstype.Property.BorderBlockStyle | undefined;
        borderBlockWidth?: csstype.Property.BorderBlockWidth<string | number> | undefined;
        borderBottomColor?: csstype.Property.BorderBottomColor | undefined;
        borderBottomLeftRadius?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        borderBottomRightRadius?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        borderBottomStyle?: csstype.Property.BorderBottomStyle | undefined;
        borderBottomWidth?: csstype.Property.BorderBottomWidth<string | number> | undefined;
        borderCollapse?: csstype.Property.BorderCollapse | undefined;
        borderEndEndRadius?: csstype.Property.BorderEndEndRadius<string | number> | undefined;
        borderEndStartRadius?: csstype.Property.BorderEndStartRadius<string | number> | undefined;
        borderImageOutset?: csstype.Property.BorderImageOutset<string | number> | undefined;
        borderImageRepeat?: csstype.Property.BorderImageRepeat | undefined;
        borderImageSlice?: csstype.Property.BorderImageSlice | undefined;
        borderImageSource?: csstype.Property.BorderImageSource | undefined;
        borderImageWidth?: csstype.Property.BorderImageWidth<string | number> | undefined;
        borderInlineColor?: csstype.Property.BorderInlineColor | undefined;
        borderInlineEndColor?: csstype.Property.BorderInlineEndColor | undefined;
        borderInlineEndStyle?: csstype.Property.BorderInlineEndStyle | undefined;
        borderInlineEndWidth?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        borderInlineStartColor?: csstype.Property.BorderInlineStartColor | undefined;
        borderInlineStartStyle?: csstype.Property.BorderInlineStartStyle | undefined;
        borderInlineStartWidth?: csstype.Property.BorderInlineStartWidth<string | number> | undefined;
        borderInlineStyle?: csstype.Property.BorderInlineStyle | undefined;
        borderInlineWidth?: csstype.Property.BorderInlineWidth<string | number> | undefined;
        borderLeftColor?: csstype.Property.BorderLeftColor | undefined;
        borderLeftStyle?: csstype.Property.BorderLeftStyle | undefined;
        borderLeftWidth?: csstype.Property.BorderLeftWidth<string | number> | undefined;
        borderRightColor?: csstype.Property.BorderRightColor | undefined;
        borderRightStyle?: csstype.Property.BorderRightStyle | undefined;
        borderRightWidth?: csstype.Property.BorderRightWidth<string | number> | undefined;
        borderSpacing?: csstype.Property.BorderSpacing<string | number> | undefined;
        borderStartEndRadius?: csstype.Property.BorderStartEndRadius<string | number> | undefined;
        borderStartStartRadius?: csstype.Property.BorderStartStartRadius<string | number> | undefined;
        borderTopColor?: csstype.Property.BorderTopColor | undefined;
        borderTopLeftRadius?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        borderTopRightRadius?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        borderTopStyle?: csstype.Property.BorderTopStyle | undefined;
        borderTopWidth?: csstype.Property.BorderTopWidth<string | number> | undefined;
        bottom?: csstype.Property.Bottom<string | number> | undefined;
        boxDecorationBreak?: csstype.Property.BoxDecorationBreak | undefined;
        boxShadow?: csstype.Property.BoxShadow | undefined;
        boxSizing?: csstype.Property.BoxSizing | undefined;
        breakAfter?: csstype.Property.BreakAfter | undefined;
        breakBefore?: csstype.Property.BreakBefore | undefined;
        breakInside?: csstype.Property.BreakInside | undefined;
        captionSide?: csstype.Property.CaptionSide | undefined;
        caretColor?: csstype.Property.CaretColor | undefined;
        caretShape?: csstype.Property.CaretShape | undefined;
        clear?: csstype.Property.Clear | undefined;
        clipPath?: csstype.Property.ClipPath | undefined;
        color?: csstype.Property.Color | undefined;
        colorAdjust?: csstype.Property.PrintColorAdjust | undefined;
        colorScheme?: csstype.Property.ColorScheme | undefined;
        columnCount?: csstype.Property.ColumnCount | undefined;
        columnFill?: csstype.Property.ColumnFill | undefined;
        columnGap?: csstype.Property.ColumnGap<string | number> | undefined;
        columnRuleColor?: csstype.Property.ColumnRuleColor | undefined;
        columnRuleStyle?: csstype.Property.ColumnRuleStyle | undefined;
        columnRuleWidth?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        columnSpan?: csstype.Property.ColumnSpan | undefined;
        columnWidth?: csstype.Property.ColumnWidth<string | number> | undefined;
        contain?: csstype.Property.Contain | undefined;
        containIntrinsicBlockSize?: csstype.Property.ContainIntrinsicBlockSize<string | number> | undefined;
        containIntrinsicHeight?: csstype.Property.ContainIntrinsicHeight<string | number> | undefined;
        containIntrinsicInlineSize?: csstype.Property.ContainIntrinsicInlineSize<string | number> | undefined;
        containIntrinsicWidth?: csstype.Property.ContainIntrinsicWidth<string | number> | undefined;
        containerName?: csstype.Property.ContainerName | undefined;
        containerType?: csstype.Property.ContainerType | undefined;
        content?: csstype.Property.Content | undefined;
        contentVisibility?: csstype.Property.ContentVisibility | undefined;
        counterIncrement?: csstype.Property.CounterIncrement | undefined;
        counterReset?: csstype.Property.CounterReset | undefined;
        counterSet?: csstype.Property.CounterSet | undefined;
        cursor?: csstype.Property.Cursor | undefined;
        direction?: csstype.Property.Direction | undefined;
        display?: csstype.Property.Display | undefined;
        emptyCells?: csstype.Property.EmptyCells | undefined;
        flexBasis?: csstype.Property.FlexBasis<string | number> | undefined;
        flexDirection?: csstype.Property.FlexDirection | undefined;
        flexGrow?: csstype.Property.FlexGrow | undefined;
        flexShrink?: csstype.Property.FlexShrink | undefined;
        flexWrap?: csstype.Property.FlexWrap | undefined;
        float?: csstype.Property.Float | undefined;
        fontFamily?: csstype.Property.FontFamily | undefined;
        fontFeatureSettings?: csstype.Property.FontFeatureSettings | undefined;
        fontKerning?: csstype.Property.FontKerning | undefined;
        fontLanguageOverride?: csstype.Property.FontLanguageOverride | undefined;
        fontOpticalSizing?: csstype.Property.FontOpticalSizing | undefined;
        fontPalette?: csstype.Property.FontPalette | undefined;
        fontSize?: csstype.Property.FontSize<string | number> | undefined;
        fontSizeAdjust?: csstype.Property.FontSizeAdjust | undefined;
        fontSmooth?: csstype.Property.FontSmooth<string | number> | undefined;
        fontStretch?: csstype.Property.FontStretch | undefined;
        fontStyle?: csstype.Property.FontStyle | undefined;
        fontSynthesis?: csstype.Property.FontSynthesis | undefined;
        fontSynthesisPosition?: csstype.Property.FontSynthesisPosition | undefined;
        fontSynthesisSmallCaps?: csstype.Property.FontSynthesisSmallCaps | undefined;
        fontSynthesisStyle?: csstype.Property.FontSynthesisStyle | undefined;
        fontSynthesisWeight?: csstype.Property.FontSynthesisWeight | undefined;
        fontVariant?: csstype.Property.FontVariant | undefined;
        fontVariantAlternates?: csstype.Property.FontVariantAlternates | undefined;
        fontVariantCaps?: csstype.Property.FontVariantCaps | undefined;
        fontVariantEastAsian?: csstype.Property.FontVariantEastAsian | undefined;
        fontVariantEmoji?: csstype.Property.FontVariantEmoji | undefined;
        fontVariantLigatures?: csstype.Property.FontVariantLigatures | undefined;
        fontVariantNumeric?: csstype.Property.FontVariantNumeric | undefined;
        fontVariantPosition?: csstype.Property.FontVariantPosition | undefined;
        fontVariationSettings?: csstype.Property.FontVariationSettings | undefined;
        fontWeight?: csstype.Property.FontWeight | undefined;
        forcedColorAdjust?: csstype.Property.ForcedColorAdjust | undefined;
        gridAutoColumns?: csstype.Property.GridAutoColumns<string | number> | undefined;
        gridAutoFlow?: csstype.Property.GridAutoFlow | undefined;
        gridAutoRows?: csstype.Property.GridAutoRows<string | number> | undefined;
        gridColumnEnd?: csstype.Property.GridColumnEnd | undefined;
        gridColumnStart?: csstype.Property.GridColumnStart | undefined;
        gridRowEnd?: csstype.Property.GridRowEnd | undefined;
        gridRowStart?: csstype.Property.GridRowStart | undefined;
        gridTemplateAreas?: csstype.Property.GridTemplateAreas | undefined;
        gridTemplateColumns?: csstype.Property.GridTemplateColumns<string | number> | undefined;
        gridTemplateRows?: csstype.Property.GridTemplateRows<string | number> | undefined;
        hangingPunctuation?: csstype.Property.HangingPunctuation | undefined;
        height?: csstype.Property.Height<string | number> | undefined;
        hyphenateCharacter?: csstype.Property.HyphenateCharacter | undefined;
        hyphenateLimitChars?: csstype.Property.HyphenateLimitChars | undefined;
        hyphens?: csstype.Property.Hyphens | undefined;
        imageOrientation?: csstype.Property.ImageOrientation | undefined;
        imageRendering?: csstype.Property.ImageRendering | undefined;
        imageResolution?: csstype.Property.ImageResolution | undefined;
        initialLetter?: csstype.Property.InitialLetter | undefined;
        inlineSize?: csstype.Property.InlineSize<string | number> | undefined;
        inputSecurity?: csstype.Property.InputSecurity | undefined;
        insetBlockEnd?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        insetBlockStart?: csstype.Property.InsetBlockStart<string | number> | undefined;
        insetInlineEnd?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        insetInlineStart?: csstype.Property.InsetInlineStart<string | number> | undefined;
        isolation?: csstype.Property.Isolation | undefined;
        justifyContent?: csstype.Property.JustifyContent | undefined;
        justifyItems?: csstype.Property.JustifyItems | undefined;
        justifySelf?: csstype.Property.JustifySelf | undefined;
        justifyTracks?: csstype.Property.JustifyTracks | undefined;
        left?: csstype.Property.Left<string | number> | undefined;
        letterSpacing?: csstype.Property.LetterSpacing<string | number> | undefined;
        lineBreak?: csstype.Property.LineBreak | undefined;
        lineHeight?: csstype.Property.LineHeight<string | number> | undefined;
        lineHeightStep?: csstype.Property.LineHeightStep<string | number> | undefined;
        listStyleImage?: csstype.Property.ListStyleImage | undefined;
        listStylePosition?: csstype.Property.ListStylePosition | undefined;
        listStyleType?: csstype.Property.ListStyleType | undefined;
        marginBlockEnd?: csstype.Property.MarginBlockEnd<string | number> | undefined;
        marginBlockStart?: csstype.Property.MarginBlockStart<string | number> | undefined;
        marginBottom?: csstype.Property.MarginBottom<string | number> | undefined;
        marginInlineEnd?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        marginInlineStart?: csstype.Property.MarginInlineStart<string | number> | undefined;
        marginLeft?: csstype.Property.MarginLeft<string | number> | undefined;
        marginRight?: csstype.Property.MarginRight<string | number> | undefined;
        marginTop?: csstype.Property.MarginTop<string | number> | undefined;
        marginTrim?: csstype.Property.MarginTrim | undefined;
        maskBorderMode?: csstype.Property.MaskBorderMode | undefined;
        maskBorderOutset?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        maskBorderRepeat?: csstype.Property.MaskBorderRepeat | undefined;
        maskBorderSlice?: csstype.Property.MaskBorderSlice | undefined;
        maskBorderSource?: csstype.Property.MaskBorderSource | undefined;
        maskBorderWidth?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        maskClip?: csstype.Property.MaskClip | undefined;
        maskComposite?: csstype.Property.MaskComposite | undefined;
        maskImage?: csstype.Property.MaskImage | undefined;
        maskMode?: csstype.Property.MaskMode | undefined;
        maskOrigin?: csstype.Property.MaskOrigin | undefined;
        maskPosition?: csstype.Property.MaskPosition<string | number> | undefined;
        maskRepeat?: csstype.Property.MaskRepeat | undefined;
        maskSize?: csstype.Property.MaskSize<string | number> | undefined;
        maskType?: csstype.Property.MaskType | undefined;
        masonryAutoFlow?: csstype.Property.MasonryAutoFlow | undefined;
        mathDepth?: csstype.Property.MathDepth | undefined;
        mathShift?: csstype.Property.MathShift | undefined;
        mathStyle?: csstype.Property.MathStyle | undefined;
        maxBlockSize?: csstype.Property.MaxBlockSize<string | number> | undefined;
        maxHeight?: csstype.Property.MaxHeight<string | number> | undefined;
        maxInlineSize?: csstype.Property.MaxInlineSize<string | number> | undefined;
        maxLines?: csstype.Property.MaxLines | undefined;
        maxWidth?: csstype.Property.MaxWidth<string | number> | undefined;
        minBlockSize?: csstype.Property.MinBlockSize<string | number> | undefined;
        minHeight?: csstype.Property.MinHeight<string | number> | undefined;
        minInlineSize?: csstype.Property.MinInlineSize<string | number> | undefined;
        minWidth?: csstype.Property.MinWidth<string | number> | undefined;
        mixBlendMode?: csstype.Property.MixBlendMode | undefined;
        motionDistance?: csstype.Property.OffsetDistance<string | number> | undefined;
        motionPath?: csstype.Property.OffsetPath | undefined;
        motionRotation?: csstype.Property.OffsetRotate | undefined;
        objectFit?: csstype.Property.ObjectFit | undefined;
        objectPosition?: csstype.Property.ObjectPosition<string | number> | undefined;
        offsetAnchor?: csstype.Property.OffsetAnchor<string | number> | undefined;
        offsetDistance?: csstype.Property.OffsetDistance<string | number> | undefined;
        offsetPath?: csstype.Property.OffsetPath | undefined;
        offsetPosition?: csstype.Property.OffsetPosition<string | number> | undefined;
        offsetRotate?: csstype.Property.OffsetRotate | undefined;
        offsetRotation?: csstype.Property.OffsetRotate | undefined;
        opacity?: csstype.Property.Opacity | undefined;
        order?: csstype.Property.Order | undefined;
        orphans?: csstype.Property.Orphans | undefined;
        outlineColor?: csstype.Property.OutlineColor | undefined;
        outlineOffset?: csstype.Property.OutlineOffset<string | number> | undefined;
        outlineStyle?: csstype.Property.OutlineStyle | undefined;
        outlineWidth?: csstype.Property.OutlineWidth<string | number> | undefined;
        overflowAnchor?: csstype.Property.OverflowAnchor | undefined;
        overflowBlock?: csstype.Property.OverflowBlock | undefined;
        overflowClipBox?: csstype.Property.OverflowClipBox | undefined;
        overflowClipMargin?: csstype.Property.OverflowClipMargin<string | number> | undefined;
        overflowInline?: csstype.Property.OverflowInline | undefined;
        overflowWrap?: csstype.Property.OverflowWrap | undefined;
        overflowX?: csstype.Property.OverflowX | undefined;
        overflowY?: csstype.Property.OverflowY | undefined;
        overlay?: csstype.Property.Overlay | undefined;
        overscrollBehaviorBlock?: csstype.Property.OverscrollBehaviorBlock | undefined;
        overscrollBehaviorInline?: csstype.Property.OverscrollBehaviorInline | undefined;
        overscrollBehaviorX?: csstype.Property.OverscrollBehaviorX | undefined;
        overscrollBehaviorY?: csstype.Property.OverscrollBehaviorY | undefined;
        paddingBlockEnd?: csstype.Property.PaddingBlockEnd<string | number> | undefined;
        paddingBlockStart?: csstype.Property.PaddingBlockStart<string | number> | undefined;
        paddingBottom?: csstype.Property.PaddingBottom<string | number> | undefined;
        paddingInlineEnd?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        paddingInlineStart?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        paddingLeft?: csstype.Property.PaddingLeft<string | number> | undefined;
        paddingRight?: csstype.Property.PaddingRight<string | number> | undefined;
        paddingTop?: csstype.Property.PaddingTop<string | number> | undefined;
        page?: csstype.Property.Page | undefined;
        pageBreakAfter?: csstype.Property.PageBreakAfter | undefined;
        pageBreakBefore?: csstype.Property.PageBreakBefore | undefined;
        pageBreakInside?: csstype.Property.PageBreakInside | undefined;
        paintOrder?: csstype.Property.PaintOrder | undefined;
        perspectiveOrigin?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        pointerEvents?: csstype.Property.PointerEvents | undefined;
        position?: csstype.Property.Position | undefined;
        printColorAdjust?: csstype.Property.PrintColorAdjust | undefined;
        quotes?: csstype.Property.Quotes | undefined;
        resize?: csstype.Property.Resize | undefined;
        right?: csstype.Property.Right<string | number> | undefined;
        rowGap?: csstype.Property.RowGap<string | number> | undefined;
        rubyAlign?: csstype.Property.RubyAlign | undefined;
        rubyMerge?: csstype.Property.RubyMerge | undefined;
        rubyPosition?: csstype.Property.RubyPosition | undefined;
        scrollBehavior?: csstype.Property.ScrollBehavior | undefined;
        scrollMarginBlockEnd?: csstype.Property.ScrollMarginBlockEnd<string | number> | undefined;
        scrollMarginBlockStart?: csstype.Property.ScrollMarginBlockStart<string | number> | undefined;
        scrollMarginBottom?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        scrollMarginInlineEnd?: csstype.Property.ScrollMarginInlineEnd<string | number> | undefined;
        scrollMarginInlineStart?: csstype.Property.ScrollMarginInlineStart<string | number> | undefined;
        scrollMarginLeft?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        scrollMarginRight?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        scrollMarginTop?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        scrollPaddingBlockEnd?: csstype.Property.ScrollPaddingBlockEnd<string | number> | undefined;
        scrollPaddingBlockStart?: csstype.Property.ScrollPaddingBlockStart<string | number> | undefined;
        scrollPaddingBottom?: csstype.Property.ScrollPaddingBottom<string | number> | undefined;
        scrollPaddingInlineEnd?: csstype.Property.ScrollPaddingInlineEnd<string | number> | undefined;
        scrollPaddingInlineStart?: csstype.Property.ScrollPaddingInlineStart<string | number> | undefined;
        scrollPaddingLeft?: csstype.Property.ScrollPaddingLeft<string | number> | undefined;
        scrollPaddingRight?: csstype.Property.ScrollPaddingRight<string | number> | undefined;
        scrollPaddingTop?: csstype.Property.ScrollPaddingTop<string | number> | undefined;
        scrollSnapAlign?: csstype.Property.ScrollSnapAlign | undefined;
        scrollSnapMarginBottom?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        scrollSnapMarginLeft?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        scrollSnapMarginRight?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        scrollSnapMarginTop?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        scrollSnapStop?: csstype.Property.ScrollSnapStop | undefined;
        scrollSnapType?: csstype.Property.ScrollSnapType | undefined;
        scrollTimelineAxis?: csstype.Property.ScrollTimelineAxis | undefined;
        scrollTimelineName?: csstype.Property.ScrollTimelineName | undefined;
        scrollbarColor?: csstype.Property.ScrollbarColor | undefined;
        scrollbarGutter?: csstype.Property.ScrollbarGutter | undefined;
        scrollbarWidth?: csstype.Property.ScrollbarWidth | undefined;
        shapeImageThreshold?: csstype.Property.ShapeImageThreshold | undefined;
        shapeMargin?: csstype.Property.ShapeMargin<string | number> | undefined;
        shapeOutside?: csstype.Property.ShapeOutside | undefined;
        tabSize?: csstype.Property.TabSize<string | number> | undefined;
        tableLayout?: csstype.Property.TableLayout | undefined;
        textAlign?: csstype.Property.TextAlign | undefined;
        textAlignLast?: csstype.Property.TextAlignLast | undefined;
        textCombineUpright?: csstype.Property.TextCombineUpright | undefined;
        textDecorationColor?: csstype.Property.TextDecorationColor | undefined;
        textDecorationLine?: csstype.Property.TextDecorationLine | undefined;
        textDecorationSkip?: csstype.Property.TextDecorationSkip | undefined;
        textDecorationSkipInk?: csstype.Property.TextDecorationSkipInk | undefined;
        textDecorationStyle?: csstype.Property.TextDecorationStyle | undefined;
        textDecorationThickness?: csstype.Property.TextDecorationThickness<string | number> | undefined;
        textEmphasisColor?: csstype.Property.TextEmphasisColor | undefined;
        textEmphasisPosition?: csstype.Property.TextEmphasisPosition | undefined;
        textEmphasisStyle?: csstype.Property.TextEmphasisStyle | undefined;
        textIndent?: csstype.Property.TextIndent<string | number> | undefined;
        textJustify?: csstype.Property.TextJustify | undefined;
        textOrientation?: csstype.Property.TextOrientation | undefined;
        textOverflow?: csstype.Property.TextOverflow | undefined;
        textRendering?: csstype.Property.TextRendering | undefined;
        textShadow?: csstype.Property.TextShadow | undefined;
        textSizeAdjust?: csstype.Property.TextSizeAdjust | undefined;
        textTransform?: csstype.Property.TextTransform | undefined;
        textUnderlineOffset?: csstype.Property.TextUnderlineOffset<string | number> | undefined;
        textUnderlinePosition?: csstype.Property.TextUnderlinePosition | undefined;
        textWrap?: csstype.Property.TextWrap | undefined;
        timelineScope?: csstype.Property.TimelineScope | undefined;
        top?: csstype.Property.Top<string | number> | undefined;
        touchAction?: csstype.Property.TouchAction | undefined;
        transitionBehavior?: csstype.Property.TransitionBehavior | undefined;
        transitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        transitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        transitionProperty?: csstype.Property.TransitionProperty | undefined;
        transitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        translate?: csstype.Property.Translate<string | number> | undefined;
        unicodeBidi?: csstype.Property.UnicodeBidi | undefined;
        userSelect?: csstype.Property.UserSelect | undefined;
        verticalAlign?: csstype.Property.VerticalAlign<string | number> | undefined;
        viewTimelineAxis?: csstype.Property.ViewTimelineAxis | undefined;
        viewTimelineInset?: csstype.Property.ViewTimelineInset<string | number> | undefined;
        viewTimelineName?: csstype.Property.ViewTimelineName | undefined;
        viewTransitionName?: csstype.Property.ViewTransitionName | undefined;
        visibility?: csstype.Property.Visibility | undefined;
        whiteSpace?: csstype.Property.WhiteSpace | undefined;
        whiteSpaceCollapse?: csstype.Property.WhiteSpaceCollapse | undefined;
        whiteSpaceTrim?: csstype.Property.WhiteSpaceTrim | undefined;
        widows?: csstype.Property.Widows | undefined;
        width?: csstype.Property.Width<string | number> | undefined;
        willChange?: csstype.Property.WillChange | undefined;
        wordBreak?: csstype.Property.WordBreak | undefined;
        wordSpacing?: csstype.Property.WordSpacing<string | number> | undefined;
        wordWrap?: csstype.Property.WordWrap | undefined;
        writingMode?: csstype.Property.WritingMode | undefined;
        zIndex?: csstype.Property.ZIndex | undefined;
        zoom?: csstype.Property.Zoom | undefined;
        all?: csstype.Globals | undefined;
        animation?: csstype.Property.Animation<string & {}> | undefined;
        animationRange?: csstype.Property.AnimationRange<string | number> | undefined;
        background?: csstype.Property.Background<string | number> | undefined;
        backgroundPosition?: csstype.Property.BackgroundPosition<string | number> | undefined;
        border?: csstype.Property.Border<string | number> | undefined;
        borderBlock?: csstype.Property.BorderBlock<string | number> | undefined;
        borderBlockEnd?: csstype.Property.BorderBlockEnd<string | number> | undefined;
        borderBlockStart?: csstype.Property.BorderBlockStart<string | number> | undefined;
        borderBottom?: csstype.Property.BorderBottom<string | number> | undefined;
        borderColor?: csstype.Property.BorderColor | undefined;
        borderImage?: csstype.Property.BorderImage | undefined;
        borderInline?: csstype.Property.BorderInline<string | number> | undefined;
        borderInlineEnd?: csstype.Property.BorderInlineEnd<string | number> | undefined;
        borderInlineStart?: csstype.Property.BorderInlineStart<string | number> | undefined;
        borderLeft?: csstype.Property.BorderLeft<string | number> | undefined;
        borderRadius?: csstype.Property.BorderRadius<string | number> | undefined;
        borderRight?: csstype.Property.BorderRight<string | number> | undefined;
        borderStyle?: csstype.Property.BorderStyle | undefined;
        borderTop?: csstype.Property.BorderTop<string | number> | undefined;
        borderWidth?: csstype.Property.BorderWidth<string | number> | undefined;
        caret?: csstype.Property.Caret | undefined;
        columnRule?: csstype.Property.ColumnRule<string | number> | undefined;
        columns?: csstype.Property.Columns<string | number> | undefined;
        containIntrinsicSize?: csstype.Property.ContainIntrinsicSize<string | number> | undefined;
        container?: csstype.Property.Container | undefined;
        flex?: csstype.Property.Flex<string | number> | undefined;
        flexFlow?: csstype.Property.FlexFlow | undefined;
        font?: csstype.Property.Font | undefined;
        gap?: csstype.Property.Gap<string | number> | undefined;
        grid?: csstype.Property.Grid | undefined;
        gridArea?: csstype.Property.GridArea | undefined;
        gridColumn?: csstype.Property.GridColumn | undefined;
        gridRow?: csstype.Property.GridRow | undefined;
        gridTemplate?: csstype.Property.GridTemplate | undefined;
        inset?: csstype.Property.Inset<string | number> | undefined;
        insetBlock?: csstype.Property.InsetBlock<string | number> | undefined;
        insetInline?: csstype.Property.InsetInline<string | number> | undefined;
        lineClamp?: csstype.Property.LineClamp | undefined;
        listStyle?: csstype.Property.ListStyle | undefined;
        margin?: csstype.Property.Margin<string | number> | undefined;
        marginBlock?: csstype.Property.MarginBlock<string | number> | undefined;
        marginInline?: csstype.Property.MarginInline<string | number> | undefined;
        mask?: csstype.Property.Mask<string | number> | undefined;
        maskBorder?: csstype.Property.MaskBorder | undefined;
        motion?: csstype.Property.Offset<string | number> | undefined;
        offset?: csstype.Property.Offset<string | number> | undefined;
        outline?: csstype.Property.Outline<string | number> | undefined;
        overflow?: csstype.Property.Overflow | undefined;
        overscrollBehavior?: csstype.Property.OverscrollBehavior | undefined;
        padding?: csstype.Property.Padding<string | number> | undefined;
        paddingBlock?: csstype.Property.PaddingBlock<string | number> | undefined;
        paddingInline?: csstype.Property.PaddingInline<string | number> | undefined;
        placeContent?: csstype.Property.PlaceContent | undefined;
        placeItems?: csstype.Property.PlaceItems | undefined;
        placeSelf?: csstype.Property.PlaceSelf | undefined;
        scrollMargin?: csstype.Property.ScrollMargin<string | number> | undefined;
        scrollMarginBlock?: csstype.Property.ScrollMarginBlock<string | number> | undefined;
        scrollMarginInline?: csstype.Property.ScrollMarginInline<string | number> | undefined;
        scrollPadding?: csstype.Property.ScrollPadding<string | number> | undefined;
        scrollPaddingBlock?: csstype.Property.ScrollPaddingBlock<string | number> | undefined;
        scrollPaddingInline?: csstype.Property.ScrollPaddingInline<string | number> | undefined;
        scrollSnapMargin?: csstype.Property.ScrollMargin<string | number> | undefined;
        scrollTimeline?: csstype.Property.ScrollTimeline | undefined;
        textDecoration?: csstype.Property.TextDecoration<string | number> | undefined;
        textEmphasis?: csstype.Property.TextEmphasis | undefined;
        viewTimeline?: csstype.Property.ViewTimeline | undefined;
        MozAnimationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        MozAnimationDirection?: csstype.Property.AnimationDirection | undefined;
        MozAnimationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        MozAnimationFillMode?: csstype.Property.AnimationFillMode | undefined;
        MozAnimationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        MozAnimationName?: csstype.Property.AnimationName | undefined;
        MozAnimationPlayState?: csstype.Property.AnimationPlayState | undefined;
        MozAnimationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        MozAppearance?: csstype.Property.MozAppearance | undefined;
        MozBinding?: csstype.Property.MozBinding | undefined;
        MozBorderBottomColors?: csstype.Property.MozBorderBottomColors | undefined;
        MozBorderEndColor?: csstype.Property.BorderInlineEndColor | undefined;
        MozBorderEndStyle?: csstype.Property.BorderInlineEndStyle | undefined;
        MozBorderEndWidth?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        MozBorderLeftColors?: csstype.Property.MozBorderLeftColors | undefined;
        MozBorderRightColors?: csstype.Property.MozBorderRightColors | undefined;
        MozBorderStartColor?: csstype.Property.BorderInlineStartColor | undefined;
        MozBorderStartStyle?: csstype.Property.BorderInlineStartStyle | undefined;
        MozBorderTopColors?: csstype.Property.MozBorderTopColors | undefined;
        MozBoxSizing?: csstype.Property.BoxSizing | undefined;
        MozColumnCount?: csstype.Property.ColumnCount | undefined;
        MozColumnFill?: csstype.Property.ColumnFill | undefined;
        MozColumnRuleColor?: csstype.Property.ColumnRuleColor | undefined;
        MozColumnRuleStyle?: csstype.Property.ColumnRuleStyle | undefined;
        MozColumnRuleWidth?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        MozColumnWidth?: csstype.Property.ColumnWidth<string | number> | undefined;
        MozContextProperties?: csstype.Property.MozContextProperties | undefined;
        MozFontFeatureSettings?: csstype.Property.FontFeatureSettings | undefined;
        MozFontLanguageOverride?: csstype.Property.FontLanguageOverride | undefined;
        MozHyphens?: csstype.Property.Hyphens | undefined;
        MozImageRegion?: csstype.Property.MozImageRegion | undefined;
        MozMarginEnd?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        MozMarginStart?: csstype.Property.MarginInlineStart<string | number> | undefined;
        MozOrient?: csstype.Property.MozOrient | undefined;
        MozOsxFontSmoothing?: csstype.Property.FontSmooth<string | number> | undefined;
        MozOutlineRadiusBottomleft?: csstype.Property.MozOutlineRadiusBottomleft<string | number> | undefined;
        MozOutlineRadiusBottomright?: csstype.Property.MozOutlineRadiusBottomright<string | number> | undefined;
        MozOutlineRadiusTopleft?: csstype.Property.MozOutlineRadiusTopleft<string | number> | undefined;
        MozOutlineRadiusTopright?: csstype.Property.MozOutlineRadiusTopright<string | number> | undefined;
        MozPaddingEnd?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        MozPaddingStart?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        MozStackSizing?: csstype.Property.MozStackSizing | undefined;
        MozTabSize?: csstype.Property.TabSize<string | number> | undefined;
        MozTextBlink?: csstype.Property.MozTextBlink | undefined;
        MozTextSizeAdjust?: csstype.Property.TextSizeAdjust | undefined;
        MozUserFocus?: csstype.Property.MozUserFocus | undefined;
        MozUserModify?: csstype.Property.MozUserModify | undefined;
        MozUserSelect?: csstype.Property.UserSelect | undefined;
        MozWindowDragging?: csstype.Property.MozWindowDragging | undefined;
        MozWindowShadow?: csstype.Property.MozWindowShadow | undefined;
        msAccelerator?: csstype.Property.MsAccelerator | undefined;
        msBlockProgression?: csstype.Property.MsBlockProgression | undefined;
        msContentZoomChaining?: csstype.Property.MsContentZoomChaining | undefined;
        msContentZoomLimitMax?: csstype.Property.MsContentZoomLimitMax | undefined;
        msContentZoomLimitMin?: csstype.Property.MsContentZoomLimitMin | undefined;
        msContentZoomSnapPoints?: csstype.Property.MsContentZoomSnapPoints | undefined;
        msContentZoomSnapType?: csstype.Property.MsContentZoomSnapType | undefined;
        msContentZooming?: csstype.Property.MsContentZooming | undefined;
        msFilter?: csstype.Property.MsFilter | undefined;
        msFlexDirection?: csstype.Property.FlexDirection | undefined;
        msFlexPositive?: csstype.Property.FlexGrow | undefined;
        msFlowFrom?: csstype.Property.MsFlowFrom | undefined;
        msFlowInto?: csstype.Property.MsFlowInto | undefined;
        msGridColumns?: csstype.Property.MsGridColumns<string | number> | undefined;
        msGridRows?: csstype.Property.MsGridRows<string | number> | undefined;
        msHighContrastAdjust?: csstype.Property.MsHighContrastAdjust | undefined;
        msHyphenateLimitChars?: csstype.Property.MsHyphenateLimitChars | undefined;
        msHyphenateLimitLines?: csstype.Property.MsHyphenateLimitLines | undefined;
        msHyphenateLimitZone?: csstype.Property.MsHyphenateLimitZone<string | number> | undefined;
        msHyphens?: csstype.Property.Hyphens | undefined;
        msImeAlign?: csstype.Property.MsImeAlign | undefined;
        msLineBreak?: csstype.Property.LineBreak | undefined;
        msOrder?: csstype.Property.Order | undefined;
        msOverflowStyle?: csstype.Property.MsOverflowStyle | undefined;
        msOverflowX?: csstype.Property.OverflowX | undefined;
        msOverflowY?: csstype.Property.OverflowY | undefined;
        msScrollChaining?: csstype.Property.MsScrollChaining | undefined;
        msScrollLimitXMax?: csstype.Property.MsScrollLimitXMax<string | number> | undefined;
        msScrollLimitXMin?: csstype.Property.MsScrollLimitXMin<string | number> | undefined;
        msScrollLimitYMax?: csstype.Property.MsScrollLimitYMax<string | number> | undefined;
        msScrollLimitYMin?: csstype.Property.MsScrollLimitYMin<string | number> | undefined;
        msScrollRails?: csstype.Property.MsScrollRails | undefined;
        msScrollSnapPointsX?: csstype.Property.MsScrollSnapPointsX | undefined;
        msScrollSnapPointsY?: csstype.Property.MsScrollSnapPointsY | undefined;
        msScrollSnapType?: csstype.Property.MsScrollSnapType | undefined;
        msScrollTranslation?: csstype.Property.MsScrollTranslation | undefined;
        msScrollbar3dlightColor?: csstype.Property.MsScrollbar3dlightColor | undefined;
        msScrollbarArrowColor?: csstype.Property.MsScrollbarArrowColor | undefined;
        msScrollbarBaseColor?: csstype.Property.MsScrollbarBaseColor | undefined;
        msScrollbarDarkshadowColor?: csstype.Property.MsScrollbarDarkshadowColor | undefined;
        msScrollbarFaceColor?: csstype.Property.MsScrollbarFaceColor | undefined;
        msScrollbarHighlightColor?: csstype.Property.MsScrollbarHighlightColor | undefined;
        msScrollbarShadowColor?: csstype.Property.MsScrollbarShadowColor | undefined;
        msScrollbarTrackColor?: csstype.Property.MsScrollbarTrackColor | undefined;
        msTextAutospace?: csstype.Property.MsTextAutospace | undefined;
        msTextCombineHorizontal?: csstype.Property.TextCombineUpright | undefined;
        msTextOverflow?: csstype.Property.TextOverflow | undefined;
        msTouchAction?: csstype.Property.TouchAction | undefined;
        msTouchSelect?: csstype.Property.MsTouchSelect | undefined;
        msTransform?: csstype.Property.Transform | undefined;
        msTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        msTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        msTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        msTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        msTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        msUserSelect?: csstype.Property.MsUserSelect | undefined;
        msWordBreak?: csstype.Property.WordBreak | undefined;
        msWrapFlow?: csstype.Property.MsWrapFlow | undefined;
        msWrapMargin?: csstype.Property.MsWrapMargin<string | number> | undefined;
        msWrapThrough?: csstype.Property.MsWrapThrough | undefined;
        msWritingMode?: csstype.Property.WritingMode | undefined;
        WebkitAlignContent?: csstype.Property.AlignContent | undefined;
        WebkitAlignItems?: csstype.Property.AlignItems | undefined;
        WebkitAlignSelf?: csstype.Property.AlignSelf | undefined;
        WebkitAnimationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        WebkitAnimationDirection?: csstype.Property.AnimationDirection | undefined;
        WebkitAnimationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        WebkitAnimationFillMode?: csstype.Property.AnimationFillMode | undefined;
        WebkitAnimationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        WebkitAnimationName?: csstype.Property.AnimationName | undefined;
        WebkitAnimationPlayState?: csstype.Property.AnimationPlayState | undefined;
        WebkitAnimationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        WebkitAppearance?: csstype.Property.WebkitAppearance | undefined;
        WebkitBackdropFilter?: csstype.Property.BackdropFilter | undefined;
        WebkitBackfaceVisibility?: csstype.Property.BackfaceVisibility | undefined;
        WebkitBackgroundClip?: csstype.Property.BackgroundClip | undefined;
        WebkitBackgroundOrigin?: csstype.Property.BackgroundOrigin | undefined;
        WebkitBackgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        WebkitBorderBeforeColor?: csstype.Property.WebkitBorderBeforeColor | undefined;
        WebkitBorderBeforeStyle?: csstype.Property.WebkitBorderBeforeStyle | undefined;
        WebkitBorderBeforeWidth?: csstype.Property.WebkitBorderBeforeWidth<string | number> | undefined;
        WebkitBorderBottomLeftRadius?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        WebkitBorderBottomRightRadius?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        WebkitBorderImageSlice?: csstype.Property.BorderImageSlice | undefined;
        WebkitBorderTopLeftRadius?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        WebkitBorderTopRightRadius?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        WebkitBoxDecorationBreak?: csstype.Property.BoxDecorationBreak | undefined;
        WebkitBoxReflect?: csstype.Property.WebkitBoxReflect<string | number> | undefined;
        WebkitBoxShadow?: csstype.Property.BoxShadow | undefined;
        WebkitBoxSizing?: csstype.Property.BoxSizing | undefined;
        WebkitClipPath?: csstype.Property.ClipPath | undefined;
        WebkitColumnCount?: csstype.Property.ColumnCount | undefined;
        WebkitColumnFill?: csstype.Property.ColumnFill | undefined;
        WebkitColumnRuleColor?: csstype.Property.ColumnRuleColor | undefined;
        WebkitColumnRuleStyle?: csstype.Property.ColumnRuleStyle | undefined;
        WebkitColumnRuleWidth?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        WebkitColumnSpan?: csstype.Property.ColumnSpan | undefined;
        WebkitColumnWidth?: csstype.Property.ColumnWidth<string | number> | undefined;
        WebkitFilter?: csstype.Property.Filter | undefined;
        WebkitFlexBasis?: csstype.Property.FlexBasis<string | number> | undefined;
        WebkitFlexDirection?: csstype.Property.FlexDirection | undefined;
        WebkitFlexGrow?: csstype.Property.FlexGrow | undefined;
        WebkitFlexShrink?: csstype.Property.FlexShrink | undefined;
        WebkitFlexWrap?: csstype.Property.FlexWrap | undefined;
        WebkitFontFeatureSettings?: csstype.Property.FontFeatureSettings | undefined;
        WebkitFontKerning?: csstype.Property.FontKerning | undefined;
        WebkitFontSmoothing?: csstype.Property.FontSmooth<string | number> | undefined;
        WebkitFontVariantLigatures?: csstype.Property.FontVariantLigatures | undefined;
        WebkitHyphenateCharacter?: csstype.Property.HyphenateCharacter | undefined;
        WebkitHyphens?: csstype.Property.Hyphens | undefined;
        WebkitInitialLetter?: csstype.Property.InitialLetter | undefined;
        WebkitJustifyContent?: csstype.Property.JustifyContent | undefined;
        WebkitLineBreak?: csstype.Property.LineBreak | undefined;
        WebkitLineClamp?: csstype.Property.WebkitLineClamp | undefined;
        WebkitMarginEnd?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        WebkitMarginStart?: csstype.Property.MarginInlineStart<string | number> | undefined;
        WebkitMaskAttachment?: csstype.Property.WebkitMaskAttachment | undefined;
        WebkitMaskBoxImageOutset?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        WebkitMaskBoxImageRepeat?: csstype.Property.MaskBorderRepeat | undefined;
        WebkitMaskBoxImageSlice?: csstype.Property.MaskBorderSlice | undefined;
        WebkitMaskBoxImageSource?: csstype.Property.MaskBorderSource | undefined;
        WebkitMaskBoxImageWidth?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        WebkitMaskClip?: csstype.Property.WebkitMaskClip | undefined;
        WebkitMaskComposite?: csstype.Property.WebkitMaskComposite | undefined;
        WebkitMaskImage?: csstype.Property.WebkitMaskImage | undefined;
        WebkitMaskOrigin?: csstype.Property.WebkitMaskOrigin | undefined;
        WebkitMaskPosition?: csstype.Property.WebkitMaskPosition<string | number> | undefined;
        WebkitMaskPositionX?: csstype.Property.WebkitMaskPositionX<string | number> | undefined;
        WebkitMaskPositionY?: csstype.Property.WebkitMaskPositionY<string | number> | undefined;
        WebkitMaskRepeat?: csstype.Property.WebkitMaskRepeat | undefined;
        WebkitMaskRepeatX?: csstype.Property.WebkitMaskRepeatX | undefined;
        WebkitMaskRepeatY?: csstype.Property.WebkitMaskRepeatY | undefined;
        WebkitMaskSize?: csstype.Property.WebkitMaskSize<string | number> | undefined;
        WebkitMaxInlineSize?: csstype.Property.MaxInlineSize<string | number> | undefined;
        WebkitOrder?: csstype.Property.Order | undefined;
        WebkitOverflowScrolling?: csstype.Property.WebkitOverflowScrolling | undefined;
        WebkitPaddingEnd?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        WebkitPaddingStart?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        WebkitPerspective?: csstype.Property.Perspective<string | number> | undefined;
        WebkitPerspectiveOrigin?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        WebkitPrintColorAdjust?: csstype.Property.PrintColorAdjust | undefined;
        WebkitRubyPosition?: csstype.Property.RubyPosition | undefined;
        WebkitScrollSnapType?: csstype.Property.ScrollSnapType | undefined;
        WebkitShapeMargin?: csstype.Property.ShapeMargin<string | number> | undefined;
        WebkitTapHighlightColor?: csstype.Property.WebkitTapHighlightColor | undefined;
        WebkitTextCombine?: csstype.Property.TextCombineUpright | undefined;
        WebkitTextDecorationColor?: csstype.Property.TextDecorationColor | undefined;
        WebkitTextDecorationLine?: csstype.Property.TextDecorationLine | undefined;
        WebkitTextDecorationSkip?: csstype.Property.TextDecorationSkip | undefined;
        WebkitTextDecorationStyle?: csstype.Property.TextDecorationStyle | undefined;
        WebkitTextEmphasisColor?: csstype.Property.TextEmphasisColor | undefined;
        WebkitTextEmphasisPosition?: csstype.Property.TextEmphasisPosition | undefined;
        WebkitTextEmphasisStyle?: csstype.Property.TextEmphasisStyle | undefined;
        WebkitTextFillColor?: csstype.Property.WebkitTextFillColor | undefined;
        WebkitTextOrientation?: csstype.Property.TextOrientation | undefined;
        WebkitTextSizeAdjust?: csstype.Property.TextSizeAdjust | undefined;
        WebkitTextStrokeColor?: csstype.Property.WebkitTextStrokeColor | undefined;
        WebkitTextStrokeWidth?: csstype.Property.WebkitTextStrokeWidth<string | number> | undefined;
        WebkitTextUnderlinePosition?: csstype.Property.TextUnderlinePosition | undefined;
        WebkitTouchCallout?: csstype.Property.WebkitTouchCallout | undefined;
        WebkitTransform?: csstype.Property.Transform | undefined;
        WebkitTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        WebkitTransformStyle?: csstype.Property.TransformStyle | undefined;
        WebkitTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        WebkitTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        WebkitTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        WebkitTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        WebkitUserModify?: csstype.Property.WebkitUserModify | undefined;
        WebkitUserSelect?: csstype.Property.UserSelect | undefined;
        WebkitWritingMode?: csstype.Property.WritingMode | undefined;
        MozAnimation?: csstype.Property.Animation<string & {}> | undefined;
        MozBorderImage?: csstype.Property.BorderImage | undefined;
        MozColumnRule?: csstype.Property.ColumnRule<string | number> | undefined;
        MozColumns?: csstype.Property.Columns<string | number> | undefined;
        MozOutlineRadius?: csstype.Property.MozOutlineRadius<string | number> | undefined;
        msContentZoomLimit?: csstype.Property.MsContentZoomLimit | undefined;
        msContentZoomSnap?: csstype.Property.MsContentZoomSnap | undefined;
        msFlex?: csstype.Property.Flex<string | number> | undefined;
        msScrollLimit?: csstype.Property.MsScrollLimit | undefined;
        msScrollSnapX?: csstype.Property.MsScrollSnapX | undefined;
        msScrollSnapY?: csstype.Property.MsScrollSnapY | undefined;
        msTransition?: csstype.Property.Transition<string & {}> | undefined;
        WebkitAnimation?: csstype.Property.Animation<string & {}> | undefined;
        WebkitBorderBefore?: csstype.Property.WebkitBorderBefore<string | number> | undefined;
        WebkitBorderImage?: csstype.Property.BorderImage | undefined;
        WebkitBorderRadius?: csstype.Property.BorderRadius<string | number> | undefined;
        WebkitColumnRule?: csstype.Property.ColumnRule<string | number> | undefined;
        WebkitColumns?: csstype.Property.Columns<string | number> | undefined;
        WebkitFlex?: csstype.Property.Flex<string | number> | undefined;
        WebkitFlexFlow?: csstype.Property.FlexFlow | undefined;
        WebkitMask?: csstype.Property.WebkitMask<string | number> | undefined;
        WebkitMaskBoxImage?: csstype.Property.MaskBorder | undefined;
        WebkitTextEmphasis?: csstype.Property.TextEmphasis | undefined;
        WebkitTextStroke?: csstype.Property.WebkitTextStroke<string | number> | undefined;
        WebkitTransition?: csstype.Property.Transition<string & {}> | undefined;
        azimuth?: csstype.Property.Azimuth | undefined;
        boxAlign?: csstype.Property.BoxAlign | undefined;
        boxDirection?: csstype.Property.BoxDirection | undefined;
        boxFlex?: csstype.Property.BoxFlex | undefined;
        boxFlexGroup?: csstype.Property.BoxFlexGroup | undefined;
        boxLines?: csstype.Property.BoxLines | undefined;
        boxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        boxOrient?: csstype.Property.BoxOrient | undefined;
        boxPack?: csstype.Property.BoxPack | undefined;
        clip?: csstype.Property.Clip | undefined;
        gridColumnGap?: csstype.Property.GridColumnGap<string | number> | undefined;
        gridGap?: csstype.Property.GridGap<string | number> | undefined;
        gridRowGap?: csstype.Property.GridRowGap<string | number> | undefined;
        imeMode?: csstype.Property.ImeMode | undefined;
        offsetBlock?: csstype.Property.InsetBlock<string | number> | undefined;
        offsetBlockEnd?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        offsetBlockStart?: csstype.Property.InsetBlockStart<string | number> | undefined;
        offsetInline?: csstype.Property.InsetInline<string | number> | undefined;
        offsetInlineEnd?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        offsetInlineStart?: csstype.Property.InsetInlineStart<string | number> | undefined;
        scrollSnapCoordinate?: csstype.Property.ScrollSnapCoordinate<string | number> | undefined;
        scrollSnapDestination?: csstype.Property.ScrollSnapDestination<string | number> | undefined;
        scrollSnapPointsX?: csstype.Property.ScrollSnapPointsX | undefined;
        scrollSnapPointsY?: csstype.Property.ScrollSnapPointsY | undefined;
        scrollSnapTypeX?: csstype.Property.ScrollSnapTypeX | undefined;
        scrollSnapTypeY?: csstype.Property.ScrollSnapTypeY | undefined;
        KhtmlBoxAlign?: csstype.Property.BoxAlign | undefined;
        KhtmlBoxDirection?: csstype.Property.BoxDirection | undefined;
        KhtmlBoxFlex?: csstype.Property.BoxFlex | undefined;
        KhtmlBoxFlexGroup?: csstype.Property.BoxFlexGroup | undefined;
        KhtmlBoxLines?: csstype.Property.BoxLines | undefined;
        KhtmlBoxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        KhtmlBoxOrient?: csstype.Property.BoxOrient | undefined;
        KhtmlBoxPack?: csstype.Property.BoxPack | undefined;
        KhtmlLineBreak?: csstype.Property.LineBreak | undefined;
        KhtmlOpacity?: csstype.Property.Opacity | undefined;
        KhtmlUserSelect?: csstype.Property.UserSelect | undefined;
        MozBackfaceVisibility?: csstype.Property.BackfaceVisibility | undefined;
        MozBackgroundClip?: csstype.Property.BackgroundClip | undefined;
        MozBackgroundInlinePolicy?: csstype.Property.BoxDecorationBreak | undefined;
        MozBackgroundOrigin?: csstype.Property.BackgroundOrigin | undefined;
        MozBackgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        MozBorderRadius?: csstype.Property.BorderRadius<string | number> | undefined;
        MozBorderRadiusBottomleft?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        MozBorderRadiusBottomright?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        MozBorderRadiusTopleft?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        MozBorderRadiusTopright?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        MozBoxAlign?: csstype.Property.BoxAlign | undefined;
        MozBoxDirection?: csstype.Property.BoxDirection | undefined;
        MozBoxFlex?: csstype.Property.BoxFlex | undefined;
        MozBoxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        MozBoxOrient?: csstype.Property.BoxOrient | undefined;
        MozBoxPack?: csstype.Property.BoxPack | undefined;
        MozBoxShadow?: csstype.Property.BoxShadow | undefined;
        MozFloatEdge?: csstype.Property.MozFloatEdge | undefined;
        MozForceBrokenImageIcon?: csstype.Property.MozForceBrokenImageIcon | undefined;
        MozOpacity?: csstype.Property.Opacity | undefined;
        MozOutline?: csstype.Property.Outline<string | number> | undefined;
        MozOutlineColor?: csstype.Property.OutlineColor | undefined;
        MozOutlineStyle?: csstype.Property.OutlineStyle | undefined;
        MozOutlineWidth?: csstype.Property.OutlineWidth<string | number> | undefined;
        MozPerspective?: csstype.Property.Perspective<string | number> | undefined;
        MozPerspectiveOrigin?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        MozTextAlignLast?: csstype.Property.TextAlignLast | undefined;
        MozTextDecorationColor?: csstype.Property.TextDecorationColor | undefined;
        MozTextDecorationLine?: csstype.Property.TextDecorationLine | undefined;
        MozTextDecorationStyle?: csstype.Property.TextDecorationStyle | undefined;
        MozTransform?: csstype.Property.Transform | undefined;
        MozTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        MozTransformStyle?: csstype.Property.TransformStyle | undefined;
        MozTransition?: csstype.Property.Transition<string & {}> | undefined;
        MozTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        MozTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        MozTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        MozTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        MozUserInput?: csstype.Property.MozUserInput | undefined;
        msImeMode?: csstype.Property.ImeMode | undefined;
        OAnimation?: csstype.Property.Animation<string & {}> | undefined;
        OAnimationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        OAnimationDirection?: csstype.Property.AnimationDirection | undefined;
        OAnimationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        OAnimationFillMode?: csstype.Property.AnimationFillMode | undefined;
        OAnimationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        OAnimationName?: csstype.Property.AnimationName | undefined;
        OAnimationPlayState?: csstype.Property.AnimationPlayState | undefined;
        OAnimationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        OBackgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        OBorderImage?: csstype.Property.BorderImage | undefined;
        OObjectFit?: csstype.Property.ObjectFit | undefined;
        OObjectPosition?: csstype.Property.ObjectPosition<string | number> | undefined;
        OTabSize?: csstype.Property.TabSize<string | number> | undefined;
        OTextOverflow?: csstype.Property.TextOverflow | undefined;
        OTransform?: csstype.Property.Transform | undefined;
        OTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        OTransition?: csstype.Property.Transition<string & {}> | undefined;
        OTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        OTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        OTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        OTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        WebkitBoxAlign?: csstype.Property.BoxAlign | undefined;
        WebkitBoxDirection?: csstype.Property.BoxDirection | undefined;
        WebkitBoxFlex?: csstype.Property.BoxFlex | undefined;
        WebkitBoxFlexGroup?: csstype.Property.BoxFlexGroup | undefined;
        WebkitBoxLines?: csstype.Property.BoxLines | undefined;
        WebkitBoxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        WebkitBoxOrient?: csstype.Property.BoxOrient | undefined;
        WebkitBoxPack?: csstype.Property.BoxPack | undefined;
        alignmentBaseline?: csstype.Property.AlignmentBaseline | undefined;
        baselineShift?: csstype.Property.BaselineShift<string | number> | undefined;
        clipRule?: csstype.Property.ClipRule | undefined;
        colorInterpolation?: csstype.Property.ColorInterpolation | undefined;
        colorRendering?: csstype.Property.ColorRendering | undefined;
        dominantBaseline?: csstype.Property.DominantBaseline | undefined;
        fillOpacity?: csstype.Property.FillOpacity | undefined;
        fillRule?: csstype.Property.FillRule | undefined;
        floodColor?: csstype.Property.FloodColor | undefined;
        floodOpacity?: csstype.Property.FloodOpacity | undefined;
        glyphOrientationVertical?: csstype.Property.GlyphOrientationVertical | undefined;
        lightingColor?: csstype.Property.LightingColor | undefined;
        marker?: csstype.Property.Marker | undefined;
        markerEnd?: csstype.Property.MarkerEnd | undefined;
        markerMid?: csstype.Property.MarkerMid | undefined;
        markerStart?: csstype.Property.MarkerStart | undefined;
        shapeRendering?: csstype.Property.ShapeRendering | undefined;
        stopColor?: csstype.Property.StopColor | undefined;
        stopOpacity?: csstype.Property.StopOpacity | undefined;
        stroke?: csstype.Property.Stroke | undefined;
        strokeDasharray?: csstype.Property.StrokeDasharray<string | number> | undefined;
        strokeDashoffset?: csstype.Property.StrokeDashoffset<string | number> | undefined;
        strokeLinecap?: csstype.Property.StrokeLinecap | undefined;
        strokeLinejoin?: csstype.Property.StrokeLinejoin | undefined;
        strokeMiterlimit?: csstype.Property.StrokeMiterlimit | undefined;
        strokeOpacity?: csstype.Property.StrokeOpacity | undefined;
        strokeWidth?: csstype.Property.StrokeWidth<string | number> | undefined;
        textAnchor?: csstype.Property.TextAnchor | undefined;
        vectorEffect?: csstype.Property.VectorEffect | undefined;
        "accent-color"?: csstype.Property.AccentColor | undefined;
        "align-content"?: csstype.Property.AlignContent | undefined;
        "align-items"?: csstype.Property.AlignItems | undefined;
        "align-self"?: csstype.Property.AlignSelf | undefined;
        "align-tracks"?: csstype.Property.AlignTracks | undefined;
        "animation-composition"?: csstype.Property.AnimationComposition | undefined;
        "animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "animation-name"?: csstype.Property.AnimationName | undefined;
        "animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "animation-range-end"?: csstype.Property.AnimationRangeEnd<string | number> | undefined;
        "animation-range-start"?: csstype.Property.AnimationRangeStart<string | number> | undefined;
        "animation-timeline"?: csstype.Property.AnimationTimeline | undefined;
        "animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "aspect-ratio"?: csstype.Property.AspectRatio | undefined;
        "backdrop-filter"?: csstype.Property.BackdropFilter | undefined;
        "backface-visibility"?: csstype.Property.BackfaceVisibility | undefined;
        "background-attachment"?: csstype.Property.BackgroundAttachment | undefined;
        "background-blend-mode"?: csstype.Property.BackgroundBlendMode | undefined;
        "background-clip"?: csstype.Property.BackgroundClip | undefined;
        "background-color"?: csstype.Property.BackgroundColor | undefined;
        "background-image"?: csstype.Property.BackgroundImage | undefined;
        "background-origin"?: csstype.Property.BackgroundOrigin | undefined;
        "background-position-x"?: csstype.Property.BackgroundPositionX<string | number> | undefined;
        "background-position-y"?: csstype.Property.BackgroundPositionY<string | number> | undefined;
        "background-repeat"?: csstype.Property.BackgroundRepeat | undefined;
        "background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "block-overflow"?: csstype.Property.BlockOverflow | undefined;
        "block-size"?: csstype.Property.BlockSize<string | number> | undefined;
        "border-block-color"?: csstype.Property.BorderBlockColor | undefined;
        "border-block-end-color"?: csstype.Property.BorderBlockEndColor | undefined;
        "border-block-end-style"?: csstype.Property.BorderBlockEndStyle | undefined;
        "border-block-end-width"?: csstype.Property.BorderBlockEndWidth<string | number> | undefined;
        "border-block-start-color"?: csstype.Property.BorderBlockStartColor | undefined;
        "border-block-start-style"?: csstype.Property.BorderBlockStartStyle | undefined;
        "border-block-start-width"?: csstype.Property.BorderBlockStartWidth<string | number> | undefined;
        "border-block-style"?: csstype.Property.BorderBlockStyle | undefined;
        "border-block-width"?: csstype.Property.BorderBlockWidth<string | number> | undefined;
        "border-bottom-color"?: csstype.Property.BorderBottomColor | undefined;
        "border-bottom-left-radius"?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        "border-bottom-right-radius"?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        "border-bottom-style"?: csstype.Property.BorderBottomStyle | undefined;
        "border-bottom-width"?: csstype.Property.BorderBottomWidth<string | number> | undefined;
        "border-collapse"?: csstype.Property.BorderCollapse | undefined;
        "border-end-end-radius"?: csstype.Property.BorderEndEndRadius<string | number> | undefined;
        "border-end-start-radius"?: csstype.Property.BorderEndStartRadius<string | number> | undefined;
        "border-image-outset"?: csstype.Property.BorderImageOutset<string | number> | undefined;
        "border-image-repeat"?: csstype.Property.BorderImageRepeat | undefined;
        "border-image-slice"?: csstype.Property.BorderImageSlice | undefined;
        "border-image-source"?: csstype.Property.BorderImageSource | undefined;
        "border-image-width"?: csstype.Property.BorderImageWidth<string | number> | undefined;
        "border-inline-color"?: csstype.Property.BorderInlineColor | undefined;
        "border-inline-end-color"?: csstype.Property.BorderInlineEndColor | undefined;
        "border-inline-end-style"?: csstype.Property.BorderInlineEndStyle | undefined;
        "border-inline-end-width"?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        "border-inline-start-color"?: csstype.Property.BorderInlineStartColor | undefined;
        "border-inline-start-style"?: csstype.Property.BorderInlineStartStyle | undefined;
        "border-inline-start-width"?: csstype.Property.BorderInlineStartWidth<string | number> | undefined;
        "border-inline-style"?: csstype.Property.BorderInlineStyle | undefined;
        "border-inline-width"?: csstype.Property.BorderInlineWidth<string | number> | undefined;
        "border-left-color"?: csstype.Property.BorderLeftColor | undefined;
        "border-left-style"?: csstype.Property.BorderLeftStyle | undefined;
        "border-left-width"?: csstype.Property.BorderLeftWidth<string | number> | undefined;
        "border-right-color"?: csstype.Property.BorderRightColor | undefined;
        "border-right-style"?: csstype.Property.BorderRightStyle | undefined;
        "border-right-width"?: csstype.Property.BorderRightWidth<string | number> | undefined;
        "border-spacing"?: csstype.Property.BorderSpacing<string | number> | undefined;
        "border-start-end-radius"?: csstype.Property.BorderStartEndRadius<string | number> | undefined;
        "border-start-start-radius"?: csstype.Property.BorderStartStartRadius<string | number> | undefined;
        "border-top-color"?: csstype.Property.BorderTopColor | undefined;
        "border-top-left-radius"?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        "border-top-right-radius"?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        "border-top-style"?: csstype.Property.BorderTopStyle | undefined;
        "border-top-width"?: csstype.Property.BorderTopWidth<string | number> | undefined;
        "box-decoration-break"?: csstype.Property.BoxDecorationBreak | undefined;
        "box-shadow"?: csstype.Property.BoxShadow | undefined;
        "box-sizing"?: csstype.Property.BoxSizing | undefined;
        "break-after"?: csstype.Property.BreakAfter | undefined;
        "break-before"?: csstype.Property.BreakBefore | undefined;
        "break-inside"?: csstype.Property.BreakInside | undefined;
        "caption-side"?: csstype.Property.CaptionSide | undefined;
        "caret-color"?: csstype.Property.CaretColor | undefined;
        "caret-shape"?: csstype.Property.CaretShape | undefined;
        "clip-path"?: csstype.Property.ClipPath | undefined;
        "color-adjust"?: csstype.Property.PrintColorAdjust | undefined;
        "color-scheme"?: csstype.Property.ColorScheme | undefined;
        "column-count"?: csstype.Property.ColumnCount | undefined;
        "column-fill"?: csstype.Property.ColumnFill | undefined;
        "column-gap"?: csstype.Property.ColumnGap<string | number> | undefined;
        "column-rule-color"?: csstype.Property.ColumnRuleColor | undefined;
        "column-rule-style"?: csstype.Property.ColumnRuleStyle | undefined;
        "column-rule-width"?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        "column-span"?: csstype.Property.ColumnSpan | undefined;
        "column-width"?: csstype.Property.ColumnWidth<string | number> | undefined;
        "contain-intrinsic-block-size"?: csstype.Property.ContainIntrinsicBlockSize<string | number> | undefined;
        "contain-intrinsic-height"?: csstype.Property.ContainIntrinsicHeight<string | number> | undefined;
        "contain-intrinsic-inline-size"?: csstype.Property.ContainIntrinsicInlineSize<string | number> | undefined;
        "contain-intrinsic-width"?: csstype.Property.ContainIntrinsicWidth<string | number> | undefined;
        "container-name"?: csstype.Property.ContainerName | undefined;
        "container-type"?: csstype.Property.ContainerType | undefined;
        "content-visibility"?: csstype.Property.ContentVisibility | undefined;
        "counter-increment"?: csstype.Property.CounterIncrement | undefined;
        "counter-reset"?: csstype.Property.CounterReset | undefined;
        "counter-set"?: csstype.Property.CounterSet | undefined;
        "empty-cells"?: csstype.Property.EmptyCells | undefined;
        "flex-basis"?: csstype.Property.FlexBasis<string | number> | undefined;
        "flex-direction"?: csstype.Property.FlexDirection | undefined;
        "flex-grow"?: csstype.Property.FlexGrow | undefined;
        "flex-shrink"?: csstype.Property.FlexShrink | undefined;
        "flex-wrap"?: csstype.Property.FlexWrap | undefined;
        "font-family"?: csstype.Property.FontFamily | undefined;
        "font-feature-settings"?: csstype.Property.FontFeatureSettings | undefined;
        "font-kerning"?: csstype.Property.FontKerning | undefined;
        "font-language-override"?: csstype.Property.FontLanguageOverride | undefined;
        "font-optical-sizing"?: csstype.Property.FontOpticalSizing | undefined;
        "font-palette"?: csstype.Property.FontPalette | undefined;
        "font-size"?: csstype.Property.FontSize<string | number> | undefined;
        "font-size-adjust"?: csstype.Property.FontSizeAdjust | undefined;
        "font-smooth"?: csstype.Property.FontSmooth<string | number> | undefined;
        "font-stretch"?: csstype.Property.FontStretch | undefined;
        "font-style"?: csstype.Property.FontStyle | undefined;
        "font-synthesis"?: csstype.Property.FontSynthesis | undefined;
        "font-synthesis-position"?: csstype.Property.FontSynthesisPosition | undefined;
        "font-synthesis-small-caps"?: csstype.Property.FontSynthesisSmallCaps | undefined;
        "font-synthesis-style"?: csstype.Property.FontSynthesisStyle | undefined;
        "font-synthesis-weight"?: csstype.Property.FontSynthesisWeight | undefined;
        "font-variant"?: csstype.Property.FontVariant | undefined;
        "font-variant-alternates"?: csstype.Property.FontVariantAlternates | undefined;
        "font-variant-caps"?: csstype.Property.FontVariantCaps | undefined;
        "font-variant-east-asian"?: csstype.Property.FontVariantEastAsian | undefined;
        "font-variant-emoji"?: csstype.Property.FontVariantEmoji | undefined;
        "font-variant-ligatures"?: csstype.Property.FontVariantLigatures | undefined;
        "font-variant-numeric"?: csstype.Property.FontVariantNumeric | undefined;
        "font-variant-position"?: csstype.Property.FontVariantPosition | undefined;
        "font-variation-settings"?: csstype.Property.FontVariationSettings | undefined;
        "font-weight"?: csstype.Property.FontWeight | undefined;
        "forced-color-adjust"?: csstype.Property.ForcedColorAdjust | undefined;
        "grid-auto-columns"?: csstype.Property.GridAutoColumns<string | number> | undefined;
        "grid-auto-flow"?: csstype.Property.GridAutoFlow | undefined;
        "grid-auto-rows"?: csstype.Property.GridAutoRows<string | number> | undefined;
        "grid-column-end"?: csstype.Property.GridColumnEnd | undefined;
        "grid-column-start"?: csstype.Property.GridColumnStart | undefined;
        "grid-row-end"?: csstype.Property.GridRowEnd | undefined;
        "grid-row-start"?: csstype.Property.GridRowStart | undefined;
        "grid-template-areas"?: csstype.Property.GridTemplateAreas | undefined;
        "grid-template-columns"?: csstype.Property.GridTemplateColumns<string | number> | undefined;
        "grid-template-rows"?: csstype.Property.GridTemplateRows<string | number> | undefined;
        "hanging-punctuation"?: csstype.Property.HangingPunctuation | undefined;
        "hyphenate-character"?: csstype.Property.HyphenateCharacter | undefined;
        "hyphenate-limit-chars"?: csstype.Property.HyphenateLimitChars | undefined;
        "image-orientation"?: csstype.Property.ImageOrientation | undefined;
        "image-rendering"?: csstype.Property.ImageRendering | undefined;
        "image-resolution"?: csstype.Property.ImageResolution | undefined;
        "initial-letter"?: csstype.Property.InitialLetter | undefined;
        "inline-size"?: csstype.Property.InlineSize<string | number> | undefined;
        "input-security"?: csstype.Property.InputSecurity | undefined;
        "inset-block-end"?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        "inset-block-start"?: csstype.Property.InsetBlockStart<string | number> | undefined;
        "inset-inline-end"?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        "inset-inline-start"?: csstype.Property.InsetInlineStart<string | number> | undefined;
        "justify-content"?: csstype.Property.JustifyContent | undefined;
        "justify-items"?: csstype.Property.JustifyItems | undefined;
        "justify-self"?: csstype.Property.JustifySelf | undefined;
        "justify-tracks"?: csstype.Property.JustifyTracks | undefined;
        "letter-spacing"?: csstype.Property.LetterSpacing<string | number> | undefined;
        "line-break"?: csstype.Property.LineBreak | undefined;
        "line-height"?: csstype.Property.LineHeight<string | number> | undefined;
        "line-height-step"?: csstype.Property.LineHeightStep<string | number> | undefined;
        "list-style-image"?: csstype.Property.ListStyleImage | undefined;
        "list-style-position"?: csstype.Property.ListStylePosition | undefined;
        "list-style-type"?: csstype.Property.ListStyleType | undefined;
        "margin-block-end"?: csstype.Property.MarginBlockEnd<string | number> | undefined;
        "margin-block-start"?: csstype.Property.MarginBlockStart<string | number> | undefined;
        "margin-bottom"?: csstype.Property.MarginBottom<string | number> | undefined;
        "margin-inline-end"?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        "margin-inline-start"?: csstype.Property.MarginInlineStart<string | number> | undefined;
        "margin-left"?: csstype.Property.MarginLeft<string | number> | undefined;
        "margin-right"?: csstype.Property.MarginRight<string | number> | undefined;
        "margin-top"?: csstype.Property.MarginTop<string | number> | undefined;
        "margin-trim"?: csstype.Property.MarginTrim | undefined;
        "mask-border-mode"?: csstype.Property.MaskBorderMode | undefined;
        "mask-border-outset"?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        "mask-border-repeat"?: csstype.Property.MaskBorderRepeat | undefined;
        "mask-border-slice"?: csstype.Property.MaskBorderSlice | undefined;
        "mask-border-source"?: csstype.Property.MaskBorderSource | undefined;
        "mask-border-width"?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        "mask-clip"?: csstype.Property.MaskClip | undefined;
        "mask-composite"?: csstype.Property.MaskComposite | undefined;
        "mask-image"?: csstype.Property.MaskImage | undefined;
        "mask-mode"?: csstype.Property.MaskMode | undefined;
        "mask-origin"?: csstype.Property.MaskOrigin | undefined;
        "mask-position"?: csstype.Property.MaskPosition<string | number> | undefined;
        "mask-repeat"?: csstype.Property.MaskRepeat | undefined;
        "mask-size"?: csstype.Property.MaskSize<string | number> | undefined;
        "mask-type"?: csstype.Property.MaskType | undefined;
        "masonry-auto-flow"?: csstype.Property.MasonryAutoFlow | undefined;
        "math-depth"?: csstype.Property.MathDepth | undefined;
        "math-shift"?: csstype.Property.MathShift | undefined;
        "math-style"?: csstype.Property.MathStyle | undefined;
        "max-block-size"?: csstype.Property.MaxBlockSize<string | number> | undefined;
        "max-height"?: csstype.Property.MaxHeight<string | number> | undefined;
        "max-inline-size"?: csstype.Property.MaxInlineSize<string | number> | undefined;
        "max-lines"?: csstype.Property.MaxLines | undefined;
        "max-width"?: csstype.Property.MaxWidth<string | number> | undefined;
        "min-block-size"?: csstype.Property.MinBlockSize<string | number> | undefined;
        "min-height"?: csstype.Property.MinHeight<string | number> | undefined;
        "min-inline-size"?: csstype.Property.MinInlineSize<string | number> | undefined;
        "min-width"?: csstype.Property.MinWidth<string | number> | undefined;
        "mix-blend-mode"?: csstype.Property.MixBlendMode | undefined;
        "motion-distance"?: csstype.Property.OffsetDistance<string | number> | undefined;
        "motion-path"?: csstype.Property.OffsetPath | undefined;
        "motion-rotation"?: csstype.Property.OffsetRotate | undefined;
        "object-fit"?: csstype.Property.ObjectFit | undefined;
        "object-position"?: csstype.Property.ObjectPosition<string | number> | undefined;
        "offset-anchor"?: csstype.Property.OffsetAnchor<string | number> | undefined;
        "offset-distance"?: csstype.Property.OffsetDistance<string | number> | undefined;
        "offset-path"?: csstype.Property.OffsetPath | undefined;
        "offset-position"?: csstype.Property.OffsetPosition<string | number> | undefined;
        "offset-rotate"?: csstype.Property.OffsetRotate | undefined;
        "offset-rotation"?: csstype.Property.OffsetRotate | undefined;
        "outline-color"?: csstype.Property.OutlineColor | undefined;
        "outline-offset"?: csstype.Property.OutlineOffset<string | number> | undefined;
        "outline-style"?: csstype.Property.OutlineStyle | undefined;
        "outline-width"?: csstype.Property.OutlineWidth<string | number> | undefined;
        "overflow-anchor"?: csstype.Property.OverflowAnchor | undefined;
        "overflow-block"?: csstype.Property.OverflowBlock | undefined;
        "overflow-clip-box"?: csstype.Property.OverflowClipBox | undefined;
        "overflow-clip-margin"?: csstype.Property.OverflowClipMargin<string | number> | undefined;
        "overflow-inline"?: csstype.Property.OverflowInline | undefined;
        "overflow-wrap"?: csstype.Property.OverflowWrap | undefined;
        "overflow-x"?: csstype.Property.OverflowX | undefined;
        "overflow-y"?: csstype.Property.OverflowY | undefined;
        "overscroll-behavior-block"?: csstype.Property.OverscrollBehaviorBlock | undefined;
        "overscroll-behavior-inline"?: csstype.Property.OverscrollBehaviorInline | undefined;
        "overscroll-behavior-x"?: csstype.Property.OverscrollBehaviorX | undefined;
        "overscroll-behavior-y"?: csstype.Property.OverscrollBehaviorY | undefined;
        "padding-block-end"?: csstype.Property.PaddingBlockEnd<string | number> | undefined;
        "padding-block-start"?: csstype.Property.PaddingBlockStart<string | number> | undefined;
        "padding-bottom"?: csstype.Property.PaddingBottom<string | number> | undefined;
        "padding-inline-end"?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        "padding-inline-start"?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        "padding-left"?: csstype.Property.PaddingLeft<string | number> | undefined;
        "padding-right"?: csstype.Property.PaddingRight<string | number> | undefined;
        "padding-top"?: csstype.Property.PaddingTop<string | number> | undefined;
        "page-break-after"?: csstype.Property.PageBreakAfter | undefined;
        "page-break-before"?: csstype.Property.PageBreakBefore | undefined;
        "page-break-inside"?: csstype.Property.PageBreakInside | undefined;
        "paint-order"?: csstype.Property.PaintOrder | undefined;
        "perspective-origin"?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        "pointer-events"?: csstype.Property.PointerEvents | undefined;
        "print-color-adjust"?: csstype.Property.PrintColorAdjust | undefined;
        "row-gap"?: csstype.Property.RowGap<string | number> | undefined;
        "ruby-align"?: csstype.Property.RubyAlign | undefined;
        "ruby-merge"?: csstype.Property.RubyMerge | undefined;
        "ruby-position"?: csstype.Property.RubyPosition | undefined;
        "scroll-behavior"?: csstype.Property.ScrollBehavior | undefined;
        "scroll-margin-block-end"?: csstype.Property.ScrollMarginBlockEnd<string | number> | undefined;
        "scroll-margin-block-start"?: csstype.Property.ScrollMarginBlockStart<string | number> | undefined;
        "scroll-margin-bottom"?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        "scroll-margin-inline-end"?: csstype.Property.ScrollMarginInlineEnd<string | number> | undefined;
        "scroll-margin-inline-start"?: csstype.Property.ScrollMarginInlineStart<string | number> | undefined;
        "scroll-margin-left"?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        "scroll-margin-right"?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        "scroll-margin-top"?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        "scroll-padding-block-end"?: csstype.Property.ScrollPaddingBlockEnd<string | number> | undefined;
        "scroll-padding-block-start"?: csstype.Property.ScrollPaddingBlockStart<string | number> | undefined;
        "scroll-padding-bottom"?: csstype.Property.ScrollPaddingBottom<string | number> | undefined;
        "scroll-padding-inline-end"?: csstype.Property.ScrollPaddingInlineEnd<string | number> | undefined;
        "scroll-padding-inline-start"?: csstype.Property.ScrollPaddingInlineStart<string | number> | undefined;
        "scroll-padding-left"?: csstype.Property.ScrollPaddingLeft<string | number> | undefined;
        "scroll-padding-right"?: csstype.Property.ScrollPaddingRight<string | number> | undefined;
        "scroll-padding-top"?: csstype.Property.ScrollPaddingTop<string | number> | undefined;
        "scroll-snap-align"?: csstype.Property.ScrollSnapAlign | undefined;
        "scroll-snap-margin-bottom"?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        "scroll-snap-margin-left"?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        "scroll-snap-margin-right"?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        "scroll-snap-margin-top"?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        "scroll-snap-stop"?: csstype.Property.ScrollSnapStop | undefined;
        "scroll-snap-type"?: csstype.Property.ScrollSnapType | undefined;
        "scroll-timeline-axis"?: csstype.Property.ScrollTimelineAxis | undefined;
        "scroll-timeline-name"?: csstype.Property.ScrollTimelineName | undefined;
        "scrollbar-color"?: csstype.Property.ScrollbarColor | undefined;
        "scrollbar-gutter"?: csstype.Property.ScrollbarGutter | undefined;
        "scrollbar-width"?: csstype.Property.ScrollbarWidth | undefined;
        "shape-image-threshold"?: csstype.Property.ShapeImageThreshold | undefined;
        "shape-margin"?: csstype.Property.ShapeMargin<string | number> | undefined;
        "shape-outside"?: csstype.Property.ShapeOutside | undefined;
        "tab-size"?: csstype.Property.TabSize<string | number> | undefined;
        "table-layout"?: csstype.Property.TableLayout | undefined;
        "text-align"?: csstype.Property.TextAlign | undefined;
        "text-align-last"?: csstype.Property.TextAlignLast | undefined;
        "text-combine-upright"?: csstype.Property.TextCombineUpright | undefined;
        "text-decoration-color"?: csstype.Property.TextDecorationColor | undefined;
        "text-decoration-line"?: csstype.Property.TextDecorationLine | undefined;
        "text-decoration-skip"?: csstype.Property.TextDecorationSkip | undefined;
        "text-decoration-skip-ink"?: csstype.Property.TextDecorationSkipInk | undefined;
        "text-decoration-style"?: csstype.Property.TextDecorationStyle | undefined;
        "text-decoration-thickness"?: csstype.Property.TextDecorationThickness<string | number> | undefined;
        "text-emphasis-color"?: csstype.Property.TextEmphasisColor | undefined;
        "text-emphasis-position"?: csstype.Property.TextEmphasisPosition | undefined;
        "text-emphasis-style"?: csstype.Property.TextEmphasisStyle | undefined;
        "text-indent"?: csstype.Property.TextIndent<string | number> | undefined;
        "text-justify"?: csstype.Property.TextJustify | undefined;
        "text-orientation"?: csstype.Property.TextOrientation | undefined;
        "text-overflow"?: csstype.Property.TextOverflow | undefined;
        "text-rendering"?: csstype.Property.TextRendering | undefined;
        "text-shadow"?: csstype.Property.TextShadow | undefined;
        "text-size-adjust"?: csstype.Property.TextSizeAdjust | undefined;
        "text-transform"?: csstype.Property.TextTransform | undefined;
        "text-underline-offset"?: csstype.Property.TextUnderlineOffset<string | number> | undefined;
        "text-underline-position"?: csstype.Property.TextUnderlinePosition | undefined;
        "text-wrap"?: csstype.Property.TextWrap | undefined;
        "timeline-scope"?: csstype.Property.TimelineScope | undefined;
        "touch-action"?: csstype.Property.TouchAction | undefined;
        "transform-box"?: csstype.Property.TransformBox | undefined;
        "transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "transform-style"?: csstype.Property.TransformStyle | undefined;
        "transition-behavior"?: csstype.Property.TransitionBehavior | undefined;
        "transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "transition-property"?: csstype.Property.TransitionProperty | undefined;
        "transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "unicode-bidi"?: csstype.Property.UnicodeBidi | undefined;
        "user-select"?: csstype.Property.UserSelect | undefined;
        "vertical-align"?: csstype.Property.VerticalAlign<string | number> | undefined;
        "view-timeline-axis"?: csstype.Property.ViewTimelineAxis | undefined;
        "view-timeline-inset"?: csstype.Property.ViewTimelineInset<string | number> | undefined;
        "view-timeline-name"?: csstype.Property.ViewTimelineName | undefined;
        "view-transition-name"?: csstype.Property.ViewTransitionName | undefined;
        "white-space"?: csstype.Property.WhiteSpace | undefined;
        "white-space-collapse"?: csstype.Property.WhiteSpaceCollapse | undefined;
        "white-space-trim"?: csstype.Property.WhiteSpaceTrim | undefined;
        "will-change"?: csstype.Property.WillChange | undefined;
        "word-break"?: csstype.Property.WordBreak | undefined;
        "word-spacing"?: csstype.Property.WordSpacing<string | number> | undefined;
        "word-wrap"?: csstype.Property.WordWrap | undefined;
        "writing-mode"?: csstype.Property.WritingMode | undefined;
        "z-index"?: csstype.Property.ZIndex | undefined;
        "animation-range"?: csstype.Property.AnimationRange<string | number> | undefined;
        "background-position"?: csstype.Property.BackgroundPosition<string | number> | undefined;
        "border-block"?: csstype.Property.BorderBlock<string | number> | undefined;
        "border-block-end"?: csstype.Property.BorderBlockEnd<string | number> | undefined;
        "border-block-start"?: csstype.Property.BorderBlockStart<string | number> | undefined;
        "border-bottom"?: csstype.Property.BorderBottom<string | number> | undefined;
        "border-color"?: csstype.Property.BorderColor | undefined;
        "border-image"?: csstype.Property.BorderImage | undefined;
        "border-inline"?: csstype.Property.BorderInline<string | number> | undefined;
        "border-inline-end"?: csstype.Property.BorderInlineEnd<string | number> | undefined;
        "border-inline-start"?: csstype.Property.BorderInlineStart<string | number> | undefined;
        "border-left"?: csstype.Property.BorderLeft<string | number> | undefined;
        "border-radius"?: csstype.Property.BorderRadius<string | number> | undefined;
        "border-right"?: csstype.Property.BorderRight<string | number> | undefined;
        "border-style"?: csstype.Property.BorderStyle | undefined;
        "border-top"?: csstype.Property.BorderTop<string | number> | undefined;
        "border-width"?: csstype.Property.BorderWidth<string | number> | undefined;
        "column-rule"?: csstype.Property.ColumnRule<string | number> | undefined;
        "contain-intrinsic-size"?: csstype.Property.ContainIntrinsicSize<string | number> | undefined;
        "flex-flow"?: csstype.Property.FlexFlow | undefined;
        "grid-area"?: csstype.Property.GridArea | undefined;
        "grid-column"?: csstype.Property.GridColumn | undefined;
        "grid-row"?: csstype.Property.GridRow | undefined;
        "grid-template"?: csstype.Property.GridTemplate | undefined;
        "inset-block"?: csstype.Property.InsetBlock<string | number> | undefined;
        "inset-inline"?: csstype.Property.InsetInline<string | number> | undefined;
        "line-clamp"?: csstype.Property.LineClamp | undefined;
        "list-style"?: csstype.Property.ListStyle | undefined;
        "margin-block"?: csstype.Property.MarginBlock<string | number> | undefined;
        "margin-inline"?: csstype.Property.MarginInline<string | number> | undefined;
        "mask-border"?: csstype.Property.MaskBorder | undefined;
        "overscroll-behavior"?: csstype.Property.OverscrollBehavior | undefined;
        "padding-block"?: csstype.Property.PaddingBlock<string | number> | undefined;
        "padding-inline"?: csstype.Property.PaddingInline<string | number> | undefined;
        "place-content"?: csstype.Property.PlaceContent | undefined;
        "place-items"?: csstype.Property.PlaceItems | undefined;
        "place-self"?: csstype.Property.PlaceSelf | undefined;
        "scroll-margin"?: csstype.Property.ScrollMargin<string | number> | undefined;
        "scroll-margin-block"?: csstype.Property.ScrollMarginBlock<string | number> | undefined;
        "scroll-margin-inline"?: csstype.Property.ScrollMarginInline<string | number> | undefined;
        "scroll-padding"?: csstype.Property.ScrollPadding<string | number> | undefined;
        "scroll-padding-block"?: csstype.Property.ScrollPaddingBlock<string | number> | undefined;
        "scroll-padding-inline"?: csstype.Property.ScrollPaddingInline<string | number> | undefined;
        "scroll-snap-margin"?: csstype.Property.ScrollMargin<string | number> | undefined;
        "scroll-timeline"?: csstype.Property.ScrollTimeline | undefined;
        "text-decoration"?: csstype.Property.TextDecoration<string | number> | undefined;
        "text-emphasis"?: csstype.Property.TextEmphasis | undefined;
        "view-timeline"?: csstype.Property.ViewTimeline | undefined;
        "-moz-animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "-moz-animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "-moz-animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "-moz-animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "-moz-animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "-moz-animation-name"?: csstype.Property.AnimationName | undefined;
        "-moz-animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "-moz-animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "-moz-appearance"?: csstype.Property.MozAppearance | undefined;
        "-moz-binding"?: csstype.Property.MozBinding | undefined;
        "-moz-border-bottom-colors"?: csstype.Property.MozBorderBottomColors | undefined;
        "-moz-border-end-color"?: csstype.Property.BorderInlineEndColor | undefined;
        "-moz-border-end-style"?: csstype.Property.BorderInlineEndStyle | undefined;
        "-moz-border-end-width"?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        "-moz-border-left-colors"?: csstype.Property.MozBorderLeftColors | undefined;
        "-moz-border-right-colors"?: csstype.Property.MozBorderRightColors | undefined;
        "-moz-border-start-color"?: csstype.Property.BorderInlineStartColor | undefined;
        "-moz-border-start-style"?: csstype.Property.BorderInlineStartStyle | undefined;
        "-moz-border-top-colors"?: csstype.Property.MozBorderTopColors | undefined;
        "-moz-box-sizing"?: csstype.Property.BoxSizing | undefined;
        "-moz-column-count"?: csstype.Property.ColumnCount | undefined;
        "-moz-column-fill"?: csstype.Property.ColumnFill | undefined;
        "-moz-column-rule-color"?: csstype.Property.ColumnRuleColor | undefined;
        "-moz-column-rule-style"?: csstype.Property.ColumnRuleStyle | undefined;
        "-moz-column-rule-width"?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        "-moz-column-width"?: csstype.Property.ColumnWidth<string | number> | undefined;
        "-moz-context-properties"?: csstype.Property.MozContextProperties | undefined;
        "-moz-font-feature-settings"?: csstype.Property.FontFeatureSettings | undefined;
        "-moz-font-language-override"?: csstype.Property.FontLanguageOverride | undefined;
        "-moz-hyphens"?: csstype.Property.Hyphens | undefined;
        "-moz-image-region"?: csstype.Property.MozImageRegion | undefined;
        "-moz-margin-end"?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        "-moz-margin-start"?: csstype.Property.MarginInlineStart<string | number> | undefined;
        "-moz-orient"?: csstype.Property.MozOrient | undefined;
        "-moz-osx-font-smoothing"?: csstype.Property.FontSmooth<string | number> | undefined;
        "-moz-outline-radius-bottomleft"?: csstype.Property.MozOutlineRadiusBottomleft<string | number> | undefined;
        "-moz-outline-radius-bottomright"?: csstype.Property.MozOutlineRadiusBottomright<string | number> | undefined;
        "-moz-outline-radius-topleft"?: csstype.Property.MozOutlineRadiusTopleft<string | number> | undefined;
        "-moz-outline-radius-topright"?: csstype.Property.MozOutlineRadiusTopright<string | number> | undefined;
        "-moz-padding-end"?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        "-moz-padding-start"?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        "-moz-stack-sizing"?: csstype.Property.MozStackSizing | undefined;
        "-moz-tab-size"?: csstype.Property.TabSize<string | number> | undefined;
        "-moz-text-blink"?: csstype.Property.MozTextBlink | undefined;
        "-moz-text-size-adjust"?: csstype.Property.TextSizeAdjust | undefined;
        "-moz-user-focus"?: csstype.Property.MozUserFocus | undefined;
        "-moz-user-modify"?: csstype.Property.MozUserModify | undefined;
        "-moz-user-select"?: csstype.Property.UserSelect | undefined;
        "-moz-window-dragging"?: csstype.Property.MozWindowDragging | undefined;
        "-moz-window-shadow"?: csstype.Property.MozWindowShadow | undefined;
        "-ms-accelerator"?: csstype.Property.MsAccelerator | undefined;
        "-ms-block-progression"?: csstype.Property.MsBlockProgression | undefined;
        "-ms-content-zoom-chaining"?: csstype.Property.MsContentZoomChaining | undefined;
        "-ms-content-zoom-limit-max"?: csstype.Property.MsContentZoomLimitMax | undefined;
        "-ms-content-zoom-limit-min"?: csstype.Property.MsContentZoomLimitMin | undefined;
        "-ms-content-zoom-snap-points"?: csstype.Property.MsContentZoomSnapPoints | undefined;
        "-ms-content-zoom-snap-type"?: csstype.Property.MsContentZoomSnapType | undefined;
        "-ms-content-zooming"?: csstype.Property.MsContentZooming | undefined;
        "-ms-filter"?: csstype.Property.MsFilter | undefined;
        "-ms-flex-direction"?: csstype.Property.FlexDirection | undefined;
        "-ms-flex-positive"?: csstype.Property.FlexGrow | undefined;
        "-ms-flow-from"?: csstype.Property.MsFlowFrom | undefined;
        "-ms-flow-into"?: csstype.Property.MsFlowInto | undefined;
        "-ms-grid-columns"?: csstype.Property.MsGridColumns<string | number> | undefined;
        "-ms-grid-rows"?: csstype.Property.MsGridRows<string | number> | undefined;
        "-ms-high-contrast-adjust"?: csstype.Property.MsHighContrastAdjust | undefined;
        "-ms-hyphenate-limit-chars"?: csstype.Property.MsHyphenateLimitChars | undefined;
        "-ms-hyphenate-limit-lines"?: csstype.Property.MsHyphenateLimitLines | undefined;
        "-ms-hyphenate-limit-zone"?: csstype.Property.MsHyphenateLimitZone<string | number> | undefined;
        "-ms-hyphens"?: csstype.Property.Hyphens | undefined;
        "-ms-ime-align"?: csstype.Property.MsImeAlign | undefined;
        "-ms-line-break"?: csstype.Property.LineBreak | undefined;
        "-ms-order"?: csstype.Property.Order | undefined;
        "-ms-overflow-style"?: csstype.Property.MsOverflowStyle | undefined;
        "-ms-overflow-x"?: csstype.Property.OverflowX | undefined;
        "-ms-overflow-y"?: csstype.Property.OverflowY | undefined;
        "-ms-scroll-chaining"?: csstype.Property.MsScrollChaining | undefined;
        "-ms-scroll-limit-x-max"?: csstype.Property.MsScrollLimitXMax<string | number> | undefined;
        "-ms-scroll-limit-x-min"?: csstype.Property.MsScrollLimitXMin<string | number> | undefined;
        "-ms-scroll-limit-y-max"?: csstype.Property.MsScrollLimitYMax<string | number> | undefined;
        "-ms-scroll-limit-y-min"?: csstype.Property.MsScrollLimitYMin<string | number> | undefined;
        "-ms-scroll-rails"?: csstype.Property.MsScrollRails | undefined;
        "-ms-scroll-snap-points-x"?: csstype.Property.MsScrollSnapPointsX | undefined;
        "-ms-scroll-snap-points-y"?: csstype.Property.MsScrollSnapPointsY | undefined;
        "-ms-scroll-snap-type"?: csstype.Property.MsScrollSnapType | undefined;
        "-ms-scroll-translation"?: csstype.Property.MsScrollTranslation | undefined;
        "-ms-scrollbar-3dlight-color"?: csstype.Property.MsScrollbar3dlightColor | undefined;
        "-ms-scrollbar-arrow-color"?: csstype.Property.MsScrollbarArrowColor | undefined;
        "-ms-scrollbar-base-color"?: csstype.Property.MsScrollbarBaseColor | undefined;
        "-ms-scrollbar-darkshadow-color"?: csstype.Property.MsScrollbarDarkshadowColor | undefined;
        "-ms-scrollbar-face-color"?: csstype.Property.MsScrollbarFaceColor | undefined;
        "-ms-scrollbar-highlight-color"?: csstype.Property.MsScrollbarHighlightColor | undefined;
        "-ms-scrollbar-shadow-color"?: csstype.Property.MsScrollbarShadowColor | undefined;
        "-ms-scrollbar-track-color"?: csstype.Property.MsScrollbarTrackColor | undefined;
        "-ms-text-autospace"?: csstype.Property.MsTextAutospace | undefined;
        "-ms-text-combine-horizontal"?: csstype.Property.TextCombineUpright | undefined;
        "-ms-text-overflow"?: csstype.Property.TextOverflow | undefined;
        "-ms-touch-action"?: csstype.Property.TouchAction | undefined;
        "-ms-touch-select"?: csstype.Property.MsTouchSelect | undefined;
        "-ms-transform"?: csstype.Property.Transform | undefined;
        "-ms-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-ms-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-ms-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-ms-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-ms-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-ms-user-select"?: csstype.Property.MsUserSelect | undefined;
        "-ms-word-break"?: csstype.Property.WordBreak | undefined;
        "-ms-wrap-flow"?: csstype.Property.MsWrapFlow | undefined;
        "-ms-wrap-margin"?: csstype.Property.MsWrapMargin<string | number> | undefined;
        "-ms-wrap-through"?: csstype.Property.MsWrapThrough | undefined;
        "-ms-writing-mode"?: csstype.Property.WritingMode | undefined;
        "-webkit-align-content"?: csstype.Property.AlignContent | undefined;
        "-webkit-align-items"?: csstype.Property.AlignItems | undefined;
        "-webkit-align-self"?: csstype.Property.AlignSelf | undefined;
        "-webkit-animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "-webkit-animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "-webkit-animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "-webkit-animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "-webkit-animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "-webkit-animation-name"?: csstype.Property.AnimationName | undefined;
        "-webkit-animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "-webkit-animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "-webkit-appearance"?: csstype.Property.WebkitAppearance | undefined;
        "-webkit-backdrop-filter"?: csstype.Property.BackdropFilter | undefined;
        "-webkit-backface-visibility"?: csstype.Property.BackfaceVisibility | undefined;
        "-webkit-background-clip"?: csstype.Property.BackgroundClip | undefined;
        "-webkit-background-origin"?: csstype.Property.BackgroundOrigin | undefined;
        "-webkit-background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "-webkit-border-before-color"?: csstype.Property.WebkitBorderBeforeColor | undefined;
        "-webkit-border-before-style"?: csstype.Property.WebkitBorderBeforeStyle | undefined;
        "-webkit-border-before-width"?: csstype.Property.WebkitBorderBeforeWidth<string | number> | undefined;
        "-webkit-border-bottom-left-radius"?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        "-webkit-border-bottom-right-radius"?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        "-webkit-border-image-slice"?: csstype.Property.BorderImageSlice | undefined;
        "-webkit-border-top-left-radius"?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        "-webkit-border-top-right-radius"?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        "-webkit-box-decoration-break"?: csstype.Property.BoxDecorationBreak | undefined;
        "-webkit-box-reflect"?: csstype.Property.WebkitBoxReflect<string | number> | undefined;
        "-webkit-box-shadow"?: csstype.Property.BoxShadow | undefined;
        "-webkit-box-sizing"?: csstype.Property.BoxSizing | undefined;
        "-webkit-clip-path"?: csstype.Property.ClipPath | undefined;
        "-webkit-column-count"?: csstype.Property.ColumnCount | undefined;
        "-webkit-column-fill"?: csstype.Property.ColumnFill | undefined;
        "-webkit-column-rule-color"?: csstype.Property.ColumnRuleColor | undefined;
        "-webkit-column-rule-style"?: csstype.Property.ColumnRuleStyle | undefined;
        "-webkit-column-rule-width"?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        "-webkit-column-span"?: csstype.Property.ColumnSpan | undefined;
        "-webkit-column-width"?: csstype.Property.ColumnWidth<string | number> | undefined;
        "-webkit-filter"?: csstype.Property.Filter | undefined;
        "-webkit-flex-basis"?: csstype.Property.FlexBasis<string | number> | undefined;
        "-webkit-flex-direction"?: csstype.Property.FlexDirection | undefined;
        "-webkit-flex-grow"?: csstype.Property.FlexGrow | undefined;
        "-webkit-flex-shrink"?: csstype.Property.FlexShrink | undefined;
        "-webkit-flex-wrap"?: csstype.Property.FlexWrap | undefined;
        "-webkit-font-feature-settings"?: csstype.Property.FontFeatureSettings | undefined;
        "-webkit-font-kerning"?: csstype.Property.FontKerning | undefined;
        "-webkit-font-smoothing"?: csstype.Property.FontSmooth<string | number> | undefined;
        "-webkit-font-variant-ligatures"?: csstype.Property.FontVariantLigatures | undefined;
        "-webkit-hyphenate-character"?: csstype.Property.HyphenateCharacter | undefined;
        "-webkit-hyphens"?: csstype.Property.Hyphens | undefined;
        "-webkit-initial-letter"?: csstype.Property.InitialLetter | undefined;
        "-webkit-justify-content"?: csstype.Property.JustifyContent | undefined;
        "-webkit-line-break"?: csstype.Property.LineBreak | undefined;
        "-webkit-line-clamp"?: csstype.Property.WebkitLineClamp | undefined;
        "-webkit-margin-end"?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        "-webkit-margin-start"?: csstype.Property.MarginInlineStart<string | number> | undefined;
        "-webkit-mask-attachment"?: csstype.Property.WebkitMaskAttachment | undefined;
        "-webkit-mask-box-image-outset"?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        "-webkit-mask-box-image-repeat"?: csstype.Property.MaskBorderRepeat | undefined;
        "-webkit-mask-box-image-slice"?: csstype.Property.MaskBorderSlice | undefined;
        "-webkit-mask-box-image-source"?: csstype.Property.MaskBorderSource | undefined;
        "-webkit-mask-box-image-width"?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        "-webkit-mask-clip"?: csstype.Property.WebkitMaskClip | undefined;
        "-webkit-mask-composite"?: csstype.Property.WebkitMaskComposite | undefined;
        "-webkit-mask-image"?: csstype.Property.WebkitMaskImage | undefined;
        "-webkit-mask-origin"?: csstype.Property.WebkitMaskOrigin | undefined;
        "-webkit-mask-position"?: csstype.Property.WebkitMaskPosition<string | number> | undefined;
        "-webkit-mask-position-x"?: csstype.Property.WebkitMaskPositionX<string | number> | undefined;
        "-webkit-mask-position-y"?: csstype.Property.WebkitMaskPositionY<string | number> | undefined;
        "-webkit-mask-repeat"?: csstype.Property.WebkitMaskRepeat | undefined;
        "-webkit-mask-repeat-x"?: csstype.Property.WebkitMaskRepeatX | undefined;
        "-webkit-mask-repeat-y"?: csstype.Property.WebkitMaskRepeatY | undefined;
        "-webkit-mask-size"?: csstype.Property.WebkitMaskSize<string | number> | undefined;
        "-webkit-max-inline-size"?: csstype.Property.MaxInlineSize<string | number> | undefined;
        "-webkit-order"?: csstype.Property.Order | undefined;
        "-webkit-overflow-scrolling"?: csstype.Property.WebkitOverflowScrolling | undefined;
        "-webkit-padding-end"?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        "-webkit-padding-start"?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        "-webkit-perspective"?: csstype.Property.Perspective<string | number> | undefined;
        "-webkit-perspective-origin"?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        "-webkit-print-color-adjust"?: csstype.Property.PrintColorAdjust | undefined;
        "-webkit-ruby-position"?: csstype.Property.RubyPosition | undefined;
        "-webkit-scroll-snap-type"?: csstype.Property.ScrollSnapType | undefined;
        "-webkit-shape-margin"?: csstype.Property.ShapeMargin<string | number> | undefined;
        "-webkit-tap-highlight-color"?: csstype.Property.WebkitTapHighlightColor | undefined;
        "-webkit-text-combine"?: csstype.Property.TextCombineUpright | undefined;
        "-webkit-text-decoration-color"?: csstype.Property.TextDecorationColor | undefined;
        "-webkit-text-decoration-line"?: csstype.Property.TextDecorationLine | undefined;
        "-webkit-text-decoration-skip"?: csstype.Property.TextDecorationSkip | undefined;
        "-webkit-text-decoration-style"?: csstype.Property.TextDecorationStyle | undefined;
        "-webkit-text-emphasis-color"?: csstype.Property.TextEmphasisColor | undefined;
        "-webkit-text-emphasis-position"?: csstype.Property.TextEmphasisPosition | undefined;
        "-webkit-text-emphasis-style"?: csstype.Property.TextEmphasisStyle | undefined;
        "-webkit-text-fill-color"?: csstype.Property.WebkitTextFillColor | undefined;
        "-webkit-text-orientation"?: csstype.Property.TextOrientation | undefined;
        "-webkit-text-size-adjust"?: csstype.Property.TextSizeAdjust | undefined;
        "-webkit-text-stroke-color"?: csstype.Property.WebkitTextStrokeColor | undefined;
        "-webkit-text-stroke-width"?: csstype.Property.WebkitTextStrokeWidth<string | number> | undefined;
        "-webkit-text-underline-position"?: csstype.Property.TextUnderlinePosition | undefined;
        "-webkit-touch-callout"?: csstype.Property.WebkitTouchCallout | undefined;
        "-webkit-transform"?: csstype.Property.Transform | undefined;
        "-webkit-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-webkit-transform-style"?: csstype.Property.TransformStyle | undefined;
        "-webkit-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-webkit-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-webkit-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-webkit-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-webkit-user-modify"?: csstype.Property.WebkitUserModify | undefined;
        "-webkit-user-select"?: csstype.Property.UserSelect | undefined;
        "-webkit-writing-mode"?: csstype.Property.WritingMode | undefined;
        "-moz-animation"?: csstype.Property.Animation<string & {}> | undefined;
        "-moz-border-image"?: csstype.Property.BorderImage | undefined;
        "-moz-column-rule"?: csstype.Property.ColumnRule<string | number> | undefined;
        "-moz-columns"?: csstype.Property.Columns<string | number> | undefined;
        "-moz-outline-radius"?: csstype.Property.MozOutlineRadius<string | number> | undefined;
        "-ms-content-zoom-limit"?: csstype.Property.MsContentZoomLimit | undefined;
        "-ms-content-zoom-snap"?: csstype.Property.MsContentZoomSnap | undefined;
        "-ms-flex"?: csstype.Property.Flex<string | number> | undefined;
        "-ms-scroll-limit"?: csstype.Property.MsScrollLimit | undefined;
        "-ms-scroll-snap-x"?: csstype.Property.MsScrollSnapX | undefined;
        "-ms-scroll-snap-y"?: csstype.Property.MsScrollSnapY | undefined;
        "-ms-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "-webkit-animation"?: csstype.Property.Animation<string & {}> | undefined;
        "-webkit-border-before"?: csstype.Property.WebkitBorderBefore<string | number> | undefined;
        "-webkit-border-image"?: csstype.Property.BorderImage | undefined;
        "-webkit-border-radius"?: csstype.Property.BorderRadius<string | number> | undefined;
        "-webkit-column-rule"?: csstype.Property.ColumnRule<string | number> | undefined;
        "-webkit-columns"?: csstype.Property.Columns<string | number> | undefined;
        "-webkit-flex"?: csstype.Property.Flex<string | number> | undefined;
        "-webkit-flex-flow"?: csstype.Property.FlexFlow | undefined;
        "-webkit-mask"?: csstype.Property.WebkitMask<string | number> | undefined;
        "-webkit-mask-box-image"?: csstype.Property.MaskBorder | undefined;
        "-webkit-text-emphasis"?: csstype.Property.TextEmphasis | undefined;
        "-webkit-text-stroke"?: csstype.Property.WebkitTextStroke<string | number> | undefined;
        "-webkit-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "box-align"?: csstype.Property.BoxAlign | undefined;
        "box-direction"?: csstype.Property.BoxDirection | undefined;
        "box-flex"?: csstype.Property.BoxFlex | undefined;
        "box-flex-group"?: csstype.Property.BoxFlexGroup | undefined;
        "box-lines"?: csstype.Property.BoxLines | undefined;
        "box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "box-orient"?: csstype.Property.BoxOrient | undefined;
        "box-pack"?: csstype.Property.BoxPack | undefined;
        "grid-column-gap"?: csstype.Property.GridColumnGap<string | number> | undefined;
        "grid-gap"?: csstype.Property.GridGap<string | number> | undefined;
        "grid-row-gap"?: csstype.Property.GridRowGap<string | number> | undefined;
        "ime-mode"?: csstype.Property.ImeMode | undefined;
        "offset-block"?: csstype.Property.InsetBlock<string | number> | undefined;
        "offset-block-end"?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        "offset-block-start"?: csstype.Property.InsetBlockStart<string | number> | undefined;
        "offset-inline"?: csstype.Property.InsetInline<string | number> | undefined;
        "offset-inline-end"?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        "offset-inline-start"?: csstype.Property.InsetInlineStart<string | number> | undefined;
        "scroll-snap-coordinate"?: csstype.Property.ScrollSnapCoordinate<string | number> | undefined;
        "scroll-snap-destination"?: csstype.Property.ScrollSnapDestination<string | number> | undefined;
        "scroll-snap-points-x"?: csstype.Property.ScrollSnapPointsX | undefined;
        "scroll-snap-points-y"?: csstype.Property.ScrollSnapPointsY | undefined;
        "scroll-snap-type-x"?: csstype.Property.ScrollSnapTypeX | undefined;
        "scroll-snap-type-y"?: csstype.Property.ScrollSnapTypeY | undefined;
        "-khtml-box-align"?: csstype.Property.BoxAlign | undefined;
        "-khtml-box-direction"?: csstype.Property.BoxDirection | undefined;
        "-khtml-box-flex"?: csstype.Property.BoxFlex | undefined;
        "-khtml-box-flex-group"?: csstype.Property.BoxFlexGroup | undefined;
        "-khtml-box-lines"?: csstype.Property.BoxLines | undefined;
        "-khtml-box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "-khtml-box-orient"?: csstype.Property.BoxOrient | undefined;
        "-khtml-box-pack"?: csstype.Property.BoxPack | undefined;
        "-khtml-line-break"?: csstype.Property.LineBreak | undefined;
        "-khtml-opacity"?: csstype.Property.Opacity | undefined;
        "-khtml-user-select"?: csstype.Property.UserSelect | undefined;
        "-moz-backface-visibility"?: csstype.Property.BackfaceVisibility | undefined;
        "-moz-background-clip"?: csstype.Property.BackgroundClip | undefined;
        "-moz-background-inline-policy"?: csstype.Property.BoxDecorationBreak | undefined;
        "-moz-background-origin"?: csstype.Property.BackgroundOrigin | undefined;
        "-moz-background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "-moz-border-radius"?: csstype.Property.BorderRadius<string | number> | undefined;
        "-moz-border-radius-bottomleft"?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        "-moz-border-radius-bottomright"?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        "-moz-border-radius-topleft"?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        "-moz-border-radius-topright"?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        "-moz-box-align"?: csstype.Property.BoxAlign | undefined;
        "-moz-box-direction"?: csstype.Property.BoxDirection | undefined;
        "-moz-box-flex"?: csstype.Property.BoxFlex | undefined;
        "-moz-box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "-moz-box-orient"?: csstype.Property.BoxOrient | undefined;
        "-moz-box-pack"?: csstype.Property.BoxPack | undefined;
        "-moz-box-shadow"?: csstype.Property.BoxShadow | undefined;
        "-moz-float-edge"?: csstype.Property.MozFloatEdge | undefined;
        "-moz-force-broken-image-icon"?: csstype.Property.MozForceBrokenImageIcon | undefined;
        "-moz-opacity"?: csstype.Property.Opacity | undefined;
        "-moz-outline"?: csstype.Property.Outline<string | number> | undefined;
        "-moz-outline-color"?: csstype.Property.OutlineColor | undefined;
        "-moz-outline-style"?: csstype.Property.OutlineStyle | undefined;
        "-moz-outline-width"?: csstype.Property.OutlineWidth<string | number> | undefined;
        "-moz-perspective"?: csstype.Property.Perspective<string | number> | undefined;
        "-moz-perspective-origin"?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        "-moz-text-align-last"?: csstype.Property.TextAlignLast | undefined;
        "-moz-text-decoration-color"?: csstype.Property.TextDecorationColor | undefined;
        "-moz-text-decoration-line"?: csstype.Property.TextDecorationLine | undefined;
        "-moz-text-decoration-style"?: csstype.Property.TextDecorationStyle | undefined;
        "-moz-transform"?: csstype.Property.Transform | undefined;
        "-moz-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-moz-transform-style"?: csstype.Property.TransformStyle | undefined;
        "-moz-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "-moz-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-moz-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-moz-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-moz-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-moz-user-input"?: csstype.Property.MozUserInput | undefined;
        "-ms-ime-mode"?: csstype.Property.ImeMode | undefined;
        "-o-animation"?: csstype.Property.Animation<string & {}> | undefined;
        "-o-animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "-o-animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "-o-animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "-o-animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "-o-animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "-o-animation-name"?: csstype.Property.AnimationName | undefined;
        "-o-animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "-o-animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "-o-background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "-o-border-image"?: csstype.Property.BorderImage | undefined;
        "-o-object-fit"?: csstype.Property.ObjectFit | undefined;
        "-o-object-position"?: csstype.Property.ObjectPosition<string | number> | undefined;
        "-o-tab-size"?: csstype.Property.TabSize<string | number> | undefined;
        "-o-text-overflow"?: csstype.Property.TextOverflow | undefined;
        "-o-transform"?: csstype.Property.Transform | undefined;
        "-o-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-o-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "-o-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-o-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-o-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-o-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-webkit-box-align"?: csstype.Property.BoxAlign | undefined;
        "-webkit-box-direction"?: csstype.Property.BoxDirection | undefined;
        "-webkit-box-flex"?: csstype.Property.BoxFlex | undefined;
        "-webkit-box-flex-group"?: csstype.Property.BoxFlexGroup | undefined;
        "-webkit-box-lines"?: csstype.Property.BoxLines | undefined;
        "-webkit-box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "-webkit-box-orient"?: csstype.Property.BoxOrient | undefined;
        "-webkit-box-pack"?: csstype.Property.BoxPack | undefined;
        "alignment-baseline"?: csstype.Property.AlignmentBaseline | undefined;
        "baseline-shift"?: csstype.Property.BaselineShift<string | number> | undefined;
        "clip-rule"?: csstype.Property.ClipRule | undefined;
        "color-interpolation"?: csstype.Property.ColorInterpolation | undefined;
        "color-rendering"?: csstype.Property.ColorRendering | undefined;
        "dominant-baseline"?: csstype.Property.DominantBaseline | undefined;
        "fill-opacity"?: csstype.Property.FillOpacity | undefined;
        "fill-rule"?: csstype.Property.FillRule | undefined;
        "flood-color"?: csstype.Property.FloodColor | undefined;
        "flood-opacity"?: csstype.Property.FloodOpacity | undefined;
        "glyph-orientation-vertical"?: csstype.Property.GlyphOrientationVertical | undefined;
        "lighting-color"?: csstype.Property.LightingColor | undefined;
        "marker-end"?: csstype.Property.MarkerEnd | undefined;
        "marker-mid"?: csstype.Property.MarkerMid | undefined;
        "marker-start"?: csstype.Property.MarkerStart | undefined;
        "shape-rendering"?: csstype.Property.ShapeRendering | undefined;
        "stop-color"?: csstype.Property.StopColor | undefined;
        "stop-opacity"?: csstype.Property.StopOpacity | undefined;
        "stroke-dasharray"?: csstype.Property.StrokeDasharray<string | number> | undefined;
        "stroke-dashoffset"?: csstype.Property.StrokeDashoffset<string | number> | undefined;
        "stroke-linecap"?: csstype.Property.StrokeLinecap | undefined;
        "stroke-linejoin"?: csstype.Property.StrokeLinejoin | undefined;
        "stroke-miterlimit"?: csstype.Property.StrokeMiterlimit | undefined;
        "stroke-opacity"?: csstype.Property.StrokeOpacity | undefined;
        "stroke-width"?: csstype.Property.StrokeWidth<string | number> | undefined;
        "text-anchor"?: csstype.Property.TextAnchor | undefined;
        "vector-effect"?: csstype.Property.VectorEffect | undefined;
    };
};

/**
 * A Composable giving access to a TransformProperties object, and binding the generated transform string to a target.
 *
 * @param target
 */
declare function useElementTransform(target: MaybeRef<PermissiveTarget>, onInit?: (initData: Partial<TransformProperties>) => void): {
    transform: {
        x?: TransformValue | TransformValue[] | undefined;
        y?: TransformValue | TransformValue[] | undefined;
        z?: TransformValue | TransformValue[] | undefined;
        translateX?: TransformValue | TransformValue[] | undefined;
        translateY?: TransformValue | TransformValue[] | undefined;
        translateZ?: TransformValue | TransformValue[] | undefined;
        rotate?: TransformValue | TransformValue[] | undefined;
        rotateX?: TransformValue | TransformValue[] | undefined;
        rotateY?: TransformValue | TransformValue[] | undefined;
        rotateZ?: TransformValue | TransformValue[] | undefined;
        scale?: TransformValue | TransformValue[] | undefined;
        scaleX?: TransformValue | TransformValue[] | undefined;
        scaleY?: TransformValue | TransformValue[] | undefined;
        scaleZ?: TransformValue | TransformValue[] | undefined;
        skew?: TransformValue | TransformValue[] | undefined;
        skewX?: TransformValue | TransformValue[] | undefined;
        skewY?: TransformValue | TransformValue[] | undefined;
        originX?: TransformValue | TransformValue[] | undefined;
        originY?: TransformValue | TransformValue[] | undefined;
        originZ?: TransformValue | TransformValue[] | undefined;
        perspective?: TransformValue | TransformValue[] | undefined;
        transformPerspective?: TransformValue | TransformValue[] | undefined;
    };
};

/**
 * A Vue Composable that put your components in motion.
 *
 * @docs https://motion.vueuse.js.org
 *
 * @param target
 * @param variants
 * @param options
 */
declare function useMotion<T extends string, V extends MotionVariants<T>>(target: MaybeRef<PermissiveTarget>, variants?: MaybeRef<V>, options?: UseMotionOptions): MotionInstance<T, V>;

/**
 * A Composable handling motion controls, pushing resolved variant to useMotionTransitions manager.
 */
declare function useMotionControls<T extends string, V extends MotionVariants<T>>(motionProperties: MotionProperties, variants?: MaybeRef<V>, { motionValues, push, stop }?: MotionTransitions): MotionControls<T, V>;

/**
 * A Composable executing resolved variants features from variants declarations.
 *
 * Supports:
 * - lifeCycleHooks: Bind the motion hooks to the component lifecycle hooks.
 */
declare function useMotionFeatures<T extends string, V extends MotionVariants<T>>(instance: MotionInstance<T, V>, options?: UseMotionOptions): void;

/**
 * A Composable giving access to both `transform` and `style`objects for a single element.
 *
 * @param target
 */
declare function useMotionProperties(target: MaybeRef<PermissiveTarget>, defaultValues?: Partial<MotionProperties>): {
    motionProperties: vue.Reactive<MotionProperties>;
    style: {
        [x: `--${string}`]: string | number | undefined;
        filter?: csstype.Property.Filter | undefined;
        fill?: csstype.Property.Fill | undefined;
        accentColor?: csstype.Property.AccentColor | undefined;
        alignContent?: csstype.Property.AlignContent | undefined;
        alignItems?: csstype.Property.AlignItems | undefined;
        alignSelf?: csstype.Property.AlignSelf | undefined;
        alignTracks?: csstype.Property.AlignTracks | undefined;
        animationComposition?: csstype.Property.AnimationComposition | undefined;
        animationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        animationDirection?: csstype.Property.AnimationDirection | undefined;
        animationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        animationFillMode?: csstype.Property.AnimationFillMode | undefined;
        animationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        animationName?: csstype.Property.AnimationName | undefined;
        animationPlayState?: csstype.Property.AnimationPlayState | undefined;
        animationRangeEnd?: csstype.Property.AnimationRangeEnd<string | number> | undefined;
        animationRangeStart?: csstype.Property.AnimationRangeStart<string | number> | undefined;
        animationTimeline?: csstype.Property.AnimationTimeline | undefined;
        animationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        appearance?: csstype.Property.Appearance | undefined;
        aspectRatio?: csstype.Property.AspectRatio | undefined;
        backdropFilter?: csstype.Property.BackdropFilter | undefined;
        backfaceVisibility?: csstype.Property.BackfaceVisibility | undefined;
        backgroundAttachment?: csstype.Property.BackgroundAttachment | undefined;
        backgroundBlendMode?: csstype.Property.BackgroundBlendMode | undefined;
        backgroundClip?: csstype.Property.BackgroundClip | undefined;
        backgroundColor?: csstype.Property.BackgroundColor | undefined;
        backgroundImage?: csstype.Property.BackgroundImage | undefined;
        backgroundOrigin?: csstype.Property.BackgroundOrigin | undefined;
        backgroundPositionX?: csstype.Property.BackgroundPositionX<string | number> | undefined;
        backgroundPositionY?: csstype.Property.BackgroundPositionY<string | number> | undefined;
        backgroundRepeat?: csstype.Property.BackgroundRepeat | undefined;
        backgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        blockOverflow?: csstype.Property.BlockOverflow | undefined;
        blockSize?: csstype.Property.BlockSize<string | number> | undefined;
        borderBlockColor?: csstype.Property.BorderBlockColor | undefined;
        borderBlockEndColor?: csstype.Property.BorderBlockEndColor | undefined;
        borderBlockEndStyle?: csstype.Property.BorderBlockEndStyle | undefined;
        borderBlockEndWidth?: csstype.Property.BorderBlockEndWidth<string | number> | undefined;
        borderBlockStartColor?: csstype.Property.BorderBlockStartColor | undefined;
        borderBlockStartStyle?: csstype.Property.BorderBlockStartStyle | undefined;
        borderBlockStartWidth?: csstype.Property.BorderBlockStartWidth<string | number> | undefined;
        borderBlockStyle?: csstype.Property.BorderBlockStyle | undefined;
        borderBlockWidth?: csstype.Property.BorderBlockWidth<string | number> | undefined;
        borderBottomColor?: csstype.Property.BorderBottomColor | undefined;
        borderBottomLeftRadius?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        borderBottomRightRadius?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        borderBottomStyle?: csstype.Property.BorderBottomStyle | undefined;
        borderBottomWidth?: csstype.Property.BorderBottomWidth<string | number> | undefined;
        borderCollapse?: csstype.Property.BorderCollapse | undefined;
        borderEndEndRadius?: csstype.Property.BorderEndEndRadius<string | number> | undefined;
        borderEndStartRadius?: csstype.Property.BorderEndStartRadius<string | number> | undefined;
        borderImageOutset?: csstype.Property.BorderImageOutset<string | number> | undefined;
        borderImageRepeat?: csstype.Property.BorderImageRepeat | undefined;
        borderImageSlice?: csstype.Property.BorderImageSlice | undefined;
        borderImageSource?: csstype.Property.BorderImageSource | undefined;
        borderImageWidth?: csstype.Property.BorderImageWidth<string | number> | undefined;
        borderInlineColor?: csstype.Property.BorderInlineColor | undefined;
        borderInlineEndColor?: csstype.Property.BorderInlineEndColor | undefined;
        borderInlineEndStyle?: csstype.Property.BorderInlineEndStyle | undefined;
        borderInlineEndWidth?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        borderInlineStartColor?: csstype.Property.BorderInlineStartColor | undefined;
        borderInlineStartStyle?: csstype.Property.BorderInlineStartStyle | undefined;
        borderInlineStartWidth?: csstype.Property.BorderInlineStartWidth<string | number> | undefined;
        borderInlineStyle?: csstype.Property.BorderInlineStyle | undefined;
        borderInlineWidth?: csstype.Property.BorderInlineWidth<string | number> | undefined;
        borderLeftColor?: csstype.Property.BorderLeftColor | undefined;
        borderLeftStyle?: csstype.Property.BorderLeftStyle | undefined;
        borderLeftWidth?: csstype.Property.BorderLeftWidth<string | number> | undefined;
        borderRightColor?: csstype.Property.BorderRightColor | undefined;
        borderRightStyle?: csstype.Property.BorderRightStyle | undefined;
        borderRightWidth?: csstype.Property.BorderRightWidth<string | number> | undefined;
        borderSpacing?: csstype.Property.BorderSpacing<string | number> | undefined;
        borderStartEndRadius?: csstype.Property.BorderStartEndRadius<string | number> | undefined;
        borderStartStartRadius?: csstype.Property.BorderStartStartRadius<string | number> | undefined;
        borderTopColor?: csstype.Property.BorderTopColor | undefined;
        borderTopLeftRadius?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        borderTopRightRadius?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        borderTopStyle?: csstype.Property.BorderTopStyle | undefined;
        borderTopWidth?: csstype.Property.BorderTopWidth<string | number> | undefined;
        bottom?: csstype.Property.Bottom<string | number> | undefined;
        boxDecorationBreak?: csstype.Property.BoxDecorationBreak | undefined;
        boxShadow?: csstype.Property.BoxShadow | undefined;
        boxSizing?: csstype.Property.BoxSizing | undefined;
        breakAfter?: csstype.Property.BreakAfter | undefined;
        breakBefore?: csstype.Property.BreakBefore | undefined;
        breakInside?: csstype.Property.BreakInside | undefined;
        captionSide?: csstype.Property.CaptionSide | undefined;
        caretColor?: csstype.Property.CaretColor | undefined;
        caretShape?: csstype.Property.CaretShape | undefined;
        clear?: csstype.Property.Clear | undefined;
        clipPath?: csstype.Property.ClipPath | undefined;
        color?: csstype.Property.Color | undefined;
        colorAdjust?: csstype.Property.PrintColorAdjust | undefined;
        colorScheme?: csstype.Property.ColorScheme | undefined;
        columnCount?: csstype.Property.ColumnCount | undefined;
        columnFill?: csstype.Property.ColumnFill | undefined;
        columnGap?: csstype.Property.ColumnGap<string | number> | undefined;
        columnRuleColor?: csstype.Property.ColumnRuleColor | undefined;
        columnRuleStyle?: csstype.Property.ColumnRuleStyle | undefined;
        columnRuleWidth?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        columnSpan?: csstype.Property.ColumnSpan | undefined;
        columnWidth?: csstype.Property.ColumnWidth<string | number> | undefined;
        contain?: csstype.Property.Contain | undefined;
        containIntrinsicBlockSize?: csstype.Property.ContainIntrinsicBlockSize<string | number> | undefined;
        containIntrinsicHeight?: csstype.Property.ContainIntrinsicHeight<string | number> | undefined;
        containIntrinsicInlineSize?: csstype.Property.ContainIntrinsicInlineSize<string | number> | undefined;
        containIntrinsicWidth?: csstype.Property.ContainIntrinsicWidth<string | number> | undefined;
        containerName?: csstype.Property.ContainerName | undefined;
        containerType?: csstype.Property.ContainerType | undefined;
        content?: csstype.Property.Content | undefined;
        contentVisibility?: csstype.Property.ContentVisibility | undefined;
        counterIncrement?: csstype.Property.CounterIncrement | undefined;
        counterReset?: csstype.Property.CounterReset | undefined;
        counterSet?: csstype.Property.CounterSet | undefined;
        cursor?: csstype.Property.Cursor | undefined;
        direction?: csstype.Property.Direction | undefined;
        display?: csstype.Property.Display | undefined;
        emptyCells?: csstype.Property.EmptyCells | undefined;
        flexBasis?: csstype.Property.FlexBasis<string | number> | undefined;
        flexDirection?: csstype.Property.FlexDirection | undefined;
        flexGrow?: csstype.Property.FlexGrow | undefined;
        flexShrink?: csstype.Property.FlexShrink | undefined;
        flexWrap?: csstype.Property.FlexWrap | undefined;
        float?: csstype.Property.Float | undefined;
        fontFamily?: csstype.Property.FontFamily | undefined;
        fontFeatureSettings?: csstype.Property.FontFeatureSettings | undefined;
        fontKerning?: csstype.Property.FontKerning | undefined;
        fontLanguageOverride?: csstype.Property.FontLanguageOverride | undefined;
        fontOpticalSizing?: csstype.Property.FontOpticalSizing | undefined;
        fontPalette?: csstype.Property.FontPalette | undefined;
        fontSize?: csstype.Property.FontSize<string | number> | undefined;
        fontSizeAdjust?: csstype.Property.FontSizeAdjust | undefined;
        fontSmooth?: csstype.Property.FontSmooth<string | number> | undefined;
        fontStretch?: csstype.Property.FontStretch | undefined;
        fontStyle?: csstype.Property.FontStyle | undefined;
        fontSynthesis?: csstype.Property.FontSynthesis | undefined;
        fontSynthesisPosition?: csstype.Property.FontSynthesisPosition | undefined;
        fontSynthesisSmallCaps?: csstype.Property.FontSynthesisSmallCaps | undefined;
        fontSynthesisStyle?: csstype.Property.FontSynthesisStyle | undefined;
        fontSynthesisWeight?: csstype.Property.FontSynthesisWeight | undefined;
        fontVariant?: csstype.Property.FontVariant | undefined;
        fontVariantAlternates?: csstype.Property.FontVariantAlternates | undefined;
        fontVariantCaps?: csstype.Property.FontVariantCaps | undefined;
        fontVariantEastAsian?: csstype.Property.FontVariantEastAsian | undefined;
        fontVariantEmoji?: csstype.Property.FontVariantEmoji | undefined;
        fontVariantLigatures?: csstype.Property.FontVariantLigatures | undefined;
        fontVariantNumeric?: csstype.Property.FontVariantNumeric | undefined;
        fontVariantPosition?: csstype.Property.FontVariantPosition | undefined;
        fontVariationSettings?: csstype.Property.FontVariationSettings | undefined;
        fontWeight?: csstype.Property.FontWeight | undefined;
        forcedColorAdjust?: csstype.Property.ForcedColorAdjust | undefined;
        gridAutoColumns?: csstype.Property.GridAutoColumns<string | number> | undefined;
        gridAutoFlow?: csstype.Property.GridAutoFlow | undefined;
        gridAutoRows?: csstype.Property.GridAutoRows<string | number> | undefined;
        gridColumnEnd?: csstype.Property.GridColumnEnd | undefined;
        gridColumnStart?: csstype.Property.GridColumnStart | undefined;
        gridRowEnd?: csstype.Property.GridRowEnd | undefined;
        gridRowStart?: csstype.Property.GridRowStart | undefined;
        gridTemplateAreas?: csstype.Property.GridTemplateAreas | undefined;
        gridTemplateColumns?: csstype.Property.GridTemplateColumns<string | number> | undefined;
        gridTemplateRows?: csstype.Property.GridTemplateRows<string | number> | undefined;
        hangingPunctuation?: csstype.Property.HangingPunctuation | undefined;
        height?: csstype.Property.Height<string | number> | undefined;
        hyphenateCharacter?: csstype.Property.HyphenateCharacter | undefined;
        hyphenateLimitChars?: csstype.Property.HyphenateLimitChars | undefined;
        hyphens?: csstype.Property.Hyphens | undefined;
        imageOrientation?: csstype.Property.ImageOrientation | undefined;
        imageRendering?: csstype.Property.ImageRendering | undefined;
        imageResolution?: csstype.Property.ImageResolution | undefined;
        initialLetter?: csstype.Property.InitialLetter | undefined;
        inlineSize?: csstype.Property.InlineSize<string | number> | undefined;
        inputSecurity?: csstype.Property.InputSecurity | undefined;
        insetBlockEnd?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        insetBlockStart?: csstype.Property.InsetBlockStart<string | number> | undefined;
        insetInlineEnd?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        insetInlineStart?: csstype.Property.InsetInlineStart<string | number> | undefined;
        isolation?: csstype.Property.Isolation | undefined;
        justifyContent?: csstype.Property.JustifyContent | undefined;
        justifyItems?: csstype.Property.JustifyItems | undefined;
        justifySelf?: csstype.Property.JustifySelf | undefined;
        justifyTracks?: csstype.Property.JustifyTracks | undefined;
        left?: csstype.Property.Left<string | number> | undefined;
        letterSpacing?: csstype.Property.LetterSpacing<string | number> | undefined;
        lineBreak?: csstype.Property.LineBreak | undefined;
        lineHeight?: csstype.Property.LineHeight<string | number> | undefined;
        lineHeightStep?: csstype.Property.LineHeightStep<string | number> | undefined;
        listStyleImage?: csstype.Property.ListStyleImage | undefined;
        listStylePosition?: csstype.Property.ListStylePosition | undefined;
        listStyleType?: csstype.Property.ListStyleType | undefined;
        marginBlockEnd?: csstype.Property.MarginBlockEnd<string | number> | undefined;
        marginBlockStart?: csstype.Property.MarginBlockStart<string | number> | undefined;
        marginBottom?: csstype.Property.MarginBottom<string | number> | undefined;
        marginInlineEnd?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        marginInlineStart?: csstype.Property.MarginInlineStart<string | number> | undefined;
        marginLeft?: csstype.Property.MarginLeft<string | number> | undefined;
        marginRight?: csstype.Property.MarginRight<string | number> | undefined;
        marginTop?: csstype.Property.MarginTop<string | number> | undefined;
        marginTrim?: csstype.Property.MarginTrim | undefined;
        maskBorderMode?: csstype.Property.MaskBorderMode | undefined;
        maskBorderOutset?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        maskBorderRepeat?: csstype.Property.MaskBorderRepeat | undefined;
        maskBorderSlice?: csstype.Property.MaskBorderSlice | undefined;
        maskBorderSource?: csstype.Property.MaskBorderSource | undefined;
        maskBorderWidth?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        maskClip?: csstype.Property.MaskClip | undefined;
        maskComposite?: csstype.Property.MaskComposite | undefined;
        maskImage?: csstype.Property.MaskImage | undefined;
        maskMode?: csstype.Property.MaskMode | undefined;
        maskOrigin?: csstype.Property.MaskOrigin | undefined;
        maskPosition?: csstype.Property.MaskPosition<string | number> | undefined;
        maskRepeat?: csstype.Property.MaskRepeat | undefined;
        maskSize?: csstype.Property.MaskSize<string | number> | undefined;
        maskType?: csstype.Property.MaskType | undefined;
        masonryAutoFlow?: csstype.Property.MasonryAutoFlow | undefined;
        mathDepth?: csstype.Property.MathDepth | undefined;
        mathShift?: csstype.Property.MathShift | undefined;
        mathStyle?: csstype.Property.MathStyle | undefined;
        maxBlockSize?: csstype.Property.MaxBlockSize<string | number> | undefined;
        maxHeight?: csstype.Property.MaxHeight<string | number> | undefined;
        maxInlineSize?: csstype.Property.MaxInlineSize<string | number> | undefined;
        maxLines?: csstype.Property.MaxLines | undefined;
        maxWidth?: csstype.Property.MaxWidth<string | number> | undefined;
        minBlockSize?: csstype.Property.MinBlockSize<string | number> | undefined;
        minHeight?: csstype.Property.MinHeight<string | number> | undefined;
        minInlineSize?: csstype.Property.MinInlineSize<string | number> | undefined;
        minWidth?: csstype.Property.MinWidth<string | number> | undefined;
        mixBlendMode?: csstype.Property.MixBlendMode | undefined;
        motionDistance?: csstype.Property.OffsetDistance<string | number> | undefined;
        motionPath?: csstype.Property.OffsetPath | undefined;
        motionRotation?: csstype.Property.OffsetRotate | undefined;
        objectFit?: csstype.Property.ObjectFit | undefined;
        objectPosition?: csstype.Property.ObjectPosition<string | number> | undefined;
        offsetAnchor?: csstype.Property.OffsetAnchor<string | number> | undefined;
        offsetDistance?: csstype.Property.OffsetDistance<string | number> | undefined;
        offsetPath?: csstype.Property.OffsetPath | undefined;
        offsetPosition?: csstype.Property.OffsetPosition<string | number> | undefined;
        offsetRotate?: csstype.Property.OffsetRotate | undefined;
        offsetRotation?: csstype.Property.OffsetRotate | undefined;
        opacity?: csstype.Property.Opacity | undefined;
        order?: csstype.Property.Order | undefined;
        orphans?: csstype.Property.Orphans | undefined;
        outlineColor?: csstype.Property.OutlineColor | undefined;
        outlineOffset?: csstype.Property.OutlineOffset<string | number> | undefined;
        outlineStyle?: csstype.Property.OutlineStyle | undefined;
        outlineWidth?: csstype.Property.OutlineWidth<string | number> | undefined;
        overflowAnchor?: csstype.Property.OverflowAnchor | undefined;
        overflowBlock?: csstype.Property.OverflowBlock | undefined;
        overflowClipBox?: csstype.Property.OverflowClipBox | undefined;
        overflowClipMargin?: csstype.Property.OverflowClipMargin<string | number> | undefined;
        overflowInline?: csstype.Property.OverflowInline | undefined;
        overflowWrap?: csstype.Property.OverflowWrap | undefined;
        overflowX?: csstype.Property.OverflowX | undefined;
        overflowY?: csstype.Property.OverflowY | undefined;
        overlay?: csstype.Property.Overlay | undefined;
        overscrollBehaviorBlock?: csstype.Property.OverscrollBehaviorBlock | undefined;
        overscrollBehaviorInline?: csstype.Property.OverscrollBehaviorInline | undefined;
        overscrollBehaviorX?: csstype.Property.OverscrollBehaviorX | undefined;
        overscrollBehaviorY?: csstype.Property.OverscrollBehaviorY | undefined;
        paddingBlockEnd?: csstype.Property.PaddingBlockEnd<string | number> | undefined;
        paddingBlockStart?: csstype.Property.PaddingBlockStart<string | number> | undefined;
        paddingBottom?: csstype.Property.PaddingBottom<string | number> | undefined;
        paddingInlineEnd?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        paddingInlineStart?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        paddingLeft?: csstype.Property.PaddingLeft<string | number> | undefined;
        paddingRight?: csstype.Property.PaddingRight<string | number> | undefined;
        paddingTop?: csstype.Property.PaddingTop<string | number> | undefined;
        page?: csstype.Property.Page | undefined;
        pageBreakAfter?: csstype.Property.PageBreakAfter | undefined;
        pageBreakBefore?: csstype.Property.PageBreakBefore | undefined;
        pageBreakInside?: csstype.Property.PageBreakInside | undefined;
        paintOrder?: csstype.Property.PaintOrder | undefined;
        perspectiveOrigin?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        pointerEvents?: csstype.Property.PointerEvents | undefined;
        position?: csstype.Property.Position | undefined;
        printColorAdjust?: csstype.Property.PrintColorAdjust | undefined;
        quotes?: csstype.Property.Quotes | undefined;
        resize?: csstype.Property.Resize | undefined;
        right?: csstype.Property.Right<string | number> | undefined;
        rowGap?: csstype.Property.RowGap<string | number> | undefined;
        rubyAlign?: csstype.Property.RubyAlign | undefined;
        rubyMerge?: csstype.Property.RubyMerge | undefined;
        rubyPosition?: csstype.Property.RubyPosition | undefined;
        scrollBehavior?: csstype.Property.ScrollBehavior | undefined;
        scrollMarginBlockEnd?: csstype.Property.ScrollMarginBlockEnd<string | number> | undefined;
        scrollMarginBlockStart?: csstype.Property.ScrollMarginBlockStart<string | number> | undefined;
        scrollMarginBottom?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        scrollMarginInlineEnd?: csstype.Property.ScrollMarginInlineEnd<string | number> | undefined;
        scrollMarginInlineStart?: csstype.Property.ScrollMarginInlineStart<string | number> | undefined;
        scrollMarginLeft?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        scrollMarginRight?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        scrollMarginTop?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        scrollPaddingBlockEnd?: csstype.Property.ScrollPaddingBlockEnd<string | number> | undefined;
        scrollPaddingBlockStart?: csstype.Property.ScrollPaddingBlockStart<string | number> | undefined;
        scrollPaddingBottom?: csstype.Property.ScrollPaddingBottom<string | number> | undefined;
        scrollPaddingInlineEnd?: csstype.Property.ScrollPaddingInlineEnd<string | number> | undefined;
        scrollPaddingInlineStart?: csstype.Property.ScrollPaddingInlineStart<string | number> | undefined;
        scrollPaddingLeft?: csstype.Property.ScrollPaddingLeft<string | number> | undefined;
        scrollPaddingRight?: csstype.Property.ScrollPaddingRight<string | number> | undefined;
        scrollPaddingTop?: csstype.Property.ScrollPaddingTop<string | number> | undefined;
        scrollSnapAlign?: csstype.Property.ScrollSnapAlign | undefined;
        scrollSnapMarginBottom?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        scrollSnapMarginLeft?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        scrollSnapMarginRight?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        scrollSnapMarginTop?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        scrollSnapStop?: csstype.Property.ScrollSnapStop | undefined;
        scrollSnapType?: csstype.Property.ScrollSnapType | undefined;
        scrollTimelineAxis?: csstype.Property.ScrollTimelineAxis | undefined;
        scrollTimelineName?: csstype.Property.ScrollTimelineName | undefined;
        scrollbarColor?: csstype.Property.ScrollbarColor | undefined;
        scrollbarGutter?: csstype.Property.ScrollbarGutter | undefined;
        scrollbarWidth?: csstype.Property.ScrollbarWidth | undefined;
        shapeImageThreshold?: csstype.Property.ShapeImageThreshold | undefined;
        shapeMargin?: csstype.Property.ShapeMargin<string | number> | undefined;
        shapeOutside?: csstype.Property.ShapeOutside | undefined;
        tabSize?: csstype.Property.TabSize<string | number> | undefined;
        tableLayout?: csstype.Property.TableLayout | undefined;
        textAlign?: csstype.Property.TextAlign | undefined;
        textAlignLast?: csstype.Property.TextAlignLast | undefined;
        textCombineUpright?: csstype.Property.TextCombineUpright | undefined;
        textDecorationColor?: csstype.Property.TextDecorationColor | undefined;
        textDecorationLine?: csstype.Property.TextDecorationLine | undefined;
        textDecorationSkip?: csstype.Property.TextDecorationSkip | undefined;
        textDecorationSkipInk?: csstype.Property.TextDecorationSkipInk | undefined;
        textDecorationStyle?: csstype.Property.TextDecorationStyle | undefined;
        textDecorationThickness?: csstype.Property.TextDecorationThickness<string | number> | undefined;
        textEmphasisColor?: csstype.Property.TextEmphasisColor | undefined;
        textEmphasisPosition?: csstype.Property.TextEmphasisPosition | undefined;
        textEmphasisStyle?: csstype.Property.TextEmphasisStyle | undefined;
        textIndent?: csstype.Property.TextIndent<string | number> | undefined;
        textJustify?: csstype.Property.TextJustify | undefined;
        textOrientation?: csstype.Property.TextOrientation | undefined;
        textOverflow?: csstype.Property.TextOverflow | undefined;
        textRendering?: csstype.Property.TextRendering | undefined;
        textShadow?: csstype.Property.TextShadow | undefined;
        textSizeAdjust?: csstype.Property.TextSizeAdjust | undefined;
        textTransform?: csstype.Property.TextTransform | undefined;
        textUnderlineOffset?: csstype.Property.TextUnderlineOffset<string | number> | undefined;
        textUnderlinePosition?: csstype.Property.TextUnderlinePosition | undefined;
        textWrap?: csstype.Property.TextWrap | undefined;
        timelineScope?: csstype.Property.TimelineScope | undefined;
        top?: csstype.Property.Top<string | number> | undefined;
        touchAction?: csstype.Property.TouchAction | undefined;
        transitionBehavior?: csstype.Property.TransitionBehavior | undefined;
        transitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        transitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        transitionProperty?: csstype.Property.TransitionProperty | undefined;
        transitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        translate?: csstype.Property.Translate<string | number> | undefined;
        unicodeBidi?: csstype.Property.UnicodeBidi | undefined;
        userSelect?: csstype.Property.UserSelect | undefined;
        verticalAlign?: csstype.Property.VerticalAlign<string | number> | undefined;
        viewTimelineAxis?: csstype.Property.ViewTimelineAxis | undefined;
        viewTimelineInset?: csstype.Property.ViewTimelineInset<string | number> | undefined;
        viewTimelineName?: csstype.Property.ViewTimelineName | undefined;
        viewTransitionName?: csstype.Property.ViewTransitionName | undefined;
        visibility?: csstype.Property.Visibility | undefined;
        whiteSpace?: csstype.Property.WhiteSpace | undefined;
        whiteSpaceCollapse?: csstype.Property.WhiteSpaceCollapse | undefined;
        whiteSpaceTrim?: csstype.Property.WhiteSpaceTrim | undefined;
        widows?: csstype.Property.Widows | undefined;
        width?: csstype.Property.Width<string | number> | undefined;
        willChange?: csstype.Property.WillChange | undefined;
        wordBreak?: csstype.Property.WordBreak | undefined;
        wordSpacing?: csstype.Property.WordSpacing<string | number> | undefined;
        wordWrap?: csstype.Property.WordWrap | undefined;
        writingMode?: csstype.Property.WritingMode | undefined;
        zIndex?: csstype.Property.ZIndex | undefined;
        zoom?: csstype.Property.Zoom | undefined;
        all?: csstype.Globals | undefined;
        animation?: csstype.Property.Animation<string & {}> | undefined;
        animationRange?: csstype.Property.AnimationRange<string | number> | undefined;
        background?: csstype.Property.Background<string | number> | undefined;
        backgroundPosition?: csstype.Property.BackgroundPosition<string | number> | undefined;
        border?: csstype.Property.Border<string | number> | undefined;
        borderBlock?: csstype.Property.BorderBlock<string | number> | undefined;
        borderBlockEnd?: csstype.Property.BorderBlockEnd<string | number> | undefined;
        borderBlockStart?: csstype.Property.BorderBlockStart<string | number> | undefined;
        borderBottom?: csstype.Property.BorderBottom<string | number> | undefined;
        borderColor?: csstype.Property.BorderColor | undefined;
        borderImage?: csstype.Property.BorderImage | undefined;
        borderInline?: csstype.Property.BorderInline<string | number> | undefined;
        borderInlineEnd?: csstype.Property.BorderInlineEnd<string | number> | undefined;
        borderInlineStart?: csstype.Property.BorderInlineStart<string | number> | undefined;
        borderLeft?: csstype.Property.BorderLeft<string | number> | undefined;
        borderRadius?: csstype.Property.BorderRadius<string | number> | undefined;
        borderRight?: csstype.Property.BorderRight<string | number> | undefined;
        borderStyle?: csstype.Property.BorderStyle | undefined;
        borderTop?: csstype.Property.BorderTop<string | number> | undefined;
        borderWidth?: csstype.Property.BorderWidth<string | number> | undefined;
        caret?: csstype.Property.Caret | undefined;
        columnRule?: csstype.Property.ColumnRule<string | number> | undefined;
        columns?: csstype.Property.Columns<string | number> | undefined;
        containIntrinsicSize?: csstype.Property.ContainIntrinsicSize<string | number> | undefined;
        container?: csstype.Property.Container | undefined;
        flex?: csstype.Property.Flex<string | number> | undefined;
        flexFlow?: csstype.Property.FlexFlow | undefined;
        font?: csstype.Property.Font | undefined;
        gap?: csstype.Property.Gap<string | number> | undefined;
        grid?: csstype.Property.Grid | undefined;
        gridArea?: csstype.Property.GridArea | undefined;
        gridColumn?: csstype.Property.GridColumn | undefined;
        gridRow?: csstype.Property.GridRow | undefined;
        gridTemplate?: csstype.Property.GridTemplate | undefined;
        inset?: csstype.Property.Inset<string | number> | undefined;
        insetBlock?: csstype.Property.InsetBlock<string | number> | undefined;
        insetInline?: csstype.Property.InsetInline<string | number> | undefined;
        lineClamp?: csstype.Property.LineClamp | undefined;
        listStyle?: csstype.Property.ListStyle | undefined;
        margin?: csstype.Property.Margin<string | number> | undefined;
        marginBlock?: csstype.Property.MarginBlock<string | number> | undefined;
        marginInline?: csstype.Property.MarginInline<string | number> | undefined;
        mask?: csstype.Property.Mask<string | number> | undefined;
        maskBorder?: csstype.Property.MaskBorder | undefined;
        motion?: csstype.Property.Offset<string | number> | undefined;
        offset?: csstype.Property.Offset<string | number> | undefined;
        outline?: csstype.Property.Outline<string | number> | undefined;
        overflow?: csstype.Property.Overflow | undefined;
        overscrollBehavior?: csstype.Property.OverscrollBehavior | undefined;
        padding?: csstype.Property.Padding<string | number> | undefined;
        paddingBlock?: csstype.Property.PaddingBlock<string | number> | undefined;
        paddingInline?: csstype.Property.PaddingInline<string | number> | undefined;
        placeContent?: csstype.Property.PlaceContent | undefined;
        placeItems?: csstype.Property.PlaceItems | undefined;
        placeSelf?: csstype.Property.PlaceSelf | undefined;
        scrollMargin?: csstype.Property.ScrollMargin<string | number> | undefined;
        scrollMarginBlock?: csstype.Property.ScrollMarginBlock<string | number> | undefined;
        scrollMarginInline?: csstype.Property.ScrollMarginInline<string | number> | undefined;
        scrollPadding?: csstype.Property.ScrollPadding<string | number> | undefined;
        scrollPaddingBlock?: csstype.Property.ScrollPaddingBlock<string | number> | undefined;
        scrollPaddingInline?: csstype.Property.ScrollPaddingInline<string | number> | undefined;
        scrollSnapMargin?: csstype.Property.ScrollMargin<string | number> | undefined;
        scrollTimeline?: csstype.Property.ScrollTimeline | undefined;
        textDecoration?: csstype.Property.TextDecoration<string | number> | undefined;
        textEmphasis?: csstype.Property.TextEmphasis | undefined;
        viewTimeline?: csstype.Property.ViewTimeline | undefined;
        MozAnimationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        MozAnimationDirection?: csstype.Property.AnimationDirection | undefined;
        MozAnimationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        MozAnimationFillMode?: csstype.Property.AnimationFillMode | undefined;
        MozAnimationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        MozAnimationName?: csstype.Property.AnimationName | undefined;
        MozAnimationPlayState?: csstype.Property.AnimationPlayState | undefined;
        MozAnimationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        MozAppearance?: csstype.Property.MozAppearance | undefined;
        MozBinding?: csstype.Property.MozBinding | undefined;
        MozBorderBottomColors?: csstype.Property.MozBorderBottomColors | undefined;
        MozBorderEndColor?: csstype.Property.BorderInlineEndColor | undefined;
        MozBorderEndStyle?: csstype.Property.BorderInlineEndStyle | undefined;
        MozBorderEndWidth?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        MozBorderLeftColors?: csstype.Property.MozBorderLeftColors | undefined;
        MozBorderRightColors?: csstype.Property.MozBorderRightColors | undefined;
        MozBorderStartColor?: csstype.Property.BorderInlineStartColor | undefined;
        MozBorderStartStyle?: csstype.Property.BorderInlineStartStyle | undefined;
        MozBorderTopColors?: csstype.Property.MozBorderTopColors | undefined;
        MozBoxSizing?: csstype.Property.BoxSizing | undefined;
        MozColumnCount?: csstype.Property.ColumnCount | undefined;
        MozColumnFill?: csstype.Property.ColumnFill | undefined;
        MozColumnRuleColor?: csstype.Property.ColumnRuleColor | undefined;
        MozColumnRuleStyle?: csstype.Property.ColumnRuleStyle | undefined;
        MozColumnRuleWidth?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        MozColumnWidth?: csstype.Property.ColumnWidth<string | number> | undefined;
        MozContextProperties?: csstype.Property.MozContextProperties | undefined;
        MozFontFeatureSettings?: csstype.Property.FontFeatureSettings | undefined;
        MozFontLanguageOverride?: csstype.Property.FontLanguageOverride | undefined;
        MozHyphens?: csstype.Property.Hyphens | undefined;
        MozImageRegion?: csstype.Property.MozImageRegion | undefined;
        MozMarginEnd?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        MozMarginStart?: csstype.Property.MarginInlineStart<string | number> | undefined;
        MozOrient?: csstype.Property.MozOrient | undefined;
        MozOsxFontSmoothing?: csstype.Property.FontSmooth<string | number> | undefined;
        MozOutlineRadiusBottomleft?: csstype.Property.MozOutlineRadiusBottomleft<string | number> | undefined;
        MozOutlineRadiusBottomright?: csstype.Property.MozOutlineRadiusBottomright<string | number> | undefined;
        MozOutlineRadiusTopleft?: csstype.Property.MozOutlineRadiusTopleft<string | number> | undefined;
        MozOutlineRadiusTopright?: csstype.Property.MozOutlineRadiusTopright<string | number> | undefined;
        MozPaddingEnd?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        MozPaddingStart?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        MozStackSizing?: csstype.Property.MozStackSizing | undefined;
        MozTabSize?: csstype.Property.TabSize<string | number> | undefined;
        MozTextBlink?: csstype.Property.MozTextBlink | undefined;
        MozTextSizeAdjust?: csstype.Property.TextSizeAdjust | undefined;
        MozUserFocus?: csstype.Property.MozUserFocus | undefined;
        MozUserModify?: csstype.Property.MozUserModify | undefined;
        MozUserSelect?: csstype.Property.UserSelect | undefined;
        MozWindowDragging?: csstype.Property.MozWindowDragging | undefined;
        MozWindowShadow?: csstype.Property.MozWindowShadow | undefined;
        msAccelerator?: csstype.Property.MsAccelerator | undefined;
        msBlockProgression?: csstype.Property.MsBlockProgression | undefined;
        msContentZoomChaining?: csstype.Property.MsContentZoomChaining | undefined;
        msContentZoomLimitMax?: csstype.Property.MsContentZoomLimitMax | undefined;
        msContentZoomLimitMin?: csstype.Property.MsContentZoomLimitMin | undefined;
        msContentZoomSnapPoints?: csstype.Property.MsContentZoomSnapPoints | undefined;
        msContentZoomSnapType?: csstype.Property.MsContentZoomSnapType | undefined;
        msContentZooming?: csstype.Property.MsContentZooming | undefined;
        msFilter?: csstype.Property.MsFilter | undefined;
        msFlexDirection?: csstype.Property.FlexDirection | undefined;
        msFlexPositive?: csstype.Property.FlexGrow | undefined;
        msFlowFrom?: csstype.Property.MsFlowFrom | undefined;
        msFlowInto?: csstype.Property.MsFlowInto | undefined;
        msGridColumns?: csstype.Property.MsGridColumns<string | number> | undefined;
        msGridRows?: csstype.Property.MsGridRows<string | number> | undefined;
        msHighContrastAdjust?: csstype.Property.MsHighContrastAdjust | undefined;
        msHyphenateLimitChars?: csstype.Property.MsHyphenateLimitChars | undefined;
        msHyphenateLimitLines?: csstype.Property.MsHyphenateLimitLines | undefined;
        msHyphenateLimitZone?: csstype.Property.MsHyphenateLimitZone<string | number> | undefined;
        msHyphens?: csstype.Property.Hyphens | undefined;
        msImeAlign?: csstype.Property.MsImeAlign | undefined;
        msLineBreak?: csstype.Property.LineBreak | undefined;
        msOrder?: csstype.Property.Order | undefined;
        msOverflowStyle?: csstype.Property.MsOverflowStyle | undefined;
        msOverflowX?: csstype.Property.OverflowX | undefined;
        msOverflowY?: csstype.Property.OverflowY | undefined;
        msScrollChaining?: csstype.Property.MsScrollChaining | undefined;
        msScrollLimitXMax?: csstype.Property.MsScrollLimitXMax<string | number> | undefined;
        msScrollLimitXMin?: csstype.Property.MsScrollLimitXMin<string | number> | undefined;
        msScrollLimitYMax?: csstype.Property.MsScrollLimitYMax<string | number> | undefined;
        msScrollLimitYMin?: csstype.Property.MsScrollLimitYMin<string | number> | undefined;
        msScrollRails?: csstype.Property.MsScrollRails | undefined;
        msScrollSnapPointsX?: csstype.Property.MsScrollSnapPointsX | undefined;
        msScrollSnapPointsY?: csstype.Property.MsScrollSnapPointsY | undefined;
        msScrollSnapType?: csstype.Property.MsScrollSnapType | undefined;
        msScrollTranslation?: csstype.Property.MsScrollTranslation | undefined;
        msScrollbar3dlightColor?: csstype.Property.MsScrollbar3dlightColor | undefined;
        msScrollbarArrowColor?: csstype.Property.MsScrollbarArrowColor | undefined;
        msScrollbarBaseColor?: csstype.Property.MsScrollbarBaseColor | undefined;
        msScrollbarDarkshadowColor?: csstype.Property.MsScrollbarDarkshadowColor | undefined;
        msScrollbarFaceColor?: csstype.Property.MsScrollbarFaceColor | undefined;
        msScrollbarHighlightColor?: csstype.Property.MsScrollbarHighlightColor | undefined;
        msScrollbarShadowColor?: csstype.Property.MsScrollbarShadowColor | undefined;
        msScrollbarTrackColor?: csstype.Property.MsScrollbarTrackColor | undefined;
        msTextAutospace?: csstype.Property.MsTextAutospace | undefined;
        msTextCombineHorizontal?: csstype.Property.TextCombineUpright | undefined;
        msTextOverflow?: csstype.Property.TextOverflow | undefined;
        msTouchAction?: csstype.Property.TouchAction | undefined;
        msTouchSelect?: csstype.Property.MsTouchSelect | undefined;
        msTransform?: csstype.Property.Transform | undefined;
        msTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        msTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        msTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        msTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        msTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        msUserSelect?: csstype.Property.MsUserSelect | undefined;
        msWordBreak?: csstype.Property.WordBreak | undefined;
        msWrapFlow?: csstype.Property.MsWrapFlow | undefined;
        msWrapMargin?: csstype.Property.MsWrapMargin<string | number> | undefined;
        msWrapThrough?: csstype.Property.MsWrapThrough | undefined;
        msWritingMode?: csstype.Property.WritingMode | undefined;
        WebkitAlignContent?: csstype.Property.AlignContent | undefined;
        WebkitAlignItems?: csstype.Property.AlignItems | undefined;
        WebkitAlignSelf?: csstype.Property.AlignSelf | undefined;
        WebkitAnimationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        WebkitAnimationDirection?: csstype.Property.AnimationDirection | undefined;
        WebkitAnimationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        WebkitAnimationFillMode?: csstype.Property.AnimationFillMode | undefined;
        WebkitAnimationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        WebkitAnimationName?: csstype.Property.AnimationName | undefined;
        WebkitAnimationPlayState?: csstype.Property.AnimationPlayState | undefined;
        WebkitAnimationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        WebkitAppearance?: csstype.Property.WebkitAppearance | undefined;
        WebkitBackdropFilter?: csstype.Property.BackdropFilter | undefined;
        WebkitBackfaceVisibility?: csstype.Property.BackfaceVisibility | undefined;
        WebkitBackgroundClip?: csstype.Property.BackgroundClip | undefined;
        WebkitBackgroundOrigin?: csstype.Property.BackgroundOrigin | undefined;
        WebkitBackgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        WebkitBorderBeforeColor?: csstype.Property.WebkitBorderBeforeColor | undefined;
        WebkitBorderBeforeStyle?: csstype.Property.WebkitBorderBeforeStyle | undefined;
        WebkitBorderBeforeWidth?: csstype.Property.WebkitBorderBeforeWidth<string | number> | undefined;
        WebkitBorderBottomLeftRadius?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        WebkitBorderBottomRightRadius?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        WebkitBorderImageSlice?: csstype.Property.BorderImageSlice | undefined;
        WebkitBorderTopLeftRadius?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        WebkitBorderTopRightRadius?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        WebkitBoxDecorationBreak?: csstype.Property.BoxDecorationBreak | undefined;
        WebkitBoxReflect?: csstype.Property.WebkitBoxReflect<string | number> | undefined;
        WebkitBoxShadow?: csstype.Property.BoxShadow | undefined;
        WebkitBoxSizing?: csstype.Property.BoxSizing | undefined;
        WebkitClipPath?: csstype.Property.ClipPath | undefined;
        WebkitColumnCount?: csstype.Property.ColumnCount | undefined;
        WebkitColumnFill?: csstype.Property.ColumnFill | undefined;
        WebkitColumnRuleColor?: csstype.Property.ColumnRuleColor | undefined;
        WebkitColumnRuleStyle?: csstype.Property.ColumnRuleStyle | undefined;
        WebkitColumnRuleWidth?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        WebkitColumnSpan?: csstype.Property.ColumnSpan | undefined;
        WebkitColumnWidth?: csstype.Property.ColumnWidth<string | number> | undefined;
        WebkitFilter?: csstype.Property.Filter | undefined;
        WebkitFlexBasis?: csstype.Property.FlexBasis<string | number> | undefined;
        WebkitFlexDirection?: csstype.Property.FlexDirection | undefined;
        WebkitFlexGrow?: csstype.Property.FlexGrow | undefined;
        WebkitFlexShrink?: csstype.Property.FlexShrink | undefined;
        WebkitFlexWrap?: csstype.Property.FlexWrap | undefined;
        WebkitFontFeatureSettings?: csstype.Property.FontFeatureSettings | undefined;
        WebkitFontKerning?: csstype.Property.FontKerning | undefined;
        WebkitFontSmoothing?: csstype.Property.FontSmooth<string | number> | undefined;
        WebkitFontVariantLigatures?: csstype.Property.FontVariantLigatures | undefined;
        WebkitHyphenateCharacter?: csstype.Property.HyphenateCharacter | undefined;
        WebkitHyphens?: csstype.Property.Hyphens | undefined;
        WebkitInitialLetter?: csstype.Property.InitialLetter | undefined;
        WebkitJustifyContent?: csstype.Property.JustifyContent | undefined;
        WebkitLineBreak?: csstype.Property.LineBreak | undefined;
        WebkitLineClamp?: csstype.Property.WebkitLineClamp | undefined;
        WebkitMarginEnd?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        WebkitMarginStart?: csstype.Property.MarginInlineStart<string | number> | undefined;
        WebkitMaskAttachment?: csstype.Property.WebkitMaskAttachment | undefined;
        WebkitMaskBoxImageOutset?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        WebkitMaskBoxImageRepeat?: csstype.Property.MaskBorderRepeat | undefined;
        WebkitMaskBoxImageSlice?: csstype.Property.MaskBorderSlice | undefined;
        WebkitMaskBoxImageSource?: csstype.Property.MaskBorderSource | undefined;
        WebkitMaskBoxImageWidth?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        WebkitMaskClip?: csstype.Property.WebkitMaskClip | undefined;
        WebkitMaskComposite?: csstype.Property.WebkitMaskComposite | undefined;
        WebkitMaskImage?: csstype.Property.WebkitMaskImage | undefined;
        WebkitMaskOrigin?: csstype.Property.WebkitMaskOrigin | undefined;
        WebkitMaskPosition?: csstype.Property.WebkitMaskPosition<string | number> | undefined;
        WebkitMaskPositionX?: csstype.Property.WebkitMaskPositionX<string | number> | undefined;
        WebkitMaskPositionY?: csstype.Property.WebkitMaskPositionY<string | number> | undefined;
        WebkitMaskRepeat?: csstype.Property.WebkitMaskRepeat | undefined;
        WebkitMaskRepeatX?: csstype.Property.WebkitMaskRepeatX | undefined;
        WebkitMaskRepeatY?: csstype.Property.WebkitMaskRepeatY | undefined;
        WebkitMaskSize?: csstype.Property.WebkitMaskSize<string | number> | undefined;
        WebkitMaxInlineSize?: csstype.Property.MaxInlineSize<string | number> | undefined;
        WebkitOrder?: csstype.Property.Order | undefined;
        WebkitOverflowScrolling?: csstype.Property.WebkitOverflowScrolling | undefined;
        WebkitPaddingEnd?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        WebkitPaddingStart?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        WebkitPerspective?: csstype.Property.Perspective<string | number> | undefined;
        WebkitPerspectiveOrigin?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        WebkitPrintColorAdjust?: csstype.Property.PrintColorAdjust | undefined;
        WebkitRubyPosition?: csstype.Property.RubyPosition | undefined;
        WebkitScrollSnapType?: csstype.Property.ScrollSnapType | undefined;
        WebkitShapeMargin?: csstype.Property.ShapeMargin<string | number> | undefined;
        WebkitTapHighlightColor?: csstype.Property.WebkitTapHighlightColor | undefined;
        WebkitTextCombine?: csstype.Property.TextCombineUpright | undefined;
        WebkitTextDecorationColor?: csstype.Property.TextDecorationColor | undefined;
        WebkitTextDecorationLine?: csstype.Property.TextDecorationLine | undefined;
        WebkitTextDecorationSkip?: csstype.Property.TextDecorationSkip | undefined;
        WebkitTextDecorationStyle?: csstype.Property.TextDecorationStyle | undefined;
        WebkitTextEmphasisColor?: csstype.Property.TextEmphasisColor | undefined;
        WebkitTextEmphasisPosition?: csstype.Property.TextEmphasisPosition | undefined;
        WebkitTextEmphasisStyle?: csstype.Property.TextEmphasisStyle | undefined;
        WebkitTextFillColor?: csstype.Property.WebkitTextFillColor | undefined;
        WebkitTextOrientation?: csstype.Property.TextOrientation | undefined;
        WebkitTextSizeAdjust?: csstype.Property.TextSizeAdjust | undefined;
        WebkitTextStrokeColor?: csstype.Property.WebkitTextStrokeColor | undefined;
        WebkitTextStrokeWidth?: csstype.Property.WebkitTextStrokeWidth<string | number> | undefined;
        WebkitTextUnderlinePosition?: csstype.Property.TextUnderlinePosition | undefined;
        WebkitTouchCallout?: csstype.Property.WebkitTouchCallout | undefined;
        WebkitTransform?: csstype.Property.Transform | undefined;
        WebkitTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        WebkitTransformStyle?: csstype.Property.TransformStyle | undefined;
        WebkitTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        WebkitTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        WebkitTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        WebkitTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        WebkitUserModify?: csstype.Property.WebkitUserModify | undefined;
        WebkitUserSelect?: csstype.Property.UserSelect | undefined;
        WebkitWritingMode?: csstype.Property.WritingMode | undefined;
        MozAnimation?: csstype.Property.Animation<string & {}> | undefined;
        MozBorderImage?: csstype.Property.BorderImage | undefined;
        MozColumnRule?: csstype.Property.ColumnRule<string | number> | undefined;
        MozColumns?: csstype.Property.Columns<string | number> | undefined;
        MozOutlineRadius?: csstype.Property.MozOutlineRadius<string | number> | undefined;
        msContentZoomLimit?: csstype.Property.MsContentZoomLimit | undefined;
        msContentZoomSnap?: csstype.Property.MsContentZoomSnap | undefined;
        msFlex?: csstype.Property.Flex<string | number> | undefined;
        msScrollLimit?: csstype.Property.MsScrollLimit | undefined;
        msScrollSnapX?: csstype.Property.MsScrollSnapX | undefined;
        msScrollSnapY?: csstype.Property.MsScrollSnapY | undefined;
        msTransition?: csstype.Property.Transition<string & {}> | undefined;
        WebkitAnimation?: csstype.Property.Animation<string & {}> | undefined;
        WebkitBorderBefore?: csstype.Property.WebkitBorderBefore<string | number> | undefined;
        WebkitBorderImage?: csstype.Property.BorderImage | undefined;
        WebkitBorderRadius?: csstype.Property.BorderRadius<string | number> | undefined;
        WebkitColumnRule?: csstype.Property.ColumnRule<string | number> | undefined;
        WebkitColumns?: csstype.Property.Columns<string | number> | undefined;
        WebkitFlex?: csstype.Property.Flex<string | number> | undefined;
        WebkitFlexFlow?: csstype.Property.FlexFlow | undefined;
        WebkitMask?: csstype.Property.WebkitMask<string | number> | undefined;
        WebkitMaskBoxImage?: csstype.Property.MaskBorder | undefined;
        WebkitTextEmphasis?: csstype.Property.TextEmphasis | undefined;
        WebkitTextStroke?: csstype.Property.WebkitTextStroke<string | number> | undefined;
        WebkitTransition?: csstype.Property.Transition<string & {}> | undefined;
        azimuth?: csstype.Property.Azimuth | undefined;
        boxAlign?: csstype.Property.BoxAlign | undefined;
        boxDirection?: csstype.Property.BoxDirection | undefined;
        boxFlex?: csstype.Property.BoxFlex | undefined;
        boxFlexGroup?: csstype.Property.BoxFlexGroup | undefined;
        boxLines?: csstype.Property.BoxLines | undefined;
        boxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        boxOrient?: csstype.Property.BoxOrient | undefined;
        boxPack?: csstype.Property.BoxPack | undefined;
        clip?: csstype.Property.Clip | undefined;
        gridColumnGap?: csstype.Property.GridColumnGap<string | number> | undefined;
        gridGap?: csstype.Property.GridGap<string | number> | undefined;
        gridRowGap?: csstype.Property.GridRowGap<string | number> | undefined;
        imeMode?: csstype.Property.ImeMode | undefined;
        offsetBlock?: csstype.Property.InsetBlock<string | number> | undefined;
        offsetBlockEnd?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        offsetBlockStart?: csstype.Property.InsetBlockStart<string | number> | undefined;
        offsetInline?: csstype.Property.InsetInline<string | number> | undefined;
        offsetInlineEnd?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        offsetInlineStart?: csstype.Property.InsetInlineStart<string | number> | undefined;
        scrollSnapCoordinate?: csstype.Property.ScrollSnapCoordinate<string | number> | undefined;
        scrollSnapDestination?: csstype.Property.ScrollSnapDestination<string | number> | undefined;
        scrollSnapPointsX?: csstype.Property.ScrollSnapPointsX | undefined;
        scrollSnapPointsY?: csstype.Property.ScrollSnapPointsY | undefined;
        scrollSnapTypeX?: csstype.Property.ScrollSnapTypeX | undefined;
        scrollSnapTypeY?: csstype.Property.ScrollSnapTypeY | undefined;
        KhtmlBoxAlign?: csstype.Property.BoxAlign | undefined;
        KhtmlBoxDirection?: csstype.Property.BoxDirection | undefined;
        KhtmlBoxFlex?: csstype.Property.BoxFlex | undefined;
        KhtmlBoxFlexGroup?: csstype.Property.BoxFlexGroup | undefined;
        KhtmlBoxLines?: csstype.Property.BoxLines | undefined;
        KhtmlBoxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        KhtmlBoxOrient?: csstype.Property.BoxOrient | undefined;
        KhtmlBoxPack?: csstype.Property.BoxPack | undefined;
        KhtmlLineBreak?: csstype.Property.LineBreak | undefined;
        KhtmlOpacity?: csstype.Property.Opacity | undefined;
        KhtmlUserSelect?: csstype.Property.UserSelect | undefined;
        MozBackfaceVisibility?: csstype.Property.BackfaceVisibility | undefined;
        MozBackgroundClip?: csstype.Property.BackgroundClip | undefined;
        MozBackgroundInlinePolicy?: csstype.Property.BoxDecorationBreak | undefined;
        MozBackgroundOrigin?: csstype.Property.BackgroundOrigin | undefined;
        MozBackgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        MozBorderRadius?: csstype.Property.BorderRadius<string | number> | undefined;
        MozBorderRadiusBottomleft?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        MozBorderRadiusBottomright?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        MozBorderRadiusTopleft?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        MozBorderRadiusTopright?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        MozBoxAlign?: csstype.Property.BoxAlign | undefined;
        MozBoxDirection?: csstype.Property.BoxDirection | undefined;
        MozBoxFlex?: csstype.Property.BoxFlex | undefined;
        MozBoxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        MozBoxOrient?: csstype.Property.BoxOrient | undefined;
        MozBoxPack?: csstype.Property.BoxPack | undefined;
        MozBoxShadow?: csstype.Property.BoxShadow | undefined;
        MozFloatEdge?: csstype.Property.MozFloatEdge | undefined;
        MozForceBrokenImageIcon?: csstype.Property.MozForceBrokenImageIcon | undefined;
        MozOpacity?: csstype.Property.Opacity | undefined;
        MozOutline?: csstype.Property.Outline<string | number> | undefined;
        MozOutlineColor?: csstype.Property.OutlineColor | undefined;
        MozOutlineStyle?: csstype.Property.OutlineStyle | undefined;
        MozOutlineWidth?: csstype.Property.OutlineWidth<string | number> | undefined;
        MozPerspective?: csstype.Property.Perspective<string | number> | undefined;
        MozPerspectiveOrigin?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        MozTextAlignLast?: csstype.Property.TextAlignLast | undefined;
        MozTextDecorationColor?: csstype.Property.TextDecorationColor | undefined;
        MozTextDecorationLine?: csstype.Property.TextDecorationLine | undefined;
        MozTextDecorationStyle?: csstype.Property.TextDecorationStyle | undefined;
        MozTransform?: csstype.Property.Transform | undefined;
        MozTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        MozTransformStyle?: csstype.Property.TransformStyle | undefined;
        MozTransition?: csstype.Property.Transition<string & {}> | undefined;
        MozTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        MozTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        MozTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        MozTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        MozUserInput?: csstype.Property.MozUserInput | undefined;
        msImeMode?: csstype.Property.ImeMode | undefined;
        OAnimation?: csstype.Property.Animation<string & {}> | undefined;
        OAnimationDelay?: csstype.Property.AnimationDelay<string & {}> | undefined;
        OAnimationDirection?: csstype.Property.AnimationDirection | undefined;
        OAnimationDuration?: csstype.Property.AnimationDuration<string & {}> | undefined;
        OAnimationFillMode?: csstype.Property.AnimationFillMode | undefined;
        OAnimationIterationCount?: csstype.Property.AnimationIterationCount | undefined;
        OAnimationName?: csstype.Property.AnimationName | undefined;
        OAnimationPlayState?: csstype.Property.AnimationPlayState | undefined;
        OAnimationTimingFunction?: csstype.Property.AnimationTimingFunction | undefined;
        OBackgroundSize?: csstype.Property.BackgroundSize<string | number> | undefined;
        OBorderImage?: csstype.Property.BorderImage | undefined;
        OObjectFit?: csstype.Property.ObjectFit | undefined;
        OObjectPosition?: csstype.Property.ObjectPosition<string | number> | undefined;
        OTabSize?: csstype.Property.TabSize<string | number> | undefined;
        OTextOverflow?: csstype.Property.TextOverflow | undefined;
        OTransform?: csstype.Property.Transform | undefined;
        OTransformOrigin?: csstype.Property.TransformOrigin<string | number> | undefined;
        OTransition?: csstype.Property.Transition<string & {}> | undefined;
        OTransitionDelay?: csstype.Property.TransitionDelay<string & {}> | undefined;
        OTransitionDuration?: csstype.Property.TransitionDuration<string & {}> | undefined;
        OTransitionProperty?: csstype.Property.TransitionProperty | undefined;
        OTransitionTimingFunction?: csstype.Property.TransitionTimingFunction | undefined;
        WebkitBoxAlign?: csstype.Property.BoxAlign | undefined;
        WebkitBoxDirection?: csstype.Property.BoxDirection | undefined;
        WebkitBoxFlex?: csstype.Property.BoxFlex | undefined;
        WebkitBoxFlexGroup?: csstype.Property.BoxFlexGroup | undefined;
        WebkitBoxLines?: csstype.Property.BoxLines | undefined;
        WebkitBoxOrdinalGroup?: csstype.Property.BoxOrdinalGroup | undefined;
        WebkitBoxOrient?: csstype.Property.BoxOrient | undefined;
        WebkitBoxPack?: csstype.Property.BoxPack | undefined;
        alignmentBaseline?: csstype.Property.AlignmentBaseline | undefined;
        baselineShift?: csstype.Property.BaselineShift<string | number> | undefined;
        clipRule?: csstype.Property.ClipRule | undefined;
        colorInterpolation?: csstype.Property.ColorInterpolation | undefined;
        colorRendering?: csstype.Property.ColorRendering | undefined;
        dominantBaseline?: csstype.Property.DominantBaseline | undefined;
        fillOpacity?: csstype.Property.FillOpacity | undefined;
        fillRule?: csstype.Property.FillRule | undefined;
        floodColor?: csstype.Property.FloodColor | undefined;
        floodOpacity?: csstype.Property.FloodOpacity | undefined;
        glyphOrientationVertical?: csstype.Property.GlyphOrientationVertical | undefined;
        lightingColor?: csstype.Property.LightingColor | undefined;
        marker?: csstype.Property.Marker | undefined;
        markerEnd?: csstype.Property.MarkerEnd | undefined;
        markerMid?: csstype.Property.MarkerMid | undefined;
        markerStart?: csstype.Property.MarkerStart | undefined;
        shapeRendering?: csstype.Property.ShapeRendering | undefined;
        stopColor?: csstype.Property.StopColor | undefined;
        stopOpacity?: csstype.Property.StopOpacity | undefined;
        stroke?: csstype.Property.Stroke | undefined;
        strokeDasharray?: csstype.Property.StrokeDasharray<string | number> | undefined;
        strokeDashoffset?: csstype.Property.StrokeDashoffset<string | number> | undefined;
        strokeLinecap?: csstype.Property.StrokeLinecap | undefined;
        strokeLinejoin?: csstype.Property.StrokeLinejoin | undefined;
        strokeMiterlimit?: csstype.Property.StrokeMiterlimit | undefined;
        strokeOpacity?: csstype.Property.StrokeOpacity | undefined;
        strokeWidth?: csstype.Property.StrokeWidth<string | number> | undefined;
        textAnchor?: csstype.Property.TextAnchor | undefined;
        vectorEffect?: csstype.Property.VectorEffect | undefined;
        "accent-color"?: csstype.Property.AccentColor | undefined;
        "align-content"?: csstype.Property.AlignContent | undefined;
        "align-items"?: csstype.Property.AlignItems | undefined;
        "align-self"?: csstype.Property.AlignSelf | undefined;
        "align-tracks"?: csstype.Property.AlignTracks | undefined;
        "animation-composition"?: csstype.Property.AnimationComposition | undefined;
        "animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "animation-name"?: csstype.Property.AnimationName | undefined;
        "animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "animation-range-end"?: csstype.Property.AnimationRangeEnd<string | number> | undefined;
        "animation-range-start"?: csstype.Property.AnimationRangeStart<string | number> | undefined;
        "animation-timeline"?: csstype.Property.AnimationTimeline | undefined;
        "animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "aspect-ratio"?: csstype.Property.AspectRatio | undefined;
        "backdrop-filter"?: csstype.Property.BackdropFilter | undefined;
        "backface-visibility"?: csstype.Property.BackfaceVisibility | undefined;
        "background-attachment"?: csstype.Property.BackgroundAttachment | undefined;
        "background-blend-mode"?: csstype.Property.BackgroundBlendMode | undefined;
        "background-clip"?: csstype.Property.BackgroundClip | undefined;
        "background-color"?: csstype.Property.BackgroundColor | undefined;
        "background-image"?: csstype.Property.BackgroundImage | undefined;
        "background-origin"?: csstype.Property.BackgroundOrigin | undefined;
        "background-position-x"?: csstype.Property.BackgroundPositionX<string | number> | undefined;
        "background-position-y"?: csstype.Property.BackgroundPositionY<string | number> | undefined;
        "background-repeat"?: csstype.Property.BackgroundRepeat | undefined;
        "background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "block-overflow"?: csstype.Property.BlockOverflow | undefined;
        "block-size"?: csstype.Property.BlockSize<string | number> | undefined;
        "border-block-color"?: csstype.Property.BorderBlockColor | undefined;
        "border-block-end-color"?: csstype.Property.BorderBlockEndColor | undefined;
        "border-block-end-style"?: csstype.Property.BorderBlockEndStyle | undefined;
        "border-block-end-width"?: csstype.Property.BorderBlockEndWidth<string | number> | undefined;
        "border-block-start-color"?: csstype.Property.BorderBlockStartColor | undefined;
        "border-block-start-style"?: csstype.Property.BorderBlockStartStyle | undefined;
        "border-block-start-width"?: csstype.Property.BorderBlockStartWidth<string | number> | undefined;
        "border-block-style"?: csstype.Property.BorderBlockStyle | undefined;
        "border-block-width"?: csstype.Property.BorderBlockWidth<string | number> | undefined;
        "border-bottom-color"?: csstype.Property.BorderBottomColor | undefined;
        "border-bottom-left-radius"?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        "border-bottom-right-radius"?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        "border-bottom-style"?: csstype.Property.BorderBottomStyle | undefined;
        "border-bottom-width"?: csstype.Property.BorderBottomWidth<string | number> | undefined;
        "border-collapse"?: csstype.Property.BorderCollapse | undefined;
        "border-end-end-radius"?: csstype.Property.BorderEndEndRadius<string | number> | undefined;
        "border-end-start-radius"?: csstype.Property.BorderEndStartRadius<string | number> | undefined;
        "border-image-outset"?: csstype.Property.BorderImageOutset<string | number> | undefined;
        "border-image-repeat"?: csstype.Property.BorderImageRepeat | undefined;
        "border-image-slice"?: csstype.Property.BorderImageSlice | undefined;
        "border-image-source"?: csstype.Property.BorderImageSource | undefined;
        "border-image-width"?: csstype.Property.BorderImageWidth<string | number> | undefined;
        "border-inline-color"?: csstype.Property.BorderInlineColor | undefined;
        "border-inline-end-color"?: csstype.Property.BorderInlineEndColor | undefined;
        "border-inline-end-style"?: csstype.Property.BorderInlineEndStyle | undefined;
        "border-inline-end-width"?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        "border-inline-start-color"?: csstype.Property.BorderInlineStartColor | undefined;
        "border-inline-start-style"?: csstype.Property.BorderInlineStartStyle | undefined;
        "border-inline-start-width"?: csstype.Property.BorderInlineStartWidth<string | number> | undefined;
        "border-inline-style"?: csstype.Property.BorderInlineStyle | undefined;
        "border-inline-width"?: csstype.Property.BorderInlineWidth<string | number> | undefined;
        "border-left-color"?: csstype.Property.BorderLeftColor | undefined;
        "border-left-style"?: csstype.Property.BorderLeftStyle | undefined;
        "border-left-width"?: csstype.Property.BorderLeftWidth<string | number> | undefined;
        "border-right-color"?: csstype.Property.BorderRightColor | undefined;
        "border-right-style"?: csstype.Property.BorderRightStyle | undefined;
        "border-right-width"?: csstype.Property.BorderRightWidth<string | number> | undefined;
        "border-spacing"?: csstype.Property.BorderSpacing<string | number> | undefined;
        "border-start-end-radius"?: csstype.Property.BorderStartEndRadius<string | number> | undefined;
        "border-start-start-radius"?: csstype.Property.BorderStartStartRadius<string | number> | undefined;
        "border-top-color"?: csstype.Property.BorderTopColor | undefined;
        "border-top-left-radius"?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        "border-top-right-radius"?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        "border-top-style"?: csstype.Property.BorderTopStyle | undefined;
        "border-top-width"?: csstype.Property.BorderTopWidth<string | number> | undefined;
        "box-decoration-break"?: csstype.Property.BoxDecorationBreak | undefined;
        "box-shadow"?: csstype.Property.BoxShadow | undefined;
        "box-sizing"?: csstype.Property.BoxSizing | undefined;
        "break-after"?: csstype.Property.BreakAfter | undefined;
        "break-before"?: csstype.Property.BreakBefore | undefined;
        "break-inside"?: csstype.Property.BreakInside | undefined;
        "caption-side"?: csstype.Property.CaptionSide | undefined;
        "caret-color"?: csstype.Property.CaretColor | undefined;
        "caret-shape"?: csstype.Property.CaretShape | undefined;
        "clip-path"?: csstype.Property.ClipPath | undefined;
        "color-adjust"?: csstype.Property.PrintColorAdjust | undefined;
        "color-scheme"?: csstype.Property.ColorScheme | undefined;
        "column-count"?: csstype.Property.ColumnCount | undefined;
        "column-fill"?: csstype.Property.ColumnFill | undefined;
        "column-gap"?: csstype.Property.ColumnGap<string | number> | undefined;
        "column-rule-color"?: csstype.Property.ColumnRuleColor | undefined;
        "column-rule-style"?: csstype.Property.ColumnRuleStyle | undefined;
        "column-rule-width"?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        "column-span"?: csstype.Property.ColumnSpan | undefined;
        "column-width"?: csstype.Property.ColumnWidth<string | number> | undefined;
        "contain-intrinsic-block-size"?: csstype.Property.ContainIntrinsicBlockSize<string | number> | undefined;
        "contain-intrinsic-height"?: csstype.Property.ContainIntrinsicHeight<string | number> | undefined;
        "contain-intrinsic-inline-size"?: csstype.Property.ContainIntrinsicInlineSize<string | number> | undefined;
        "contain-intrinsic-width"?: csstype.Property.ContainIntrinsicWidth<string | number> | undefined;
        "container-name"?: csstype.Property.ContainerName | undefined;
        "container-type"?: csstype.Property.ContainerType | undefined;
        "content-visibility"?: csstype.Property.ContentVisibility | undefined;
        "counter-increment"?: csstype.Property.CounterIncrement | undefined;
        "counter-reset"?: csstype.Property.CounterReset | undefined;
        "counter-set"?: csstype.Property.CounterSet | undefined;
        "empty-cells"?: csstype.Property.EmptyCells | undefined;
        "flex-basis"?: csstype.Property.FlexBasis<string | number> | undefined;
        "flex-direction"?: csstype.Property.FlexDirection | undefined;
        "flex-grow"?: csstype.Property.FlexGrow | undefined;
        "flex-shrink"?: csstype.Property.FlexShrink | undefined;
        "flex-wrap"?: csstype.Property.FlexWrap | undefined;
        "font-family"?: csstype.Property.FontFamily | undefined;
        "font-feature-settings"?: csstype.Property.FontFeatureSettings | undefined;
        "font-kerning"?: csstype.Property.FontKerning | undefined;
        "font-language-override"?: csstype.Property.FontLanguageOverride | undefined;
        "font-optical-sizing"?: csstype.Property.FontOpticalSizing | undefined;
        "font-palette"?: csstype.Property.FontPalette | undefined;
        "font-size"?: csstype.Property.FontSize<string | number> | undefined;
        "font-size-adjust"?: csstype.Property.FontSizeAdjust | undefined;
        "font-smooth"?: csstype.Property.FontSmooth<string | number> | undefined;
        "font-stretch"?: csstype.Property.FontStretch | undefined;
        "font-style"?: csstype.Property.FontStyle | undefined;
        "font-synthesis"?: csstype.Property.FontSynthesis | undefined;
        "font-synthesis-position"?: csstype.Property.FontSynthesisPosition | undefined;
        "font-synthesis-small-caps"?: csstype.Property.FontSynthesisSmallCaps | undefined;
        "font-synthesis-style"?: csstype.Property.FontSynthesisStyle | undefined;
        "font-synthesis-weight"?: csstype.Property.FontSynthesisWeight | undefined;
        "font-variant"?: csstype.Property.FontVariant | undefined;
        "font-variant-alternates"?: csstype.Property.FontVariantAlternates | undefined;
        "font-variant-caps"?: csstype.Property.FontVariantCaps | undefined;
        "font-variant-east-asian"?: csstype.Property.FontVariantEastAsian | undefined;
        "font-variant-emoji"?: csstype.Property.FontVariantEmoji | undefined;
        "font-variant-ligatures"?: csstype.Property.FontVariantLigatures | undefined;
        "font-variant-numeric"?: csstype.Property.FontVariantNumeric | undefined;
        "font-variant-position"?: csstype.Property.FontVariantPosition | undefined;
        "font-variation-settings"?: csstype.Property.FontVariationSettings | undefined;
        "font-weight"?: csstype.Property.FontWeight | undefined;
        "forced-color-adjust"?: csstype.Property.ForcedColorAdjust | undefined;
        "grid-auto-columns"?: csstype.Property.GridAutoColumns<string | number> | undefined;
        "grid-auto-flow"?: csstype.Property.GridAutoFlow | undefined;
        "grid-auto-rows"?: csstype.Property.GridAutoRows<string | number> | undefined;
        "grid-column-end"?: csstype.Property.GridColumnEnd | undefined;
        "grid-column-start"?: csstype.Property.GridColumnStart | undefined;
        "grid-row-end"?: csstype.Property.GridRowEnd | undefined;
        "grid-row-start"?: csstype.Property.GridRowStart | undefined;
        "grid-template-areas"?: csstype.Property.GridTemplateAreas | undefined;
        "grid-template-columns"?: csstype.Property.GridTemplateColumns<string | number> | undefined;
        "grid-template-rows"?: csstype.Property.GridTemplateRows<string | number> | undefined;
        "hanging-punctuation"?: csstype.Property.HangingPunctuation | undefined;
        "hyphenate-character"?: csstype.Property.HyphenateCharacter | undefined;
        "hyphenate-limit-chars"?: csstype.Property.HyphenateLimitChars | undefined;
        "image-orientation"?: csstype.Property.ImageOrientation | undefined;
        "image-rendering"?: csstype.Property.ImageRendering | undefined;
        "image-resolution"?: csstype.Property.ImageResolution | undefined;
        "initial-letter"?: csstype.Property.InitialLetter | undefined;
        "inline-size"?: csstype.Property.InlineSize<string | number> | undefined;
        "input-security"?: csstype.Property.InputSecurity | undefined;
        "inset-block-end"?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        "inset-block-start"?: csstype.Property.InsetBlockStart<string | number> | undefined;
        "inset-inline-end"?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        "inset-inline-start"?: csstype.Property.InsetInlineStart<string | number> | undefined;
        "justify-content"?: csstype.Property.JustifyContent | undefined;
        "justify-items"?: csstype.Property.JustifyItems | undefined;
        "justify-self"?: csstype.Property.JustifySelf | undefined;
        "justify-tracks"?: csstype.Property.JustifyTracks | undefined;
        "letter-spacing"?: csstype.Property.LetterSpacing<string | number> | undefined;
        "line-break"?: csstype.Property.LineBreak | undefined;
        "line-height"?: csstype.Property.LineHeight<string | number> | undefined;
        "line-height-step"?: csstype.Property.LineHeightStep<string | number> | undefined;
        "list-style-image"?: csstype.Property.ListStyleImage | undefined;
        "list-style-position"?: csstype.Property.ListStylePosition | undefined;
        "list-style-type"?: csstype.Property.ListStyleType | undefined;
        "margin-block-end"?: csstype.Property.MarginBlockEnd<string | number> | undefined;
        "margin-block-start"?: csstype.Property.MarginBlockStart<string | number> | undefined;
        "margin-bottom"?: csstype.Property.MarginBottom<string | number> | undefined;
        "margin-inline-end"?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        "margin-inline-start"?: csstype.Property.MarginInlineStart<string | number> | undefined;
        "margin-left"?: csstype.Property.MarginLeft<string | number> | undefined;
        "margin-right"?: csstype.Property.MarginRight<string | number> | undefined;
        "margin-top"?: csstype.Property.MarginTop<string | number> | undefined;
        "margin-trim"?: csstype.Property.MarginTrim | undefined;
        "mask-border-mode"?: csstype.Property.MaskBorderMode | undefined;
        "mask-border-outset"?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        "mask-border-repeat"?: csstype.Property.MaskBorderRepeat | undefined;
        "mask-border-slice"?: csstype.Property.MaskBorderSlice | undefined;
        "mask-border-source"?: csstype.Property.MaskBorderSource | undefined;
        "mask-border-width"?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        "mask-clip"?: csstype.Property.MaskClip | undefined;
        "mask-composite"?: csstype.Property.MaskComposite | undefined;
        "mask-image"?: csstype.Property.MaskImage | undefined;
        "mask-mode"?: csstype.Property.MaskMode | undefined;
        "mask-origin"?: csstype.Property.MaskOrigin | undefined;
        "mask-position"?: csstype.Property.MaskPosition<string | number> | undefined;
        "mask-repeat"?: csstype.Property.MaskRepeat | undefined;
        "mask-size"?: csstype.Property.MaskSize<string | number> | undefined;
        "mask-type"?: csstype.Property.MaskType | undefined;
        "masonry-auto-flow"?: csstype.Property.MasonryAutoFlow | undefined;
        "math-depth"?: csstype.Property.MathDepth | undefined;
        "math-shift"?: csstype.Property.MathShift | undefined;
        "math-style"?: csstype.Property.MathStyle | undefined;
        "max-block-size"?: csstype.Property.MaxBlockSize<string | number> | undefined;
        "max-height"?: csstype.Property.MaxHeight<string | number> | undefined;
        "max-inline-size"?: csstype.Property.MaxInlineSize<string | number> | undefined;
        "max-lines"?: csstype.Property.MaxLines | undefined;
        "max-width"?: csstype.Property.MaxWidth<string | number> | undefined;
        "min-block-size"?: csstype.Property.MinBlockSize<string | number> | undefined;
        "min-height"?: csstype.Property.MinHeight<string | number> | undefined;
        "min-inline-size"?: csstype.Property.MinInlineSize<string | number> | undefined;
        "min-width"?: csstype.Property.MinWidth<string | number> | undefined;
        "mix-blend-mode"?: csstype.Property.MixBlendMode | undefined;
        "motion-distance"?: csstype.Property.OffsetDistance<string | number> | undefined;
        "motion-path"?: csstype.Property.OffsetPath | undefined;
        "motion-rotation"?: csstype.Property.OffsetRotate | undefined;
        "object-fit"?: csstype.Property.ObjectFit | undefined;
        "object-position"?: csstype.Property.ObjectPosition<string | number> | undefined;
        "offset-anchor"?: csstype.Property.OffsetAnchor<string | number> | undefined;
        "offset-distance"?: csstype.Property.OffsetDistance<string | number> | undefined;
        "offset-path"?: csstype.Property.OffsetPath | undefined;
        "offset-position"?: csstype.Property.OffsetPosition<string | number> | undefined;
        "offset-rotate"?: csstype.Property.OffsetRotate | undefined;
        "offset-rotation"?: csstype.Property.OffsetRotate | undefined;
        "outline-color"?: csstype.Property.OutlineColor | undefined;
        "outline-offset"?: csstype.Property.OutlineOffset<string | number> | undefined;
        "outline-style"?: csstype.Property.OutlineStyle | undefined;
        "outline-width"?: csstype.Property.OutlineWidth<string | number> | undefined;
        "overflow-anchor"?: csstype.Property.OverflowAnchor | undefined;
        "overflow-block"?: csstype.Property.OverflowBlock | undefined;
        "overflow-clip-box"?: csstype.Property.OverflowClipBox | undefined;
        "overflow-clip-margin"?: csstype.Property.OverflowClipMargin<string | number> | undefined;
        "overflow-inline"?: csstype.Property.OverflowInline | undefined;
        "overflow-wrap"?: csstype.Property.OverflowWrap | undefined;
        "overflow-x"?: csstype.Property.OverflowX | undefined;
        "overflow-y"?: csstype.Property.OverflowY | undefined;
        "overscroll-behavior-block"?: csstype.Property.OverscrollBehaviorBlock | undefined;
        "overscroll-behavior-inline"?: csstype.Property.OverscrollBehaviorInline | undefined;
        "overscroll-behavior-x"?: csstype.Property.OverscrollBehaviorX | undefined;
        "overscroll-behavior-y"?: csstype.Property.OverscrollBehaviorY | undefined;
        "padding-block-end"?: csstype.Property.PaddingBlockEnd<string | number> | undefined;
        "padding-block-start"?: csstype.Property.PaddingBlockStart<string | number> | undefined;
        "padding-bottom"?: csstype.Property.PaddingBottom<string | number> | undefined;
        "padding-inline-end"?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        "padding-inline-start"?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        "padding-left"?: csstype.Property.PaddingLeft<string | number> | undefined;
        "padding-right"?: csstype.Property.PaddingRight<string | number> | undefined;
        "padding-top"?: csstype.Property.PaddingTop<string | number> | undefined;
        "page-break-after"?: csstype.Property.PageBreakAfter | undefined;
        "page-break-before"?: csstype.Property.PageBreakBefore | undefined;
        "page-break-inside"?: csstype.Property.PageBreakInside | undefined;
        "paint-order"?: csstype.Property.PaintOrder | undefined;
        "perspective-origin"?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        "pointer-events"?: csstype.Property.PointerEvents | undefined;
        "print-color-adjust"?: csstype.Property.PrintColorAdjust | undefined;
        "row-gap"?: csstype.Property.RowGap<string | number> | undefined;
        "ruby-align"?: csstype.Property.RubyAlign | undefined;
        "ruby-merge"?: csstype.Property.RubyMerge | undefined;
        "ruby-position"?: csstype.Property.RubyPosition | undefined;
        "scroll-behavior"?: csstype.Property.ScrollBehavior | undefined;
        "scroll-margin-block-end"?: csstype.Property.ScrollMarginBlockEnd<string | number> | undefined;
        "scroll-margin-block-start"?: csstype.Property.ScrollMarginBlockStart<string | number> | undefined;
        "scroll-margin-bottom"?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        "scroll-margin-inline-end"?: csstype.Property.ScrollMarginInlineEnd<string | number> | undefined;
        "scroll-margin-inline-start"?: csstype.Property.ScrollMarginInlineStart<string | number> | undefined;
        "scroll-margin-left"?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        "scroll-margin-right"?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        "scroll-margin-top"?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        "scroll-padding-block-end"?: csstype.Property.ScrollPaddingBlockEnd<string | number> | undefined;
        "scroll-padding-block-start"?: csstype.Property.ScrollPaddingBlockStart<string | number> | undefined;
        "scroll-padding-bottom"?: csstype.Property.ScrollPaddingBottom<string | number> | undefined;
        "scroll-padding-inline-end"?: csstype.Property.ScrollPaddingInlineEnd<string | number> | undefined;
        "scroll-padding-inline-start"?: csstype.Property.ScrollPaddingInlineStart<string | number> | undefined;
        "scroll-padding-left"?: csstype.Property.ScrollPaddingLeft<string | number> | undefined;
        "scroll-padding-right"?: csstype.Property.ScrollPaddingRight<string | number> | undefined;
        "scroll-padding-top"?: csstype.Property.ScrollPaddingTop<string | number> | undefined;
        "scroll-snap-align"?: csstype.Property.ScrollSnapAlign | undefined;
        "scroll-snap-margin-bottom"?: csstype.Property.ScrollMarginBottom<string | number> | undefined;
        "scroll-snap-margin-left"?: csstype.Property.ScrollMarginLeft<string | number> | undefined;
        "scroll-snap-margin-right"?: csstype.Property.ScrollMarginRight<string | number> | undefined;
        "scroll-snap-margin-top"?: csstype.Property.ScrollMarginTop<string | number> | undefined;
        "scroll-snap-stop"?: csstype.Property.ScrollSnapStop | undefined;
        "scroll-snap-type"?: csstype.Property.ScrollSnapType | undefined;
        "scroll-timeline-axis"?: csstype.Property.ScrollTimelineAxis | undefined;
        "scroll-timeline-name"?: csstype.Property.ScrollTimelineName | undefined;
        "scrollbar-color"?: csstype.Property.ScrollbarColor | undefined;
        "scrollbar-gutter"?: csstype.Property.ScrollbarGutter | undefined;
        "scrollbar-width"?: csstype.Property.ScrollbarWidth | undefined;
        "shape-image-threshold"?: csstype.Property.ShapeImageThreshold | undefined;
        "shape-margin"?: csstype.Property.ShapeMargin<string | number> | undefined;
        "shape-outside"?: csstype.Property.ShapeOutside | undefined;
        "tab-size"?: csstype.Property.TabSize<string | number> | undefined;
        "table-layout"?: csstype.Property.TableLayout | undefined;
        "text-align"?: csstype.Property.TextAlign | undefined;
        "text-align-last"?: csstype.Property.TextAlignLast | undefined;
        "text-combine-upright"?: csstype.Property.TextCombineUpright | undefined;
        "text-decoration-color"?: csstype.Property.TextDecorationColor | undefined;
        "text-decoration-line"?: csstype.Property.TextDecorationLine | undefined;
        "text-decoration-skip"?: csstype.Property.TextDecorationSkip | undefined;
        "text-decoration-skip-ink"?: csstype.Property.TextDecorationSkipInk | undefined;
        "text-decoration-style"?: csstype.Property.TextDecorationStyle | undefined;
        "text-decoration-thickness"?: csstype.Property.TextDecorationThickness<string | number> | undefined;
        "text-emphasis-color"?: csstype.Property.TextEmphasisColor | undefined;
        "text-emphasis-position"?: csstype.Property.TextEmphasisPosition | undefined;
        "text-emphasis-style"?: csstype.Property.TextEmphasisStyle | undefined;
        "text-indent"?: csstype.Property.TextIndent<string | number> | undefined;
        "text-justify"?: csstype.Property.TextJustify | undefined;
        "text-orientation"?: csstype.Property.TextOrientation | undefined;
        "text-overflow"?: csstype.Property.TextOverflow | undefined;
        "text-rendering"?: csstype.Property.TextRendering | undefined;
        "text-shadow"?: csstype.Property.TextShadow | undefined;
        "text-size-adjust"?: csstype.Property.TextSizeAdjust | undefined;
        "text-transform"?: csstype.Property.TextTransform | undefined;
        "text-underline-offset"?: csstype.Property.TextUnderlineOffset<string | number> | undefined;
        "text-underline-position"?: csstype.Property.TextUnderlinePosition | undefined;
        "text-wrap"?: csstype.Property.TextWrap | undefined;
        "timeline-scope"?: csstype.Property.TimelineScope | undefined;
        "touch-action"?: csstype.Property.TouchAction | undefined;
        "transform-box"?: csstype.Property.TransformBox | undefined;
        "transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "transform-style"?: csstype.Property.TransformStyle | undefined;
        "transition-behavior"?: csstype.Property.TransitionBehavior | undefined;
        "transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "transition-property"?: csstype.Property.TransitionProperty | undefined;
        "transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "unicode-bidi"?: csstype.Property.UnicodeBidi | undefined;
        "user-select"?: csstype.Property.UserSelect | undefined;
        "vertical-align"?: csstype.Property.VerticalAlign<string | number> | undefined;
        "view-timeline-axis"?: csstype.Property.ViewTimelineAxis | undefined;
        "view-timeline-inset"?: csstype.Property.ViewTimelineInset<string | number> | undefined;
        "view-timeline-name"?: csstype.Property.ViewTimelineName | undefined;
        "view-transition-name"?: csstype.Property.ViewTransitionName | undefined;
        "white-space"?: csstype.Property.WhiteSpace | undefined;
        "white-space-collapse"?: csstype.Property.WhiteSpaceCollapse | undefined;
        "white-space-trim"?: csstype.Property.WhiteSpaceTrim | undefined;
        "will-change"?: csstype.Property.WillChange | undefined;
        "word-break"?: csstype.Property.WordBreak | undefined;
        "word-spacing"?: csstype.Property.WordSpacing<string | number> | undefined;
        "word-wrap"?: csstype.Property.WordWrap | undefined;
        "writing-mode"?: csstype.Property.WritingMode | undefined;
        "z-index"?: csstype.Property.ZIndex | undefined;
        "animation-range"?: csstype.Property.AnimationRange<string | number> | undefined;
        "background-position"?: csstype.Property.BackgroundPosition<string | number> | undefined;
        "border-block"?: csstype.Property.BorderBlock<string | number> | undefined;
        "border-block-end"?: csstype.Property.BorderBlockEnd<string | number> | undefined;
        "border-block-start"?: csstype.Property.BorderBlockStart<string | number> | undefined;
        "border-bottom"?: csstype.Property.BorderBottom<string | number> | undefined;
        "border-color"?: csstype.Property.BorderColor | undefined;
        "border-image"?: csstype.Property.BorderImage | undefined;
        "border-inline"?: csstype.Property.BorderInline<string | number> | undefined;
        "border-inline-end"?: csstype.Property.BorderInlineEnd<string | number> | undefined;
        "border-inline-start"?: csstype.Property.BorderInlineStart<string | number> | undefined;
        "border-left"?: csstype.Property.BorderLeft<string | number> | undefined;
        "border-radius"?: csstype.Property.BorderRadius<string | number> | undefined;
        "border-right"?: csstype.Property.BorderRight<string | number> | undefined;
        "border-style"?: csstype.Property.BorderStyle | undefined;
        "border-top"?: csstype.Property.BorderTop<string | number> | undefined;
        "border-width"?: csstype.Property.BorderWidth<string | number> | undefined;
        "column-rule"?: csstype.Property.ColumnRule<string | number> | undefined;
        "contain-intrinsic-size"?: csstype.Property.ContainIntrinsicSize<string | number> | undefined;
        "flex-flow"?: csstype.Property.FlexFlow | undefined;
        "grid-area"?: csstype.Property.GridArea | undefined;
        "grid-column"?: csstype.Property.GridColumn | undefined;
        "grid-row"?: csstype.Property.GridRow | undefined;
        "grid-template"?: csstype.Property.GridTemplate | undefined;
        "inset-block"?: csstype.Property.InsetBlock<string | number> | undefined;
        "inset-inline"?: csstype.Property.InsetInline<string | number> | undefined;
        "line-clamp"?: csstype.Property.LineClamp | undefined;
        "list-style"?: csstype.Property.ListStyle | undefined;
        "margin-block"?: csstype.Property.MarginBlock<string | number> | undefined;
        "margin-inline"?: csstype.Property.MarginInline<string | number> | undefined;
        "mask-border"?: csstype.Property.MaskBorder | undefined;
        "overscroll-behavior"?: csstype.Property.OverscrollBehavior | undefined;
        "padding-block"?: csstype.Property.PaddingBlock<string | number> | undefined;
        "padding-inline"?: csstype.Property.PaddingInline<string | number> | undefined;
        "place-content"?: csstype.Property.PlaceContent | undefined;
        "place-items"?: csstype.Property.PlaceItems | undefined;
        "place-self"?: csstype.Property.PlaceSelf | undefined;
        "scroll-margin"?: csstype.Property.ScrollMargin<string | number> | undefined;
        "scroll-margin-block"?: csstype.Property.ScrollMarginBlock<string | number> | undefined;
        "scroll-margin-inline"?: csstype.Property.ScrollMarginInline<string | number> | undefined;
        "scroll-padding"?: csstype.Property.ScrollPadding<string | number> | undefined;
        "scroll-padding-block"?: csstype.Property.ScrollPaddingBlock<string | number> | undefined;
        "scroll-padding-inline"?: csstype.Property.ScrollPaddingInline<string | number> | undefined;
        "scroll-snap-margin"?: csstype.Property.ScrollMargin<string | number> | undefined;
        "scroll-timeline"?: csstype.Property.ScrollTimeline | undefined;
        "text-decoration"?: csstype.Property.TextDecoration<string | number> | undefined;
        "text-emphasis"?: csstype.Property.TextEmphasis | undefined;
        "view-timeline"?: csstype.Property.ViewTimeline | undefined;
        "-moz-animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "-moz-animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "-moz-animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "-moz-animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "-moz-animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "-moz-animation-name"?: csstype.Property.AnimationName | undefined;
        "-moz-animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "-moz-animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "-moz-appearance"?: csstype.Property.MozAppearance | undefined;
        "-moz-binding"?: csstype.Property.MozBinding | undefined;
        "-moz-border-bottom-colors"?: csstype.Property.MozBorderBottomColors | undefined;
        "-moz-border-end-color"?: csstype.Property.BorderInlineEndColor | undefined;
        "-moz-border-end-style"?: csstype.Property.BorderInlineEndStyle | undefined;
        "-moz-border-end-width"?: csstype.Property.BorderInlineEndWidth<string | number> | undefined;
        "-moz-border-left-colors"?: csstype.Property.MozBorderLeftColors | undefined;
        "-moz-border-right-colors"?: csstype.Property.MozBorderRightColors | undefined;
        "-moz-border-start-color"?: csstype.Property.BorderInlineStartColor | undefined;
        "-moz-border-start-style"?: csstype.Property.BorderInlineStartStyle | undefined;
        "-moz-border-top-colors"?: csstype.Property.MozBorderTopColors | undefined;
        "-moz-box-sizing"?: csstype.Property.BoxSizing | undefined;
        "-moz-column-count"?: csstype.Property.ColumnCount | undefined;
        "-moz-column-fill"?: csstype.Property.ColumnFill | undefined;
        "-moz-column-rule-color"?: csstype.Property.ColumnRuleColor | undefined;
        "-moz-column-rule-style"?: csstype.Property.ColumnRuleStyle | undefined;
        "-moz-column-rule-width"?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        "-moz-column-width"?: csstype.Property.ColumnWidth<string | number> | undefined;
        "-moz-context-properties"?: csstype.Property.MozContextProperties | undefined;
        "-moz-font-feature-settings"?: csstype.Property.FontFeatureSettings | undefined;
        "-moz-font-language-override"?: csstype.Property.FontLanguageOverride | undefined;
        "-moz-hyphens"?: csstype.Property.Hyphens | undefined;
        "-moz-image-region"?: csstype.Property.MozImageRegion | undefined;
        "-moz-margin-end"?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        "-moz-margin-start"?: csstype.Property.MarginInlineStart<string | number> | undefined;
        "-moz-orient"?: csstype.Property.MozOrient | undefined;
        "-moz-osx-font-smoothing"?: csstype.Property.FontSmooth<string | number> | undefined;
        "-moz-outline-radius-bottomleft"?: csstype.Property.MozOutlineRadiusBottomleft<string | number> | undefined;
        "-moz-outline-radius-bottomright"?: csstype.Property.MozOutlineRadiusBottomright<string | number> | undefined;
        "-moz-outline-radius-topleft"?: csstype.Property.MozOutlineRadiusTopleft<string | number> | undefined;
        "-moz-outline-radius-topright"?: csstype.Property.MozOutlineRadiusTopright<string | number> | undefined;
        "-moz-padding-end"?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        "-moz-padding-start"?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        "-moz-stack-sizing"?: csstype.Property.MozStackSizing | undefined;
        "-moz-tab-size"?: csstype.Property.TabSize<string | number> | undefined;
        "-moz-text-blink"?: csstype.Property.MozTextBlink | undefined;
        "-moz-text-size-adjust"?: csstype.Property.TextSizeAdjust | undefined;
        "-moz-user-focus"?: csstype.Property.MozUserFocus | undefined;
        "-moz-user-modify"?: csstype.Property.MozUserModify | undefined;
        "-moz-user-select"?: csstype.Property.UserSelect | undefined;
        "-moz-window-dragging"?: csstype.Property.MozWindowDragging | undefined;
        "-moz-window-shadow"?: csstype.Property.MozWindowShadow | undefined;
        "-ms-accelerator"?: csstype.Property.MsAccelerator | undefined;
        "-ms-block-progression"?: csstype.Property.MsBlockProgression | undefined;
        "-ms-content-zoom-chaining"?: csstype.Property.MsContentZoomChaining | undefined;
        "-ms-content-zoom-limit-max"?: csstype.Property.MsContentZoomLimitMax | undefined;
        "-ms-content-zoom-limit-min"?: csstype.Property.MsContentZoomLimitMin | undefined;
        "-ms-content-zoom-snap-points"?: csstype.Property.MsContentZoomSnapPoints | undefined;
        "-ms-content-zoom-snap-type"?: csstype.Property.MsContentZoomSnapType | undefined;
        "-ms-content-zooming"?: csstype.Property.MsContentZooming | undefined;
        "-ms-filter"?: csstype.Property.MsFilter | undefined;
        "-ms-flex-direction"?: csstype.Property.FlexDirection | undefined;
        "-ms-flex-positive"?: csstype.Property.FlexGrow | undefined;
        "-ms-flow-from"?: csstype.Property.MsFlowFrom | undefined;
        "-ms-flow-into"?: csstype.Property.MsFlowInto | undefined;
        "-ms-grid-columns"?: csstype.Property.MsGridColumns<string | number> | undefined;
        "-ms-grid-rows"?: csstype.Property.MsGridRows<string | number> | undefined;
        "-ms-high-contrast-adjust"?: csstype.Property.MsHighContrastAdjust | undefined;
        "-ms-hyphenate-limit-chars"?: csstype.Property.MsHyphenateLimitChars | undefined;
        "-ms-hyphenate-limit-lines"?: csstype.Property.MsHyphenateLimitLines | undefined;
        "-ms-hyphenate-limit-zone"?: csstype.Property.MsHyphenateLimitZone<string | number> | undefined;
        "-ms-hyphens"?: csstype.Property.Hyphens | undefined;
        "-ms-ime-align"?: csstype.Property.MsImeAlign | undefined;
        "-ms-line-break"?: csstype.Property.LineBreak | undefined;
        "-ms-order"?: csstype.Property.Order | undefined;
        "-ms-overflow-style"?: csstype.Property.MsOverflowStyle | undefined;
        "-ms-overflow-x"?: csstype.Property.OverflowX | undefined;
        "-ms-overflow-y"?: csstype.Property.OverflowY | undefined;
        "-ms-scroll-chaining"?: csstype.Property.MsScrollChaining | undefined;
        "-ms-scroll-limit-x-max"?: csstype.Property.MsScrollLimitXMax<string | number> | undefined;
        "-ms-scroll-limit-x-min"?: csstype.Property.MsScrollLimitXMin<string | number> | undefined;
        "-ms-scroll-limit-y-max"?: csstype.Property.MsScrollLimitYMax<string | number> | undefined;
        "-ms-scroll-limit-y-min"?: csstype.Property.MsScrollLimitYMin<string | number> | undefined;
        "-ms-scroll-rails"?: csstype.Property.MsScrollRails | undefined;
        "-ms-scroll-snap-points-x"?: csstype.Property.MsScrollSnapPointsX | undefined;
        "-ms-scroll-snap-points-y"?: csstype.Property.MsScrollSnapPointsY | undefined;
        "-ms-scroll-snap-type"?: csstype.Property.MsScrollSnapType | undefined;
        "-ms-scroll-translation"?: csstype.Property.MsScrollTranslation | undefined;
        "-ms-scrollbar-3dlight-color"?: csstype.Property.MsScrollbar3dlightColor | undefined;
        "-ms-scrollbar-arrow-color"?: csstype.Property.MsScrollbarArrowColor | undefined;
        "-ms-scrollbar-base-color"?: csstype.Property.MsScrollbarBaseColor | undefined;
        "-ms-scrollbar-darkshadow-color"?: csstype.Property.MsScrollbarDarkshadowColor | undefined;
        "-ms-scrollbar-face-color"?: csstype.Property.MsScrollbarFaceColor | undefined;
        "-ms-scrollbar-highlight-color"?: csstype.Property.MsScrollbarHighlightColor | undefined;
        "-ms-scrollbar-shadow-color"?: csstype.Property.MsScrollbarShadowColor | undefined;
        "-ms-scrollbar-track-color"?: csstype.Property.MsScrollbarTrackColor | undefined;
        "-ms-text-autospace"?: csstype.Property.MsTextAutospace | undefined;
        "-ms-text-combine-horizontal"?: csstype.Property.TextCombineUpright | undefined;
        "-ms-text-overflow"?: csstype.Property.TextOverflow | undefined;
        "-ms-touch-action"?: csstype.Property.TouchAction | undefined;
        "-ms-touch-select"?: csstype.Property.MsTouchSelect | undefined;
        "-ms-transform"?: csstype.Property.Transform | undefined;
        "-ms-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-ms-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-ms-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-ms-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-ms-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-ms-user-select"?: csstype.Property.MsUserSelect | undefined;
        "-ms-word-break"?: csstype.Property.WordBreak | undefined;
        "-ms-wrap-flow"?: csstype.Property.MsWrapFlow | undefined;
        "-ms-wrap-margin"?: csstype.Property.MsWrapMargin<string | number> | undefined;
        "-ms-wrap-through"?: csstype.Property.MsWrapThrough | undefined;
        "-ms-writing-mode"?: csstype.Property.WritingMode | undefined;
        "-webkit-align-content"?: csstype.Property.AlignContent | undefined;
        "-webkit-align-items"?: csstype.Property.AlignItems | undefined;
        "-webkit-align-self"?: csstype.Property.AlignSelf | undefined;
        "-webkit-animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "-webkit-animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "-webkit-animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "-webkit-animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "-webkit-animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "-webkit-animation-name"?: csstype.Property.AnimationName | undefined;
        "-webkit-animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "-webkit-animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "-webkit-appearance"?: csstype.Property.WebkitAppearance | undefined;
        "-webkit-backdrop-filter"?: csstype.Property.BackdropFilter | undefined;
        "-webkit-backface-visibility"?: csstype.Property.BackfaceVisibility | undefined;
        "-webkit-background-clip"?: csstype.Property.BackgroundClip | undefined;
        "-webkit-background-origin"?: csstype.Property.BackgroundOrigin | undefined;
        "-webkit-background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "-webkit-border-before-color"?: csstype.Property.WebkitBorderBeforeColor | undefined;
        "-webkit-border-before-style"?: csstype.Property.WebkitBorderBeforeStyle | undefined;
        "-webkit-border-before-width"?: csstype.Property.WebkitBorderBeforeWidth<string | number> | undefined;
        "-webkit-border-bottom-left-radius"?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        "-webkit-border-bottom-right-radius"?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        "-webkit-border-image-slice"?: csstype.Property.BorderImageSlice | undefined;
        "-webkit-border-top-left-radius"?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        "-webkit-border-top-right-radius"?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        "-webkit-box-decoration-break"?: csstype.Property.BoxDecorationBreak | undefined;
        "-webkit-box-reflect"?: csstype.Property.WebkitBoxReflect<string | number> | undefined;
        "-webkit-box-shadow"?: csstype.Property.BoxShadow | undefined;
        "-webkit-box-sizing"?: csstype.Property.BoxSizing | undefined;
        "-webkit-clip-path"?: csstype.Property.ClipPath | undefined;
        "-webkit-column-count"?: csstype.Property.ColumnCount | undefined;
        "-webkit-column-fill"?: csstype.Property.ColumnFill | undefined;
        "-webkit-column-rule-color"?: csstype.Property.ColumnRuleColor | undefined;
        "-webkit-column-rule-style"?: csstype.Property.ColumnRuleStyle | undefined;
        "-webkit-column-rule-width"?: csstype.Property.ColumnRuleWidth<string | number> | undefined;
        "-webkit-column-span"?: csstype.Property.ColumnSpan | undefined;
        "-webkit-column-width"?: csstype.Property.ColumnWidth<string | number> | undefined;
        "-webkit-filter"?: csstype.Property.Filter | undefined;
        "-webkit-flex-basis"?: csstype.Property.FlexBasis<string | number> | undefined;
        "-webkit-flex-direction"?: csstype.Property.FlexDirection | undefined;
        "-webkit-flex-grow"?: csstype.Property.FlexGrow | undefined;
        "-webkit-flex-shrink"?: csstype.Property.FlexShrink | undefined;
        "-webkit-flex-wrap"?: csstype.Property.FlexWrap | undefined;
        "-webkit-font-feature-settings"?: csstype.Property.FontFeatureSettings | undefined;
        "-webkit-font-kerning"?: csstype.Property.FontKerning | undefined;
        "-webkit-font-smoothing"?: csstype.Property.FontSmooth<string | number> | undefined;
        "-webkit-font-variant-ligatures"?: csstype.Property.FontVariantLigatures | undefined;
        "-webkit-hyphenate-character"?: csstype.Property.HyphenateCharacter | undefined;
        "-webkit-hyphens"?: csstype.Property.Hyphens | undefined;
        "-webkit-initial-letter"?: csstype.Property.InitialLetter | undefined;
        "-webkit-justify-content"?: csstype.Property.JustifyContent | undefined;
        "-webkit-line-break"?: csstype.Property.LineBreak | undefined;
        "-webkit-line-clamp"?: csstype.Property.WebkitLineClamp | undefined;
        "-webkit-margin-end"?: csstype.Property.MarginInlineEnd<string | number> | undefined;
        "-webkit-margin-start"?: csstype.Property.MarginInlineStart<string | number> | undefined;
        "-webkit-mask-attachment"?: csstype.Property.WebkitMaskAttachment | undefined;
        "-webkit-mask-box-image-outset"?: csstype.Property.MaskBorderOutset<string | number> | undefined;
        "-webkit-mask-box-image-repeat"?: csstype.Property.MaskBorderRepeat | undefined;
        "-webkit-mask-box-image-slice"?: csstype.Property.MaskBorderSlice | undefined;
        "-webkit-mask-box-image-source"?: csstype.Property.MaskBorderSource | undefined;
        "-webkit-mask-box-image-width"?: csstype.Property.MaskBorderWidth<string | number> | undefined;
        "-webkit-mask-clip"?: csstype.Property.WebkitMaskClip | undefined;
        "-webkit-mask-composite"?: csstype.Property.WebkitMaskComposite | undefined;
        "-webkit-mask-image"?: csstype.Property.WebkitMaskImage | undefined;
        "-webkit-mask-origin"?: csstype.Property.WebkitMaskOrigin | undefined;
        "-webkit-mask-position"?: csstype.Property.WebkitMaskPosition<string | number> | undefined;
        "-webkit-mask-position-x"?: csstype.Property.WebkitMaskPositionX<string | number> | undefined;
        "-webkit-mask-position-y"?: csstype.Property.WebkitMaskPositionY<string | number> | undefined;
        "-webkit-mask-repeat"?: csstype.Property.WebkitMaskRepeat | undefined;
        "-webkit-mask-repeat-x"?: csstype.Property.WebkitMaskRepeatX | undefined;
        "-webkit-mask-repeat-y"?: csstype.Property.WebkitMaskRepeatY | undefined;
        "-webkit-mask-size"?: csstype.Property.WebkitMaskSize<string | number> | undefined;
        "-webkit-max-inline-size"?: csstype.Property.MaxInlineSize<string | number> | undefined;
        "-webkit-order"?: csstype.Property.Order | undefined;
        "-webkit-overflow-scrolling"?: csstype.Property.WebkitOverflowScrolling | undefined;
        "-webkit-padding-end"?: csstype.Property.PaddingInlineEnd<string | number> | undefined;
        "-webkit-padding-start"?: csstype.Property.PaddingInlineStart<string | number> | undefined;
        "-webkit-perspective"?: csstype.Property.Perspective<string | number> | undefined;
        "-webkit-perspective-origin"?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        "-webkit-print-color-adjust"?: csstype.Property.PrintColorAdjust | undefined;
        "-webkit-ruby-position"?: csstype.Property.RubyPosition | undefined;
        "-webkit-scroll-snap-type"?: csstype.Property.ScrollSnapType | undefined;
        "-webkit-shape-margin"?: csstype.Property.ShapeMargin<string | number> | undefined;
        "-webkit-tap-highlight-color"?: csstype.Property.WebkitTapHighlightColor | undefined;
        "-webkit-text-combine"?: csstype.Property.TextCombineUpright | undefined;
        "-webkit-text-decoration-color"?: csstype.Property.TextDecorationColor | undefined;
        "-webkit-text-decoration-line"?: csstype.Property.TextDecorationLine | undefined;
        "-webkit-text-decoration-skip"?: csstype.Property.TextDecorationSkip | undefined;
        "-webkit-text-decoration-style"?: csstype.Property.TextDecorationStyle | undefined;
        "-webkit-text-emphasis-color"?: csstype.Property.TextEmphasisColor | undefined;
        "-webkit-text-emphasis-position"?: csstype.Property.TextEmphasisPosition | undefined;
        "-webkit-text-emphasis-style"?: csstype.Property.TextEmphasisStyle | undefined;
        "-webkit-text-fill-color"?: csstype.Property.WebkitTextFillColor | undefined;
        "-webkit-text-orientation"?: csstype.Property.TextOrientation | undefined;
        "-webkit-text-size-adjust"?: csstype.Property.TextSizeAdjust | undefined;
        "-webkit-text-stroke-color"?: csstype.Property.WebkitTextStrokeColor | undefined;
        "-webkit-text-stroke-width"?: csstype.Property.WebkitTextStrokeWidth<string | number> | undefined;
        "-webkit-text-underline-position"?: csstype.Property.TextUnderlinePosition | undefined;
        "-webkit-touch-callout"?: csstype.Property.WebkitTouchCallout | undefined;
        "-webkit-transform"?: csstype.Property.Transform | undefined;
        "-webkit-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-webkit-transform-style"?: csstype.Property.TransformStyle | undefined;
        "-webkit-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-webkit-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-webkit-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-webkit-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-webkit-user-modify"?: csstype.Property.WebkitUserModify | undefined;
        "-webkit-user-select"?: csstype.Property.UserSelect | undefined;
        "-webkit-writing-mode"?: csstype.Property.WritingMode | undefined;
        "-moz-animation"?: csstype.Property.Animation<string & {}> | undefined;
        "-moz-border-image"?: csstype.Property.BorderImage | undefined;
        "-moz-column-rule"?: csstype.Property.ColumnRule<string | number> | undefined;
        "-moz-columns"?: csstype.Property.Columns<string | number> | undefined;
        "-moz-outline-radius"?: csstype.Property.MozOutlineRadius<string | number> | undefined;
        "-ms-content-zoom-limit"?: csstype.Property.MsContentZoomLimit | undefined;
        "-ms-content-zoom-snap"?: csstype.Property.MsContentZoomSnap | undefined;
        "-ms-flex"?: csstype.Property.Flex<string | number> | undefined;
        "-ms-scroll-limit"?: csstype.Property.MsScrollLimit | undefined;
        "-ms-scroll-snap-x"?: csstype.Property.MsScrollSnapX | undefined;
        "-ms-scroll-snap-y"?: csstype.Property.MsScrollSnapY | undefined;
        "-ms-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "-webkit-animation"?: csstype.Property.Animation<string & {}> | undefined;
        "-webkit-border-before"?: csstype.Property.WebkitBorderBefore<string | number> | undefined;
        "-webkit-border-image"?: csstype.Property.BorderImage | undefined;
        "-webkit-border-radius"?: csstype.Property.BorderRadius<string | number> | undefined;
        "-webkit-column-rule"?: csstype.Property.ColumnRule<string | number> | undefined;
        "-webkit-columns"?: csstype.Property.Columns<string | number> | undefined;
        "-webkit-flex"?: csstype.Property.Flex<string | number> | undefined;
        "-webkit-flex-flow"?: csstype.Property.FlexFlow | undefined;
        "-webkit-mask"?: csstype.Property.WebkitMask<string | number> | undefined;
        "-webkit-mask-box-image"?: csstype.Property.MaskBorder | undefined;
        "-webkit-text-emphasis"?: csstype.Property.TextEmphasis | undefined;
        "-webkit-text-stroke"?: csstype.Property.WebkitTextStroke<string | number> | undefined;
        "-webkit-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "box-align"?: csstype.Property.BoxAlign | undefined;
        "box-direction"?: csstype.Property.BoxDirection | undefined;
        "box-flex"?: csstype.Property.BoxFlex | undefined;
        "box-flex-group"?: csstype.Property.BoxFlexGroup | undefined;
        "box-lines"?: csstype.Property.BoxLines | undefined;
        "box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "box-orient"?: csstype.Property.BoxOrient | undefined;
        "box-pack"?: csstype.Property.BoxPack | undefined;
        "grid-column-gap"?: csstype.Property.GridColumnGap<string | number> | undefined;
        "grid-gap"?: csstype.Property.GridGap<string | number> | undefined;
        "grid-row-gap"?: csstype.Property.GridRowGap<string | number> | undefined;
        "ime-mode"?: csstype.Property.ImeMode | undefined;
        "offset-block"?: csstype.Property.InsetBlock<string | number> | undefined;
        "offset-block-end"?: csstype.Property.InsetBlockEnd<string | number> | undefined;
        "offset-block-start"?: csstype.Property.InsetBlockStart<string | number> | undefined;
        "offset-inline"?: csstype.Property.InsetInline<string | number> | undefined;
        "offset-inline-end"?: csstype.Property.InsetInlineEnd<string | number> | undefined;
        "offset-inline-start"?: csstype.Property.InsetInlineStart<string | number> | undefined;
        "scroll-snap-coordinate"?: csstype.Property.ScrollSnapCoordinate<string | number> | undefined;
        "scroll-snap-destination"?: csstype.Property.ScrollSnapDestination<string | number> | undefined;
        "scroll-snap-points-x"?: csstype.Property.ScrollSnapPointsX | undefined;
        "scroll-snap-points-y"?: csstype.Property.ScrollSnapPointsY | undefined;
        "scroll-snap-type-x"?: csstype.Property.ScrollSnapTypeX | undefined;
        "scroll-snap-type-y"?: csstype.Property.ScrollSnapTypeY | undefined;
        "-khtml-box-align"?: csstype.Property.BoxAlign | undefined;
        "-khtml-box-direction"?: csstype.Property.BoxDirection | undefined;
        "-khtml-box-flex"?: csstype.Property.BoxFlex | undefined;
        "-khtml-box-flex-group"?: csstype.Property.BoxFlexGroup | undefined;
        "-khtml-box-lines"?: csstype.Property.BoxLines | undefined;
        "-khtml-box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "-khtml-box-orient"?: csstype.Property.BoxOrient | undefined;
        "-khtml-box-pack"?: csstype.Property.BoxPack | undefined;
        "-khtml-line-break"?: csstype.Property.LineBreak | undefined;
        "-khtml-opacity"?: csstype.Property.Opacity | undefined;
        "-khtml-user-select"?: csstype.Property.UserSelect | undefined;
        "-moz-backface-visibility"?: csstype.Property.BackfaceVisibility | undefined;
        "-moz-background-clip"?: csstype.Property.BackgroundClip | undefined;
        "-moz-background-inline-policy"?: csstype.Property.BoxDecorationBreak | undefined;
        "-moz-background-origin"?: csstype.Property.BackgroundOrigin | undefined;
        "-moz-background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "-moz-border-radius"?: csstype.Property.BorderRadius<string | number> | undefined;
        "-moz-border-radius-bottomleft"?: csstype.Property.BorderBottomLeftRadius<string | number> | undefined;
        "-moz-border-radius-bottomright"?: csstype.Property.BorderBottomRightRadius<string | number> | undefined;
        "-moz-border-radius-topleft"?: csstype.Property.BorderTopLeftRadius<string | number> | undefined;
        "-moz-border-radius-topright"?: csstype.Property.BorderTopRightRadius<string | number> | undefined;
        "-moz-box-align"?: csstype.Property.BoxAlign | undefined;
        "-moz-box-direction"?: csstype.Property.BoxDirection | undefined;
        "-moz-box-flex"?: csstype.Property.BoxFlex | undefined;
        "-moz-box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "-moz-box-orient"?: csstype.Property.BoxOrient | undefined;
        "-moz-box-pack"?: csstype.Property.BoxPack | undefined;
        "-moz-box-shadow"?: csstype.Property.BoxShadow | undefined;
        "-moz-float-edge"?: csstype.Property.MozFloatEdge | undefined;
        "-moz-force-broken-image-icon"?: csstype.Property.MozForceBrokenImageIcon | undefined;
        "-moz-opacity"?: csstype.Property.Opacity | undefined;
        "-moz-outline"?: csstype.Property.Outline<string | number> | undefined;
        "-moz-outline-color"?: csstype.Property.OutlineColor | undefined;
        "-moz-outline-style"?: csstype.Property.OutlineStyle | undefined;
        "-moz-outline-width"?: csstype.Property.OutlineWidth<string | number> | undefined;
        "-moz-perspective"?: csstype.Property.Perspective<string | number> | undefined;
        "-moz-perspective-origin"?: csstype.Property.PerspectiveOrigin<string | number> | undefined;
        "-moz-text-align-last"?: csstype.Property.TextAlignLast | undefined;
        "-moz-text-decoration-color"?: csstype.Property.TextDecorationColor | undefined;
        "-moz-text-decoration-line"?: csstype.Property.TextDecorationLine | undefined;
        "-moz-text-decoration-style"?: csstype.Property.TextDecorationStyle | undefined;
        "-moz-transform"?: csstype.Property.Transform | undefined;
        "-moz-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-moz-transform-style"?: csstype.Property.TransformStyle | undefined;
        "-moz-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "-moz-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-moz-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-moz-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-moz-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-moz-user-input"?: csstype.Property.MozUserInput | undefined;
        "-ms-ime-mode"?: csstype.Property.ImeMode | undefined;
        "-o-animation"?: csstype.Property.Animation<string & {}> | undefined;
        "-o-animation-delay"?: csstype.Property.AnimationDelay<string & {}> | undefined;
        "-o-animation-direction"?: csstype.Property.AnimationDirection | undefined;
        "-o-animation-duration"?: csstype.Property.AnimationDuration<string & {}> | undefined;
        "-o-animation-fill-mode"?: csstype.Property.AnimationFillMode | undefined;
        "-o-animation-iteration-count"?: csstype.Property.AnimationIterationCount | undefined;
        "-o-animation-name"?: csstype.Property.AnimationName | undefined;
        "-o-animation-play-state"?: csstype.Property.AnimationPlayState | undefined;
        "-o-animation-timing-function"?: csstype.Property.AnimationTimingFunction | undefined;
        "-o-background-size"?: csstype.Property.BackgroundSize<string | number> | undefined;
        "-o-border-image"?: csstype.Property.BorderImage | undefined;
        "-o-object-fit"?: csstype.Property.ObjectFit | undefined;
        "-o-object-position"?: csstype.Property.ObjectPosition<string | number> | undefined;
        "-o-tab-size"?: csstype.Property.TabSize<string | number> | undefined;
        "-o-text-overflow"?: csstype.Property.TextOverflow | undefined;
        "-o-transform"?: csstype.Property.Transform | undefined;
        "-o-transform-origin"?: csstype.Property.TransformOrigin<string | number> | undefined;
        "-o-transition"?: csstype.Property.Transition<string & {}> | undefined;
        "-o-transition-delay"?: csstype.Property.TransitionDelay<string & {}> | undefined;
        "-o-transition-duration"?: csstype.Property.TransitionDuration<string & {}> | undefined;
        "-o-transition-property"?: csstype.Property.TransitionProperty | undefined;
        "-o-transition-timing-function"?: csstype.Property.TransitionTimingFunction | undefined;
        "-webkit-box-align"?: csstype.Property.BoxAlign | undefined;
        "-webkit-box-direction"?: csstype.Property.BoxDirection | undefined;
        "-webkit-box-flex"?: csstype.Property.BoxFlex | undefined;
        "-webkit-box-flex-group"?: csstype.Property.BoxFlexGroup | undefined;
        "-webkit-box-lines"?: csstype.Property.BoxLines | undefined;
        "-webkit-box-ordinal-group"?: csstype.Property.BoxOrdinalGroup | undefined;
        "-webkit-box-orient"?: csstype.Property.BoxOrient | undefined;
        "-webkit-box-pack"?: csstype.Property.BoxPack | undefined;
        "alignment-baseline"?: csstype.Property.AlignmentBaseline | undefined;
        "baseline-shift"?: csstype.Property.BaselineShift<string | number> | undefined;
        "clip-rule"?: csstype.Property.ClipRule | undefined;
        "color-interpolation"?: csstype.Property.ColorInterpolation | undefined;
        "color-rendering"?: csstype.Property.ColorRendering | undefined;
        "dominant-baseline"?: csstype.Property.DominantBaseline | undefined;
        "fill-opacity"?: csstype.Property.FillOpacity | undefined;
        "fill-rule"?: csstype.Property.FillRule | undefined;
        "flood-color"?: csstype.Property.FloodColor | undefined;
        "flood-opacity"?: csstype.Property.FloodOpacity | undefined;
        "glyph-orientation-vertical"?: csstype.Property.GlyphOrientationVertical | undefined;
        "lighting-color"?: csstype.Property.LightingColor | undefined;
        "marker-end"?: csstype.Property.MarkerEnd | undefined;
        "marker-mid"?: csstype.Property.MarkerMid | undefined;
        "marker-start"?: csstype.Property.MarkerStart | undefined;
        "shape-rendering"?: csstype.Property.ShapeRendering | undefined;
        "stop-color"?: csstype.Property.StopColor | undefined;
        "stop-opacity"?: csstype.Property.StopOpacity | undefined;
        "stroke-dasharray"?: csstype.Property.StrokeDasharray<string | number> | undefined;
        "stroke-dashoffset"?: csstype.Property.StrokeDashoffset<string | number> | undefined;
        "stroke-linecap"?: csstype.Property.StrokeLinecap | undefined;
        "stroke-linejoin"?: csstype.Property.StrokeLinejoin | undefined;
        "stroke-miterlimit"?: csstype.Property.StrokeMiterlimit | undefined;
        "stroke-opacity"?: csstype.Property.StrokeOpacity | undefined;
        "stroke-width"?: csstype.Property.StrokeWidth<string | number> | undefined;
        "text-anchor"?: csstype.Property.TextAnchor | undefined;
        "vector-effect"?: csstype.Property.VectorEffect | undefined;
    };
    transform: {
        x?: TransformValue | TransformValue[] | undefined;
        y?: TransformValue | TransformValue[] | undefined;
        z?: TransformValue | TransformValue[] | undefined;
        translateX?: TransformValue | TransformValue[] | undefined;
        translateY?: TransformValue | TransformValue[] | undefined;
        translateZ?: TransformValue | TransformValue[] | undefined;
        rotate?: TransformValue | TransformValue[] | undefined;
        rotateX?: TransformValue | TransformValue[] | undefined;
        rotateY?: TransformValue | TransformValue[] | undefined;
        rotateZ?: TransformValue | TransformValue[] | undefined;
        scale?: TransformValue | TransformValue[] | undefined;
        scaleX?: TransformValue | TransformValue[] | undefined;
        scaleY?: TransformValue | TransformValue[] | undefined;
        scaleZ?: TransformValue | TransformValue[] | undefined;
        skew?: TransformValue | TransformValue[] | undefined;
        skewX?: TransformValue | TransformValue[] | undefined;
        skewY?: TransformValue | TransformValue[] | undefined;
        originX?: TransformValue | TransformValue[] | undefined;
        originY?: TransformValue | TransformValue[] | undefined;
        originZ?: TransformValue | TransformValue[] | undefined;
        perspective?: TransformValue | TransformValue[] | undefined;
        transformPerspective?: TransformValue | TransformValue[] | undefined;
    };
};

declare function useMotions(): MotionInstanceBindings<string, MotionVariants<never>>;

/**
 * A Composable holding all the ongoing transitions in a local reference.
 */
declare function useMotionTransitions(): MotionTransitions;

/**
 * A Composable handling variants selection and features.
 */
declare function useMotionVariants<T extends string, V extends MotionVariants<T>>(variants?: MaybeRef<V>): {
    state: vue.ComputedRef<Variant | undefined>;
    variant: Ref<keyof V>;
};

type UseSpringOptions = Partial<Spring> & {
    target?: MaybeRef$1<PermissiveTarget>;
};
declare function useSpring(values: Partial<PermissiveMotionProperties>, spring?: UseSpringOptions): SpringControls;

/**
 * Reactive prefers-reduced-motion.
 */
declare function useReducedMotion(options?: {
    window?: Window;
}): Ref<boolean>;

export { type CustomValueType, type Easing, type EasingFunction, type Inertia, type Keyframes, type KeyframesTarget, type MakeCustomValueType, type MakeKeyframes, type ModuleOptions, _default$1 as MotionComponent, type MotionControls, directive as MotionDirective, _default as MotionGroupComponent, type MotionInstance, type MotionInstanceBindings, MotionPlugin, type MotionPluginOptions, type MotionProperties, type MotionTarget, type MotionTransitions, type MotionValuesMap, type MotionVariants, type Omit, type Orchestration, type PassiveEffect, type PermissiveMotionProperties, type PermissiveTarget, type PermissiveTransitionDefinition, type PopmotionTransitionProps, type PropertiesKeys, type Props, type Repeat, type ResolvedKeyframesTarget, type ResolvedSingleTarget, type ResolvedValueTarget, type SVGPathProperties, type SingleTarget, type Spring, type SpringControls, type StartAnimation, type StopAnimation, type StyleProperties, type Subscriber, type Target, type TargetAndTransition, type TargetResolver, type TargetWithKeyframes, type TransformProperties, type TransformValue, type Transformer, type Transition, type TransitionDefinition, type TransitionMap, type Tween, type UseMotionOptions, type ValueTarget, type Variant, fade, fadeVisible, fadeVisibleOnce, isMotionInstance, pop, popVisible, popVisibleOnce, reactiveStyle, reactiveTransform, rollBottom, rollLeft, rollRight, rollTop, rollVisibleBottom, rollVisibleLeft, rollVisibleOnceBottom, rollVisibleOnceLeft, rollVisibleOnceRight, rollVisibleOnceTop, rollVisibleRight, rollVisibleTop, slideBottom, slideLeft, slideRight, slideTop, slideVisibleBottom, slideVisibleLeft, slideVisibleOnceBottom, slideVisibleOnceLeft, slideVisibleOnceRight, slideVisibleOnceTop, slideVisibleRight, slideVisibleTop, slugify, useElementStyle, useElementTransform, useMotion, useMotionControls, useMotionFeatures, useMotionProperties, useMotionTransitions, useMotionVariants, useMotions, useReducedMotion, useSpring };
