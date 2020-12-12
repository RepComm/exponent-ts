
import { Panel } from "./panel.js";
import { Exponent } from "../exponent.js";

export type ListPanelMode = "vertical"|"horizontal";

export class ListPanel extends Panel {
  mode: ListPanelMode;
  /**how many items fit in view*/
  itemViewRatio: number;
  constructor () {
    super();
    this.mode = "vertical";
    this.itemViewRatio = 5;
    this.addClasses("exponent-list");
    this.setMode("vertical");
  }
  setMode (mode: ListPanelMode): this {
    this.mode = mode;
    if (this.mode == "horizontal") {
      this.setStyleItem("overflow", "scroll hidden");
      this.setStyleItem("flex-direction", "row");
    } else {
      this.setStyleItem("overflow", "hidden scroll");
      this.setStyleItem("flex-direction", "column");
    }
    return this;
  }
  setItemViewRatio (ratio: number): this {
    this.itemViewRatio = ratio;
    
    return this;
  }
  hasItem (item: Exponent): boolean {
    throw "Not implemented yet"; //TODO - implement
  }
  addItem (item: Exponent): this {
    if (this.hasItem(item)) throw "Cannot add item more than once";
        
    return this;
  }
}
