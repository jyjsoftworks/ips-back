export class GlassResponseDto {
  id: number;
  idCategory: number;
  idMaterial: number;
  idTreatment: number;
  active: boolean;

  category: {
    id: number;
    name: string;
  };

  material: {
    id: number;
    name: string;
  };

  treatment: {
    id: number;
    name:string;
    sphereLimit:number;
    cylinderLimit:number;
    leadTimeDays:number;
    price:number;
    commission:boolean;
    commissionPercentage:number;
    active: boolean;

  };

  constructor(init?: Partial<GlassResponseDto>) {
    Object.assign(this, init);
  }
}