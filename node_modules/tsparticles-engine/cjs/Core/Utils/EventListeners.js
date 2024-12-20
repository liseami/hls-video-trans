"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListeners = void 0;
const Utils_1 = require("../../Utils/Utils");
const Constants_1 = require("./Constants");
function manageListener(element, event, handler, add, options) {
    if (add) {
        let addOptions = { passive: true };
        if ((0, Utils_1.isBoolean)(options)) {
            addOptions.capture = options;
        }
        else if (options !== undefined) {
            addOptions = options;
        }
        element.addEventListener(event, handler, addOptions);
    }
    else {
        const removeOptions = options;
        element.removeEventListener(event, handler, removeOptions);
    }
}
class EventListeners {
    constructor(container) {
        this.container = container;
        this._doMouseTouchClick = (e) => {
            const container = this.container, options = container.actualOptions;
            if (this._canPush) {
                const mouseInteractivity = container.interactivity.mouse, mousePos = mouseInteractivity.position;
                if (!mousePos) {
                    return;
                }
                mouseInteractivity.clickPosition = { ...mousePos };
                mouseInteractivity.clickTime = new Date().getTime();
                const onClick = options.interactivity.events.onClick;
                (0, Utils_1.executeOnSingleOrMultiple)(onClick.mode, (mode) => this.container.handleClickMode(mode));
            }
            if (e.type === "touchend") {
                setTimeout(() => this._mouseTouchFinish(), 500);
            }
        };
        this._handleThemeChange = (e) => {
            const mediaEvent = e, container = this.container, options = container.options, defaultThemes = options.defaultThemes, themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light, theme = options.themes.find((theme) => theme.name === themeName);
            if (theme && theme.default.auto) {
                container.loadTheme(themeName);
            }
        };
        this._handleVisibilityChange = () => {
            const container = this.container, options = container.actualOptions;
            this._mouseTouchFinish();
            if (!options.pauseOnBlur) {
                return;
            }
            if (document && document.hidden) {
                container.pageHidden = true;
                container.pause();
            }
            else {
                container.pageHidden = false;
                if (container.getAnimationStatus()) {
                    container.play(true);
                }
                else {
                    container.draw(true);
                }
            }
        };
        this._handleWindowResize = async () => {
            if (this._resizeTimeout) {
                clearTimeout(this._resizeTimeout);
                delete this._resizeTimeout;
            }
            this._resizeTimeout = setTimeout(async () => {
                const canvas = this.container.canvas;
                canvas && (await canvas.windowResize());
            }, this.container.actualOptions.interactivity.events.resize.delay * 1000);
        };
        this._manageInteractivityListeners = (mouseLeaveTmpEvent, add) => {
            const handlers = this._handlers, container = this.container, options = container.actualOptions;
            const interactivityEl = container.interactivity.element;
            if (!interactivityEl) {
                return;
            }
            const html = interactivityEl, canvasEl = container.canvas.element;
            if (canvasEl) {
                canvasEl.style.pointerEvents = html === canvasEl ? "initial" : "none";
            }
            if (!(options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable)) {
                return;
            }
            manageListener(interactivityEl, Constants_1.mouseMoveEvent, handlers.mouseMove, add);
            manageListener(interactivityEl, Constants_1.touchStartEvent, handlers.touchStart, add);
            manageListener(interactivityEl, Constants_1.touchMoveEvent, handlers.touchMove, add);
            if (!options.interactivity.events.onClick.enable) {
                manageListener(interactivityEl, Constants_1.touchEndEvent, handlers.touchEnd, add);
            }
            else {
                manageListener(interactivityEl, Constants_1.touchEndEvent, handlers.touchEndClick, add);
                manageListener(interactivityEl, Constants_1.mouseUpEvent, handlers.mouseUp, add);
                manageListener(interactivityEl, Constants_1.mouseDownEvent, handlers.mouseDown, add);
            }
            manageListener(interactivityEl, mouseLeaveTmpEvent, handlers.mouseLeave, add);
            manageListener(interactivityEl, Constants_1.touchCancelEvent, handlers.touchCancel, add);
        };
        this._manageListeners = (add) => {
            const handlers = this._handlers, container = this.container, options = container.actualOptions, detectType = options.interactivity.detectsOn, canvasEl = container.canvas.element;
            let mouseLeaveTmpEvent = Constants_1.mouseLeaveEvent;
            if (detectType === "window") {
                container.interactivity.element = window;
                mouseLeaveTmpEvent = Constants_1.mouseOutEvent;
            }
            else if (detectType === "parent" && canvasEl) {
                container.interactivity.element = canvasEl.parentElement ?? canvasEl.parentNode;
            }
            else {
                container.interactivity.element = canvasEl;
            }
            this._manageMediaMatch(add);
            this._manageResize(add);
            this._manageInteractivityListeners(mouseLeaveTmpEvent, add);
            if (document) {
                manageListener(document, Constants_1.visibilityChangeEvent, handlers.visibilityChange, add, false);
            }
        };
        this._manageMediaMatch = (add) => {
            const handlers = this._handlers, mediaMatch = (0, Utils_1.safeMatchMedia)("(prefers-color-scheme: dark)");
            if (!mediaMatch) {
                return;
            }
            if (mediaMatch.addEventListener !== undefined) {
                manageListener(mediaMatch, "change", handlers.themeChange, add);
                return;
            }
            if (mediaMatch.addListener === undefined) {
                return;
            }
            if (add) {
                mediaMatch.addListener(handlers.oldThemeChange);
            }
            else {
                mediaMatch.removeListener(handlers.oldThemeChange);
            }
        };
        this._manageResize = (add) => {
            const handlers = this._handlers, container = this.container, options = container.actualOptions;
            if (!options.interactivity.events.resize) {
                return;
            }
            if (typeof ResizeObserver === "undefined") {
                manageListener(window, Constants_1.resizeEvent, handlers.resize, add);
                return;
            }
            const canvasEl = container.canvas.element;
            if (this._resizeObserver && !add) {
                if (canvasEl) {
                    this._resizeObserver.unobserve(canvasEl);
                }
                this._resizeObserver.disconnect();
                delete this._resizeObserver;
            }
            else if (!this._resizeObserver && add && canvasEl) {
                this._resizeObserver = new ResizeObserver(async (entries) => {
                    const entry = entries.find((e) => e.target === canvasEl);
                    if (!entry) {
                        return;
                    }
                    await this._handleWindowResize();
                });
                this._resizeObserver.observe(canvasEl);
            }
        };
        this._mouseDown = () => {
            const { interactivity } = this.container;
            if (!interactivity) {
                return;
            }
            const { mouse } = interactivity;
            mouse.clicking = true;
            mouse.downPosition = mouse.position;
        };
        this._mouseTouchClick = (e) => {
            const container = this.container, options = container.actualOptions, { mouse } = container.interactivity;
            mouse.inside = true;
            let handled = false;
            const mousePosition = mouse.position;
            if (!mousePosition || !options.interactivity.events.onClick.enable) {
                return;
            }
            for (const [, plugin] of container.plugins) {
                if (!plugin.clickPositionValid) {
                    continue;
                }
                handled = plugin.clickPositionValid(mousePosition);
                if (handled) {
                    break;
                }
            }
            if (!handled) {
                this._doMouseTouchClick(e);
            }
            mouse.clicking = false;
        };
        this._mouseTouchFinish = () => {
            const interactivity = this.container.interactivity;
            if (!interactivity) {
                return;
            }
            const mouse = interactivity.mouse;
            delete mouse.position;
            delete mouse.clickPosition;
            delete mouse.downPosition;
            interactivity.status = Constants_1.mouseLeaveEvent;
            mouse.inside = false;
            mouse.clicking = false;
        };
        this._mouseTouchMove = (e) => {
            const container = this.container, options = container.actualOptions, interactivity = container.interactivity, canvasEl = container.canvas.element;
            if (!interactivity || !interactivity.element) {
                return;
            }
            interactivity.mouse.inside = true;
            let pos;
            if (e.type.startsWith("pointer")) {
                this._canPush = true;
                const mouseEvent = e;
                if (interactivity.element === window) {
                    if (canvasEl) {
                        const clientRect = canvasEl.getBoundingClientRect();
                        pos = {
                            x: mouseEvent.clientX - clientRect.left,
                            y: mouseEvent.clientY - clientRect.top,
                        };
                    }
                }
                else if (options.interactivity.detectsOn === "parent") {
                    const source = mouseEvent.target, target = mouseEvent.currentTarget;
                    if (source && target && canvasEl) {
                        const sourceRect = source.getBoundingClientRect(), targetRect = target.getBoundingClientRect(), canvasRect = canvasEl.getBoundingClientRect();
                        pos = {
                            x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
                            y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top),
                        };
                    }
                    else {
                        pos = {
                            x: mouseEvent.offsetX ?? mouseEvent.clientX,
                            y: mouseEvent.offsetY ?? mouseEvent.clientY,
                        };
                    }
                }
                else if (mouseEvent.target === canvasEl) {
                    pos = {
                        x: mouseEvent.offsetX ?? mouseEvent.clientX,
                        y: mouseEvent.offsetY ?? mouseEvent.clientY,
                    };
                }
            }
            else {
                this._canPush = e.type !== "touchmove";
                if (canvasEl) {
                    const touchEvent = e, lastTouch = touchEvent.touches[touchEvent.touches.length - 1], canvasRect = canvasEl.getBoundingClientRect();
                    pos = {
                        x: lastTouch.clientX - (canvasRect.left ?? 0),
                        y: lastTouch.clientY - (canvasRect.top ?? 0),
                    };
                }
            }
            const pxRatio = container.retina.pixelRatio;
            if (pos) {
                pos.x *= pxRatio;
                pos.y *= pxRatio;
            }
            interactivity.mouse.position = pos;
            interactivity.status = Constants_1.mouseMoveEvent;
        };
        this._touchEnd = (e) => {
            const evt = e, touches = Array.from(evt.changedTouches);
            for (const touch of touches) {
                this._touches.delete(touch.identifier);
            }
            this._mouseTouchFinish();
        };
        this._touchEndClick = (e) => {
            const evt = e, touches = Array.from(evt.changedTouches);
            for (const touch of touches) {
                this._touches.delete(touch.identifier);
            }
            this._mouseTouchClick(e);
        };
        this._touchStart = (e) => {
            const evt = e, touches = Array.from(evt.changedTouches);
            for (const touch of touches) {
                this._touches.set(touch.identifier, performance.now());
            }
            this._mouseTouchMove(e);
        };
        this._canPush = true;
        this._touches = new Map();
        this._handlers = {
            mouseDown: () => this._mouseDown(),
            mouseLeave: () => this._mouseTouchFinish(),
            mouseMove: (e) => this._mouseTouchMove(e),
            mouseUp: (e) => this._mouseTouchClick(e),
            touchStart: (e) => this._touchStart(e),
            touchMove: (e) => this._mouseTouchMove(e),
            touchEnd: (e) => this._touchEnd(e),
            touchCancel: (e) => this._touchEnd(e),
            touchEndClick: (e) => this._touchEndClick(e),
            visibilityChange: () => this._handleVisibilityChange(),
            themeChange: (e) => this._handleThemeChange(e),
            oldThemeChange: (e) => this._handleThemeChange(e),
            resize: () => {
                this._handleWindowResize();
            },
        };
    }
    addListeners() {
        this._manageListeners(true);
    }
    removeListeners() {
        this._manageListeners(false);
    }
}
exports.EventListeners = EventListeners;
