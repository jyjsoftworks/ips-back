import { PatientRepository } from "../domain/PatientRepository";
import { Patient } from "../domain/Patient";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetPatientById {
  constructor(private patientRepository: PatientRepository) {}

  async run(id: number): Promise<Patient> {
    try {
      const patient = await this.patientRepository.getById(id);

      if (!patient) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El paciente con id ${id} no existe`
        );
      }

      return patient;
    } catch (error) {
      throw error instanceof GlobalAppException
        ? error
        : new GlobalAppException(
            500,
            "ERROR",
            "PatientGetByIdService",
            "Error inesperado al obtener el paciente."
          );
    }
  }
}
