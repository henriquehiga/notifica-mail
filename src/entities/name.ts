import { InvalidNameError } from "@/entities/errors/invalid-name-error";
import { Either, left, right } from "@/shared/either";

export class Name {
  constructor(public value: string) {
  }

  public static create(value: string): Either<InvalidNameError, Name> {
    const isValid = this.validate(value);
    if (isValid) {
      const nome = new Name(value);
      return right(nome);
    }
    const error = new InvalidNameError();
    return left(error);
  }

  private static validate(value: string): boolean {
    if (value.length < 3) {
      return false;
    }
    if (!value.match("^[a-zA-Z ]+$")) {
      return false;
    }
    return true;
  }
}