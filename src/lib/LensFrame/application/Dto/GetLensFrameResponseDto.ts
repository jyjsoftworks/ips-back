export class GetLensFrameResponseDto {
  templeNumber: string;
  brand: string;
  price: number;
  commission: boolean;
  commissionPercentage: number;

  constructor(init?: Partial<GetLensFrameResponseDto>) {
    Object.assign(this, init);
  }
}
