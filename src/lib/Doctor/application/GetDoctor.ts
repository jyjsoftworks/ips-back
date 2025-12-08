import { DoctorRepository } from "../domain/DoctorRepository";
import { Doctor } from "../domain/Doctor";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetDoctor {
  constructor(private doctorRepository: DoctorRepository) {}

  async run(): Promise<Doctor[]> {
    try {
      const doctors = await this.doctorRepository.getAllDoctors();

      if (!doctors.length) {
        throw new GlobalAppException(
          204,
          "2006",
          errorMessages["2006"],
          "No se encontraron doctores"
        );
      }

      return doctors;
    } catch (error) {
      throw error instanceof GlobalAppException
        ? error
        : new GlobalAppException(
            500,
            "ERROR",
            "DoctorGetAllService",
            "Error inesperado al obtener doctores."
          );
    }
  }
}
