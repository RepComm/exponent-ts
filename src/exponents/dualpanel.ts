
import { Exponent } from "../exponent.js";
import { Panel } from "./panel.js";

export class DualPanel extends Panel {
  direction: string = "left-to-right";
  firstRatio: number = 1;
  secondRatio: number = 1;
  first: Exponent;
  second: Exponent;

  constructor () {
    super();
    this.addClasses("exponent-dual-panel");
  }
  onRatioUpdate () {
    if (this.first) this.first.styleItem("flex", this.firstRatio);
    if (this.second) this.second.styleItem("flex", this.secondRatio);
  }
  setRatio (first: number, second: number): DualPanel {
    this.firstRatio = first;
    this.secondRatio = second;
    this.onRatioUpdate();
    return this;
  }
  setDirection (dir: "row"|"row-reverse"|"column"|"column-reverse"): DualPanel {
    this.direction = dir;
    this.styleItem("flex-direction", dir);
    return this;
  }
  clearElements (): DualPanel {
    return this;
  }
  setElements (first: Exponent, second: Exponent): DualPanel {
    if (this.first) this.first.unmount();
    if (this.second) this.second.unmount();

    this.first = first;
    this.second = second;

    first.mount(this);
    second.mount(this);
    this.onRatioUpdate();
    return this;
  }
}
