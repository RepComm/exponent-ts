
import { Exponent } from "../exponent.js";

export class Button extends Exponent {
  useType: "normal" | "back" | "foward" = "normal";
  constructor() {
    super();
    this.make("button");
    this.addClasses("exponent-dark", "exponent-button");
  }
  setUseType(type: "normal" | "back" | "foward"): Button {
    this.useType = type;

    return this;
  }
}
