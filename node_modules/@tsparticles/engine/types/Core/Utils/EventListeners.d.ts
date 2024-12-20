import type { Container } from "../Container.js";
export declare class EventListeners {
    private readonly container;
    private _canPush;
    private readonly _handlers;
    private _resizeObserver?;
    private _resizeTimeout?;
    private readonly _touches;
    constructor(container: Container);
    addListeners(): void;
    removeListeners(): void;
    private readonly _doMouseTouchClick;
    private readonly _handleThemeChange;
    private readonly _handleVisibilityChange;
    private readonly _handleWindowResize;
    private readonly _manageInteractivityListeners;
    private readonly _manageListeners;
    private readonly _manageMediaMatch;
    private readonly _manageResize;
    private readonly _mouseDown;
    private readonly _mouseTouchClick;
    private readonly _mouseTouchFinish;
    private readonly _mouseTouchMove;
    private readonly _touchEnd;
    private readonly _touchEndClick;
    private readonly _touchStart;
}
