
import Component from "./component.js";

export const EMPTY_COMPONENT = new Component().make("span").textContent("Empty Component");

/**Base component for exponent library
 * 
 */
export class Exponent extends Component {
  mutObserver: MutationObserver;
  constructor () {
    super();
    this.mutObserver = new MutationObserver(this.onElementMutate);
  }
  make (type: string): Exponent {
    super.make(type);
    this.notifyElementChanged();
    this.applyRootClasses();
    return this;
  }
  /**Called by mutation observer
   * @param recs
   * @param observer 
   */
  onElementMutate (recs: Array<MutationRecord>, observer: MutationObserver) {
    for (let rec of recs) {
      if (rec.type !== "childList") continue;
      // rec.addedNodes
      // rec.removedNodes
    }
  }
  /**Let the Exponent know if its native element has been changed
   * Typically fired when element removed or added to handle mutation observation of dom node
   */
  notifyElementChanged (): Exponent {
    this.mutObserver.disconnect();
    if (this.element) {
      this.mutObserver.observe(this.element, {
        subtree:false, //Don't listen to grandchildren/etc
        childList:true //Do listen to child remove/add
      });
    }
    return this;
  }
  applyRootClasses (): Exponent {
    this.addClasses("exponent");
    return this;
  }
}

export class Panel extends Exponent {
  constructor () {
    super();
    this.make("div");
    this.addClasses("exponent-panel");
  }
}

export class Grid extends Panel {
  columns: number = 3;
  rows: number = 3;
  constructor () {
    super();
    this.addClasses("exponent-grid");
  }
  setColumnCount (columns: number): Grid {
    this.columns = columns;
    this.element.style["grid-template-columns"] = `repeat(${columns}, 1fr)`;
    return this;
  }
  getColumnCount (): number {
    return this.columns;
  }
  setRowCount (rows: number): Grid {
    this.rows = rows;
    this.element.style["grid-template-rows"] = `repeat(${rows}, 1fr)`;
    return this;
  }
  getRowCount (): number {
    return this.rows;
  }
  setCell (e: Exponent, columnStart: number, rowStart: number, columnEnd?: number, rowEnd?: number): Grid {
    let x = `${columnStart}`;
    if (columnEnd) x += `/${columnEnd}`;
    
    let y = `${rowStart}`;
    if (rowEnd) x += `/${rowEnd}`;

    e.element.style["grid-column"] = x;
    e.element.style["grid-row"] = y;
    e.mount(this);
    return this;
  }
  setGap (gapStyle: string): Grid {
    this.element.style["gap"] = gapStyle;
    return this;
  }
}

export class Button extends Exponent {
  constructor () {
    super();
    this.make("button");
    this.addClasses("exponent-dark", "exponent-button");
  }
}
