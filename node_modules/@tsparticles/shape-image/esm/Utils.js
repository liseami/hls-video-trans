import { errorPrefix, getLogger, getStyleFromHsl } from "@tsparticles/engine";
const stringStart = 0, defaultOpacity = 1;
const currentColorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
function replaceColorSvg(imageShape, color, opacity) {
    const { svgData } = imageShape;
    if (!svgData) {
        return "";
    }
    const colorStyle = getStyleFromHsl(color, opacity);
    if (svgData.includes("fill")) {
        return svgData.replace(currentColorRegex, () => colorStyle);
    }
    const preFillIndex = svgData.indexOf(">");
    return `${svgData.substring(stringStart, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}
export async function loadImage(image) {
    return new Promise((resolve) => {
        image.loading = true;
        const img = new Image();
        image.element = img;
        img.addEventListener("load", () => {
            image.loading = false;
            resolve();
        });
        img.addEventListener("error", () => {
            image.element = undefined;
            image.error = true;
            image.loading = false;
            getLogger().error(`${errorPrefix} loading image: ${image.source}`);
            resolve();
        });
        img.src = image.source;
    });
}
export async function downloadSvgImage(image) {
    if (image.type !== "svg") {
        await loadImage(image);
        return;
    }
    image.loading = true;
    const response = await fetch(image.source);
    if (!response.ok) {
        getLogger().error(`${errorPrefix} Image not found`);
        image.error = true;
    }
    else {
        image.svgData = await response.text();
    }
    image.loading = false;
}
export function replaceImageColor(image, imageData, color, particle) {
    const svgColoredData = replaceColorSvg(image, color, particle.opacity?.value ?? defaultOpacity), imageRes = {
        color,
        gif: imageData.gif,
        data: {
            ...image,
            svgData: svgColoredData,
        },
        loaded: false,
        ratio: imageData.width / imageData.height,
        replaceColor: imageData.replaceColor,
        source: imageData.src,
    };
    return new Promise(resolve => {
        const svg = new Blob([svgColoredData], { type: "image/svg+xml" }), domUrl = URL || window.URL || window.webkitURL || window, url = domUrl.createObjectURL(svg), img = new Image();
        img.addEventListener("load", () => {
            imageRes.loaded = true;
            imageRes.element = img;
            resolve(imageRes);
            domUrl.revokeObjectURL(url);
        });
        const errorHandler = async () => {
            domUrl.revokeObjectURL(url);
            const img2 = {
                ...image,
                error: false,
                loading: true,
            };
            await loadImage(img2);
            imageRes.loaded = true;
            imageRes.element = img2.element;
            resolve(imageRes);
        };
        img.addEventListener("error", () => void errorHandler());
        img.src = url;
    });
}
