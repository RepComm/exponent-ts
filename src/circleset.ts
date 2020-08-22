
export class CircleSet<T> {
  private internal: Array<T> = new Array();
  private currentIndex: number = 0;
  constructor () {

  }
  add (...items:Array<T>): CircleSet<T> {
    for (let item of items) {
      this.internal.push(item);
    }
    return this;
  }
  next (): T {
    this.currentIndex ++;
    if (this.currentIndex > this.internal.length-1) {
      this.currentIndex = 0;
    }
    let result: T = this.internal[this.currentIndex];
    return result;
  }
  /**Removes items from the set
   * Warning, performs array.splice for each item removed, could be expensive
   * @param items
   */
  remove (items:Array<T>): CircleSet<T> {
    let ind: number;
    for (let item of items) {
      ind = this.internal.indexOf(item);
      if (ind === -1) throw `cannot removed item ${item} as it is not contained in the set`;
      this.internal.splice(ind, 1);
    }
    return this;
  }
  /**Checks if item is in the set
   * Warning: Expensive on large sets
   * @param item
   */
  has (item: T): boolean {
    return this.internal.includes(item);
    // for (let i=0; i<this.internal.length; i++) {
    //   if (this.internal[i] === item) return true;
    // }
    // return false;
  }
}
