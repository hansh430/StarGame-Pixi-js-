
import { Sprite, Application, matrixPool } from "pixi.js";

export type FallingType="STAR" | "BOMB";

export interface FallingItem{
  sprite: Sprite;
  type: FallingType;
  speed: number;
}
export function resetItem(item: FallingItem, app: Application) {
  item.sprite.x=Math.random()*app.screen.width;
  item.sprite.y=-Math.random()*app.screen.height;
  item.speed=4+Math.random()*4;
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
