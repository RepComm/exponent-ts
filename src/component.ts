
import { on, off, make, rect } from "./aliases.js";

const COMPONENT_NAMESPACE = "component-namespace";

interface ComponentForCallback {
  (self: Component, index: number): void;
}

interface RegisteredEvent {
  callback: EventListener;
  type: string;
}

/**DOM abstraction because DOM API sucks
 * 
 * @author Jonathan Crowder
 */
export default class Component {
  element: HTMLElement | undefined;
  private eventListeners: Array<RegisteredEvent>;
  constructor() {
    this.eventListeners = new Array();
  }
  /**Mounts the component to a parent HTML element*/
  mount(parent: Component | HTMLElement): this {
    if (parent instanceof HTMLElement) {
      parent.appendChild(this.element);
    } else if (parent instanceof Component) {
      // parent.mountChild(this);
      parent.element.appendChild(this.element);
    } else {
      throw "Cannot append to parent because its not a Component or HTMLElement";
    }
    return this;
  }
  unmount(): this {
    if (this.element.parentElement) {
      this.element.remove();
    }
    return this;
  }
  /**Mounts child component or html element to this*/
  mountChild(child: Component | HTMLElement): this {
    if (child instanceof HTMLElement) {
      this.element.appendChild(child);
    } else if (child instanceof Component) {
      // this.element.appendChild(child.element);
      child.mount(this);
    } else {
      throw "Cannot append child because its not a Component or HTMLElement";
    }
    return this;
  }

  /**Listen to events on this componenet's element*/
  on(type: string, callback: EventListener, options?: any): this {
    on(this.element, type, callback, options);
    this.eventListeners.push({ type, callback });
    return this;
  }
  getRegisteredEvents(type: string, cb: EventListener): RegisteredEvent[] {
    let result = new Array<RegisteredEvent>();
    for (let listener of this.eventListeners) {
      if (listener.type == type && listener.callback == cb) {
        result.push(listener);
      }
    }
    return result;
  }

  deleteRegisteredEvents(type: string, cb: EventListener): this {
    let listener: RegisteredEvent;
    for (let i = 0; i < this.eventListeners.length; i++) {
      listener = this.eventListeners[i];
      if (type == listener.type && cb == listener.callback) {
        this.eventListeners.splice(i, 1);
      }
    }
    return this;
  }

  /**Stop listening to an event on this componenet's element*/
  off(type: string, callback: EventListener): this {
    off(this.element, type, callback);
    this.deleteRegisteredEvents(type, callback);
    return this;
  }

  /**Set the element id*/
  id(str: string): this {
    this.element.id = str;
    return this;
  }
  /**Add CSS classes*/
  addClasses(...classnames: string[]): this {
    this.element.classList.add(...classnames);
    return this;
  }
  /**Remove CSS classes*/
  removeClasses(...classnames: string[]): this {
    this.element.classList.remove(...classnames);
    return this;
  }

  removeAllListeners(): this {
    for (let listener of this.eventListeners) {
      this.off(listener.type, listener.callback);
    }
    return this;
  }

  static assignComponentToNative(native: HTMLElement, component: Component) {
    native[COMPONENT_NAMESPACE] = {
      component: component
    };
  }

  static removeComponentFromNative(native: HTMLElement) {
    native[COMPONENT_NAMESPACE] = undefined;
  }

  /**Make the element of this component a type of HTMLElement*/
  make(type: string): this {
    if (this.element) {
      this.removeAllListeners();
      Component.removeComponentFromNative(this.element);
    }
    this.element = make(type);
    Component.assignComponentToNative(this.element, this);
    return this;
  }

  /**Use a native element instead of creating one*/
  useNative(element: HTMLElement): this {
    if (this.element) {
      this.removeAllListeners();
      Component.removeComponentFromNative(this.element);
    }
    if (!element) console.warn("useNative was passed", element);
    this.element = element;
    return this;
  }

  /**Sets the textContent of this element*/
  textContent(str: string): this {
    this.element.textContent = str;
    return this;
  }

  /**Adds the .hide class to the element*/
  hide(): this {
    this.addClasses("hide");
    return this;
  }
  /**Removes the .hide class from the element*/
  show(): this {
    this.removeClasses("hide");
    return this;
  }

  /**Sets the style.left prop*/
  set left(x: any) {
    this.element.style.left = x;
  }

  /**Sets the style.top prop*/
  set top(y: any) {
    this.element.style.top = y;
  }

  /**Alias of getBoundingClientRect */
  get rect(): DOMRect {
    return rect(this.element);
  }

  /**@param {string} type of input.type*/
  inputType(t: string): this {
    if (!(this.element instanceof HTMLInputElement)) throw "type is meant to be set when the element is an HTMLInputElement";
    (this.element as HTMLInputElement).type = t;
    return this;
  }
  /**Removes children components*/
  removeChildren(): this {
    while (this.element.lastChild) {
      this.element.lastChild.remove();
    }
    return this;
  }
  /**Sets the background image*/
  backgroundImage(url: string): this {
    this.styleItem("background-image", `url(${url})`);
    // this.element.style["background-image"] = `url(${url})`;
    return this;
  }

  click() {
    this.element.click();
  }
  clip(path: string): this {
    this.element.style["clip-path"] = path;
    return this;
  }
  styleItem(item: string, value: any): this {
    this.element.style[item] = value;
    return this;
  }
  for(start: number, count: number, cb: ComponentForCallback): this {
    for (let i = start; i < count + 1; i++) {
      cb(this, i);
    }
    return this;
  }

  static nativeIsComponent(element: HTMLElement): boolean {
    return element[COMPONENT_NAMESPACE] != undefined && element[COMPONENT_NAMESPACE] != null;
  }
  static nativeToComponent(element: HTMLElement): Component {
    if (!Component.nativeIsComponent(element)) throw `No component found in native ${element}`;
    return element[COMPONENT_NAMESPACE].component;
  }
}
