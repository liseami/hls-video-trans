import { Linker } from "./Linker.js";
export async function loadLinksInteraction(engine, refresh = true) {
    await engine.addInteractor("particlesLinks", async (container) => {
        return Promise.resolve(new Linker(container, engine));
    }, refresh);
}
