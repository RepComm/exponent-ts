
import Component from "../component.js";
import { Panel } from "../mod.js";

/**A panel whose child is always squarely fit inside
 */
export class SquarePanel extends Panel {
  /**The element that is actually square*/
  container: Panel = new Panel();
  onResize: EventListener;

  /**Length of side*/
  length: number = 0;
  /**Calculated x offset of container*/
  cx: number = 0;
  /**Calculated y offset of container*/
  cy: number = 0;

  constructor () {
    super();
    this.addClasses("exponent-square");

    this.onResize = ()=>{
      //Always recalc size
      this.calcChildSize();
      //Only apply it if we're enabled
      if (this.getEnabled()) this.applyChildSize();
    }
    window.addEventListener("resize", this.onResize);
    this.container.mount(this);
    // this.container.styleItem("position", "absolute");
    this.container.addClasses("exponent-square-container");
  }
  /**Recalculate size metrics from DOM rects
   * You need to applyChildSize after using this to
   * see the effects
   */
  calcChildSize (): SquarePanel {
    let min = Math.min(
      this.rect.width,
      this.rect.height
    );
    let max = Math.max(
      this.rect.width,
      this.rect.height
    );
    let gap = max - min;
    let wIsBigger = this.rect.width > this.rect.height;

    //Set length of square to the smaller value
    this.length = Math.floor(min);
    //Handle centering coords
    if (wIsBigger) {
      this.cy = 0; //Reset offset
      this.cx = Math.floor(gap / 2); //move over by half gap
    } else {
      this.cx = 0; //Reset offset
      this.cy = Math.floor(gap / 2); //move over by half gap
    }

    //Apparently this, and position:absolute works..
    //TODO - fix parent container offset gap
    this.cx += this.rect.x;
    this.cy += this.rect.y;
    //Whatever.
    return this;
  }
  applyChildSize (): SquarePanel {
    this.container.styleItem("width", `${this.length}px`);
    this.container.styleItem("height", `${this.length}px`);
    this.container.styleItem("left", `${this.cx}px`);
    this.container.styleItem("top", `${this.cy}px`);
    return this;
  }
  mountChild (child: Component|HTMLElement): SquarePanel {
    console.log("Square content", child);
    this.container.mountChild(child);
    setTimeout(()=>{
      this.calcChildSize();
      this.applyChildSize();
    }, 100);
    return this;
  }
}
