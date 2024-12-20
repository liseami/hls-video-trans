"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
const Utils_1 = require("../../Utils/Utils");
const Background_1 = require("./Background/Background");
const BackgroundMask_1 = require("./BackgroundMask/BackgroundMask");
const FullScreen_1 = require("./FullScreen/FullScreen");
const Interactivity_1 = require("./Interactivity/Interactivity");
const ManualParticle_1 = require("./ManualParticle");
const Responsive_1 = require("./Responsive");
const Theme_1 = require("./Theme/Theme");
const OptionsUtils_1 = require("../../Utils/OptionsUtils");
const NumberUtils_1 = require("../../Utils/NumberUtils");
class Options {
    constructor(engine, container) {
        this._findDefaultTheme = (mode) => {
            return (this.themes.find((theme) => theme.default.value && theme.default.mode === mode) ??
                this.themes.find((theme) => theme.default.value && theme.default.mode === "any"));
        };
        this._importPreset = (preset) => {
            this.load(this._engine.plugins.getPreset(preset));
        };
        this._engine = engine;
        this._container = container;
        this.autoPlay = true;
        this.background = new Background_1.Background();
        this.backgroundMask = new BackgroundMask_1.BackgroundMask();
        this.defaultThemes = {};
        this.delay = 0;
        this.fullScreen = new FullScreen_1.FullScreen();
        this.detectRetina = true;
        this.duration = 0;
        this.fpsLimit = 120;
        this.interactivity = new Interactivity_1.Interactivity(engine, container);
        this.manualParticles = [];
        this.particles = (0, OptionsUtils_1.loadParticlesOptions)(this._engine, this._container);
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = true;
        this.responsive = [];
        this.smooth = false;
        this.style = {};
        this.themes = [];
        this.zLayers = 100;
    }
    get backgroundMode() {
        return this.fullScreen;
    }
    set backgroundMode(value) {
        this.fullScreen.load(value);
    }
    get fps_limit() {
        return this.fpsLimit;
    }
    set fps_limit(value) {
        this.fpsLimit = value;
    }
    get retina_detect() {
        return this.detectRetina;
    }
    set retina_detect(value) {
        this.detectRetina = value;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.preset !== undefined) {
            (0, Utils_1.executeOnSingleOrMultiple)(data.preset, (preset) => this._importPreset(preset));
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        if (data.delay !== undefined) {
            this.delay = (0, NumberUtils_1.setRangeValue)(data.delay);
        }
        const detectRetina = data.detectRetina ?? data.retina_detect;
        if (detectRetina !== undefined) {
            this.detectRetina = detectRetina;
        }
        if (data.duration !== undefined) {
            this.duration = (0, NumberUtils_1.setRangeValue)(data.duration);
        }
        const fpsLimit = data.fpsLimit ?? data.fps_limit;
        if (fpsLimit !== undefined) {
            this.fpsLimit = fpsLimit;
        }
        if (data.pauseOnBlur !== undefined) {
            this.pauseOnBlur = data.pauseOnBlur;
        }
        if (data.pauseOnOutsideViewport !== undefined) {
            this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
        }
        if (data.zLayers !== undefined) {
            this.zLayers = data.zLayers;
        }
        this.background.load(data.background);
        const fullScreen = data.fullScreen ?? data.backgroundMode;
        if ((0, Utils_1.isBoolean)(fullScreen)) {
            this.fullScreen.enable = fullScreen;
        }
        else {
            this.fullScreen.load(fullScreen);
        }
        this.backgroundMask.load(data.backgroundMask);
        this.interactivity.load(data.interactivity);
        if (data.manualParticles) {
            this.manualParticles = data.manualParticles.map((t) => {
                const tmp = new ManualParticle_1.ManualParticle();
                tmp.load(t);
                return tmp;
            });
        }
        this.particles.load(data.particles);
        this.style = (0, Utils_1.deepExtend)(this.style, data.style);
        this._engine.plugins.loadOptions(this, data);
        if (data.smooth !== undefined) {
            this.smooth = data.smooth;
        }
        const interactors = this._engine.plugins.interactors.get(this._container);
        if (interactors) {
            for (const interactor of interactors) {
                if (interactor.loadOptions) {
                    interactor.loadOptions(this, data);
                }
            }
        }
        if (data.responsive !== undefined) {
            for (const responsive of data.responsive) {
                const optResponsive = new Responsive_1.Responsive();
                optResponsive.load(responsive);
                this.responsive.push(optResponsive);
            }
        }
        this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
        if (data.themes !== undefined) {
            for (const theme of data.themes) {
                const existingTheme = this.themes.find((t) => t.name === theme.name);
                if (!existingTheme) {
                    const optTheme = new Theme_1.Theme();
                    optTheme.load(theme);
                    this.themes.push(optTheme);
                }
                else {
                    existingTheme.load(theme);
                }
            }
        }
        this.defaultThemes.dark = this._findDefaultTheme("dark")?.name;
        this.defaultThemes.light = this._findDefaultTheme("light")?.name;
    }
    setResponsive(width, pxRatio, defaultOptions) {
        this.load(defaultOptions);
        const responsiveOptions = this.responsive.find((t) => t.mode === "screen" && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width);
        this.load(responsiveOptions?.options);
        return responsiveOptions?.maxWidth;
    }
    setTheme(name) {
        if (name) {
            const chosenTheme = this.themes.find((theme) => theme.name === name);
            if (chosenTheme) {
                this.load(chosenTheme.options);
            }
        }
        else {
            const mediaMatch = (0, Utils_1.safeMatchMedia)("(prefers-color-scheme: dark)"), clientDarkMode = mediaMatch && mediaMatch.matches, defaultTheme = this._findDefaultTheme(clientDarkMode ? "dark" : "light");
            if (defaultTheme) {
                this.load(defaultTheme.options);
            }
        }
    }
}
exports.Options = Options;
