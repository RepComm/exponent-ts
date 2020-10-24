
import Component from "./component.js";
export const EMPTY_COMPONENT = new Component().make("span").textContent("Empty Component");

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
    this.enabled = false;
    this.setEnabled(true);
  }
  getEnabled (): boolean {
    return this.enabled;
  }
  setEnabled (enable: boolean): Exponent {
    if (this.getEnabled()) return this;
    this.enabled = enable;
    this.onEnable();
  }
  onEnable () {
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
