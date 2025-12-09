import { PatientRepository } from "../domain/PatientRepository";
import { Patient } from "../domain/Patient";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetPatient {
  constructor(private patientRepository: PatientRepository) {}

  async run(): Promise<Patient[]> {
    try {
      const patients = await this.patientRepository.getAllPatients();

      if (!patients.length) {
        throw new GlobalAppException(
          204,
          "2006",
          errorMessages["2006"],
          "No se encontraron pacientes"
        );
      }

      return patients;
    } catch (error) {
      throw error instanceof GlobalAppException
        ? error
        : new GlobalAppException(
            500,
            "ERROR",
            "PatientGetAllService",
            "Error inesperado al obtener pacientes."
          );
    }
  }
}
