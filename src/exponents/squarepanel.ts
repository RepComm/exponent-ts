
import Component from "../component.js";
import { Panel } from "../mod.js";

/**A panel whose child is always squarely fit inside
 */
export class SquarePanel extends Panel {
  /**The element that is actually square*/
  container: Panel = new Panel();
  constructor () {
    super();
  }
  //TODO - handle actually resizing container
  mountChild (child: Component|HTMLElement): SquarePanel {
    console.log("Square content", child);
    this.container.mountChild(child);
    return this;
  }
}
