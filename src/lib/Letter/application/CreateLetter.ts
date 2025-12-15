import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { LetterRepository } from "../domain/LetterRepository";
import { PatientRepository } from "../../Patient/domain/PatientRepository";
import { DoctorRepository } from "../../Doctor/domain/DoctorRepository";
import { SellerRepository } from "../../Seller/domain/SellerRepository";

import { CreateLetterRequestDto } from "./Dto/CreateLetterRequestDto";
import { Letter } from "../domain/Letter";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class CreateLetter {
  constructor(
    private letterRepository: LetterRepository,
    private patientRepository: PatientRepository,
    private doctorRepository: DoctorRepository,
    private sellerRepository: SellerRepository
  ) {}

  async run(dto: CreateLetterRequestDto): Promise<void> {
    const letterDto = plainToInstance(CreateLetterRequestDto, dto);

    await validateOrReject(letterDto).catch((errors: ValidationError[]) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    // Validar FKs
    const [patient, doctor, seller] = await Promise.all([
      this.patientRepository.getById(dto.idPatient),
      this.doctorRepository.getById(dto.idDoctor),
      this.sellerRepository.getById(dto.idSeller),
    ]);

    if (!patient) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El paciente con id ${dto.idPatient} no existe`
      );
    }

    if (!doctor) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El doctor con id ${dto.idDoctor} no existe`
      );
    }

    if (!seller) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El vendedor con id ${dto.idSeller} no existe`
      );
    }

    const letter = new Letter({
      idPatient: dto.idPatient,
      idDoctor: dto.idDoctor,
      idSeller: dto.idSeller,
      active: true,
    });

    await this.letterRepository.createLetter(letter);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
