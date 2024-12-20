export declare class ByteStream {
    data: Uint8ClampedArray;
    pos: number;
    constructor(bytes: Uint8ClampedArray);
    getString(count: number): string;
    nextByte(): number;
    nextTwoBytes(): number;
    readSubBlocks(): string;
    readSubBlocksBin(): Uint8Array;
    skipSubBlocks(): void;
}
