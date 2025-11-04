export class UserGeneralResponseDto {
  id:number;
  email: string;
  active: boolean;
  confirmed: boolean;
  lastLogin: Date;

  roles: {
    id: number;
    name: string;
  }[];
}
