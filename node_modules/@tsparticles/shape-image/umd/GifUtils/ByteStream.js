(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ByteStream = void 0;
    class ByteStream {
        constructor(bytes) {
            this.pos = 0;
            this.data = new Uint8ClampedArray(bytes);
        }
        getString(count) {
            const slice = this.data.slice(this.pos, this.pos + count);
            this.pos += slice.length;
            return slice.reduce((acc, curr) => acc + String.fromCharCode(curr), "");
        }
        nextByte() {
            return this.data[this.pos++];
        }
        nextTwoBytes() {
            const increment = 2, previous = 1, shift = 8;
            this.pos += increment;
            return this.data[this.pos - increment] + (this.data[this.pos - previous] << shift);
        }
        readSubBlocks() {
            let blockString = "", size = 0;
            const minCount = 0, emptySize = 0;
            do {
                size = this.data[this.pos++];
                for (let count = size; --count >= minCount; blockString += String.fromCharCode(this.data[this.pos++])) {
                }
            } while (size !== emptySize);
            return blockString;
        }
        readSubBlocksBin() {
            let size = this.data[this.pos], len = 0;
            const emptySize = 0, increment = 1;
            for (let offset = 0; size !== emptySize; offset += size + increment, size = this.data[this.pos + offset]) {
                len += size;
            }
            const blockData = new Uint8Array(len);
            size = this.data[this.pos++];
            for (let i = 0; size !== emptySize; size = this.data[this.pos++]) {
                for (let count = size; --count >= emptySize; blockData[i++] = this.data[this.pos++]) {
                }
            }
            return blockData;
        }
        skipSubBlocks() {
            for (const increment = 1, noData = 0; this.data[this.pos] !== noData; this.pos += this.data[this.pos] + increment) {
            }
            this.pos++;
        }
    }
    exports.ByteStream = ByteStream;
});
