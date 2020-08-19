
import Component from "./component.js";
import { get, on } from "./aliases.js";

import {
  Button,
  DualPanel,
  ContextPanel,
  ListPanel,
  ImagePanel,
  OverlayPanel,
  Grid,
  Knob
} from "./mod.js";

const container = new Component()
  .useNative(get("container"));

let width = 6;
let height = 3;
const grid = new Grid()
  .setColumnCount(width)
  .setRowCount(height)
  .setGap("0.5em")
  .mount(container) as Grid;
for (let x=1; x<width+1; x++) {
  for (let y=1; y<height+1; y++) {
    let k = new Knob();
    if (Math.random() > 0.5) {
      k.step = 0.05;
    }
    grid.setCell(k, x, y);
  }
}

// const root = new ContextPanel();
// root.mount(container);
// root.addContext(
//   "menu",
//   new DualPanel()
//     .setElements(
//       new Button()
//         .textContent("Return to match")
//         .on("click", ()=>{
//           root.switchContext("game");
//         }) as Button,
//       new ListPanel()
//     )
//     .setRatio(1, 10)
//     .setDirection("column")
// );

// root.addContext(
//   "game",
//   new OverlayPanel()
//   .setElements(
//     new Grid()
//     .setRowCount(3)
//     .setColumnCount(3)
//     .setCell(
//       new Button()
//         .textContent("UI") as Button,
//       2, 2
//     )
//     .setCell(
//       new Knob(),
//       1, 1
//     ),
//     new ImagePanel ()
//     .setImage("./images/helloworld.png")
//     .setInterpolation("crisp-edges")
//   )
// );

// root.switchContext("menu");

// on(window, "keyup", (evt: KeyboardEvent) => {
//   if (evt.key === "Escape") {
//     root.switchContext("menu");
//   }
// });
