// GetLetterById.ts
import { LetterRepository } from "../domain/LetterRepository";
import { PatientRepository } from "../../Patient/domain/PatientRepository";
import { DoctorRepository } from "../../Doctor/domain/DoctorRepository";
import { SellerRepository } from "../../Seller/domain/SellerRepository";
import { UserRepository } from "../../User/domain/UserRepository";
import { BranchOfficeRepository } from "../../BranchOffice/domain/BranchOfficeRepository";

import { LetterResponseDto } from "./Dto/LetterResponseDto";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetLetterById {
  constructor(
    private letterRepository: LetterRepository,
    private patientRepository: PatientRepository,
    private doctorRepository: DoctorRepository,
    private sellerRepository: SellerRepository,
    private userRepository: UserRepository,
    private branchOfficeRepository: BranchOfficeRepository
  ) {}

  async run(id: number): Promise<LetterResponseDto> {
    try {
      const letter = await this.letterRepository.getById(id);

      if (!letter) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El sobre con id ${id} no existe`
        );
      }

      const [patient, doctor, seller] = await Promise.all([
        this.patientRepository.getById(letter.idPatient),
        this.doctorRepository.getById(letter.idDoctor),
        this.sellerRepository.getById(letter.idSeller),
      ]);

      let sellerNode: LetterResponseDto["seller"] = null;

      if (seller) {
        const [user, branch] = await Promise.all([
          this.userRepository.getUserById(seller.idUser),
          this.branchOfficeRepository.getById(seller.idBranchOffice),
        ]);

        sellerNode = {
          id: seller.id!,
          active: seller.active,
          user: user
            ? {
                id: user.id!,
                firstName: user.firstName,
                lastName: user.lastName,
              }
            : null,
          branchOffice: branch
            ? {
                id: branch.id!,
                name: branch.name,
                address: branch.address,
              }
            : null,
        };
      }

      const dto = new LetterResponseDto({
        id: letter.id!,
        idPatient: letter.idPatient,
        idDoctor: letter.idDoctor,
        idSeller: letter.idSeller,
        active: letter.active,
        patient: patient
          ? {
              id: patient.id!,
              firstName: patient.firstName,
              lastName: patient.lastName,
              dni: patient.dni,
              phone: patient.phone,
              observation: patient.observation,
            }
          : null,
        doctor: doctor
          ? {
              id: doctor.id!,
              firstName: doctor.firstName,
              lastName: doctor.lastName,
              mat_nac: doctor.mat_nac,
              mat_prov: doctor.mat_prov,
            }
          : null,
        seller: sellerNode,
      });

      return dto;
    } catch (error) {
      throw error instanceof GlobalAppException
        ? error
        : new GlobalAppException(
            500,
            "ERROR",
            "LetterGetByIdService",
            "Error inesperado al obtener el sobre."
          );
    }
  }
}
