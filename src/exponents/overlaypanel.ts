
import { Panel } from "./panel.js";
import Component from "../component.js";

export class OverlayPanel extends Panel {
  private bg: Component;
  private fg: Component;
  constructor () {
    super();
  }
  setElements (fg: Component, bg: Component): this {
    if (!fg) throw `Foreground arg was not defined: ${fg}`;
    if (!bg) throw `Background arg was not defined: ${bg}`;
    if (this.bg) this.bg.unmount();
    if (this.fg) this.fg.unmount();
    this.fg = fg;
    this.bg = bg;
    this.fg.styleItem("position", "absolute")
      .styleItem("z-index", 2);
    this.bg.styleItem("position", "absolute")
      .styleItem("z-index", 1);
    
    this.bg.mount(this);
    this.fg.mount(this);
    return this;
  }
  getForeground (): Component {
    return this.fg;
  }
  getBackground(): Component {
    return this.bg;
  }
}
