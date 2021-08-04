import { Panel, SquarePanel } from "../mod.js";
export declare class Knob extends SquarePanel {
    grab: Panel;
    min: number;
    max: number;
    minTurns: number;
    maxTurns: number;
    value: number;
    prevalue: number;
    turning: boolean;
    turningx: number;
    turningy: number;
    step: number;
    static sensitivity: any;
    constructor();
    addValue(a: number): this;
    setValue(v: number): this;
    getValue(): number;
    setImage(url: string): this;
}
