import Entity from "../entity/entity";

export default class Group {
  readonly map: Map<string, Entity[]>;

  constructor() {
    this.map = new Map<string, Entity[]>();
  }

  newGroup(name: string): void {
    this.map.set(name, []);
  }

  add(key: string, ent: Entity): void {
    if (!this.map.has(key)) this.map.set(key, []);
    this.map.get(key).push(ent);
    ent._groupKeys.push(key);
  }

  get(key: string): Entity[] {
    return this.map.get(key);
  }

  forEach(key:string , callback: CallableFunction): void{
    if(!this.map.has(key)) return;
    for(let ent of this.map.get(key)) callback(ent);
  }

}
