// application/GetBranchOffice.ts
import { BranchOfficeRepository } from "../domain/BranchOfficeRepository";
import { BranchOffice } from "../domain/BranchOffice";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetBranchOffice {
  constructor(private branchOfficeRepository: BranchOfficeRepository) {}

  async run(): Promise<BranchOffice[]> {
    try {
      const branches = await this.branchOfficeRepository.getAllBranchOffice();

      if (!branches.length) {
        throw new GlobalAppException(
          204,
          "2006",
          errorMessages["2006"],
          "No se encontraron sucursales"
        );
      }

      return branches;
    } catch (error) {
      throw error instanceof GlobalAppException
        ? error
        : new GlobalAppException(
            500,
            "ERROR",
            "BranchOfficeGetAllService",
            "Error inesperado al obtener sucursales."
          );
    }
  }
}
