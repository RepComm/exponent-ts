import { Exponent } from "../exponent";

export class Text extends Exponent {
  constructor () {
    super();
    this.make("span");
    this.addClasses("exponent-text");
  }
}
