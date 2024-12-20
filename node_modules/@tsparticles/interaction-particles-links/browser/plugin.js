import { LinksPlugin } from "./LinksPlugin.js";
export async function loadLinksPlugin(engine, refresh = true) {
    const plugin = new LinksPlugin(engine);
    await engine.addPlugin(plugin, refresh);
}
