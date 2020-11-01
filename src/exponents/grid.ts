
import { Exponent } from "../exponent.js";
import { Panel } from "./panel.js";

export class Grid extends Panel {
  columns: number;
  rows: number;
  constructor () {
    super();
    this.columns = 3;
    this.rows = 3;
    this.addClasses("exponent-grid");
  }
  setColumnCount (columns: number): this {
    this.columns = columns;
    this.styleItem("grid-template-columns", `repeat(${columns}, 1fr)`);
    return this;
  }
  getColumnCount (): number {
    return this.columns;
  }
  setRowCount (rows: number): this {
    this.rows = rows;
    this.styleItem("grid-template-rows", `repeat(${rows}, 1fr)`);
    return this;
  }
  getRowCount (): number {
    return this.rows;
  }
  setCell (e: Exponent, columnStart: number, rowStart: number, columnEnd?: number, rowEnd?: number): this {
    e.styleItem("grid-column-start", columnStart);
    e.styleItem("grid-row-start", rowStart);
    if (columnEnd) e.styleItem("grid-column-end", columnEnd);
    if (rowEnd) e.styleItem("grid-row-end", rowEnd);
    e.mount(this);
    return this;
  }
  setGap (gapStyle: string): this {
    this.styleItem("gap", gapStyle);
    return this;
  }
}
