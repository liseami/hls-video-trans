import { InteractorType } from "../../Enums/Types/InteractorType.js";
export class ParticlesInteractorBase {
    constructor(container) {
        this.type = InteractorType.particles;
        this.container = container;
    }
}
