
import {
  Application,
  Assets,
  Sprite,
  Text,
  TextStyle
} from "pixi.js";

import {FallingItem,FallingType, checkCollision, resetItem } from "./utils";

export async function startGame(app: Application) {

  let score = 0;
  let baseFallSpeed = 4;
  const Max_ITEMS=8;

  const starTexture = await Assets.load("/assets/star.png");

 
  // Basket
  const basket = new Sprite(
    await Assets.load("/assets/basket.png")
  );
  basket.anchor.set(0.5);
  basket.x = app.screen.width / 2;
  basket.y = app.screen.height - 80;
  app.stage.addChild(basket);


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

  //------Object Pooling  ---------//

  const pool:FallingItem[]=[];
  
  for(let i=0; i<Max_ITEMS;i++){
    const sprite= new Sprite(starTexture);
    sprite.anchor.set(0.5);
    sprite.scale.set(0.7);

    const type:FallingType=Math.random()>0.5?"BOMB":"STAR";

    if(type==="BOMB")
        sprite.tint=0xff0000;

    const item: FallingItem={
        sprite,
        type,
        speed:baseFallSpeed
    }
    resetItem(item,app);
    pool.push(item);
    app.stage.addChild(sprite);
  }

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

function MoveItem(){
     for(const item of pool){
        item.sprite.y+=item.speed;
        if(checkCollision(basket,item.sprite)){
            if(item.type==="BOMB"){
                gameOver(app,score);
                return;
            }
            score++;
            scoreText.text=`Score: ${score}`;

            if(score%5===0){
                baseFallSpeed+=0.5;
            }
            resetItem(item,app);
        }
        if(item.sprite.y>app.screen.height){
            resetItem(item,app);
        }
    }
}

  // Game Loop
  app.ticker.add(() => {

    MoveBasket();
    MoveItem();
   
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
