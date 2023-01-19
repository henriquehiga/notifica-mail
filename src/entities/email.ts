import { InvalidEmailError } from "@/entities/errors/invalid-email-error";
import { Either, left, right } from "@/shared/either";

export class Email {
  private constructor(public value: string) {
  }

  public static create(value: string): Either<InvalidEmailError, Email> {
    const isValid = this.validate(value);
    if (isValid) {
      const email = new Email(value);
      return right(email);
    }
    const error = new InvalidEmailError();
    return left(error);
  }

  private static validate(value: string) {
    if (!value.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")) {
      return false;
    }
    return true;
  }
}