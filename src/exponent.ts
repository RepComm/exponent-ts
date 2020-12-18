
import Component from "./component.js";

/**Base component for exponent library
 * 
 */
export class Exponent extends Component {
  mutObserver: MutationObserver;
  /**Doesn't have to be used by class extensions*/
  enabled: boolean;
  constructor () {
    super();
    this.mutObserver = new MutationObserver(this.onElementMutate);
    this.enabled = true;
  }
  getEnabled (): boolean {
    return this.enabled;
  }
  setEnabled (enable: boolean): this {
    if (this.getEnabled() == enable) return this;
    this.enabled = enable;
    this.onEnable();
  }
  onEnable () {
  }
  make (type: string): this {
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
  notifyElementChanged (): this {
    this.mutObserver.disconnect();
    if (this.element) {
      this.mutObserver.observe(this.element, {
        subtree:false, //Don't listen to grandchildren/etc
        childList:true //Do listen to child remove/add
      });
    }
    return this;
  }
  applyRootClasses (): this {
    this.addClasses("exponent");
    return this;
  }
}
