// GetLetter.ts
import { LetterRepository } from "../domain/LetterRepository";
import { PatientRepository } from "../../Patient/domain/PatientRepository";
import { DoctorRepository } from "../../Doctor/domain/DoctorRepository";
import { SellerRepository } from "../../Seller/domain/SellerRepository";
import { UserRepository } from "../../User/domain/UserRepository";
import { BranchOfficeRepository } from "../../BranchOffice/domain/BranchOfficeRepository";

import { LetterResponseDto } from "./Dto/LetterResponseDto";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetLetter {
  constructor(
    private letterRepository: LetterRepository,
    private patientRepository: PatientRepository,
    private doctorRepository: DoctorRepository,
    private sellerRepository: SellerRepository,
    private userRepository: UserRepository,
    private branchOfficeRepository: BranchOfficeRepository
  ) {}

  async run(): Promise<LetterResponseDto[]> {
    try {
      const letters = await this.letterRepository.getAllLetters();

      if (!letters.length) {
        throw new GlobalAppException(
          204,
          "2006",
          errorMessages["2006"],
          "No se encontraron sobres"
        );
      }

      const result: LetterResponseDto[] = [];

      for (const letter of letters) {
        const [patient, doctor, seller] = await Promise.all([
          this.patientRepository.getById(letter.idPatient),
          this.doctorRepository.getById(letter.idDoctor),
          this.sellerRepository.getById(letter.idSeller),
        ]);

        // 👇 si hay seller, traemos también user + branchOffice
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

        result.push(
          new LetterResponseDto({
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
            "LetterGetAllService",
            "Error inesperado al obtener sobres."
          );
    }
  }
}
