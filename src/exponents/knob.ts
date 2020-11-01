
import { on } from "../aliases.js";
import { roundToNext, clamp, lerp, inverseLerp, ndist } from "../math/general.js";
import { Panel, SquarePanel } from "../mod.js";

const knobImages = [
  "./images/knob01.svg",
  "./images/knob02.svg",
  "./images/knob03.svg",
  "./images/knob04.svg",
  "./images/knob05.svg",
  "./images/knob06.svg",
  "./images/knob07.svg"
];

export class Knob extends SquarePanel {
  grab: Panel;
  min: number;
  max: number;
  minTurns: number;
  maxTurns: number;
  value: number;
  prevalue: number;
  turning: boolean;
  turningx: number;
  turningy: number;
  step: number;

  static sensitivity;

  constructor() {
    super();
    this.min = 0;
    this.max = 1;
    this.minTurns = -0.5;
    this.maxTurns = 1.5;
    this.value = 0;
    this.prevalue = 0;
    this.turning = false;
    this.turningx = 0;
    this.turningy = 0;
    this.step = 0;

    this.addClasses("exponent-knob");
    this.grab = new Panel()
      .addClasses("exponent-knob-grab")
      .mount(this) as Panel;
    let ind = Math.floor(Math.random() * knobImages.length);
    this.setImage(knobImages[ind]);
    this.grab.on("mousedown", (evt: MouseEvent) => {
      evt.preventDefault();
      this.turning = true;
      this.turningx = evt.screenX;
      this.turningy = evt.screenY;
    });
    on(window, "mouseup", (evt) => {
      this.turning = false;
    });
    on(window, "mousemove", (evt: MouseEvent) => {
      if (this.turning) {
        let delta = evt.movementX - evt.movementY;
        delta *= Knob.sensitivity / ndist(this.min, this.max);
        if (evt.ctrlKey) delta /= 4;
        this.addValue(delta);

        // let value = dist(
        //   this.turningx,
        //   this.turningy,
        //   evt.screenX,
        //   evt.screenY
        // ) * ndist(this.min, this.max) * Knob.sensitivity;
        // this.setValue(value);
      }
    });
    this.setValue(0);
  }
  addValue(a: number): this {
    this.setValue(this.prevalue + a);
    return this;
  }
  setValue(v: number): this {
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
    this.prevalue = clamp(v, this.min, this.max);

    this.value = this.prevalue;
    if (this.step != 0) {
      this.value = roundToNext(
        this.value,
        this.step
      );
    }

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
  setImage(url: string): this {
    this.grab.backgroundImage(url);
    return this;
  }
}
Knob.sensitivity = 0.005;