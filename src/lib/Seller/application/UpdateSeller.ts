import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { SellerRepository } from "../domain/SellerRepository";
import { UserRepository } from "../../User/domain/UserRepository";
import { BranchOfficeRepository } from "../../BranchOffice/domain/BranchOfficeRepository";

import { UpdateSellerRequestDto } from "./Dto/UpdateSellerRequestDto";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class UpdateSeller {
  constructor(
    private sellerRepository: SellerRepository,
    private userRepository: UserRepository,
    private branchOfficeRepository: BranchOfficeRepository
  ) {}

  async run(id: number, dto: UpdateSellerRequestDto): Promise<void> {
    const updateDto = plainToInstance(UpdateSellerRequestDto, dto);

    if (
      updateDto.idUser === undefined &&
      updateDto.idBranchOffice === undefined
    ) {
      throw new GlobalAppException(
        400,
        "4002",
        "Nada para actualizar",
        "Debe enviar al menos un campo para modificar."
      );
    }

    await validateOrReject(updateDto).catch((errors: ValidationError[]) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    const existing = await this.sellerRepository.getById(id);
    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El vendedor con id ${id} no existe`
      );
    }

    if (updateDto.idUser !== undefined) {
      const user = await this.userRepository.getUserById(updateDto.idUser);
      if (!user) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El usuario con id ${updateDto.idUser} no existe`
        );
      }
    }

    if (updateDto.idBranchOffice !== undefined) {
      const branch = await this.branchOfficeRepository.getById(
        updateDto.idBranchOffice
      );
      if (!branch) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `La sucursal con id ${updateDto.idBranchOffice} no existe`
        );
      }
    }

    await this.sellerRepository.update(id, updateDto);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
