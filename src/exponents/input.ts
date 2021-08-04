import { Exponent } from "../exponent.js";

export type InputType = "button"|"checkbox"|"color"|"date"|"datetime-local"|"email"|"file"|"hidden"|"image"|"month"|"number"|"password"|"radio"|"range"|"reset"|"search"|"submit"|"tel"|"text"|"time"|"url"|"week";

export class Input extends Exponent {
  element: HTMLInputElement;
  constructor () {
    super();
    this.make("input");
    this.addClasses("exponent-input");
  }
  setValue (v: string): this {
    this.element.value = v;
    return this;
  }
  getValue (): string {
    return this.element.value;
  }
  setType (type: InputType): this {
    this.element.type = type;
    return this;
  }
  getType(): InputType {
    return this.element.type as InputType;
  }
}
