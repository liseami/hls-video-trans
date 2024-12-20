(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Utils.js", "./Constants.js", "./ByteStream.js", "./Enums/DisposalMethod.js", "./Types/GIFDataHeaders.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGIFLoopAmount = getGIFLoopAmount;
    exports.decodeGIF = decodeGIF;
    exports.drawGif = drawGif;
    exports.loadGifImage = loadGifImage;
    const Utils_js_1 = require("../Utils.js");
    const Constants_js_1 = require("./Constants.js");
    const ByteStream_js_1 = require("./ByteStream.js");
    const DisposalMethod_js_1 = require("./Enums/DisposalMethod.js");
    const GIFDataHeaders_js_1 = require("./Types/GIFDataHeaders.js");
    const origin = {
        x: 0,
        y: 0,
    }, defaultFrame = 0, half = 0.5, initialTime = 0, firstIndex = 0, defaultLoopCount = 0;
    function parseColorTable(byteStream, count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push({
                r: byteStream.data[byteStream.pos],
                g: byteStream.data[byteStream.pos + 1],
                b: byteStream.data[byteStream.pos + 2],
            });
            byteStream.pos += 3;
        }
        return colors;
    }
    function parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex) {
        switch (byteStream.nextByte()) {
            case GIFDataHeaders_js_1.GIFDataHeaders.GraphicsControlExtension: {
                const frame = gif.frames[getFrameIndex(false)];
                byteStream.pos++;
                const packedByte = byteStream.nextByte();
                frame.GCreserved = (packedByte & 0xe0) >>> 5;
                frame.disposalMethod = (packedByte & 0x1c) >>> 2;
                frame.userInputDelayFlag = (packedByte & 2) === 2;
                const transparencyFlag = (packedByte & 1) === 1;
                frame.delayTime = byteStream.nextTwoBytes() * 0xa;
                const transparencyIndex = byteStream.nextByte();
                if (transparencyFlag) {
                    getTransparencyIndex(transparencyIndex);
                }
                byteStream.pos++;
                break;
            }
            case GIFDataHeaders_js_1.GIFDataHeaders.ApplicationExtension: {
                byteStream.pos++;
                const applicationExtension = {
                    identifier: byteStream.getString(8),
                    authenticationCode: byteStream.getString(3),
                    data: byteStream.readSubBlocksBin(),
                };
                gif.applicationExtensions.push(applicationExtension);
                break;
            }
            case GIFDataHeaders_js_1.GIFDataHeaders.CommentExtension: {
                gif.comments.push([getFrameIndex(false), byteStream.readSubBlocks()]);
                break;
            }
            case GIFDataHeaders_js_1.GIFDataHeaders.PlainTextExtension: {
                if (gif.globalColorTable.length === 0) {
                    throw new EvalError("plain text extension without global color table");
                }
                byteStream.pos++;
                gif.frames[getFrameIndex(false)].plainTextData = {
                    left: byteStream.nextTwoBytes(),
                    top: byteStream.nextTwoBytes(),
                    width: byteStream.nextTwoBytes(),
                    height: byteStream.nextTwoBytes(),
                    charSize: {
                        width: byteStream.nextTwoBytes(),
                        height: byteStream.nextTwoBytes(),
                    },
                    foregroundColor: byteStream.nextByte(),
                    backgroundColor: byteStream.nextByte(),
                    text: byteStream.readSubBlocks(),
                };
                break;
            }
            default:
                byteStream.skipSubBlocks();
                break;
        }
    }
    async function parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
        const frame = gif.frames[getFrameIndex(true)];
        frame.left = byteStream.nextTwoBytes();
        frame.top = byteStream.nextTwoBytes();
        frame.width = byteStream.nextTwoBytes();
        frame.height = byteStream.nextTwoBytes();
        const packedByte = byteStream.nextByte(), localColorTableFlag = (packedByte & 0x80) === 0x80, interlacedFlag = (packedByte & 0x40) === 0x40;
        frame.sortFlag = (packedByte & 0x20) === 0x20;
        frame.reserved = (packedByte & 0x18) >>> 3;
        const localColorCount = 1 << ((packedByte & 7) + 1);
        if (localColorTableFlag) {
            frame.localColorTable = parseColorTable(byteStream, localColorCount);
        }
        const getColor = (index) => {
            const { r, g, b } = (localColorTableFlag ? frame.localColorTable : gif.globalColorTable)[index];
            if (index !== getTransparencyIndex(null)) {
                return { r, g, b, a: 255 };
            }
            return { r, g, b, a: avgAlpha ? ~~((r + g + b) / 3) : 0 };
        };
        const image = (() => {
            try {
                return new ImageData(frame.width, frame.height, { colorSpace: "srgb" });
            }
            catch (error) {
                if (error instanceof DOMException && error.name === "IndexSizeError") {
                    return null;
                }
                throw error;
            }
        })();
        if (image == null) {
            throw new EvalError("GIF frame size is to large");
        }
        const minCodeSize = byteStream.nextByte(), imageData = byteStream.readSubBlocksBin(), clearCode = 1 << minCodeSize;
        const readBits = (pos, len) => {
            const bytePos = pos >>> 3, bitPos = pos & 7;
            return (((imageData[bytePos] + (imageData[bytePos + 1] << 8) + (imageData[bytePos + 2] << 16)) &
                (((1 << len) - 1) << bitPos)) >>>
                bitPos);
        };
        if (interlacedFlag) {
            for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pass = 0; pass < 4; pass++) {
                if (Constants_js_1.InterlaceOffsets[pass] < frame.height) {
                    let pixelPos = 0, lineIndex = 0, exit = false;
                    while (!exit) {
                        const last = code;
                        code = readBits(pos, size);
                        pos += size + 1;
                        if (code === clearCode) {
                            size = minCodeSize + 1;
                            dic.length = clearCode + 2;
                            for (let i = 0; i < dic.length; i++) {
                                dic[i] = i < clearCode ? [i] : [];
                            }
                        }
                        else {
                            if (code >= dic.length) {
                                dic.push(dic[last].concat(dic[last][0]));
                            }
                            else if (last !== clearCode) {
                                dic.push(dic[last].concat(dic[code][0]));
                            }
                            for (const item of dic[code]) {
                                const { r, g, b, a } = getColor(item);
                                image.data.set([r, g, b, a], Constants_js_1.InterlaceOffsets[pass] * frame.width +
                                    Constants_js_1.InterlaceSteps[pass] * lineIndex +
                                    (pixelPos % (frame.width * 4)));
                                pixelPos += 4;
                            }
                            if (dic.length === 1 << size && size < 0xc) {
                                size++;
                            }
                        }
                        if (pixelPos === frame.width * 4 * (lineIndex + 1)) {
                            lineIndex++;
                            if (Constants_js_1.InterlaceOffsets[pass] + Constants_js_1.InterlaceSteps[pass] * lineIndex >= frame.height) {
                                exit = true;
                            }
                        }
                    }
                }
                progressCallback?.(byteStream.pos / (byteStream.data.length - 1), getFrameIndex(false) + 1, image, { x: frame.left, y: frame.top }, { width: gif.width, height: gif.height });
            }
            frame.image = image;
            frame.bitmap = await createImageBitmap(image);
        }
        else {
            let code = 0, size = minCodeSize + 1, pos = 0, pixelPos = -4, exit = false;
            const dic = [[0]];
            while (!exit) {
                const last = code;
                code = readBits(pos, size);
                pos += size;
                if (code === clearCode) {
                    size = minCodeSize + 1;
                    dic.length = clearCode + 2;
                    for (let i = 0; i < dic.length; i++) {
                        dic[i] = i < clearCode ? [i] : [];
                    }
                }
                else {
                    if (code === clearCode + 1) {
                        exit = true;
                        break;
                    }
                    if (code >= dic.length) {
                        dic.push(dic[last].concat(dic[last][0]));
                    }
                    else if (last !== clearCode) {
                        dic.push(dic[last].concat(dic[code][0]));
                    }
                    for (const item of dic[code]) {
                        const { r, g, b, a } = getColor(item);
                        image.data.set([r, g, b, a], (pixelPos += 4));
                    }
                    if (dic.length >= 1 << size && size < 0xc) {
                        size++;
                    }
                }
            }
            frame.image = image;
            frame.bitmap = await createImageBitmap(image);
            progressCallback?.((byteStream.pos + 1) / byteStream.data.length, getFrameIndex(false) + 1, frame.image, { x: frame.left, y: frame.top }, { width: gif.width, height: gif.height });
        }
    }
    async function parseBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
        switch (byteStream.nextByte()) {
            case GIFDataHeaders_js_1.GIFDataHeaders.EndOfFile:
                return true;
            case GIFDataHeaders_js_1.GIFDataHeaders.Image:
                await parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback);
                break;
            case GIFDataHeaders_js_1.GIFDataHeaders.Extension:
                parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex);
                break;
            default:
                throw new EvalError("undefined block found");
        }
        return false;
    }
    function getGIFLoopAmount(gif) {
        for (const extension of gif.applicationExtensions) {
            if (extension.identifier + extension.authenticationCode !== "NETSCAPE2.0") {
                continue;
            }
            return extension.data[1] + (extension.data[2] << 8);
        }
        return NaN;
    }
    async function decodeGIF(gifURL, progressCallback, avgAlpha) {
        if (!avgAlpha)
            avgAlpha = false;
        const res = await fetch(gifURL);
        if (!res.ok && res.status === 404) {
            throw new EvalError("file not found");
        }
        const buffer = await res.arrayBuffer();
        const gif = {
            width: 0,
            height: 0,
            totalTime: 0,
            colorRes: 0,
            pixelAspectRatio: 0,
            frames: [],
            sortFlag: false,
            globalColorTable: [],
            backgroundImage: new ImageData(1, 1, { colorSpace: "srgb" }),
            comments: [],
            applicationExtensions: [],
        }, byteStream = new ByteStream_js_1.ByteStream(new Uint8ClampedArray(buffer));
        if (byteStream.getString(6) !== "GIF89a") {
            throw new Error("not a supported GIF file");
        }
        gif.width = byteStream.nextTwoBytes();
        gif.height = byteStream.nextTwoBytes();
        const packedByte = byteStream.nextByte(), globalColorTableFlag = (packedByte & 0x80) === 0x80;
        gif.colorRes = (packedByte & 0x70) >>> 4;
        gif.sortFlag = (packedByte & 8) === 8;
        const globalColorCount = 1 << ((packedByte & 7) + 1), backgroundColorIndex = byteStream.nextByte();
        gif.pixelAspectRatio = byteStream.nextByte();
        if (gif.pixelAspectRatio !== 0) {
            gif.pixelAspectRatio = (gif.pixelAspectRatio + 0xf) / 0x40;
        }
        if (globalColorTableFlag) {
            gif.globalColorTable = parseColorTable(byteStream, globalColorCount);
        }
        const backgroundImage = (() => {
            try {
                return new ImageData(gif.width, gif.height, { colorSpace: "srgb" });
            }
            catch (error) {
                if (error instanceof DOMException && error.name === "IndexSizeError") {
                    return null;
                }
                throw error;
            }
        })();
        if (backgroundImage == null) {
            throw new Error("GIF frame size is to large");
        }
        const { r, g, b } = gif.globalColorTable[backgroundColorIndex];
        backgroundImage.data.set(globalColorTableFlag ? [r, g, b, 255] : [0, 0, 0, 0]);
        for (let i = 4; i < backgroundImage.data.length; i *= 2) {
            backgroundImage.data.copyWithin(i, 0, i);
        }
        gif.backgroundImage = backgroundImage;
        let frameIndex = -1, incrementFrameIndex = true, transparencyIndex = -1;
        const getframeIndex = (increment) => {
            if (increment) {
                incrementFrameIndex = true;
            }
            return frameIndex;
        };
        const getTransparencyIndex = (newValue) => {
            if (newValue != null) {
                transparencyIndex = newValue;
            }
            return transparencyIndex;
        };
        try {
            do {
                if (incrementFrameIndex) {
                    gif.frames.push({
                        left: 0,
                        top: 0,
                        width: 0,
                        height: 0,
                        disposalMethod: DisposalMethod_js_1.DisposalMethod.Replace,
                        image: new ImageData(1, 1, { colorSpace: "srgb" }),
                        plainTextData: null,
                        userInputDelayFlag: false,
                        delayTime: 0,
                        sortFlag: false,
                        localColorTable: [],
                        reserved: 0,
                        GCreserved: 0,
                    });
                    frameIndex++;
                    transparencyIndex = -1;
                    incrementFrameIndex = false;
                }
            } while (!(await parseBlock(byteStream, gif, avgAlpha, getframeIndex, getTransparencyIndex, progressCallback)));
            gif.frames.length--;
            for (const frame of gif.frames) {
                if (frame.userInputDelayFlag && frame.delayTime === 0) {
                    gif.totalTime = Infinity;
                    break;
                }
                gif.totalTime += frame.delayTime;
            }
            return gif;
        }
        catch (error) {
            if (error instanceof EvalError) {
                throw new Error(`error while parsing frame ${frameIndex} "${error.message}"`);
            }
            throw error;
        }
    }
    function drawGif(data) {
        const { context, radius, particle, delta } = data, image = particle.image;
        if (!image?.gifData || !image.gif) {
            return;
        }
        const offscreenCanvas = new OffscreenCanvas(image.gifData.width, image.gifData.height), offscreenContext = offscreenCanvas.getContext("2d");
        if (!offscreenContext) {
            throw new Error("could not create offscreen canvas context");
        }
        offscreenContext.imageSmoothingQuality = "low";
        offscreenContext.imageSmoothingEnabled = false;
        offscreenContext.clearRect(origin.x, origin.y, offscreenCanvas.width, offscreenCanvas.height);
        if (particle.gifLoopCount === undefined) {
            particle.gifLoopCount = image.gifLoopCount ?? defaultLoopCount;
        }
        let frameIndex = particle.gifFrame ?? defaultFrame;
        const pos = { x: -image.gifData.width * half, y: -image.gifData.height * half }, frame = image.gifData.frames[frameIndex];
        if (particle.gifTime === undefined) {
            particle.gifTime = initialTime;
        }
        if (!frame.bitmap) {
            return;
        }
        context.scale(radius / image.gifData.width, radius / image.gifData.height);
        switch (frame.disposalMethod) {
            case DisposalMethod_js_1.DisposalMethod.UndefinedA:
            case DisposalMethod_js_1.DisposalMethod.UndefinedB:
            case DisposalMethod_js_1.DisposalMethod.UndefinedC:
            case DisposalMethod_js_1.DisposalMethod.UndefinedD:
            case DisposalMethod_js_1.DisposalMethod.Replace:
                offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
                context.drawImage(offscreenCanvas, pos.x, pos.y);
                offscreenContext.clearRect(origin.x, origin.y, offscreenCanvas.width, offscreenCanvas.height);
                break;
            case DisposalMethod_js_1.DisposalMethod.Combine:
                offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
                context.drawImage(offscreenCanvas, pos.x, pos.y);
                break;
            case DisposalMethod_js_1.DisposalMethod.RestoreBackground:
                offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
                context.drawImage(offscreenCanvas, pos.x, pos.y);
                offscreenContext.clearRect(origin.x, origin.y, offscreenCanvas.width, offscreenCanvas.height);
                if (!image.gifData.globalColorTable.length) {
                    offscreenContext.putImageData(image.gifData.frames[firstIndex].image, pos.x + frame.left, pos.y + frame.top);
                }
                else {
                    offscreenContext.putImageData(image.gifData.backgroundImage, pos.x, pos.y);
                }
                break;
            case DisposalMethod_js_1.DisposalMethod.RestorePrevious:
                {
                    const previousImageData = offscreenContext.getImageData(origin.x, origin.y, offscreenCanvas.width, offscreenCanvas.height);
                    offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
                    context.drawImage(offscreenCanvas, pos.x, pos.y);
                    offscreenContext.clearRect(origin.x, origin.y, offscreenCanvas.width, offscreenCanvas.height);
                    offscreenContext.putImageData(previousImageData, origin.x, origin.y);
                }
                break;
        }
        particle.gifTime += delta.value;
        if (particle.gifTime > frame.delayTime) {
            particle.gifTime -= frame.delayTime;
            if (++frameIndex >= image.gifData.frames.length) {
                if (--particle.gifLoopCount <= defaultLoopCount) {
                    return;
                }
                frameIndex = firstIndex;
                offscreenContext.clearRect(origin.x, origin.y, offscreenCanvas.width, offscreenCanvas.height);
            }
            particle.gifFrame = frameIndex;
        }
        context.scale(image.gifData.width / radius, image.gifData.height / radius);
    }
    async function loadGifImage(image) {
        if (image.type !== "gif") {
            await (0, Utils_js_1.loadImage)(image);
            return;
        }
        image.loading = true;
        try {
            image.gifData = await decodeGIF(image.source);
            image.gifLoopCount = getGIFLoopAmount(image.gifData) ?? defaultLoopCount;
            if (!image.gifLoopCount) {
                image.gifLoopCount = Infinity;
            }
        }
        catch {
            image.error = true;
        }
        image.loading = false;
    }
});
