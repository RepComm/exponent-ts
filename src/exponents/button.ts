
import { Exponent } from "../exponent.js";

export class Button extends Exponent {
  /**TODO - This should probably be abstracted*/
  useType: "normal" | "back" | "foward";
  constructor() {
    super();
    this.setUseType("normal");
    this.make("button");
    this.addClasses("exponent-dark", "exponent-button");
  }
  setUseType(type: "normal" | "back" | "foward"): this {
    this.useType = type;

    return this;
  }
}
