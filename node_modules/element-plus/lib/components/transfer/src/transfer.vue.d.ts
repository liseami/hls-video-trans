import type { TransferDataItem, TransferDirection } from './transfer';
declare function __VLS_template(): {
    "left-empty"?(_: {}): any;
    "left-footer"?(_: {}): any;
    "right-empty"?(_: {}): any;
    "right-footer"?(_: {}): any;
};
declare const __VLS_component: import("vue").DefineComponent<{
    readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]) | ((new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]))[], unknown, unknown, () => never[], boolean>;
    readonly titles: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => [string, string]) | (() => [string, string]) | ((new (...args: any[]) => [string, string]) | (() => [string, string]))[], unknown, unknown, () => never[], boolean>;
    readonly buttonTexts: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => [string, string]) | (() => [string, string]) | ((new (...args: any[]) => [string, string]) | (() => [string, string]))[], unknown, unknown, () => never[], boolean>;
    readonly filterPlaceholder: StringConstructor;
    readonly filterMethod: {
        readonly type: import("vue").PropType<(query: string, item: TransferDataItem) => boolean>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly leftDefaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
    readonly rightDefaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
    readonly renderContent: {
        readonly type: import("vue").PropType<import("./transfer").renderContent>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly modelValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
    readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat) | ((new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat))[], unknown, unknown, () => {}, boolean>;
    readonly filterable: BooleanConstructor;
    readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias) | ((new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{
        readonly label: "label";
        readonly key: "key";
        readonly disabled: "disabled";
    }>, boolean>;
    readonly targetOrder: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "push" | "unshift" | "original", unknown, "original", boolean>;
    readonly validateEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}, {
    /** @description clear the filter keyword of a certain panel */
    clearQuery: (which: TransferDirection) => void;
    /** @description left panel ref */
    leftPanel: import("vue").Ref<({
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            readonly data: TransferDataItem[];
            readonly props: import("./transfer").TransferPropsAlias;
            readonly format: import("./transfer").TransferFormat;
            readonly filterable: boolean;
            readonly defaultChecked: import("./transfer").TransferKey[];
        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
            readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]) | ((new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]))[], unknown, unknown, () => never[], boolean>;
            readonly optionRender: {
                readonly type: import("vue").PropType<(option: TransferDataItem) => import("vue").VNode | import("vue").VNode[]>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly placeholder: StringConstructor;
            readonly title: StringConstructor;
            readonly filterable: BooleanConstructor;
            readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat) | ((new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat))[], unknown, unknown, () => {}, boolean>;
            readonly filterMethod: {
                readonly type: import("vue").PropType<(query: string, item: TransferDataItem) => boolean>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly defaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
            readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias) | ((new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{
                readonly label: "label";
                readonly key: "key";
                readonly disabled: "disabled";
            }>, boolean>;
        }>> & {
            "onChecked-change"?: ((value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => any) | undefined;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "data" | "props" | "format" | "filterable" | "defaultChecked">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: import("vue").Slots;
        $root: import("vue").ComponentPublicInstance | null;
        $parent: import("vue").ComponentPublicInstance | null;
        $emit: (event: "checked-change", value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]) | ((new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]))[], unknown, unknown, () => never[], boolean>;
            readonly optionRender: {
                readonly type: import("vue").PropType<(option: TransferDataItem) => import("vue").VNode | import("vue").VNode[]>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly placeholder: StringConstructor;
            readonly title: StringConstructor;
            readonly filterable: BooleanConstructor;
            readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat) | ((new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat))[], unknown, unknown, () => {}, boolean>;
            readonly filterMethod: {
                readonly type: import("vue").PropType<(query: string, item: TransferDataItem) => boolean>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly defaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
            readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias) | ((new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{
                readonly label: "label";
                readonly key: "key";
                readonly disabled: "disabled";
            }>, boolean>;
        }>> & {
            "onChecked-change"?: ((value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => any) | undefined;
        }, {
            query: import("vue").Ref<string>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "checked-change": (value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => void;
        }, string, {
            readonly data: TransferDataItem[];
            readonly props: import("./transfer").TransferPropsAlias;
            readonly format: import("./transfer").TransferFormat;
            readonly filterable: boolean;
            readonly defaultChecked: import("./transfer").TransferKey[];
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
        readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]) | ((new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]))[], unknown, unknown, () => never[], boolean>;
        readonly optionRender: {
            readonly type: import("vue").PropType<(option: TransferDataItem) => import("vue").VNode | import("vue").VNode[]>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly placeholder: StringConstructor;
        readonly title: StringConstructor;
        readonly filterable: BooleanConstructor;
        readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat) | ((new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat))[], unknown, unknown, () => {}, boolean>;
        readonly filterMethod: {
            readonly type: import("vue").PropType<(query: string, item: TransferDataItem) => boolean>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly defaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
        readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias) | ((new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{
            readonly label: "label";
            readonly key: "key";
            readonly disabled: "disabled";
        }>, boolean>;
    }>> & {
        "onChecked-change"?: ((value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => any) | undefined;
    } & import("vue").ShallowUnwrapRef<{
        query: import("vue").Ref<string>;
    }> & {} & import("vue").ComponentCustomProperties & {
        $slots: {
            empty?(_: {}): any;
            default?(_: {}): any;
        };
    }) | undefined>;
    /** @description right panel ref */
    rightPanel: import("vue").Ref<({
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            readonly data: TransferDataItem[];
            readonly props: import("./transfer").TransferPropsAlias;
            readonly format: import("./transfer").TransferFormat;
            readonly filterable: boolean;
            readonly defaultChecked: import("./transfer").TransferKey[];
        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
            readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]) | ((new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]))[], unknown, unknown, () => never[], boolean>;
            readonly optionRender: {
                readonly type: import("vue").PropType<(option: TransferDataItem) => import("vue").VNode | import("vue").VNode[]>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly placeholder: StringConstructor;
            readonly title: StringConstructor;
            readonly filterable: BooleanConstructor;
            readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat) | ((new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat))[], unknown, unknown, () => {}, boolean>;
            readonly filterMethod: {
                readonly type: import("vue").PropType<(query: string, item: TransferDataItem) => boolean>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly defaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
            readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias) | ((new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{
                readonly label: "label";
                readonly key: "key";
                readonly disabled: "disabled";
            }>, boolean>;
        }>> & {
            "onChecked-change"?: ((value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => any) | undefined;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "data" | "props" | "format" | "filterable" | "defaultChecked">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: import("vue").Slots;
        $root: import("vue").ComponentPublicInstance | null;
        $parent: import("vue").ComponentPublicInstance | null;
        $emit: (event: "checked-change", value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]) | ((new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]))[], unknown, unknown, () => never[], boolean>;
            readonly optionRender: {
                readonly type: import("vue").PropType<(option: TransferDataItem) => import("vue").VNode | import("vue").VNode[]>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly placeholder: StringConstructor;
            readonly title: StringConstructor;
            readonly filterable: BooleanConstructor;
            readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat) | ((new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat))[], unknown, unknown, () => {}, boolean>;
            readonly filterMethod: {
                readonly type: import("vue").PropType<(query: string, item: TransferDataItem) => boolean>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly defaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
            readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias) | ((new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{
                readonly label: "label";
                readonly key: "key";
                readonly disabled: "disabled";
            }>, boolean>;
        }>> & {
            "onChecked-change"?: ((value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => any) | undefined;
        }, {
            query: import("vue").Ref<string>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "checked-change": (value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => void;
        }, string, {
            readonly data: TransferDataItem[];
            readonly props: import("./transfer").TransferPropsAlias;
            readonly format: import("./transfer").TransferFormat;
            readonly filterable: boolean;
            readonly defaultChecked: import("./transfer").TransferKey[];
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
        readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]) | ((new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]))[], unknown, unknown, () => never[], boolean>;
        readonly optionRender: {
            readonly type: import("vue").PropType<(option: TransferDataItem) => import("vue").VNode | import("vue").VNode[]>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly placeholder: StringConstructor;
        readonly title: StringConstructor;
        readonly filterable: BooleanConstructor;
        readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat) | ((new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat))[], unknown, unknown, () => {}, boolean>;
        readonly filterMethod: {
            readonly type: import("vue").PropType<(query: string, item: TransferDataItem) => boolean>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly defaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
        readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias) | ((new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{
            readonly label: "label";
            readonly key: "key";
            readonly disabled: "disabled";
        }>, boolean>;
    }>> & {
        "onChecked-change"?: ((value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => any) | undefined;
    } & import("vue").ShallowUnwrapRef<{
        query: import("vue").Ref<string>;
    }> & {} & import("vue").ComponentCustomProperties & {
        $slots: {
            empty?(_: {}): any;
            default?(_: {}): any;
        };
    }) | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: import("./transfer").TransferKey[]) => void;
    change: (value: import("./transfer").TransferKey[], direction: TransferDirection, movedKeys: import("./transfer").TransferKey[]) => void;
    "left-check-change": (value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => void;
    "right-check-change": (value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]) | ((new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]))[], unknown, unknown, () => never[], boolean>;
    readonly titles: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => [string, string]) | (() => [string, string]) | ((new (...args: any[]) => [string, string]) | (() => [string, string]))[], unknown, unknown, () => never[], boolean>;
    readonly buttonTexts: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => [string, string]) | (() => [string, string]) | ((new (...args: any[]) => [string, string]) | (() => [string, string]))[], unknown, unknown, () => never[], boolean>;
    readonly filterPlaceholder: StringConstructor;
    readonly filterMethod: {
        readonly type: import("vue").PropType<(query: string, item: TransferDataItem) => boolean>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly leftDefaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
    readonly rightDefaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
    readonly renderContent: {
        readonly type: import("vue").PropType<import("./transfer").renderContent>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly modelValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
    readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat) | ((new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat))[], unknown, unknown, () => {}, boolean>;
    readonly filterable: BooleanConstructor;
    readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias) | ((new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{
        readonly label: "label";
        readonly key: "key";
        readonly disabled: "disabled";
    }>, boolean>;
    readonly targetOrder: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "push" | "unshift" | "original", unknown, "original", boolean>;
    readonly validateEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>> & {
    "onUpdate:modelValue"?: ((value: import("./transfer").TransferKey[]) => any) | undefined;
    onChange?: ((value: import("./transfer").TransferKey[], direction: TransferDirection, movedKeys: import("./transfer").TransferKey[]) => any) | undefined;
    "onLeft-check-change"?: ((value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => any) | undefined;
    "onRight-check-change"?: ((value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => any) | undefined;
}, {
    readonly data: TransferDataItem[];
    readonly props: import("./transfer").TransferPropsAlias;
    readonly titles: [string, string];
    readonly modelValue: import("./transfer").TransferKey[];
    readonly validateEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly format: import("./transfer").TransferFormat;
    readonly filterable: boolean;
    readonly buttonTexts: [string, string];
    readonly leftDefaultChecked: import("./transfer").TransferKey[];
    readonly rightDefaultChecked: import("./transfer").TransferKey[];
    readonly targetOrder: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "push" | "unshift" | "original", unknown>;
}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
