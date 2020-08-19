
import { on } from "../aliases.js";
import { clamp, lerp, inverseLerp, ndist } from "../math/general.js";
import { Panel, SquarePanel } from "../mod.js";

export class Knob extends SquarePanel {
  grab: Panel;
  min: number = 0;
  max: number = 1;
  minTurns: number = -0.5;
  maxTurns: number = 1.5;
  value: number = 0;
  turning: boolean = false;

  static sensitivity: number = 0.005;

  constructor() {
    super();
    this.addClasses("exponent-knob");
    this.grab = new Panel()
      .addClasses("exponent-knob-grab")
      .mount(this) as Panel;
    this.setImage("./images/knob01.svg");
    this.grab.on("mousedown", (evt) => {
      this.turning = true;
    });
    on(window, "mouseup", (evt) => {
      this.turning = false;
    });
    on(window, "mousemove", (evt: MouseEvent) => {
      if (this.turning) {
        let delta = evt.movementX + evt.movementY;
        delta *= Knob.sensitivity / ndist(this.min, this.max);
        this.addValue(delta);
      }
    });
    this.setValue(0);
  }
  addValue(a: number): Knob {
    this.setValue(this.value + a);
    return this;
  }
  setValue(v: number): Knob {
    /**value is defined as a number between min and max
     * -- it can be over, which is fine,
     * -- but we clamp it so it won't do that for experience purposes
     * 
     * Next we calculate the amount of turn (from straight up)
     * and we do that be finding the interpolant of value between min and max
     * and lerping with minTurn maxTurn using interpolant
     * 
     * This ensures the same ratio of value to min -> max
     * as turn to minTurn -> maxTurn
     */

    //Clamp the input
    this.value = clamp(v, this.min, this.max);

    //Calculate turns
    let turns: number = lerp(
      this.minTurns,
      this.maxTurns,
      inverseLerp(this.min, this.max, this.value)
    );

    this.grab.styleItem("transform", [`rotate(${turns}turn)`]);
    console.log(`Knob value is ${this.value.toFixed(2)}`);
    return this;
  }
  getValue(): number {
    return this.value;
  }
  setImage(url: string): Knob {
    this.grab.backgroundImage(url);
    return this;
  }
}
