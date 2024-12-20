export declare function isBoolean(arg: unknown): arg is boolean;
export declare function isString(arg: unknown): arg is string;
export declare function isNumber(arg: unknown): arg is number;
export declare function isFunction(arg: unknown): arg is Function;
export declare function isObject<T extends object>(arg: unknown): arg is T;
export declare function isArray<T>(arg: unknown): arg is T[];
export declare function isNull(arg: unknown): arg is null | undefined;
