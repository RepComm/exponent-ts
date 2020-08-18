
import { Panel } from "./panel.js";

export class ImagePanel extends Panel {
  constructor () {
    super();
    this.setStretchRule("fit-width");
  }
  setImage (url: string): ImagePanel {
    this.styleItem("background-image", `url(${url})`);
    return this;
  }
  setInterpolation (rule: "crisp-edges"|"optimise-quality"|"optimise-speed"): ImagePanel {
    this.styleItem("image-rendering", rule);
    return this;
  }
  setStretchRule (rule: "fit-width"|"fit-height"|"fill-panel"): ImagePanel {
    switch (rule) {
      case "fill-panel":
        //not implemented yet
        break;
      case "fit-width":
        this.styleItem("background-size", `100% auto`);
        this.styleItem("background-position", `50% 50%`);
        break;
      case "fit-height":
        this.styleItem("background-size", `auto 100%`);
        this.styleItem("background-position", `50% 50%`);
        break;
    }
    return this;
  }
}
