import { Exponent } from "../exponent";

/**Simple class that wraps HTMLStyleElement*/
export class Style extends Exponent {
  element: HTMLStyleElement;
  constructor () {
    super();
    this.make("style");
    // this.addClasses("exponent-style") //not required because this is invisible
  }
}
