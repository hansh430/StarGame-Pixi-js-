
import {
  Application,
  Assets,
  Sprite,
  Text,
  TextStyle
} from "pixi.js";

import { checkCollision, resetStar } from "./utils";

export async function startGame(app: Application) {

  let score = 0;
  const fallSpeed = 6;

 
  // Basket
  const basket = new Sprite(
    await Assets.load("/assets/basket.png")
  );
  basket.anchor.set(0.5);
  basket.x = app.screen.width / 2;
  basket.y = app.screen.height - 80;
  app.stage.addChild(basket);

  // Star
  const star = new Sprite(
    await Assets.load("/assets/star.png")
  );
  star.anchor.set(0.5);
  star.scale.set(0.7);
  resetStar(star, app);
  app.stage.addChild(star);

  // Score Text
  const scoreText = new Text({
    text: "Score: 0",
    style: new TextStyle({
      fill: "#ffffff",
      fontSize: 28
    })
  });

  scoreText.x = 20;
  scoreText.y = 20;
  app.stage.addChild(scoreText);

  // Keyboard input-- move the basket:

  let moveLeft=false;
  let moveRight=false;
  const moveSpeed=8;

  window.addEventListener("keydown", (e) => {

    if (e.key === "ArrowLeft") moveLeft=true;
    if (e.key === "ArrowRight") moveRight=true;
});

 window.addEventListener("keyup", (e) => {

    if (e.key === "ArrowLeft") moveLeft=false;
    if (e.key === "ArrowRight") moveRight=false;
});

function MoveBasket(){
 
    if(moveLeft)
        basket.x-=moveSpeed;

    if(moveRight)
        basket.x+=moveSpeed;

  basket.x = Math.max(
  basket.width / 2,
  Math.min(app.screen.width - basket.width / 2, basket.x)
);
}

  // Game Loop
  app.ticker.add(() => {

    MoveBasket();
    
    star.y += fallSpeed;

    if (checkCollision(basket, star)) {
      score++;
      scoreText.text = `Score: ${score}`;
      resetStar(star, app);
    }

    if (star.y > app.screen.height) {
      gameOver(app, score);
    }
  });
}

// Game Over
function gameOver(app: Application, score: number) {
  app.ticker.stop();

  const gameOverText = new Text({
    text: `Game Over\nScore: ${score}`,
    style: new TextStyle({
      fill: "#ff0000",
      fontSize: 48,
      align: "center"
    })
  });

  gameOverText.anchor.set(0.5);
  gameOverText.x = app.screen.width / 2;
  gameOverText.y = app.screen.height / 2;

  app.stage.addChild(gameOverText);
}
