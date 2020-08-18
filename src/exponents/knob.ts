
import { Panel, SquarePanel } from "../mod.js";

export class Knob extends SquarePanel {
  grab: Panel;
  min: number = 0;
  max: number = 1;
  minTurns: number = 0;
  maxTurns: number = 0.5;
  value: number = 0;

  constructor () {
    super();
    this.addClasses("exponent-knob");
    this.grab = new Panel()
      .styleItem("border-radius", "50%") as Panel;

    this.mountChild(this.grab);
  }
  addValue (a: number): Knob {
    this.setValue(this.value + a);
    return this;
  }
  setValue (r: number): Knob {
    let turns: number = r;

    this.grab.styleItem("transform", [`rotate(${turns}turn)`]);
    return this;
  }
}
