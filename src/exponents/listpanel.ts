
import { Panel } from "./panel.js";
import { Exponent } from "../exponent.js";

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
  hasItem (item: Exponent): boolean {
    throw "Not implemented yet"; //TODO - implement
  }
  addItem (item: Exponent): ListPanel {
    if (this.hasItem(item)) throw "Cannot add item more than once";
        
    return this;
  }
}
