import { Email } from "./email";
import { CreateClienteModel } from "@/entities/models/create-cliente";
import { Name } from "./name";
import { Either, left, right } from "@/shared/either";
import { InvalidEmailError } from "./errors/invalid-email-error";

export class Cliente {
  constructor(public name: Name, public email: Email) { };

  public static create(value: CreateClienteModel): Either<InvalidEmailError | InvalidEmailError, Cliente> {
    const nameOrError = Name.create(value.name);
    const emailOrError = Email.create(value.email);
    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }
    const cliente = new Cliente(nameOrError.value, emailOrError.value);
    return right(cliente);
  }

  public toJson(): any {
    return {
      name: this.name.value,
      email: this.email.value
    }
  }
}