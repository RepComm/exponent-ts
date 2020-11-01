
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
import { on, get, applyStyleClasses, clearChildren, getByClass, make, off, rect } from "./aliases.js";

function injectExponentCSS(doc: Document) {
  let tag: HTMLStyleElement = doc.createElement("style");

  tag.textContent = `
.exponent {
  flex:1;
}

.exponent-panel {
  width:100%;
  height:100%;
}

.exponent-dual-panel {
  display:flex;
}

.exponent-dark {
  background-color: rgb(26, 26, 26);
  color:rgb(97, 97, 97);
}
.exponent-dark:hover {
  background-color: rgb(46, 46, 46);
  color:rgb(112, 112, 112);
}

.exponent-medium {
  background-color: rgb(53, 53, 53);
  color:rgb(151, 151, 151);
}
.exponent-medium:hover {
  background-color: rgb(66, 66, 66);
  color:rgb(133, 133, 133);
}

.exponent-lite {
  background-color: rgb(94, 94, 94);
  color:rgb(255, 255, 255);
}
.exponent-lite:hover {
  background-color: rgb(107, 107, 107);
  color:rgb(212, 212, 212);
}

.exponent-grid {
  display: grid;
}

.exponent-button {
  border:none;
  cursor:pointer;
}

.exponent-knob-grab {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size:contain;
  cursor:grab;
}

.exponent-drawing {
  width:100%;
  height:100%;
}

.exponent-square-container {
  position: absolute;
}

.exponent-list {
  display: flex;
  flex-wrap:wrap;
  /* overflow:hidden; */
}
.exponent-list>* {
  flex:1;
}`;

  tag.id = "exponent-styles";

  doc.head.appendChild(tag);
}

function injectEventListenAPI() {
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
}

function runOnce() {
  injectExponentCSS(document);
  injectEventListenAPI();
}

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
  Component,
  runOnce,
  on, get, applyStyleClasses, clearChildren, getByClass, make, off, rect
};

