
import { Application } from "pixi.js";
import { initDevtools } from "@pixi/devtools";
import "@esotericsoftware/spine-pixi-v8";

import { startGame } from "./game";

(async () => {
  const app = new Application();

  await app.init({
    background: "#1099bb",
    resizeTo: window
  });

  initDevtools({ app });

  document
    .getElementById("pixi-container")!
    .appendChild(app.canvas);

  // Start the game
  startGame(app);
})();
