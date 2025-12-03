// application/GetBranchOfficeById.ts
import { BranchOfficeRepository } from "../domain/BranchOfficeRepository";
import { BranchOffice } from "../domain/BranchOffice";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetBranchOfficeById {
  constructor(private branchOfficeRepository: BranchOfficeRepository) {}

  async run(id: number): Promise<BranchOffice> {
    try {
      const branch = await this.branchOfficeRepository.getById(id);

      if (!branch) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `La sucursal con id ${id} no existe`
        );
      }

      return branch;
    } catch (error) {
      throw error instanceof GlobalAppException
        ? error
        : new GlobalAppException(
            500,
            "ERROR",
            "BranchOfficeGetByIdService",
            "Error inesperado al obtener la sucursal."
          );
    }
  }
}
