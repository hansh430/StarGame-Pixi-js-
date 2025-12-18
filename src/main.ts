
import { Application, Assets, Sprite,Text,TextStyle } from "pixi.js";
import{initDevtools} from '@pixi/devtools';
import '@esotericsoftware/spine-pixi-v8';

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });
  
  initDevtools({app});
  
  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
 

   let score=0;
   const fallSpeed=6;

   //basket----
   const basket = new Sprite(
    await Assets.load("/assets/basket.png")
   );
   basket.anchor.set(0.5);
   basket.x=app.screen.width/2;
   basket.y=app.screen.height-80;
   app.stage.addChild(basket);

   // star ------
   const star = new Sprite(
    await Assets.load("/assets/star.png")
   );
   star.scale.set(0.7,0.7);
   star.anchor.set(0.5);
   resetStar();
   app.stage.addChild(star);

   ///Score Text
   const scoreStyle = new TextStyle({
    fill:"#ffffff",
    fontSize:28
   });
  
   const scoreText = new Text({
    text:"Score: 0",
    style:scoreStyle
   });
   scoreText.x=20;
   scoreText.y=20;
   app.stage.addChild(scoreText);

   //Keyboard Input:
   window.addEventListener("keydown",(e)=>{
    const speed=40;
    if(e.key==="ArrowLeft"){
      basket.x-=speed;
    }
    if(e.key==="ArrowRight"){
      basket.x+=speed;
    }
    
    //clamp inside the screen
    basket.x=Math.max(
      basket.width/2,
      Math.min(app.screen.width-basket.width/2,basket.x)
    );
   });

   //Game loop:

   app.ticker.add(()=>{
    star.y+=fallSpeed;
   });

   //Helpers
   function resetStar(){
    star.x= Math.random()*app.screen.width;
    star.y = -50;
   }
})();
