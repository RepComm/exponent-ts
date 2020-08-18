
import { Exponent } from "../exponent.js";
import { Panel } from "./panel.js";

export class Grid extends Panel {
  columns: number = 3;
  rows: number = 3;
  constructor () {
    super();
    this.addClasses("exponent-grid");
  }
  setColumnCount (columns: number): Grid {
    this.columns = columns;
    this.styleItem("grid-template-columns", `repeat(${columns}, 1fr)`);
    return this;
  }
  getColumnCount (): number {
    return this.columns;
  }
  setRowCount (rows: number): Grid {
    this.rows = rows;
    this.styleItem("grid-template-rows", `repeat(${rows}, 1fr)`);
    return this;
  }
  getRowCount (): number {
    return this.rows;
  }
  setCell (e: Exponent, columnStart: number, rowStart: number, columnEnd?: number, rowEnd?: number): Grid {
    let x = `${columnStart}`;
    if (columnEnd) x += `/${columnEnd}`;
    
    let y = `${rowStart}`;
    if (rowEnd) x += `/${rowEnd}`;

    e.styleItem("grid-column", x);
    e.styleItem("grid-row", y);
    e.mount(this);
    return this;
  }
  setGap (gapStyle: string): Grid {
    this.styleItem("gap", gapStyle);
    return this;
  }
}
