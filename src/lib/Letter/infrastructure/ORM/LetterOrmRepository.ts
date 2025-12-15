// src/lib/Letter/infrastructure/ORM/LetterOrmRepository.ts
import { LetterRepository } from "../../domain/LetterRepository";
import { Letter } from "../../domain/Letter";
import { UpdateLetterRequestDto } from "../../application/Dto/UpdateLetterRequestDto";

import { LetterModel } from "./LetterModel";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";

export class LetterOrmRepository implements LetterRepository {
  async getAllLetters(): Promise<Letter[]> {
    const rows = await LetterModel.findAll();
    return rows.map((row) => this.mapToDomain(row));
  }

  async getById(id: number): Promise<Letter | null> {
    const row = await LetterModel.findByPk(id);
    return row ? this.mapToDomain(row) : null;
  }

  async createLetter(letter: Letter): Promise<void> {
    await LetterModel.create({
      idPatient: letter.idPatient,
      idDoctor: letter.idDoctor,
      idSeller: letter.idSeller,
      active: letter.active,
    });
  }

  async update(id: number, dto: UpdateLetterRequestDto): Promise<void> {
    const existing = await LetterModel.findByPk(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El sobre con id ${id} no existe`
      );
    }

    const dataToUpdate: any = {};
    if (dto.idPatient !== undefined) dataToUpdate.idPatient = dto.idPatient;
    if (dto.idDoctor !== undefined) dataToUpdate.idDoctor = dto.idDoctor;
    if (dto.idSeller !== undefined) dataToUpdate.idSeller = dto.idSeller;

    await LetterModel.update(dataToUpdate, { where: { id } });
  }

  private mapToDomain(model: LetterModel): Letter {
    return new Letter({
      id: model.id,
      idPatient: model.idPatient,
      idDoctor: model.idDoctor,
      idSeller: model.idSeller,
      active: model.active,
    });
  }
}
