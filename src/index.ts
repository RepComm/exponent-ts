
import Component from "./component.js";
import { get, on } from "./aliases.js";

import {
  Button,
  DualPanel,
  ContextPanel,
  ListPanel,
  ImagePanel,
  OverlayPanel,
  Grid
} from "./mod.js";

const container = new Component()
  .useNative(get("container"));

const root = new ContextPanel();
root.mount(container);
root.addContext(
  "menu",
  new DualPanel()
    .setElements(
      new Button()
        .textContent("Return to match")
        .on("click", ()=>{
          root.switchContext("game");
        }) as Button,
      new ListPanel()
    )
    .setRatio(1, 10)
    .setDirection("column")
);

root.addContext(
  "game",
  new OverlayPanel()
  .setElements(
    new Grid()
    .setRowCount(3)
    .setColumnCount(3)
    .setCell(
      new Button()
        .textContent("UI") as Button,
      2, 2
    ),
    new ImagePanel ()
    .setImage("./images/helloworld.png")
    .setInterpolation("crisp-edges")
  )
);

root.switchContext("menu");

on(window, "keyup", (evt: KeyboardEvent) => {
  if (evt.key === "Escape") {
    root.switchContext("menu");
  }
});
