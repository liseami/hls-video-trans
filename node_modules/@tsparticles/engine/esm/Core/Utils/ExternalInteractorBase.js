import { InteractorType } from "../../Enums/Types/InteractorType.js";
export class ExternalInteractorBase {
    constructor(container) {
        this.type = InteractorType.external;
        this.container = container;
    }
}
