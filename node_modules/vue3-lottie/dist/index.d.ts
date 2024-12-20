import { App } from 'vue';
import Vue3Lottie from './vue3-lottie.vue';
export { Vue3Lottie };
export declare function install(app: App, options: {
    name: string;
}): void;
declare const plugin: {
    version: string;
    install: typeof install;
};
export default plugin;
