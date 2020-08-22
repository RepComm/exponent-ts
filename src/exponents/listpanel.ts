
import { Panel } from "./panel.js";

export class ListPanel extends Panel {
  mode: "vertical"|"horizontal" = "vertical";
  /**how many items fit in view*/
  itemViewRatio: number = 5;
  constructor () {
    super();
    this.addClasses("exponent-list");
    this.setMode("vertical");
  }
  setMode (mode: "vertical"|"horizontal"): ListPanel {
    this.mode = mode;
    if (this.mode == "horizontal") {
      this.styleItem("overflow", "scroll hidden");
      this.styleItem("flex-direction", "row");
    } else {
      this.styleItem("overflow", "hidden scroll");
      this.styleItem("flex-direction", "column");
    }
    return this;
  }
  setItemViewRatio (ratio: number): ListPanel {
    this.itemViewRatio = ratio;
    
    return this;
  }
}
