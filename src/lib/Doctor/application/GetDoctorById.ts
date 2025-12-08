import { DoctorRepository } from "../domain/DoctorRepository";
import { Doctor } from "../domain/Doctor";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetDoctorById {
  constructor(private doctorRepository: DoctorRepository) {}

  async run(id: number): Promise<Doctor> {
    try {
      const doctor = await this.doctorRepository.getById(id);

      if (!doctor) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El doctor con id ${id} no existe`
        );
      }

      return doctor;
    } catch (error) {
      throw error instanceof GlobalAppException
        ? error
        : new GlobalAppException(
            500,
            "ERROR",
            "DoctorGetByIdService",
            "Error inesperado al obtener el doctor."
          );
    }
  }
}
