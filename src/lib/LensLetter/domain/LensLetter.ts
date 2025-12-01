export class LensLetter {
  public letterId: number;
  public lensId: number;

  constructor(init?: Partial<LensLetter>) {
    Object.assign(this, init);
  }

  public mapToPrimitives() {
    return {
      letterId: this.letterId,
      lensId: this.lensId,
    };
  }
}
