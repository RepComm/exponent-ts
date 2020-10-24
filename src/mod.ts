
import Component from "./component.js";
import { Panel } from "./exponents/panel.js";
import { Button } from "./exponents/button.js";
import { ContextPanel } from "./exponents/contextpanel.js";
import { DualPanel } from "./exponents/dualpanel.js";
import { Grid } from "./exponents/grid.js";
import { ImagePanel } from "./exponents/imagepanel.js";
import { ListPanel } from "./exponents/listpanel.js";
import { OverlayPanel } from "./exponents/overlaypanel.js";
import { SquarePanel } from "./exponents/squarepanel.js";
import { Knob } from "./exponents/knob.js";
import { Drawing } from "./exponents/drawing.js";

//harrix / hb432 implementation of event tracking
(() => {
  const storage: Map<EventTarget, Set<[string, EventListener, EventListenerOptions]>> = new Map();
  const { addEventListener, removeEventListener } = EventTarget.prototype;
  Object.defineProperties(EventTarget.prototype, {
     eventListeners: {
        get: function () {
           return storage.has(this) ? storage.get(this) : storage.set(this, []).get(this);
        }
     },
     addEventListener: {
        value: function (...args) {
           addEventListener.call(this, ...args);
           this.eventListeners.push(new Set(args));
        }
     },
     removeEventListener: {
        value: function (...args) {
           removeEventListener.call(this, ...args);
           const listeners = this.eventListeners;
           for (const listener of listeners) {
              args.map((arg) => listener.has(arg)).includes(false) || listeners.splice(listeners.indexOf(listener), 1);
           }
        }
     }
  });
})();
/**example usage, remove all events for the click and hover events from all div elements
 * for (const div of [ ...document.querySelectorAll('div') ]) {
   for (const [ type, ...args ] of div.eventListeners) {
      switch (type) {
         case 'click':
         case 'hover':
            div.removeEventListener(type, ...args);
            break;
      }
   }
  }
 */

export {
  Button,
  Panel,
  ContextPanel,
  DualPanel,
  Grid,
  ImagePanel,
  ListPanel,
  OverlayPanel,
  SquarePanel,
  Knob,
  Drawing,
  Component
};

