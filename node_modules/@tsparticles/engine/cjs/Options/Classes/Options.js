"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
const Utils_js_1 = require("../../Utils/Utils.js");
const TypeUtils_js_1 = require("../../Utils/TypeUtils.js");
const Background_js_1 = require("./Background/Background.js");
const BackgroundMask_js_1 = require("./BackgroundMask/BackgroundMask.js");
const FullScreen_js_1 = require("./FullScreen/FullScreen.js");
const Interactivity_js_1 = require("./Interactivity/Interactivity.js");
const ManualParticle_js_1 = require("./ManualParticle.js");
const Responsive_js_1 = require("./Responsive.js");
const ResponsiveMode_js_1 = require("../../Enums/Modes/ResponsiveMode.js");
const Theme_js_1 = require("./Theme/Theme.js");
const ThemeMode_js_1 = require("../../Enums/Modes/ThemeMode.js");
const OptionsUtils_js_1 = require("../../Utils/OptionsUtils.js");
const NumberUtils_js_1 = require("../../Utils/NumberUtils.js");
class Options {
    constructor(engine, container) {
        this._findDefaultTheme = mode => {
            return (this.themes.find(theme => theme.default.value && theme.default.mode === mode) ??
                this.themes.find(theme => theme.default.value && theme.default.mode === ThemeMode_js_1.ThemeMode.any));
        };
        this._importPreset = preset => {
            this.load(this._engine.getPreset(preset));
        };
        this._engine = engine;
        this._container = container;
        this.autoPlay = true;
        this.background = new Background_js_1.Background();
        this.backgroundMask = new BackgroundMask_js_1.BackgroundMask();
        this.clear = true;
        this.defaultThemes = {};
        this.delay = 0;
        this.fullScreen = new FullScreen_js_1.FullScreen();
        this.detectRetina = true;
        this.duration = 0;
        this.fpsLimit = 120;
        this.interactivity = new Interactivity_js_1.Interactivity(engine, container);
        this.manualParticles = [];
        this.particles = (0, OptionsUtils_js_1.loadParticlesOptions)(this._engine, this._container);
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = true;
        this.responsive = [];
        this.smooth = false;
        this.style = {};
        this.themes = [];
        this.zLayers = 100;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.preset !== undefined) {
            (0, Utils_js_1.executeOnSingleOrMultiple)(data.preset, preset => this._importPreset(preset));
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        if (data.clear !== undefined) {
            this.clear = data.clear;
        }
        if (data.key !== undefined) {
            this.key = data.key;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.delay !== undefined) {
            this.delay = (0, NumberUtils_js_1.setRangeValue)(data.delay);
        }
        const detectRetina = data.detectRetina;
        if (detectRetina !== undefined) {
            this.detectRetina = detectRetina;
        }
        if (data.duration !== undefined) {
            this.duration = (0, NumberUtils_js_1.setRangeValue)(data.duration);
        }
        const fpsLimit = data.fpsLimit;
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
        const fullScreen = data.fullScreen;
        if ((0, TypeUtils_js_1.isBoolean)(fullScreen)) {
            this.fullScreen.enable = fullScreen;
        }
        else {
            this.fullScreen.load(fullScreen);
        }
        this.backgroundMask.load(data.backgroundMask);
        this.interactivity.load(data.interactivity);
        if (data.manualParticles) {
            this.manualParticles = data.manualParticles.map(t => {
                const tmp = new ManualParticle_js_1.ManualParticle();
                tmp.load(t);
                return tmp;
            });
        }
        this.particles.load(data.particles);
        this.style = (0, Utils_js_1.deepExtend)(this.style, data.style);
        this._engine.loadOptions(this, data);
        if (data.smooth !== undefined) {
            this.smooth = data.smooth;
        }
        const interactors = this._engine.interactors.get(this._container);
        if (interactors) {
            for (const interactor of interactors) {
                if (interactor.loadOptions) {
                    interactor.loadOptions(this, data);
                }
            }
        }
        if (data.responsive !== undefined) {
            for (const responsive of data.responsive) {
                const optResponsive = new Responsive_js_1.Responsive();
                optResponsive.load(responsive);
                this.responsive.push(optResponsive);
            }
        }
        this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
        if (data.themes !== undefined) {
            for (const theme of data.themes) {
                const existingTheme = this.themes.find(t => t.name === theme.name);
                if (!existingTheme) {
                    const optTheme = new Theme_js_1.Theme();
                    optTheme.load(theme);
                    this.themes.push(optTheme);
                }
                else {
                    existingTheme.load(theme);
                }
            }
        }
        this.defaultThemes.dark = this._findDefaultTheme(ThemeMode_js_1.ThemeMode.dark)?.name;
        this.defaultThemes.light = this._findDefaultTheme(ThemeMode_js_1.ThemeMode.light)?.name;
    }
    setResponsive(width, pxRatio, defaultOptions) {
        this.load(defaultOptions);
        const responsiveOptions = this.responsive.find(t => t.mode === ResponsiveMode_js_1.ResponsiveMode.screen && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width);
        this.load(responsiveOptions?.options);
        return responsiveOptions?.maxWidth;
    }
    setTheme(name) {
        if (name) {
            const chosenTheme = this.themes.find(theme => theme.name === name);
            if (chosenTheme) {
                this.load(chosenTheme.options);
            }
        }
        else {
            const mediaMatch = (0, Utils_js_1.safeMatchMedia)("(prefers-color-scheme: dark)"), clientDarkMode = mediaMatch?.matches, defaultTheme = this._findDefaultTheme(clientDarkMode ? ThemeMode_js_1.ThemeMode.dark : ThemeMode_js_1.ThemeMode.light);
            if (defaultTheme) {
                this.load(defaultTheme.options);
            }
        }
    }
}
exports.Options = Options;
