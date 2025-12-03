import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { SellerRepository } from "../domain/SellerRepository";
import { UserRepository } from "../../User/domain/UserRepository";
import { BranchOfficeRepository } from "../../BranchOffice/domain/BranchOfficeRepository";

import { CreateSellerRequestDto } from "./Dto/CreateSellerRequestDto";
import { Seller } from "../domain/Seller";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class CreateSeller {
  constructor(
    private sellerRepository: SellerRepository,
    private userRepository: UserRepository,
    private branchOfficeRepository: BranchOfficeRepository
  ) {}

  async run(dto: CreateSellerRequestDto): Promise<void> {
    const sellerDto = plainToInstance(CreateSellerRequestDto, dto);

    await validateOrReject(sellerDto).catch((errors: ValidationError[]) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    const [user, branchOffice] = await Promise.all([
      this.userRepository.getUserById(dto.idUser),
      this.branchOfficeRepository.getById(dto.idBranchOffice),
    ]);

    if (!user) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El usuario con id ${dto.idUser} no existe`
      );
    }

    if (!branchOffice) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `La sucursal con id ${dto.idBranchOffice} no existe`
      );
    }

     const existingSeller = await this.sellerRepository.getByUserAndBranch(
      dto.idUser,
      dto.idBranchOffice
    );

    if (existingSeller) {
      throw new GlobalAppException(
        400,
        "4000",
        errorMessages["4000"],
        "Ya existe un vendedor asignado a este usuario en esta sucursal."
      );
    }

    const seller = new Seller({
      idUser: dto.idUser,
      idBranchOffice: dto.idBranchOffice,
      active: true,
    });

    await this.sellerRepository.createSeller(seller);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
