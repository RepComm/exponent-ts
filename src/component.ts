
import { on, off, make, rect } from "./aliases.js";

//TODO - replace with harrix event listener api
const COMPONENT_NAMESPACE = "component-namespace";

interface ComponentForCallback {
  (self: Component, index: number): void;
}

//TODO - replace with harrix event listener api
interface RegisteredEvent {
  callback: EventListener;
  type: string;
}

/**Can be extended to create templates, or used for making
 * writting HTML less painful
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

  setId(str?: string): this {
    this.element.id = str;
    return this;
  }
  getId (): string {
    return this.element.id;
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

  setTextContent(str: string): this {
    this.element.textContent = str;
    return this;
  }

  getTextContent (): string {
    return this.element.textContent;
  }

  /**Alias of getBoundingClientRect */
  get rect (): DOMRect {
    return this.getRect();
  }
  getRect(): DOMRect {
    return rect(this.element);
  }

  /**Removes children components*/
  removeChildren(): this {
    while (this.element.lastChild) {
      this.element.lastChild.remove();
    }
    return this;
  }

  click() {
    this.element.click();
  }
  setStyleItem (item: string, value: any): this {
    this.element.style[item] = value;
    return this;
  }
  getStyleItem (item: string): any {
    return this.element.style[item];
  }

  /**Experimental*/
  for(start: number, count: number, cb: ComponentForCallback): this {
    for (let i = start; i < count + 1; i++) {
      cb(this, i);
    }
    return this;
  }

  /**Set attribute*/
  setAttr (name: string, value: any): this {
    this.element[name] = value;
    return this;
  }
  getAttr (name: string): any {
    return this.element[name];
  }
  removeAttr (name: string): this {
    this.element.removeAttribute(name);
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
