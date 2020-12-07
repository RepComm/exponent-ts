
import Component from "../component";
import { Panel } from "./panel";

export class CheckList extends Panel {
  header: CheckListHeader;
  mods: Array<CheckListItem>;
  constructor () {
    super();
    this.header = new CheckListHeader().textContent("text").mount(this);
  }
  addItem (item: CheckListItem): this {
    this.mountChild(item);
    return this;
  }
  createItem (name: string): CheckListItem {
    let item = new CheckListItem().textContent(name);
    this.addItem(item);
    return item;
  }
  getHeader (): Component {
    return this.header;
  }
}

export class CheckListHeader extends Component {
  text: Component;
  constructor () {
    super();
    this.make("div");
    this.text = new Component().make("span").textContent("text").mount(this);
  }
  textContent (text: string): this {
    this.text.textContent(text);
    return this;
  }
}

export class CheckListItem extends Component {
  text: Component;
  checkbox: Component;
  constructor () {
    super();
    this.make("div");
    this.checkbox = new Component().make("input").inputType("checkbox").mount(this);
    (this.checkbox.element as HTMLInputElement).checked = true;
    this.text = new Component().make("span").textContent("text").mount(this);
  }
  textContent (text: string): this {
    this.text.textContent(text);
    return this;
  }
  setChecked (checked: boolean): this {
    (this.checkbox.element as HTMLInputElement).checked = checked;
    return this;
  }
  getChecked (): boolean {
    return (this.checkbox.element as HTMLInputElement).checked;
  }
}
