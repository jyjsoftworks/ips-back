export class SellerResponseDto {
  id: number;
  idUser: number;
  idBranchOffice: number;
  active: boolean;

  user: {
    id: number;
    firstName: string;
    lastName: string;
  } | null;

  branchOffice: {
    id: number;
    name: string;
    address: string;
  } | null;

  constructor(init?: Partial<SellerResponseDto>) {
    Object.assign(this, init);
  }
}
