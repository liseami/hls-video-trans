import { CollisionMode } from "@tsparticles/engine";
import { absorb } from "./Absorb.js";
import { bounce } from "./Bounce.js";
import { destroy } from "./Destroy.js";
export function resolveCollision(p1, p2, delta, pixelRatio) {
    switch (p1.options.collisions.mode) {
        case CollisionMode.absorb: {
            absorb(p1, p2, delta, pixelRatio);
            break;
        }
        case CollisionMode.bounce: {
            bounce(p1, p2);
            break;
        }
        case CollisionMode.destroy: {
            destroy(p1, p2);
            break;
        }
    }
}
