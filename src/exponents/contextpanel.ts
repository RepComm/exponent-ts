
import { Panel } from "./panel.js";
import Component from "../component.js";

/**This panel type can keep track of different components to be rendered
 * and simply uses strings to refer to them
 * 
 * Switching between game renderer / settings panel / menus were in mind for this
 * @author Jonathan Crowder
 * 
 */
export class ContextPanel extends Panel {
  contexts: Map<string, Component>;
  currentContext: Component;
  currentContextId: string;
  memory: Array<string>;
  constructor () {
    super();
    this.contexts = new Map();
  }
  addContext (id: string, ctx: Component): this {
    this.contexts.set(id, ctx);
    return this;
  }
  hasContext (id: string): boolean {
    return this.contexts.has(id);
  }
  getContext (id: string): Component {
    return this.contexts.get(id);
  }
  getCurrentContext (): Component {
    return this.currentContext;
  }
  getCurrentContextId (): string {
    return this.currentContextId;
  }
  hasCurrentContext (): boolean {
    return this.currentContext && this.currentContext instanceof Component;
  }
  switchContext (id: string): this {
    if (!id) throw `id was ${id}`;
    if (!this.hasContext(id)) throw `Cannot switch context to ${id} as it hasn't been added before`;
    if (this.currentContext) this.currentContext.unmount();
    this.currentContext = this.contexts.get(id);
    if (!this.currentContext) throw `set context, it is ${this.currentContext}`;
    if (!(this.currentContext instanceof Component)) throw `${id} context isn't instance of Component`;
    this.currentContext.mount(this);
    this.currentContext.styleItem("flex", 1);
    this.currentContextId = id;
    return this;
  }
  getIds (): Set<string> {
    let result = new Set<string>();
    for (let key of this.contexts.keys()) {
      result.add(key);
    }
    return result;
  }
  save (id?: string): this {
    if (this.currentContext && this.currentContextId) {
      this.memory.push(id || this.currentContextId);
    } else {
      throw `Couldn't push ${this.currentContextId} into memory`;
    }
    return this;
  }
  restore (): this {
    if (this.memory.length < 1) throw "Couldn't restore as memory is < 1, forgot to save() ?";
    let id = this.memory.pop();
    if (id === undefined || id === null) throw `id was ${id}`;
    if (!this.hasContext(id)) throw `No component for context id ${id} has been added, cannot restore to it`;
    this.switchContext(id);
    return this;
  }
}
