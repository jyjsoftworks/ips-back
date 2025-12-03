import { SellerRepository } from "../domain/SellerRepository";
import { UserRepository } from "../../User/domain/UserRepository";
import { BranchOfficeRepository } from "../../BranchOffice/domain/BranchOfficeRepository";

import { SellerResponseDto } from "./Dto/SellerResponseDto";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetSeller {
  constructor(
    private sellerRepository: SellerRepository,
    private userRepository: UserRepository,
    private branchOfficeRepository: BranchOfficeRepository
  ) {}

  async run(): Promise<SellerResponseDto[]> {
    try {
      const sellers = await this.sellerRepository.getAll();

      if (!sellers.length) {
        throw new GlobalAppException(
          204,
          "2006",
          errorMessages["2006"],
          "No se encontraron vendedores"
        );
      }

      const result: SellerResponseDto[] = [];

      for (const seller of sellers) {
        const [user, branchOffice] = await Promise.all([
          this.userRepository.getUserById(seller.idUser),
          this.branchOfficeRepository.getById(seller.idBranchOffice),
        ]);

        result.push(
          new SellerResponseDto({
            id: seller.id!,
            idUser: seller.idUser,
            idBranchOffice: seller.idBranchOffice,
            active: seller.active,
            user: user
              ? {
                  id: user.id!,
                  firstName: user.firstName,
                  lastName: user.lastName,
                }
              : null,
            branchOffice: branchOffice
              ? {
                  id: branchOffice.id!,
                  name: branchOffice.name,
                  address: branchOffice.address,
                }
              : null,
          })
        );
      }

      return result;
    } catch (error) {
      throw error instanceof GlobalAppException
        ? error
        : new GlobalAppException(
            500,
            "ERROR",
            "SellerGetAllService",
            "Error inesperado al obtener vendedores."
          );
    }
  }
}
