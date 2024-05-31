export interface ITree {
  id: number;
  parent: string | number;
  type?: string | null;
}
export default class TreeStore {
  private items: ITree[] = [];
  constructor(items: ITree[]) {
    this.items = items;
  }
  getAll(): ITree[] {
    return this.items;
  }
  getItem(id: number): ITree | undefined {
    return this.items.find(item => item.id === id);
  }
  getChildren(id: number): ITree[] {
    return this.items.filter(item => item.parent === id);
  }
  getAllChildren(id: number): ITree[] {
    const children = this.getChildren(id);
    return children.concat(
      ...children.map(child => this.getAllChildren(child.id))
    );
  }
  getAllParents(id: number): ITree[] {
    let parent = this.getItem(id);
    let parents = [] as ITree[];
    while (parent) {
      parents.push(parent);
      parent = this.getItem(+parent.parent);
    }
    return parents;
  }
}
