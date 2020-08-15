
import Component from "./component.js";
import { get } from "./aliases.js";

import { Grid, Exponent, Button, DualPanel } from "./exponent.js";

const container = new Component()
  .useNative(get("container"));

const rows = 10;

const grid = new Grid()
  .setColumnCount(3)
  .setRowCount(rows)
  .setGap("2px")
  .addClasses("exponent-lite")as Grid;

for (let i=1; i<rows+1; i++) {
  const btn = new Button()
  .clip("polygon(0 70%, 8% 100%, 100% 100%, 100% 0, 0 0)")
  .textContent(`item ${i}`) as Exponent;

  grid.setCell(btn, 2, i);
}

const dualPanel = new DualPanel()
  .mount(container) as DualPanel;

const btnFirst = new Button()
  .textContent("first") as Button;

const panel2 = new DualPanel()
  .setDirection("column")
  .setRatio(3, 1);

const btnSecond = new Button()
  .textContent("second")as Button;


panel2.setElements(btnSecond, grid);

dualPanel.setElements(btnFirst, panel2)
.setRatio(1, 3);
