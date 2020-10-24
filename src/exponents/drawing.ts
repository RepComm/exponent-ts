
import { Exponent } from "../exponent.js";

export interface DrawingCallback {
  (ctx: CanvasRenderingContext2D, drawing: Drawing):void;
}

export class Drawing extends Exponent {
  context: CanvasRenderingContext2D;
  renderPasses: Array<DrawingCallback>;
  autoClear: boolean;
  autoResize: boolean;
  element: HTMLCanvasElement;
  needsRedraw: boolean;
  frameCallback: FrameRequestCallback;
  onResize: EventListener;
  pixelRatio: number;

  constructor (ctxConfig?: CanvasRenderingContext2DSettings) {
    super();
    this.renderPasses = new Array();
    this.autoClear = true;
    this.autoResize = false;
    this.needsRedraw = true;
    /**TODO - This should probably be Canvas pixel ratio?*/
    this.pixelRatio = 1;
    this.make("canvas");
    this.addClasses("exponent-drawing");
    this.context = this.element.getContext("2d", ctxConfig);

    this.frameCallback = (delta)=>{
      if (this.getEnabled()) {
        if (this.needsRedraw) {
          this.render();
        }
        requestAnimationFrame(this.frameCallback);
      }
    }
    requestAnimationFrame(this.frameCallback);

    this.onResize = ()=>{
      if (this.autoResize) {
        this.setSize(
          Math.floor(this.rect.width * this.pixelRatio),
          Math.floor(this.rect.height * this.pixelRatio)
        );
      }
    }
    window.addEventListener("resize", this.onResize);
  }
  setNeedsRedraw (redraw: boolean = true): Drawing {
    this.needsRedraw = redraw;
    return this;
  }
  hasRenderPass (cb: DrawingCallback): boolean {
    return this.renderPasses.includes(cb);
    // return this.renderPasses.indexOf(cb) != -1;
  }
  removeRenderPass (cb: DrawingCallback): Drawing {
    if (!this.hasRenderPass(cb)) throw "Cannot remove render pass, not in list";
    let ind = this.renderPasses.indexOf(cb);
    this.renderPasses.splice(ind, 1);
    return this;
  }
  addRenderPass (cb: DrawingCallback): Drawing {
    if (this.hasRenderPass(cb)) throw "Cannot add render pass more than once";
    this.renderPasses.push(cb);
    return this;
  }
  get width (): number {
    return this.element.width;
  }
  set width (v: number) {
    this.element.width = v;
  }
  get height (): number {
    return this.element.height;
  }
  set height (v: number) {
    this.element.height = v;
  }
  setSize (w: number, h: number): Drawing {
    this.width = w;
    this.height = h;
    this.needsRedraw = true;
    return this;
  }
  private render () {
    this.needsRedraw = false;
    if (this.autoClear) {
      this.context.clearRect(0, 0, this.width, this.height);
    }
    for (let cb of this.renderPasses) {
      cb(this.context, this);
    }
  }
  setHandlesResize (autoResize: boolean): Drawing {
    this.autoResize = autoResize;
    setTimeout(()=>{
      this.onResize(undefined);
    }, 100);
    return this;
  }
}
