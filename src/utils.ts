
import { Sprite, Application } from "pixi.js";

export function resetStar(star: Sprite, app: Application) {
  star.x = Math.random() * app.screen.width;
  star.y = -50;
}

export function checkCollision(a: Sprite, b: Sprite): boolean {
  const ab = a.getBounds();
  const bb = b.getBounds();

  return (
    ab.x + ab.width > bb.x &&
    ab.x < bb.x + bb.width &&
    ab.y + ab.height > bb.y &&
    ab.y < bb.y + bb.height
  );
}
