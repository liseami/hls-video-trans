import { circleBounce, circleBounceDataFromParticle, getRangeValue } from "@tsparticles/engine";
const fixBounceSpeed = (p) => {
    if (p.collisionMaxSpeed === undefined) {
        p.collisionMaxSpeed = getRangeValue(p.options.collisions.maxSpeed);
    }
    if (p.velocity.length > p.collisionMaxSpeed) {
        p.velocity.length = p.collisionMaxSpeed;
    }
};
export function bounce(p1, p2) {
    circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
    fixBounceSpeed(p1);
    fixBounceSpeed(p2);
}
