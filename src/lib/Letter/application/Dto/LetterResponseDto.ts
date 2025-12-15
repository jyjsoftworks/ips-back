
export class LetterResponseDto {
  id: number;
  idPatient: number;
  idDoctor: number;
  idSeller: number;
  active: boolean;

  patient: {
    id: number;
    firstName: string;
    lastName: string;
    dni: string;
    phone: string;
    observation: string | null;
  } | null;

  doctor: {
    id: number;
    firstName: string;
    lastName: string;
    mat_nac: string;
    mat_prov: string;
  } | null;

seller: {
    id: number;
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
  } | null; null;

  constructor(init?: Partial<LetterResponseDto>) {
    Object.assign(this, init);
  }
}
