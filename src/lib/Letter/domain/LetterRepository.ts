import { Letter } from "./Letter";
import { UpdateLetterRequestDto } from "../application/Dto/UpdateLetterRequestDto";

export interface LetterRepository {
  getAllLetters(): Promise<Letter[]>;
  getById(id: number): Promise<Letter | null>;
  createLetter(letter: Letter): Promise<void>;
  update(id: number, dto: UpdateLetterRequestDto): Promise<void>;
}
