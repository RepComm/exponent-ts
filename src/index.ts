
import Component from "./component.js";
import { get } from "./aliases.js";
import { radians } from "./math/general.js";

import {
  Drawing, OverlayPanel, ImagePanel, Grid
} from "./mod.js";

const container = new Component()
  .useNative(get("container"));

const root = new OverlayPanel()
.mount(container) as OverlayPanel;

const bg = new ImagePanel()
.setImage("./images/helloworld.png");

const fg = new Grid()
  .setColumnCount(3)
  .setRowCount(3);

root.setElements(fg, bg);

const draw = new Drawing()
.setHandlesResize(true);

fg.setCell(draw, 1, 3);

fg.setCell(
  new ImagePanel()
  .setImage("./images/hud-p-mid.svg")
  .styleItem("background-repeat", "no-repeat")
  .styleItem("background-position", "50% 0%") as ImagePanel,
  2, 1
);

const RAD_360 = radians(360);

draw.addRenderPass((ctx, drawing)=>{
  ctx.save();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.ellipse(
    drawing.width/2,
    drawing.height/2,
    drawing.width/2,
    drawing.height/2,
    0,
    0,
    RAD_360
  );
  ctx.fill();
  ctx.restore();
});
