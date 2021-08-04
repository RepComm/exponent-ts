import Component from "../component";
import { Panel } from "./panel";
export declare class CheckList extends Panel {
    header: CheckListHeader;
    mods: Array<CheckListItem>;
    constructor();
    addItem(item: CheckListItem): this;
    createItem(name: string): CheckListItem;
    getHeader(): Component;
}
export declare class CheckListHeader extends Component {
    text: Component;
    constructor();
    textContent(text: string): this;
}
export declare class CheckListItem extends Component {
    text: Component;
    checkbox: Component;
    constructor();
    textContent(text: string): this;
    setChecked(checked: boolean): this;
    getChecked(): boolean;
}
