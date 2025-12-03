import { SellerRepository } from "../domain/SellerRepository";
import { UserRepository } from "../../User/domain/UserRepository";
import { BranchOfficeRepository } from "../../BranchOffice/domain/BranchOfficeRepository";

import { SellerResponseDto } from "./Dto/SellerResponseDto";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetSellerById {
  constructor(
    private sellerRepository: SellerRepository,
    private userRepository: UserRepository,
    private branchOfficeRepository: BranchOfficeRepository
  ) {}

  async run(id: number): Promise<SellerResponseDto> {
    try {
      const seller = await this.sellerRepository.getById(id);

      if (!seller) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El vendedor con id ${id} no existe`
        );
      }

      const [user, branchOffice] = await Promise.all([
        this.userRepository.getUserById(seller.idUser),
        this.branchOfficeRepository.getById(seller.idBranchOffice),
      ]);

      const dto = new SellerResponseDto({
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
      });

      return dto;
    } catch (error) {
      throw error instanceof GlobalAppException
        ? error
        : new GlobalAppException(
            500,
            "ERROR",
            "SellerGetByIdService",
            "Error inesperado al obtener el vendedor."
          );
    }
  }
}
