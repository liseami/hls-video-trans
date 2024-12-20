"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GIFDataHeaders = void 0;
var GIFDataHeaders;
(function (GIFDataHeaders) {
    GIFDataHeaders[GIFDataHeaders["Extension"] = 33] = "Extension";
    GIFDataHeaders[GIFDataHeaders["ApplicationExtension"] = 255] = "ApplicationExtension";
    GIFDataHeaders[GIFDataHeaders["GraphicsControlExtension"] = 249] = "GraphicsControlExtension";
    GIFDataHeaders[GIFDataHeaders["PlainTextExtension"] = 1] = "PlainTextExtension";
    GIFDataHeaders[GIFDataHeaders["CommentExtension"] = 254] = "CommentExtension";
    GIFDataHeaders[GIFDataHeaders["Image"] = 44] = "Image";
    GIFDataHeaders[GIFDataHeaders["EndOfFile"] = 59] = "EndOfFile";
})(GIFDataHeaders || (exports.GIFDataHeaders = GIFDataHeaders = {}));
