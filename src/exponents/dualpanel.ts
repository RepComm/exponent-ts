
import { Exponent } from "../exponent.js";
import { Panel } from "./panel.js";

export type DualPanelDirection = "row"|"row-reverse"|"column"|"column-reverse";

export class DualPanel extends Panel {
  direction: DualPanelDirection;
  firstRatio: number;
  secondRatio: number;
  first: Exponent;
  second: Exponent;

  constructor () {
    super();
    this.direction = "row";
    this.firstRatio = 1;
    this.secondRatio = 1;
    this.addClasses("exponent-dual-panel");
  }
  onRatioUpdate () {
    if (this.first) this.first.setStyleItem("flex", this.firstRatio);
    if (this.second) this.second.setStyleItem("flex", this.secondRatio);
  }
  setRatio (first: number, second: number): this {
    this.firstRatio = first;
    this.secondRatio = second;
    this.onRatioUpdate();
    return this;
  }
  setDirection (dir: DualPanelDirection): this {
    this.direction = dir;
    this.setStyleItem("flex-direction", dir);
    return this;
  }
  clearElements (): DualPanel {
    return this;
  }
  setElements (first: Exponent, second: Exponent): this {
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
