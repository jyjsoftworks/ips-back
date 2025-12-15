export class LensResponseDto {
  id: number;
  type: string;
  frameId: number;
  glassId: number;

  leftSphere?: number;
  rightSphere?: number;
  leftCylinder?: number;
  rightCylinder?: number;
  leftAxis?: number;
  rightAxis?: number;
  leftAddition?: number;
  rightAddition?: number;

  subtotal: number;

  frame: {
    id: number;
    templeNumber: string;
    brand: string;
    price: number;
    commission: boolean;
    commissionPercentage: number;
    active: boolean;
  } | null;

   glass: {
    id: number;
    idCategory: number;
    idMaterial: number;
    idTreatment: number;
    active: boolean;

    category: {
      id: number;
      name: string;
    } | null;

    material: {
      id: number;
      name: string;
    } | null;

    treatment: {
      id: number;
      name: string;
      sphereLimit: number;
      cylinderLimit: number;
      leadTimeDays: number;
      price: number;
      commission: boolean;
      commissionPercentage: number;
      active: boolean;
    } | null;
  } | null;

  constructor(init?: Partial<LensResponseDto>) {
    Object.assign(this, init);
  }
}
