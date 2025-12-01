// domain/Lens.ts
export class Lens {
  public id?: number;
  public type: string;
  public frameId: number;
  public glassId: number;

  public leftSphere?: number
  public rightSphere?: number
  public leftCylinder?: number
  public rightCylinder?: number
  public leftAxis?: number
  public rightAxis?: number
  public leftAddition?: number
  public rightAddition?: number

  public subtotal: number;

  constructor(init?: Partial<Lens>) {
    Object.assign(this, init);
  }

  public mapToPrimitives() {
    return {
      id: this.id,
      type: this.type,
      frameId: this.frameId,
      glassId: this.glassId,
      leftSphere: this.leftSphere,
      rightSphere: this.rightSphere,
      leftCylinder: this.leftCylinder,
      rightCylinder: this.rightCylinder,
      leftAxis: this.leftAxis,
      rightAxis: this.rightAxis,
      leftAddition: this.leftAddition,
      rightAddition: this.rightAddition,
      subtotal: this.subtotal,
    };
  }
}
