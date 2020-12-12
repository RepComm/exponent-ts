
import { Panel } from "./panel.js";

export class ImagePanel extends Panel {
  constructor () {
    super();
    this.setStretchRule("fit-width");
  }
  setImage (url: string): this {
    this.setStyleItem("background-image", `url('${url}')`);
    return this;
  }
  setInterpolation (rule: "crisp-edges"|"optimise-quality"|"optimise-speed"): this {
    this.setStyleItem("image-rendering", rule);
    return this;
  }
  setStretchRule (rule: "fit-width"|"fit-height"|"fill-panel"): this {
    switch (rule) {
      case "fill-panel":
        //not implemented yet
        break;
      case "fit-width":
        this.setStyleItem("background-size", `100% auto`);
        this.setStyleItem("background-position", `50% 50%`);
        break;
      case "fit-height":
        this.setStyleItem("background-size", `auto 100%`);
        this.setStyleItem("background-position", `50% 50%`);
        break;
    }
    return this;
  }
}
