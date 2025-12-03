import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { BranchOfficeRepository } from "../domain/BranchOfficeRepository";
import { BranchOffice } from "../domain/BranchOffice";
import { CreateBranchOfficeRequestDto } from "./Dto/CreateBranchOfficeRequestDto";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class CreateBranchOffice {
  constructor(private branchOfficeRepository: BranchOfficeRepository) {}

  async run(dto: CreateBranchOfficeRequestDto): Promise<void> {
    const createDto = plainToInstance(CreateBranchOfficeRequestDto, dto);

    await validateOrReject(createDto).catch((errors: ValidationError[]) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    const existing = await this.branchOfficeRepository.getByName(dto.name);
    if (existing) {
      throw new GlobalAppException(
        400,
        "4000",
        errorMessages["4000"],
        "La sucursal ya existe."
      );
    }

    const branch = new BranchOffice({
      name: dto.name,
      address: dto.address,
      active: true,
    });

    await this.branchOfficeRepository.createBranchOffice(branch);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}