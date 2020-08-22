
import { on, off, make, rect } from "./aliases.js";

const COMPONENT_NAMESPACE = "component-namespace";

interface ComponentForCallback {
  (self: Component, index: number):void;
}

interface RegisteredEvent {
  callback: EventListener;
  type: string;
}

/**DOM abstraction because default API sucks
 * 
 * @author Jonathan Crowder
 */
export default class Component {
  element: HTMLElement | undefined;
  private eventListeners: Array<RegisteredEvent> = new Array();
  constructor() {
  }
  /**Mounts the component to a parent HTML element*/
  mount(parent: Component | HTMLElement): Component {
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
  unmount(): Component {
    if (this.element.parentElement) {
      this.element.remove();
    }
    return this;
  }
  /**Mounts child component or html element to this*/
  mountChild(child: Component | HTMLElement): Component {
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
  on(type: string, callback: EventListener, options?: any): Component {
    on(this.element, type, callback, options);
    this.eventListeners.push({type, callback});
    return this;
  }

  getRegisteredEvents (type: string, cb: EventListener): RegisteredEvent[] {
    let result = new Array<RegisteredEvent>();
    for (let listener of this.eventListeners) {
      if (listener.type == type && listener.callback == cb) {
        result.push(listener);
      }
    }
    return result;
  }

  deleteRegisteredEvents (type: string, cb: EventListener): Component {
    let listener: RegisteredEvent;
    for (let i=0; i<this.eventListeners.length; i++) {
      listener = this.eventListeners[i];
      if (type == listener.type && cb == listener.callback) {
        this.eventListeners.splice(i, 1);
      }
    }
    return this;
  }

  /**Stop listening to an event on this componenet's element*/
  off(type: string, callback: EventListener): Component {
    off(this.element, type, callback);
    this.deleteRegisteredEvents(type, callback);
    return this;
  }

  /**Set the element id*/
  id(str: string): Component {
    this.element.id = str;
    return this;
  }
  /**Add CSS classes*/
  addClasses(...classnames: string[]): Component {
    this.element.classList.add(...classnames);
    return this;
  }
  /**Remove CSS classes*/
  removeClasses(...classnames: string[]): Component {
    this.element.classList.remove(...classnames);
    return this;
  }

  removeAllListeners (): Component {
    for (let listener of this.eventListeners) {
      this.off(listener.type, listener.callback);
    }
    return this;
  }

  static assignComponentToNative (native: HTMLElement, component: Component) {
    native[COMPONENT_NAMESPACE] = {
      component:component
    };
  }

  static removeComponentFromNative (native: HTMLElement) {
    native[COMPONENT_NAMESPACE] = undefined;
  }

  /**Make the element of this component a type of HTMLElement*/
  make(type: string): Component {
    if (this.element) {
      this.removeAllListeners();
      Component.removeComponentFromNative(this.element);
    }
    this.element = make(type);
    Component.assignComponentToNative(this.element, this);
    return this;
  }

  /**Use a native element instead of creating one*/
  useNative(element: HTMLElement): Component {
    if (this.element) {
      this.removeAllListeners();
      Component.removeComponentFromNative(this.element);
    }
    if (!element) console.warn("useNative was passed", element);
    this.element = element;
    return this;
  }

  /**Sets the textContent of this element*/
  textContent(str: string): Component {
    this.element.textContent = str;
    return this;
  }

  /**Adds the .hide class to the element*/
  hide(): Component {
    this.addClasses("hide");
    return this;
  }
  /**Removes the .hide class from the element*/
  show(): Component {
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
  inputType(t: string): Component {
    if (!(this.element instanceof HTMLInputElement)) throw "type is meant to be set when the element is an HTMLInputElement";
    (this.element as HTMLInputElement).type = t;
    return this;
  }
  /**Removes children components*/
  removeChildren(): Component {
    while (this.element.lastChild) {
      this.element.lastChild.remove();
    }
    return this;
  }
  /**Sets the background image*/
  backgroundImage(url: string): Component {
    this.styleItem("background-image", `url(${url})`);
    // this.element.style["background-image"] = `url(${url})`;
    return this;
  }

  click() {
    this.element.click();
  }
  clip(path: string): Component {
    this.element.style["clip-path"] = path;
    return this;
  }
  styleItem(item: string, value: any): Component {
    this.element.style[item] = value;
    return this;
  }
  for (start: number, count: number, cb: ComponentForCallback): Component {
    for (let i=start; i<count+1; i++) {
      cb(this, i);
    }
    return this;
  }

  static nativeIsComponent (element: HTMLElement): boolean {
    return element[COMPONENT_NAMESPACE] != undefined && element[COMPONENT_NAMESPACE] != null;
  }
  static nativeToComponent (element: HTMLElement): Component {
    if (!Component.nativeIsComponent(element)) throw `No component found in native ${element}`;
    return element[COMPONENT_NAMESPACE].component;
  }
}
