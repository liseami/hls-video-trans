import type { AutocompleteData } from './autocomplete';
import type { StyleValue } from 'vue';
declare function __VLS_template(): {
    prepend?(_: {}): any;
    append?(_: {}): any;
    prefix?(_: {}): any;
    suffix?(_: {}): any;
    loading?(_: {}): any;
    default?(_: {
        item: Record<string, any>;
    }): any;
};
declare const __VLS_component: import("vue").DefineComponent<{
    readonly ariaLabel: StringConstructor;
    readonly valueKey: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "value", boolean>;
    readonly modelValue: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
    readonly debounce: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
    readonly placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("@popperjs/core").Placement) | ((new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("@popperjs/core").Placement))[], "top" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end", unknown, "bottom-start", boolean>;
    readonly fetchSuggestions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => AutocompleteData | ((queryString: string, cb: import("./autocomplete").AutocompleteFetchSuggestionsCallback) => import("element-plus/es/utils").Awaitable<AutocompleteData> | void)) | (() => import("./autocomplete").AutocompleteFetchSuggestions) | ((new (...args: any[]) => AutocompleteData | ((queryString: string, cb: import("./autocomplete").AutocompleteFetchSuggestionsCallback) => import("element-plus/es/utils").Awaitable<AutocompleteData> | void)) | (() => import("./autocomplete").AutocompleteFetchSuggestions))[], unknown, unknown, () => void, boolean>;
    readonly popperClass: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly triggerOnFocus: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly selectWhenUnmatched: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly hideLoading: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly highlightFirstItem: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly fitInputWidth: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly clearable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly disabled: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly name: StringConstructor;
}, {
    /** @description the index of the currently highlighted item */
    highlightedIndex: import("vue").Ref<number>;
    /** @description autocomplete whether activated */
    activated: import("vue").Ref<boolean>;
    /** @description remote search loading status */
    loading: import("vue").Ref<boolean>;
    /** @description el-input component instance */
    inputRef: import("vue").Ref<({
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            readonly disabled: boolean;
            readonly id: string;
            readonly type: string;
            readonly modelValue: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>;
            readonly tabindex: import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
            readonly readonly: boolean;
            readonly autosize: import("element-plus/es/components/input").InputAutoSize;
            readonly autocomplete: string;
            readonly containerRole: string;
            readonly validateEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            readonly inputStyle: StyleValue;
            readonly rows: number;
            readonly clearable: boolean;
            readonly showPassword: boolean;
            readonly showWordLimit: boolean;
            readonly autofocus: boolean;
        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
            readonly ariaLabel: StringConstructor;
            readonly id: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
            readonly size: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly disabled: BooleanConstructor;
            readonly modelValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown, "", boolean>;
            readonly maxlength: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly minlength: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "text", boolean>;
            readonly resize: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "none" | "both" | "horizontal" | "vertical", unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly autosize: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean | {
                minRows?: number;
                maxRows?: number;
            }) | (() => import("element-plus/es/components/input").InputAutoSize) | ((new (...args: any[]) => boolean | {
                minRows?: number;
                maxRows?: number;
            }) | (() => import("element-plus/es/components/input").InputAutoSize))[], unknown, unknown, false, boolean>;
            readonly autocomplete: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "off", boolean>;
            readonly formatter: {
                readonly type: import("vue").PropType<Function>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly parser: {
                readonly type: import("vue").PropType<Function>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly placeholder: {
                readonly type: import("vue").PropType<string>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly form: {
                readonly type: import("vue").PropType<string>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly readonly: BooleanConstructor;
            readonly clearable: BooleanConstructor;
            readonly showPassword: BooleanConstructor;
            readonly showWordLimit: BooleanConstructor;
            readonly suffixIcon: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly prefixIcon: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly containerRole: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
            readonly tabindex: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
            readonly validateEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            readonly inputStyle: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
            readonly autofocus: BooleanConstructor;
            readonly rows: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
        }>> & {
            "onUpdate:modelValue"?: ((value: string) => any) | undefined;
            onChange?: ((value: string) => any) | undefined;
            onCompositionend?: ((evt: CompositionEvent) => any) | undefined;
            onCompositionstart?: ((evt: CompositionEvent) => any) | undefined;
            onCompositionupdate?: ((evt: CompositionEvent) => any) | undefined;
            onFocus?: ((evt: FocusEvent) => any) | undefined;
            onBlur?: ((evt: FocusEvent) => any) | undefined;
            onInput?: ((value: string) => any) | undefined;
            onKeydown?: ((evt: Event | KeyboardEvent) => any) | undefined;
            onMouseenter?: ((evt: MouseEvent) => any) | undefined;
            onMouseleave?: ((evt: MouseEvent) => any) | undefined;
            onClear?: (() => any) | undefined;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "disabled" | "id" | "type" | "modelValue" | "tabindex" | "readonly" | "autosize" | "autocomplete" | "containerRole" | "validateEvent" | "inputStyle" | "rows" | "clearable" | "showPassword" | "showWordLimit" | "autofocus">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: import("vue").Slots;
        $root: import("vue").ComponentPublicInstance | null;
        $parent: import("vue").ComponentPublicInstance | null;
        $emit: ((event: "input", value: string) => void) & ((event: "clear") => void) & ((event: "update:modelValue", value: string) => void) & ((event: "change", value: string) => void) & ((event: "blur", evt: FocusEvent) => void) & ((event: "compositionend", evt: CompositionEvent) => void) & ((event: "compositionstart", evt: CompositionEvent) => void) & ((event: "compositionupdate", evt: CompositionEvent) => void) & ((event: "focus", evt: FocusEvent) => void) & ((event: "keydown", evt: Event | KeyboardEvent) => void) & ((event: "mouseenter", evt: MouseEvent) => void) & ((event: "mouseleave", evt: MouseEvent) => void);
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            readonly ariaLabel: StringConstructor;
            readonly id: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
            readonly size: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly disabled: BooleanConstructor;
            readonly modelValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown, "", boolean>;
            readonly maxlength: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly minlength: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "text", boolean>;
            readonly resize: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "none" | "both" | "horizontal" | "vertical", unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly autosize: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean | {
                minRows?: number;
                maxRows?: number;
            }) | (() => import("element-plus/es/components/input").InputAutoSize) | ((new (...args: any[]) => boolean | {
                minRows?: number;
                maxRows?: number;
            }) | (() => import("element-plus/es/components/input").InputAutoSize))[], unknown, unknown, false, boolean>;
            readonly autocomplete: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "off", boolean>;
            readonly formatter: {
                readonly type: import("vue").PropType<Function>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly parser: {
                readonly type: import("vue").PropType<Function>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly placeholder: {
                readonly type: import("vue").PropType<string>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly form: {
                readonly type: import("vue").PropType<string>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly readonly: BooleanConstructor;
            readonly clearable: BooleanConstructor;
            readonly showPassword: BooleanConstructor;
            readonly showWordLimit: BooleanConstructor;
            readonly suffixIcon: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly prefixIcon: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly containerRole: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
            readonly tabindex: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
            readonly validateEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            readonly inputStyle: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
            readonly autofocus: BooleanConstructor;
            readonly rows: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
        }>> & {
            "onUpdate:modelValue"?: ((value: string) => any) | undefined;
            onChange?: ((value: string) => any) | undefined;
            onCompositionend?: ((evt: CompositionEvent) => any) | undefined;
            onCompositionstart?: ((evt: CompositionEvent) => any) | undefined;
            onCompositionupdate?: ((evt: CompositionEvent) => any) | undefined;
            onFocus?: ((evt: FocusEvent) => any) | undefined;
            onBlur?: ((evt: FocusEvent) => any) | undefined;
            onInput?: ((value: string) => any) | undefined;
            onKeydown?: ((evt: Event | KeyboardEvent) => any) | undefined;
            onMouseenter?: ((evt: MouseEvent) => any) | undefined;
            onMouseleave?: ((evt: MouseEvent) => any) | undefined;
            onClear?: (() => any) | undefined;
        }, {
            input: import("vue").ShallowRef<HTMLInputElement | undefined>;
            textarea: import("vue").ShallowRef<HTMLTextAreaElement | undefined>;
            ref: import("vue").ComputedRef<HTMLInputElement | HTMLTextAreaElement | undefined>;
            textareaStyle: import("vue").ComputedRef<StyleValue>;
            autosize: import("vue").Ref<import("element-plus/es/components/input").InputAutoSize>;
            isComposing: import("vue").Ref<boolean>;
            focus: () => void | undefined;
            blur: () => void | undefined;
            select: () => void;
            clear: () => void;
            resizeTextarea: () => void;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            input: (value: string) => void;
            clear: () => void;
            "update:modelValue": (value: string) => void;
            change: (value: string) => void;
            blur: (evt: FocusEvent) => void;
            compositionend: (evt: CompositionEvent) => void;
            compositionstart: (evt: CompositionEvent) => void;
            compositionupdate: (evt: CompositionEvent) => void;
            focus: (evt: FocusEvent) => void;
            keydown: (evt: Event | KeyboardEvent) => void;
            mouseenter: (evt: MouseEvent) => void;
            mouseleave: (evt: MouseEvent) => void;
        }, string, {
            readonly disabled: boolean;
            readonly id: string;
            readonly type: string;
            readonly modelValue: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>;
            readonly tabindex: import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
            readonly readonly: boolean;
            readonly autosize: import("element-plus/es/components/input").InputAutoSize;
            readonly autocomplete: string;
            readonly containerRole: string;
            readonly validateEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            readonly inputStyle: StyleValue;
            readonly rows: number;
            readonly clearable: boolean;
            readonly showPassword: boolean;
            readonly showWordLimit: boolean;
            readonly autofocus: boolean;
        }> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
        readonly ariaLabel: StringConstructor;
        readonly id: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
        readonly size: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly disabled: BooleanConstructor;
        readonly modelValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown, "", boolean>;
        readonly maxlength: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly minlength: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "text", boolean>;
        readonly resize: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "none" | "both" | "horizontal" | "vertical", unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly autosize: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean | {
            minRows?: number;
            maxRows?: number;
        }) | (() => import("element-plus/es/components/input").InputAutoSize) | ((new (...args: any[]) => boolean | {
            minRows?: number;
            maxRows?: number;
        }) | (() => import("element-plus/es/components/input").InputAutoSize))[], unknown, unknown, false, boolean>;
        readonly autocomplete: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "off", boolean>;
        readonly formatter: {
            readonly type: import("vue").PropType<Function>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly parser: {
            readonly type: import("vue").PropType<Function>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly placeholder: {
            readonly type: import("vue").PropType<string>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly form: {
            readonly type: import("vue").PropType<string>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly readonly: BooleanConstructor;
        readonly clearable: BooleanConstructor;
        readonly showPassword: BooleanConstructor;
        readonly showWordLimit: BooleanConstructor;
        readonly suffixIcon: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly prefixIcon: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly containerRole: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
        readonly tabindex: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
        readonly validateEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
        readonly inputStyle: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
        readonly autofocus: BooleanConstructor;
        readonly rows: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
    }>> & {
        "onUpdate:modelValue"?: ((value: string) => any) | undefined;
        onChange?: ((value: string) => any) | undefined;
        onCompositionend?: ((evt: CompositionEvent) => any) | undefined;
        onCompositionstart?: ((evt: CompositionEvent) => any) | undefined;
        onCompositionupdate?: ((evt: CompositionEvent) => any) | undefined;
        onFocus?: ((evt: FocusEvent) => any) | undefined;
        onBlur?: ((evt: FocusEvent) => any) | undefined;
        onInput?: ((value: string) => any) | undefined;
        onKeydown?: ((evt: Event | KeyboardEvent) => any) | undefined;
        onMouseenter?: ((evt: MouseEvent) => any) | undefined;
        onMouseleave?: ((evt: MouseEvent) => any) | undefined;
        onClear?: (() => any) | undefined;
    } & import("vue").ShallowUnwrapRef<{
        input: import("vue").ShallowRef<HTMLInputElement | undefined>;
        textarea: import("vue").ShallowRef<HTMLTextAreaElement | undefined>;
        ref: import("vue").ComputedRef<HTMLInputElement | HTMLTextAreaElement | undefined>;
        textareaStyle: import("vue").ComputedRef<StyleValue>;
        autosize: import("vue").Ref<import("element-plus/es/components/input").InputAutoSize>;
        isComposing: import("vue").Ref<boolean>;
        focus: () => void | undefined;
        blur: () => void | undefined;
        select: () => void;
        clear: () => void;
        resizeTextarea: () => void;
    }> & {} & import("vue").ComponentCustomProperties & {
        $slots: {
            prepend?(_: {}): any;
            prefix?(_: {}): any;
            suffix?(_: {}): any;
            append?(_: {}): any;
        };
    }) | undefined>;
    /** @description el-tooltip component instance */
    popperRef: import("vue").Ref<({
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            disabled: boolean;
            content: string;
            offset: number;
            visible: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown>;
            open: boolean;
            placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
            strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
            effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
            showAfter: number;
            hideAfter: number;
            autoClose: number;
            role: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown>;
            trigger: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>) | ((new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>))[], unknown, unknown>;
            arrowOffset: number;
            virtualTriggering: boolean;
            boundariesPadding: number;
            fallbackPlacements: import("@popperjs/core").Placement[];
            gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            popperOptions: Partial<import("@popperjs/core").Options>;
            enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            pure: boolean;
            triggerKeys: string[];
            teleported: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            rawContent: boolean;
            persistent: boolean;
            showArrow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
            showArrow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
            arrowOffset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
            disabled: BooleanConstructor;
            trigger: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>) | ((new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>))[], unknown, unknown, "hover", boolean>;
            triggerKeys: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | ((new (...args: any[]) => string[]) | (() => string[]))[], unknown, unknown, () => string[], boolean>;
            virtualRef: {
                readonly type: import("vue").PropType<import("element-plus/es/element-plus").Measurable>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            virtualTriggering: BooleanConstructor;
            onMouseenter: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onMouseleave: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onClick: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onKeydown: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onFocus: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onBlur: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onContextmenu: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            id: StringConstructor;
            open: BooleanConstructor;
            ariaLabel: StringConstructor;
            appendTo: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            content: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
            rawContent: BooleanConstructor;
            persistent: BooleanConstructor;
            visible: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown, null, boolean>;
            transition: StringConstructor;
            teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            style: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            className: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
            enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            pure: BooleanConstructor;
            focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
            trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
            popperClass: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            popperStyle: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            referenceEl: {
                readonly type: import("vue").PropType<HTMLElement>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            triggerTargetEl: {
                readonly type: import("vue").PropType<HTMLElement>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            zIndex: NumberConstructor;
            boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
            gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
            placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
            popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
            strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
            showAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            hideAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
            autoClose: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            "onUpdate:visible": {
                readonly type: import("vue").PropType<(val: boolean) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            role: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown, "tooltip", boolean>;
        }>> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "disabled" | "content" | "offset" | "visible" | "open" | "placement" | "strategy" | "effect" | "showAfter" | "hideAfter" | "autoClose" | "role" | "trigger" | "arrowOffset" | "virtualTriggering" | "boundariesPadding" | "fallbackPlacements" | "gpuAcceleration" | "popperOptions" | "enterable" | "focusOnShow" | "trapping" | "stopPopperMouseEvent" | "pure" | "triggerKeys" | "teleported" | "rawContent" | "persistent" | "showArrow">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: import("vue").Slots;
        $root: import("vue").ComponentPublicInstance | null;
        $parent: import("vue").ComponentPublicInstance | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            showArrow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
            arrowOffset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
            disabled: BooleanConstructor;
            trigger: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>) | ((new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>))[], unknown, unknown, "hover", boolean>;
            triggerKeys: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | ((new (...args: any[]) => string[]) | (() => string[]))[], unknown, unknown, () => string[], boolean>;
            virtualRef: {
                readonly type: import("vue").PropType<import("element-plus/es/element-plus").Measurable>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            virtualTriggering: BooleanConstructor;
            onMouseenter: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onMouseleave: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onClick: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onKeydown: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onFocus: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onBlur: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            onContextmenu: {
                readonly type: import("vue").PropType<(e: Event) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            id: StringConstructor;
            open: BooleanConstructor;
            ariaLabel: StringConstructor;
            appendTo: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            content: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
            rawContent: BooleanConstructor;
            persistent: BooleanConstructor;
            visible: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown, null, boolean>;
            transition: StringConstructor;
            teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            style: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            className: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
            enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            pure: BooleanConstructor;
            focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
            trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
            popperClass: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            popperStyle: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            referenceEl: {
                readonly type: import("vue").PropType<HTMLElement>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            triggerTargetEl: {
                readonly type: import("vue").PropType<HTMLElement>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            zIndex: NumberConstructor;
            boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
            gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
            placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
            popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
            strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
            showAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            hideAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
            autoClose: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            "onUpdate:visible": {
                readonly type: import("vue").PropType<(val: boolean) => void>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            role: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown, "tooltip", boolean>;
        }>>, {
            popperRef: import("vue").Ref<({
                $: import("vue").ComponentInternalInstance;
                $data: {};
                $props: Partial<{
                    readonly role: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown>;
                }> & Omit<Readonly<import("vue").ExtractPropTypes<{
                    readonly role: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown, "tooltip", boolean>;
                }>> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "role">;
                $attrs: {
                    [x: string]: unknown;
                };
                $refs: {
                    [x: string]: unknown;
                };
                $slots: import("vue").Slots;
                $root: import("vue").ComponentPublicInstance | null;
                $parent: import("vue").ComponentPublicInstance | null;
                $emit: (event: string, ...args: any[]) => void;
                $el: any;
                $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
                    readonly role: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown, "tooltip", boolean>;
                }>>, {
                    triggerRef: import("vue").Ref<import("element-plus/es/element-plus").Measurable | undefined>;
                    contentRef: import("vue").Ref<HTMLElement | undefined>;
                    popperInstanceRef: import("vue").Ref<import("@popperjs/core").Instance | undefined>;
                    referenceRef: import("vue").Ref<import("element-plus/es/element-plus").Measurable | undefined>;
                    role: import("vue").ComputedRef<string>;
                }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
                    readonly role: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown>;
                }> & {
                    beforeCreate?: (() => void) | (() => void)[];
                    created?: (() => void) | (() => void)[];
                    beforeMount?: (() => void) | (() => void)[];
                    mounted?: (() => void) | (() => void)[];
                    beforeUpdate?: (() => void) | (() => void)[];
                    updated?: (() => void) | (() => void)[];
                    activated?: (() => void) | (() => void)[];
                    deactivated?: (() => void) | (() => void)[];
                    beforeDestroy?: (() => void) | (() => void)[];
                    beforeUnmount?: (() => void) | (() => void)[];
                    destroyed?: (() => void) | (() => void)[];
                    unmounted?: (() => void) | (() => void)[];
                    renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                    renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                    errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
                };
                $forceUpdate: () => void;
                $nextTick: typeof import("vue").nextTick;
                $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
            } & Readonly<import("vue").ExtractPropTypes<{
                readonly role: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown, "tooltip", boolean>;
            }>> & import("vue").ShallowUnwrapRef<{
                triggerRef: import("vue").Ref<import("element-plus/es/element-plus").Measurable | undefined>;
                contentRef: import("vue").Ref<HTMLElement | undefined>;
                popperInstanceRef: import("vue").Ref<import("@popperjs/core").Instance | undefined>;
                referenceRef: import("vue").Ref<import("element-plus/es/element-plus").Measurable | undefined>;
                role: import("vue").ComputedRef<string>;
            }> & {} & import("vue").ComponentCustomProperties & {
                $slots: {
                    default?(_: {}): any;
                };
            }) | undefined>;
            contentRef: import("vue").Ref<({
                $: import("vue").ComponentInternalInstance;
                $data: {};
                $props: Partial<{
                    readonly disabled: boolean;
                    readonly content: string;
                    readonly offset: number;
                    readonly visible: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown>;
                    readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                    readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                    readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                    readonly showAfter: number;
                    readonly hideAfter: number;
                    readonly autoClose: number;
                    readonly virtualTriggering: boolean;
                    readonly boundariesPadding: number;
                    readonly fallbackPlacements: import("@popperjs/core").Placement[];
                    readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly popperOptions: Partial<import("@popperjs/core").Options>;
                    readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly pure: boolean;
                    readonly teleported: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly rawContent: boolean;
                    readonly persistent: boolean;
                }> & Omit<Readonly<import("vue").ExtractPropTypes<{
                    readonly ariaLabel: StringConstructor;
                    readonly appendTo: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly content: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
                    readonly rawContent: BooleanConstructor;
                    readonly persistent: BooleanConstructor;
                    readonly visible: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown, null, boolean>;
                    readonly transition: StringConstructor;
                    readonly teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly disabled: BooleanConstructor;
                    readonly id: StringConstructor;
                    readonly style: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly className: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                    readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly pure: BooleanConstructor;
                    readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly popperClass: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly popperStyle: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly referenceEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly triggerTargetEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly virtualTriggering: BooleanConstructor;
                    readonly zIndex: NumberConstructor;
                    readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                    readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                    readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                    readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                    readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                    readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                    readonly showAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                    readonly hideAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
                    readonly autoClose: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                }>> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "disabled" | "content" | "offset" | "visible" | "placement" | "strategy" | "effect" | "showAfter" | "hideAfter" | "autoClose" | "virtualTriggering" | "boundariesPadding" | "fallbackPlacements" | "gpuAcceleration" | "popperOptions" | "enterable" | "focusOnShow" | "trapping" | "stopPopperMouseEvent" | "pure" | "teleported" | "rawContent" | "persistent">;
                $attrs: {
                    [x: string]: unknown;
                };
                $refs: {
                    [x: string]: unknown;
                };
                $slots: import("vue").Slots;
                $root: import("vue").ComponentPublicInstance | null;
                $parent: import("vue").ComponentPublicInstance | null;
                $emit: (event: string, ...args: any[]) => void;
                $el: any;
                $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
                    readonly ariaLabel: StringConstructor;
                    readonly appendTo: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly content: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
                    readonly rawContent: BooleanConstructor;
                    readonly persistent: BooleanConstructor;
                    readonly visible: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown, null, boolean>;
                    readonly transition: StringConstructor;
                    readonly teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly disabled: BooleanConstructor;
                    readonly id: StringConstructor;
                    readonly style: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly className: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                    readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly pure: BooleanConstructor;
                    readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly popperClass: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly popperStyle: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly referenceEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly triggerTargetEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly virtualTriggering: BooleanConstructor;
                    readonly zIndex: NumberConstructor;
                    readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                    readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                    readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                    readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                    readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                    readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                    readonly showAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                    readonly hideAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
                    readonly autoClose: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                }>>, {
                    contentRef: import("vue").Ref<({
                        $: import("vue").ComponentInternalInstance;
                        $data: {};
                        $props: Partial<{
                            readonly offset: number;
                            readonly visible: boolean;
                            readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                            readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                            readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                            readonly virtualTriggering: boolean;
                            readonly boundariesPadding: number;
                            readonly fallbackPlacements: import("@popperjs/core").Placement[];
                            readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                            readonly popperOptions: Partial<import("@popperjs/core").Options>;
                            readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                            readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                            readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                            readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                            readonly pure: boolean;
                        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
                            readonly ariaLabel: StringConstructor;
                            readonly id: StringConstructor;
                            readonly style: {
                                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly className: {
                                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                            readonly visible: BooleanConstructor;
                            readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                            readonly pure: BooleanConstructor;
                            readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                            readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                            readonly popperClass: {
                                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly popperStyle: {
                                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly referenceEl: {
                                readonly type: import("vue").PropType<HTMLElement>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly triggerTargetEl: {
                                readonly type: import("vue").PropType<HTMLElement>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                            readonly virtualTriggering: BooleanConstructor;
                            readonly zIndex: NumberConstructor;
                            readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                            readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                            readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                            readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                            readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                            readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                            readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                        }>> & {
                            onFocus?: (() => any) | undefined;
                            onBlur?: (() => any) | undefined;
                            onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                            onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                            onClose?: (() => any) | undefined;
                        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "offset" | "visible" | "placement" | "strategy" | "effect" | "virtualTriggering" | "boundariesPadding" | "fallbackPlacements" | "gpuAcceleration" | "popperOptions" | "enterable" | "focusOnShow" | "trapping" | "stopPopperMouseEvent" | "pure">;
                        $attrs: {
                            [x: string]: unknown;
                        };
                        $refs: {
                            [x: string]: unknown;
                        };
                        $slots: import("vue").Slots;
                        $root: import("vue").ComponentPublicInstance | null;
                        $parent: import("vue").ComponentPublicInstance | null;
                        $emit: ((event: "blur") => void) & ((event: "close") => void) & ((event: "focus") => void) & ((event: "mouseenter", evt: MouseEvent) => void) & ((event: "mouseleave", evt: MouseEvent) => void);
                        $el: any;
                        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
                            readonly ariaLabel: StringConstructor;
                            readonly id: StringConstructor;
                            readonly style: {
                                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly className: {
                                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                            readonly visible: BooleanConstructor;
                            readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                            readonly pure: BooleanConstructor;
                            readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                            readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                            readonly popperClass: {
                                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | (string | {
                                    [x: string]: boolean;
                                } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly popperStyle: {
                                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly referenceEl: {
                                readonly type: import("vue").PropType<HTMLElement>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly triggerTargetEl: {
                                readonly type: import("vue").PropType<HTMLElement>;
                                readonly required: false;
                                readonly validator: ((val: unknown) => boolean) | undefined;
                                __epPropKey: true;
                            };
                            readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                            readonly virtualTriggering: BooleanConstructor;
                            readonly zIndex: NumberConstructor;
                            readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                            readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                            readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                            readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                            readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                            readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                            readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                        }>> & {
                            onFocus?: (() => any) | undefined;
                            onBlur?: (() => any) | undefined;
                            onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                            onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                            onClose?: (() => any) | undefined;
                        }, {
                            popperContentRef: import("vue").Ref<HTMLElement | undefined>;
                            popperInstanceRef: import("vue").ComputedRef<import("@popperjs/core").Instance | undefined>;
                            updatePopper: (shouldUpdateZIndex?: boolean) => void;
                            contentStyle: import("vue").ComputedRef<StyleValue[]>;
                        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
                            blur: () => void;
                            close: () => void;
                            focus: () => void;
                            mouseenter: (evt: MouseEvent) => void;
                            mouseleave: (evt: MouseEvent) => void;
                        }, string, {
                            readonly offset: number;
                            readonly visible: boolean;
                            readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                            readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                            readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                            readonly virtualTriggering: boolean;
                            readonly boundariesPadding: number;
                            readonly fallbackPlacements: import("@popperjs/core").Placement[];
                            readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                            readonly popperOptions: Partial<import("@popperjs/core").Options>;
                            readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                            readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                            readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                            readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                            readonly pure: boolean;
                        }> & {
                            beforeCreate?: (() => void) | (() => void)[];
                            created?: (() => void) | (() => void)[];
                            beforeMount?: (() => void) | (() => void)[];
                            mounted?: (() => void) | (() => void)[];
                            beforeUpdate?: (() => void) | (() => void)[];
                            updated?: (() => void) | (() => void)[];
                            activated?: (() => void) | (() => void)[];
                            deactivated?: (() => void) | (() => void)[];
                            beforeDestroy?: (() => void) | (() => void)[];
                            beforeUnmount?: (() => void) | (() => void)[];
                            destroyed?: (() => void) | (() => void)[];
                            unmounted?: (() => void) | (() => void)[];
                            renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                            renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                            errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
                        };
                        $forceUpdate: () => void;
                        $nextTick: typeof import("vue").nextTick;
                        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
                    } & Readonly<import("vue").ExtractPropTypes<{
                        readonly ariaLabel: StringConstructor;
                        readonly id: StringConstructor;
                        readonly style: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly className: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                        readonly visible: BooleanConstructor;
                        readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly pure: BooleanConstructor;
                        readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                        readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                        readonly popperClass: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly popperStyle: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly referenceEl: {
                            readonly type: import("vue").PropType<HTMLElement>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly triggerTargetEl: {
                            readonly type: import("vue").PropType<HTMLElement>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly virtualTriggering: BooleanConstructor;
                        readonly zIndex: NumberConstructor;
                        readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                        readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                        readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                        readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                        readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                        readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                    }>> & {
                        onFocus?: (() => any) | undefined;
                        onBlur?: (() => any) | undefined;
                        onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                        onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                        onClose?: (() => any) | undefined;
                    } & import("vue").ShallowUnwrapRef<{
                        popperContentRef: import("vue").Ref<HTMLElement | undefined>;
                        popperInstanceRef: import("vue").ComputedRef<import("@popperjs/core").Instance | undefined>;
                        updatePopper: (shouldUpdateZIndex?: boolean) => void;
                        contentStyle: import("vue").ComputedRef<StyleValue[]>;
                    }> & {} & import("vue").ComponentCustomProperties & {
                        $slots: {
                            default?(_: {}): any;
                        };
                    }) | undefined>;
                }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
                    readonly disabled: boolean;
                    readonly content: string;
                    readonly offset: number;
                    readonly visible: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown>;
                    readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                    readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                    readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                    readonly showAfter: number;
                    readonly hideAfter: number;
                    readonly autoClose: number;
                    readonly virtualTriggering: boolean;
                    readonly boundariesPadding: number;
                    readonly fallbackPlacements: import("@popperjs/core").Placement[];
                    readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly popperOptions: Partial<import("@popperjs/core").Options>;
                    readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly pure: boolean;
                    readonly teleported: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly rawContent: boolean;
                    readonly persistent: boolean;
                }> & {
                    beforeCreate?: (() => void) | (() => void)[];
                    created?: (() => void) | (() => void)[];
                    beforeMount?: (() => void) | (() => void)[];
                    mounted?: (() => void) | (() => void)[];
                    beforeUpdate?: (() => void) | (() => void)[];
                    updated?: (() => void) | (() => void)[];
                    activated?: (() => void) | (() => void)[];
                    deactivated?: (() => void) | (() => void)[];
                    beforeDestroy?: (() => void) | (() => void)[];
                    beforeUnmount?: (() => void) | (() => void)[];
                    destroyed?: (() => void) | (() => void)[];
                    unmounted?: (() => void) | (() => void)[];
                    renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                    renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                    errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
                };
                $forceUpdate: () => void;
                $nextTick: typeof import("vue").nextTick;
                $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
            } & Readonly<import("vue").ExtractPropTypes<{
                readonly ariaLabel: StringConstructor;
                readonly appendTo: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly content: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
                readonly rawContent: BooleanConstructor;
                readonly persistent: BooleanConstructor;
                readonly visible: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown, null, boolean>;
                readonly transition: StringConstructor;
                readonly teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly disabled: BooleanConstructor;
                readonly id: StringConstructor;
                readonly style: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly className: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly pure: BooleanConstructor;
                readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                readonly popperClass: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly popperStyle: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly referenceEl: {
                    readonly type: import("vue").PropType<HTMLElement>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly triggerTargetEl: {
                    readonly type: import("vue").PropType<HTMLElement>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly virtualTriggering: BooleanConstructor;
                readonly zIndex: NumberConstructor;
                readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                readonly showAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                readonly hideAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
                readonly autoClose: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            }>> & import("vue").ShallowUnwrapRef<{
                contentRef: import("vue").Ref<({
                    $: import("vue").ComponentInternalInstance;
                    $data: {};
                    $props: Partial<{
                        readonly offset: number;
                        readonly visible: boolean;
                        readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                        readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                        readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                        readonly virtualTriggering: boolean;
                        readonly boundariesPadding: number;
                        readonly fallbackPlacements: import("@popperjs/core").Placement[];
                        readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly popperOptions: Partial<import("@popperjs/core").Options>;
                        readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly pure: boolean;
                    }> & Omit<Readonly<import("vue").ExtractPropTypes<{
                        readonly ariaLabel: StringConstructor;
                        readonly id: StringConstructor;
                        readonly style: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly className: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                        readonly visible: BooleanConstructor;
                        readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly pure: BooleanConstructor;
                        readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                        readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                        readonly popperClass: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly popperStyle: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly referenceEl: {
                            readonly type: import("vue").PropType<HTMLElement>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly triggerTargetEl: {
                            readonly type: import("vue").PropType<HTMLElement>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly virtualTriggering: BooleanConstructor;
                        readonly zIndex: NumberConstructor;
                        readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                        readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                        readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                        readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                        readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                        readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                    }>> & {
                        onFocus?: (() => any) | undefined;
                        onBlur?: (() => any) | undefined;
                        onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                        onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                        onClose?: (() => any) | undefined;
                    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "offset" | "visible" | "placement" | "strategy" | "effect" | "virtualTriggering" | "boundariesPadding" | "fallbackPlacements" | "gpuAcceleration" | "popperOptions" | "enterable" | "focusOnShow" | "trapping" | "stopPopperMouseEvent" | "pure">;
                    $attrs: {
                        [x: string]: unknown;
                    };
                    $refs: {
                        [x: string]: unknown;
                    };
                    $slots: import("vue").Slots;
                    $root: import("vue").ComponentPublicInstance | null;
                    $parent: import("vue").ComponentPublicInstance | null;
                    $emit: ((event: "blur") => void) & ((event: "close") => void) & ((event: "focus") => void) & ((event: "mouseenter", evt: MouseEvent) => void) & ((event: "mouseleave", evt: MouseEvent) => void);
                    $el: any;
                    $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
                        readonly ariaLabel: StringConstructor;
                        readonly id: StringConstructor;
                        readonly style: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly className: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                        readonly visible: BooleanConstructor;
                        readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly pure: BooleanConstructor;
                        readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                        readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                        readonly popperClass: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly popperStyle: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly referenceEl: {
                            readonly type: import("vue").PropType<HTMLElement>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly triggerTargetEl: {
                            readonly type: import("vue").PropType<HTMLElement>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly virtualTriggering: BooleanConstructor;
                        readonly zIndex: NumberConstructor;
                        readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                        readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                        readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                        readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                        readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                        readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                    }>> & {
                        onFocus?: (() => any) | undefined;
                        onBlur?: (() => any) | undefined;
                        onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                        onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                        onClose?: (() => any) | undefined;
                    }, {
                        popperContentRef: import("vue").Ref<HTMLElement | undefined>;
                        popperInstanceRef: import("vue").ComputedRef<import("@popperjs/core").Instance | undefined>;
                        updatePopper: (shouldUpdateZIndex?: boolean) => void;
                        contentStyle: import("vue").ComputedRef<StyleValue[]>;
                    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
                        blur: () => void;
                        close: () => void;
                        focus: () => void;
                        mouseenter: (evt: MouseEvent) => void;
                        mouseleave: (evt: MouseEvent) => void;
                    }, string, {
                        readonly offset: number;
                        readonly visible: boolean;
                        readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                        readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                        readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                        readonly virtualTriggering: boolean;
                        readonly boundariesPadding: number;
                        readonly fallbackPlacements: import("@popperjs/core").Placement[];
                        readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly popperOptions: Partial<import("@popperjs/core").Options>;
                        readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly pure: boolean;
                    }> & {
                        beforeCreate?: (() => void) | (() => void)[];
                        created?: (() => void) | (() => void)[];
                        beforeMount?: (() => void) | (() => void)[];
                        mounted?: (() => void) | (() => void)[];
                        beforeUpdate?: (() => void) | (() => void)[];
                        updated?: (() => void) | (() => void)[];
                        activated?: (() => void) | (() => void)[];
                        deactivated?: (() => void) | (() => void)[];
                        beforeDestroy?: (() => void) | (() => void)[];
                        beforeUnmount?: (() => void) | (() => void)[];
                        destroyed?: (() => void) | (() => void)[];
                        unmounted?: (() => void) | (() => void)[];
                        renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                        renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                        errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
                    };
                    $forceUpdate: () => void;
                    $nextTick: typeof import("vue").nextTick;
                    $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
                } & Readonly<import("vue").ExtractPropTypes<{
                    readonly ariaLabel: StringConstructor;
                    readonly id: StringConstructor;
                    readonly style: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly className: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                    readonly visible: BooleanConstructor;
                    readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly pure: BooleanConstructor;
                    readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly popperClass: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly popperStyle: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly referenceEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly triggerTargetEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly virtualTriggering: BooleanConstructor;
                    readonly zIndex: NumberConstructor;
                    readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                    readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                    readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                    readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                    readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                    readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                }>> & {
                    onFocus?: (() => any) | undefined;
                    onBlur?: (() => any) | undefined;
                    onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                    onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                    onClose?: (() => any) | undefined;
                } & import("vue").ShallowUnwrapRef<{
                    popperContentRef: import("vue").Ref<HTMLElement | undefined>;
                    popperInstanceRef: import("vue").ComputedRef<import("@popperjs/core").Instance | undefined>;
                    updatePopper: (shouldUpdateZIndex?: boolean) => void;
                    contentStyle: import("vue").ComputedRef<StyleValue[]>;
                }> & {} & import("vue").ComponentCustomProperties & {
                    $slots: {
                        default?(_: {}): any;
                    };
                }) | undefined>;
            }> & {} & import("vue").ComponentCustomProperties & {
                $slots: {
                    default?(_: {}): any;
                };
            }) | undefined>;
            isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
            updatePopper: () => void;
            onOpen: (event?: Event) => void;
            onClose: (event?: Event) => void;
            hide: (event?: Event) => void;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            [x: string]: (...args: any[]) => void;
        }, string, {
            disabled: boolean;
            content: string;
            offset: number;
            visible: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown>;
            open: boolean;
            placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
            strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
            effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
            showAfter: number;
            hideAfter: number;
            autoClose: number;
            role: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown>;
            trigger: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>) | ((new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>))[], unknown, unknown>;
            arrowOffset: number;
            virtualTriggering: boolean;
            boundariesPadding: number;
            fallbackPlacements: import("@popperjs/core").Placement[];
            gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            popperOptions: Partial<import("@popperjs/core").Options>;
            enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            pure: boolean;
            triggerKeys: string[];
            teleported: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
            rawContent: boolean;
            persistent: boolean;
            showArrow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
        }> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
        showArrow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
        arrowOffset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
        disabled: BooleanConstructor;
        trigger: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>) | ((new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>))[], unknown, unknown, "hover", boolean>;
        triggerKeys: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | ((new (...args: any[]) => string[]) | (() => string[]))[], unknown, unknown, () => string[], boolean>;
        virtualRef: {
            readonly type: import("vue").PropType<import("element-plus/es/element-plus").Measurable>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        virtualTriggering: BooleanConstructor;
        onMouseenter: {
            readonly type: import("vue").PropType<(e: Event) => void>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        onMouseleave: {
            readonly type: import("vue").PropType<(e: Event) => void>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        onClick: {
            readonly type: import("vue").PropType<(e: Event) => void>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        onKeydown: {
            readonly type: import("vue").PropType<(e: Event) => void>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        onFocus: {
            readonly type: import("vue").PropType<(e: Event) => void>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        onBlur: {
            readonly type: import("vue").PropType<(e: Event) => void>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        onContextmenu: {
            readonly type: import("vue").PropType<(e: Event) => void>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        id: StringConstructor;
        open: BooleanConstructor;
        ariaLabel: StringConstructor;
        appendTo: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        content: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
        rawContent: BooleanConstructor;
        persistent: BooleanConstructor;
        visible: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown, null, boolean>;
        transition: StringConstructor;
        teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
        style: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        className: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
        enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
        pure: BooleanConstructor;
        focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
        trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
        popperClass: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | (string | {
                [x: string]: boolean;
            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        popperStyle: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        referenceEl: {
            readonly type: import("vue").PropType<HTMLElement>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        triggerTargetEl: {
            readonly type: import("vue").PropType<HTMLElement>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
        zIndex: NumberConstructor;
        boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
        fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
        gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
        offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
        placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
        popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
        strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
        showAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
        hideAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
        autoClose: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
        "onUpdate:visible": {
            readonly type: import("vue").PropType<(val: boolean) => void>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        role: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown, "tooltip", boolean>;
    }>> & import("vue").ShallowUnwrapRef<{
        popperRef: import("vue").Ref<({
            $: import("vue").ComponentInternalInstance;
            $data: {};
            $props: Partial<{
                readonly role: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown>;
            }> & Omit<Readonly<import("vue").ExtractPropTypes<{
                readonly role: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown, "tooltip", boolean>;
            }>> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "role">;
            $attrs: {
                [x: string]: unknown;
            };
            $refs: {
                [x: string]: unknown;
            };
            $slots: import("vue").Slots;
            $root: import("vue").ComponentPublicInstance | null;
            $parent: import("vue").ComponentPublicInstance | null;
            $emit: (event: string, ...args: any[]) => void;
            $el: any;
            $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
                readonly role: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown, "tooltip", boolean>;
            }>>, {
                triggerRef: import("vue").Ref<import("element-plus/es/element-plus").Measurable | undefined>;
                contentRef: import("vue").Ref<HTMLElement | undefined>;
                popperInstanceRef: import("vue").Ref<import("@popperjs/core").Instance | undefined>;
                referenceRef: import("vue").Ref<import("element-plus/es/element-plus").Measurable | undefined>;
                role: import("vue").ComputedRef<string>;
            }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
                readonly role: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown>;
            }> & {
                beforeCreate?: (() => void) | (() => void)[];
                created?: (() => void) | (() => void)[];
                beforeMount?: (() => void) | (() => void)[];
                mounted?: (() => void) | (() => void)[];
                beforeUpdate?: (() => void) | (() => void)[];
                updated?: (() => void) | (() => void)[];
                activated?: (() => void) | (() => void)[];
                deactivated?: (() => void) | (() => void)[];
                beforeDestroy?: (() => void) | (() => void)[];
                beforeUnmount?: (() => void) | (() => void)[];
                destroyed?: (() => void) | (() => void)[];
                unmounted?: (() => void) | (() => void)[];
                renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
            };
            $forceUpdate: () => void;
            $nextTick: typeof import("vue").nextTick;
            $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
        } & Readonly<import("vue").ExtractPropTypes<{
            readonly role: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown, "tooltip", boolean>;
        }>> & import("vue").ShallowUnwrapRef<{
            triggerRef: import("vue").Ref<import("element-plus/es/element-plus").Measurable | undefined>;
            contentRef: import("vue").Ref<HTMLElement | undefined>;
            popperInstanceRef: import("vue").Ref<import("@popperjs/core").Instance | undefined>;
            referenceRef: import("vue").Ref<import("element-plus/es/element-plus").Measurable | undefined>;
            role: import("vue").ComputedRef<string>;
        }> & {} & import("vue").ComponentCustomProperties & {
            $slots: {
                default?(_: {}): any;
            };
        }) | undefined>;
        contentRef: import("vue").Ref<({
            $: import("vue").ComponentInternalInstance;
            $data: {};
            $props: Partial<{
                readonly disabled: boolean;
                readonly content: string;
                readonly offset: number;
                readonly visible: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown>;
                readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                readonly showAfter: number;
                readonly hideAfter: number;
                readonly autoClose: number;
                readonly virtualTriggering: boolean;
                readonly boundariesPadding: number;
                readonly fallbackPlacements: import("@popperjs/core").Placement[];
                readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly popperOptions: Partial<import("@popperjs/core").Options>;
                readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly pure: boolean;
                readonly teleported: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly rawContent: boolean;
                readonly persistent: boolean;
            }> & Omit<Readonly<import("vue").ExtractPropTypes<{
                readonly ariaLabel: StringConstructor;
                readonly appendTo: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly content: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
                readonly rawContent: BooleanConstructor;
                readonly persistent: BooleanConstructor;
                readonly visible: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown, null, boolean>;
                readonly transition: StringConstructor;
                readonly teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly disabled: BooleanConstructor;
                readonly id: StringConstructor;
                readonly style: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly className: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly pure: BooleanConstructor;
                readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                readonly popperClass: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly popperStyle: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly referenceEl: {
                    readonly type: import("vue").PropType<HTMLElement>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly triggerTargetEl: {
                    readonly type: import("vue").PropType<HTMLElement>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly virtualTriggering: BooleanConstructor;
                readonly zIndex: NumberConstructor;
                readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                readonly showAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                readonly hideAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
                readonly autoClose: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            }>> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "disabled" | "content" | "offset" | "visible" | "placement" | "strategy" | "effect" | "showAfter" | "hideAfter" | "autoClose" | "virtualTriggering" | "boundariesPadding" | "fallbackPlacements" | "gpuAcceleration" | "popperOptions" | "enterable" | "focusOnShow" | "trapping" | "stopPopperMouseEvent" | "pure" | "teleported" | "rawContent" | "persistent">;
            $attrs: {
                [x: string]: unknown;
            };
            $refs: {
                [x: string]: unknown;
            };
            $slots: import("vue").Slots;
            $root: import("vue").ComponentPublicInstance | null;
            $parent: import("vue").ComponentPublicInstance | null;
            $emit: (event: string, ...args: any[]) => void;
            $el: any;
            $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
                readonly ariaLabel: StringConstructor;
                readonly appendTo: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly content: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
                readonly rawContent: BooleanConstructor;
                readonly persistent: BooleanConstructor;
                readonly visible: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown, null, boolean>;
                readonly transition: StringConstructor;
                readonly teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly disabled: BooleanConstructor;
                readonly id: StringConstructor;
                readonly style: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly className: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly pure: BooleanConstructor;
                readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                readonly popperClass: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly popperStyle: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly referenceEl: {
                    readonly type: import("vue").PropType<HTMLElement>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly triggerTargetEl: {
                    readonly type: import("vue").PropType<HTMLElement>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly virtualTriggering: BooleanConstructor;
                readonly zIndex: NumberConstructor;
                readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                readonly showAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                readonly hideAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
                readonly autoClose: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            }>>, {
                contentRef: import("vue").Ref<({
                    $: import("vue").ComponentInternalInstance;
                    $data: {};
                    $props: Partial<{
                        readonly offset: number;
                        readonly visible: boolean;
                        readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                        readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                        readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                        readonly virtualTriggering: boolean;
                        readonly boundariesPadding: number;
                        readonly fallbackPlacements: import("@popperjs/core").Placement[];
                        readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly popperOptions: Partial<import("@popperjs/core").Options>;
                        readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly pure: boolean;
                    }> & Omit<Readonly<import("vue").ExtractPropTypes<{
                        readonly ariaLabel: StringConstructor;
                        readonly id: StringConstructor;
                        readonly style: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly className: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                        readonly visible: BooleanConstructor;
                        readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly pure: BooleanConstructor;
                        readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                        readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                        readonly popperClass: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly popperStyle: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly referenceEl: {
                            readonly type: import("vue").PropType<HTMLElement>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly triggerTargetEl: {
                            readonly type: import("vue").PropType<HTMLElement>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly virtualTriggering: BooleanConstructor;
                        readonly zIndex: NumberConstructor;
                        readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                        readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                        readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                        readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                        readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                        readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                    }>> & {
                        onFocus?: (() => any) | undefined;
                        onBlur?: (() => any) | undefined;
                        onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                        onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                        onClose?: (() => any) | undefined;
                    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "offset" | "visible" | "placement" | "strategy" | "effect" | "virtualTriggering" | "boundariesPadding" | "fallbackPlacements" | "gpuAcceleration" | "popperOptions" | "enterable" | "focusOnShow" | "trapping" | "stopPopperMouseEvent" | "pure">;
                    $attrs: {
                        [x: string]: unknown;
                    };
                    $refs: {
                        [x: string]: unknown;
                    };
                    $slots: import("vue").Slots;
                    $root: import("vue").ComponentPublicInstance | null;
                    $parent: import("vue").ComponentPublicInstance | null;
                    $emit: ((event: "blur") => void) & ((event: "close") => void) & ((event: "focus") => void) & ((event: "mouseenter", evt: MouseEvent) => void) & ((event: "mouseleave", evt: MouseEvent) => void);
                    $el: any;
                    $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
                        readonly ariaLabel: StringConstructor;
                        readonly id: StringConstructor;
                        readonly style: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly className: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                        readonly visible: BooleanConstructor;
                        readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly pure: BooleanConstructor;
                        readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                        readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                        readonly popperClass: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | (string | {
                                [x: string]: boolean;
                            } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly popperStyle: {
                            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly referenceEl: {
                            readonly type: import("vue").PropType<HTMLElement>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly triggerTargetEl: {
                            readonly type: import("vue").PropType<HTMLElement>;
                            readonly required: false;
                            readonly validator: ((val: unknown) => boolean) | undefined;
                            __epPropKey: true;
                        };
                        readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly virtualTriggering: BooleanConstructor;
                        readonly zIndex: NumberConstructor;
                        readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                        readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                        readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                        readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                        readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                        readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                        readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                    }>> & {
                        onFocus?: (() => any) | undefined;
                        onBlur?: (() => any) | undefined;
                        onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                        onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                        onClose?: (() => any) | undefined;
                    }, {
                        popperContentRef: import("vue").Ref<HTMLElement | undefined>;
                        popperInstanceRef: import("vue").ComputedRef<import("@popperjs/core").Instance | undefined>;
                        updatePopper: (shouldUpdateZIndex?: boolean) => void;
                        contentStyle: import("vue").ComputedRef<StyleValue[]>;
                    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
                        blur: () => void;
                        close: () => void;
                        focus: () => void;
                        mouseenter: (evt: MouseEvent) => void;
                        mouseleave: (evt: MouseEvent) => void;
                    }, string, {
                        readonly offset: number;
                        readonly visible: boolean;
                        readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                        readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                        readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                        readonly virtualTriggering: boolean;
                        readonly boundariesPadding: number;
                        readonly fallbackPlacements: import("@popperjs/core").Placement[];
                        readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly popperOptions: Partial<import("@popperjs/core").Options>;
                        readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                        readonly pure: boolean;
                    }> & {
                        beforeCreate?: (() => void) | (() => void)[];
                        created?: (() => void) | (() => void)[];
                        beforeMount?: (() => void) | (() => void)[];
                        mounted?: (() => void) | (() => void)[];
                        beforeUpdate?: (() => void) | (() => void)[];
                        updated?: (() => void) | (() => void)[];
                        activated?: (() => void) | (() => void)[];
                        deactivated?: (() => void) | (() => void)[];
                        beforeDestroy?: (() => void) | (() => void)[];
                        beforeUnmount?: (() => void) | (() => void)[];
                        destroyed?: (() => void) | (() => void)[];
                        unmounted?: (() => void) | (() => void)[];
                        renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                        renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                        errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
                    };
                    $forceUpdate: () => void;
                    $nextTick: typeof import("vue").nextTick;
                    $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
                } & Readonly<import("vue").ExtractPropTypes<{
                    readonly ariaLabel: StringConstructor;
                    readonly id: StringConstructor;
                    readonly style: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly className: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                    readonly visible: BooleanConstructor;
                    readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly pure: BooleanConstructor;
                    readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly popperClass: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly popperStyle: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly referenceEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly triggerTargetEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly virtualTriggering: BooleanConstructor;
                    readonly zIndex: NumberConstructor;
                    readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                    readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                    readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                    readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                    readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                    readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                }>> & {
                    onFocus?: (() => any) | undefined;
                    onBlur?: (() => any) | undefined;
                    onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                    onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                    onClose?: (() => any) | undefined;
                } & import("vue").ShallowUnwrapRef<{
                    popperContentRef: import("vue").Ref<HTMLElement | undefined>;
                    popperInstanceRef: import("vue").ComputedRef<import("@popperjs/core").Instance | undefined>;
                    updatePopper: (shouldUpdateZIndex?: boolean) => void;
                    contentStyle: import("vue").ComputedRef<StyleValue[]>;
                }> & {} & import("vue").ComponentCustomProperties & {
                    $slots: {
                        default?(_: {}): any;
                    };
                }) | undefined>;
            }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
                readonly disabled: boolean;
                readonly content: string;
                readonly offset: number;
                readonly visible: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown>;
                readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                readonly showAfter: number;
                readonly hideAfter: number;
                readonly autoClose: number;
                readonly virtualTriggering: boolean;
                readonly boundariesPadding: number;
                readonly fallbackPlacements: import("@popperjs/core").Placement[];
                readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly popperOptions: Partial<import("@popperjs/core").Options>;
                readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly pure: boolean;
                readonly teleported: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                readonly rawContent: boolean;
                readonly persistent: boolean;
            }> & {
                beforeCreate?: (() => void) | (() => void)[];
                created?: (() => void) | (() => void)[];
                beforeMount?: (() => void) | (() => void)[];
                mounted?: (() => void) | (() => void)[];
                beforeUpdate?: (() => void) | (() => void)[];
                updated?: (() => void) | (() => void)[];
                activated?: (() => void) | (() => void)[];
                deactivated?: (() => void) | (() => void)[];
                beforeDestroy?: (() => void) | (() => void)[];
                beforeUnmount?: (() => void) | (() => void)[];
                destroyed?: (() => void) | (() => void)[];
                unmounted?: (() => void) | (() => void)[];
                renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
            };
            $forceUpdate: () => void;
            $nextTick: typeof import("vue").nextTick;
            $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
        } & Readonly<import("vue").ExtractPropTypes<{
            readonly ariaLabel: StringConstructor;
            readonly appendTo: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly content: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
            readonly rawContent: BooleanConstructor;
            readonly persistent: BooleanConstructor;
            readonly visible: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown, null, boolean>;
            readonly transition: StringConstructor;
            readonly teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            readonly disabled: BooleanConstructor;
            readonly id: StringConstructor;
            readonly style: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly className: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
            readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            readonly pure: BooleanConstructor;
            readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
            readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
            readonly popperClass: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | (string | {
                    [x: string]: boolean;
                } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly popperStyle: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly referenceEl: {
                readonly type: import("vue").PropType<HTMLElement>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly triggerTargetEl: {
                readonly type: import("vue").PropType<HTMLElement>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            readonly virtualTriggering: BooleanConstructor;
            readonly zIndex: NumberConstructor;
            readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
            readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
            readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
            readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
            readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
            readonly showAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            readonly hideAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
            readonly autoClose: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
        }>> & import("vue").ShallowUnwrapRef<{
            contentRef: import("vue").Ref<({
                $: import("vue").ComponentInternalInstance;
                $data: {};
                $props: Partial<{
                    readonly offset: number;
                    readonly visible: boolean;
                    readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                    readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                    readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                    readonly virtualTriggering: boolean;
                    readonly boundariesPadding: number;
                    readonly fallbackPlacements: import("@popperjs/core").Placement[];
                    readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly popperOptions: Partial<import("@popperjs/core").Options>;
                    readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly pure: boolean;
                }> & Omit<Readonly<import("vue").ExtractPropTypes<{
                    readonly ariaLabel: StringConstructor;
                    readonly id: StringConstructor;
                    readonly style: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly className: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                    readonly visible: BooleanConstructor;
                    readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly pure: BooleanConstructor;
                    readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly popperClass: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly popperStyle: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly referenceEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly triggerTargetEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly virtualTriggering: BooleanConstructor;
                    readonly zIndex: NumberConstructor;
                    readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                    readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                    readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                    readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                    readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                    readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                }>> & {
                    onFocus?: (() => any) | undefined;
                    onBlur?: (() => any) | undefined;
                    onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                    onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                    onClose?: (() => any) | undefined;
                } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "offset" | "visible" | "placement" | "strategy" | "effect" | "virtualTriggering" | "boundariesPadding" | "fallbackPlacements" | "gpuAcceleration" | "popperOptions" | "enterable" | "focusOnShow" | "trapping" | "stopPopperMouseEvent" | "pure">;
                $attrs: {
                    [x: string]: unknown;
                };
                $refs: {
                    [x: string]: unknown;
                };
                $slots: import("vue").Slots;
                $root: import("vue").ComponentPublicInstance | null;
                $parent: import("vue").ComponentPublicInstance | null;
                $emit: ((event: "blur") => void) & ((event: "close") => void) & ((event: "focus") => void) & ((event: "mouseenter", evt: MouseEvent) => void) & ((event: "mouseleave", evt: MouseEvent) => void);
                $el: any;
                $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
                    readonly ariaLabel: StringConstructor;
                    readonly id: StringConstructor;
                    readonly style: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly className: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                    readonly visible: BooleanConstructor;
                    readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly pure: BooleanConstructor;
                    readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                    readonly popperClass: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | (string | {
                            [x: string]: boolean;
                        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly popperStyle: {
                        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly referenceEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly triggerTargetEl: {
                        readonly type: import("vue").PropType<HTMLElement>;
                        readonly required: false;
                        readonly validator: ((val: unknown) => boolean) | undefined;
                        __epPropKey: true;
                    };
                    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly virtualTriggering: BooleanConstructor;
                    readonly zIndex: NumberConstructor;
                    readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                    readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                    readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                    readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                    readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                    readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
                }>> & {
                    onFocus?: (() => any) | undefined;
                    onBlur?: (() => any) | undefined;
                    onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                    onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                    onClose?: (() => any) | undefined;
                }, {
                    popperContentRef: import("vue").Ref<HTMLElement | undefined>;
                    popperInstanceRef: import("vue").ComputedRef<import("@popperjs/core").Instance | undefined>;
                    updatePopper: (shouldUpdateZIndex?: boolean) => void;
                    contentStyle: import("vue").ComputedRef<StyleValue[]>;
                }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
                    blur: () => void;
                    close: () => void;
                    focus: () => void;
                    mouseenter: (evt: MouseEvent) => void;
                    mouseleave: (evt: MouseEvent) => void;
                }, string, {
                    readonly offset: number;
                    readonly visible: boolean;
                    readonly placement: import("element-plus/es/utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
                    readonly strategy: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "fixed" | "absolute", unknown>;
                    readonly effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown>;
                    readonly virtualTriggering: boolean;
                    readonly boundariesPadding: number;
                    readonly fallbackPlacements: import("@popperjs/core").Placement[];
                    readonly gpuAcceleration: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly popperOptions: Partial<import("@popperjs/core").Options>;
                    readonly enterable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly focusOnShow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly trapping: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
                    readonly pure: boolean;
                }> & {
                    beforeCreate?: (() => void) | (() => void)[];
                    created?: (() => void) | (() => void)[];
                    beforeMount?: (() => void) | (() => void)[];
                    mounted?: (() => void) | (() => void)[];
                    beforeUpdate?: (() => void) | (() => void)[];
                    updated?: (() => void) | (() => void)[];
                    activated?: (() => void) | (() => void)[];
                    deactivated?: (() => void) | (() => void)[];
                    beforeDestroy?: (() => void) | (() => void)[];
                    beforeUnmount?: (() => void) | (() => void)[];
                    destroyed?: (() => void) | (() => void)[];
                    unmounted?: (() => void) | (() => void)[];
                    renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                    renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
                    errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
                };
                $forceUpdate: () => void;
                $nextTick: typeof import("vue").nextTick;
                $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
            } & Readonly<import("vue").ExtractPropTypes<{
                readonly ariaLabel: StringConstructor;
                readonly id: StringConstructor;
                readonly style: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly className: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/element-plus").PopperEffect))[], unknown, unknown, "dark", boolean>;
                readonly visible: BooleanConstructor;
                readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly pure: BooleanConstructor;
                readonly focusOnShow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                readonly trapping: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
                readonly popperClass: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | (string | {
                        [x: string]: boolean;
                    } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly popperStyle: {
                    readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly referenceEl: {
                    readonly type: import("vue").PropType<HTMLElement>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly triggerTargetEl: {
                    readonly type: import("vue").PropType<HTMLElement>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly virtualTriggering: BooleanConstructor;
                readonly zIndex: NumberConstructor;
                readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
                readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]) | ((new (...args: any[]) => import("@popperjs/core").Placement[]) | (() => import("@popperjs/core").Placement[]))[], unknown, unknown, undefined, boolean>;
                readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
                readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
                readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "bottom", boolean>;
                readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>) | ((new (...args: any[]) => Partial<import("@popperjs/core").Options>) | (() => Partial<import("@popperjs/core").Options>))[], unknown, unknown, () => {}, boolean>;
                readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
            }>> & {
                onFocus?: (() => any) | undefined;
                onBlur?: (() => any) | undefined;
                onMouseenter?: ((evt: MouseEvent) => any) | undefined;
                onMouseleave?: ((evt: MouseEvent) => any) | undefined;
                onClose?: (() => any) | undefined;
            } & import("vue").ShallowUnwrapRef<{
                popperContentRef: import("vue").Ref<HTMLElement | undefined>;
                popperInstanceRef: import("vue").ComputedRef<import("@popperjs/core").Instance | undefined>;
                updatePopper: (shouldUpdateZIndex?: boolean) => void;
                contentStyle: import("vue").ComputedRef<StyleValue[]>;
            }> & {} & import("vue").ComponentCustomProperties & {
                $slots: {
                    default?(_: {}): any;
                };
            }) | undefined>;
        }> & {} & import("vue").ComponentCustomProperties & {
            $slots: {
                default?(_: {}): any;
            };
        }) | undefined>;
        isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
        updatePopper: () => void;
        onOpen: (event?: Event) => void;
        onClose: (event?: Event) => void;
        hide: (event?: Event) => void;
    }> & {} & import("vue").ComponentCustomProperties & {
        $slots: {
            default?(_: {}): any;
            content?(_: {}): any;
        };
    }) | undefined>;
    /** @description fetch suggestions result */
    suggestions: import("vue").Ref<Record<string, any>[]>;
    /** @description triggers when a suggestion is clicked */
    handleSelect: (item: any) => Promise<void>;
    /** @description handle keyboard enter event */
    handleKeyEnter: () => Promise<void>;
    /** @description focus the input element */
    focus: () => void;
    /** @description blur the input element */
    blur: () => void;
    /** @description close suggestion */
    close: () => void;
    /** @description highlight an item in a suggestion */
    highlight: (index: number) => void;
    /** @description loading suggestion list */
    getData: (queryString: string) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (item: Record<string, any>) => void;
    clear: () => void;
    "update:modelValue": (value: string) => void;
    change: (value: string) => void;
    input: (value: string) => void;
    blur: (evt: FocusEvent) => void;
    focus: (evt: FocusEvent) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly ariaLabel: StringConstructor;
    readonly valueKey: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "value", boolean>;
    readonly modelValue: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
    readonly debounce: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
    readonly placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("@popperjs/core").Placement) | ((new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("@popperjs/core").Placement))[], "top" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end", unknown, "bottom-start", boolean>;
    readonly fetchSuggestions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => AutocompleteData | ((queryString: string, cb: import("./autocomplete").AutocompleteFetchSuggestionsCallback) => import("element-plus/es/utils").Awaitable<AutocompleteData> | void)) | (() => import("./autocomplete").AutocompleteFetchSuggestions) | ((new (...args: any[]) => AutocompleteData | ((queryString: string, cb: import("./autocomplete").AutocompleteFetchSuggestionsCallback) => import("element-plus/es/utils").Awaitable<AutocompleteData> | void)) | (() => import("./autocomplete").AutocompleteFetchSuggestions))[], unknown, unknown, () => void, boolean>;
    readonly popperClass: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly triggerOnFocus: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly selectWhenUnmatched: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly hideLoading: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly highlightFirstItem: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly fitInputWidth: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly clearable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly disabled: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly name: StringConstructor;
}>> & {
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onFocus?: ((evt: FocusEvent) => any) | undefined;
    onBlur?: ((evt: FocusEvent) => any) | undefined;
    onInput?: ((value: string) => any) | undefined;
    onSelect?: ((item: Record<string, any>) => any) | undefined;
    onClear?: (() => any) | undefined;
}, {
    readonly disabled: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly modelValue: import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
    readonly placement: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("@popperjs/core").Placement) | ((new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("@popperjs/core").Placement))[], "top" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end", unknown>;
    readonly clearable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly popperClass: string;
    readonly teleported: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly valueKey: string;
    readonly debounce: number;
    readonly fetchSuggestions: import("./autocomplete").AutocompleteFetchSuggestions;
    readonly triggerOnFocus: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly selectWhenUnmatched: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly hideLoading: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly highlightFirstItem: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly fitInputWidth: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
