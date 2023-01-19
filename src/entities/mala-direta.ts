import { Cliente } from "@/entities/cliente";
import { InvalidEmailError } from "@/entities/errors/invalid-email-error";
import { InvalidNameError } from "@/entities/errors/invalid-name-error";
import { InvalidTemplateCode } from "@/entities/errors/invalid-template-code";
import { CreateClienteModel } from "@/entities/models/create-cliente";
import { EmailDataModel } from "@/entities/models/email-data";
import { Either, left, right } from "@/shared/either";

export class MalaDireta {
  constructor(public cliente: Cliente, public emailData: EmailDataModel){ }

  public static create(cliente: CreateClienteModel, emailData: EmailDataModel): Either<InvalidEmailError | InvalidNameError | InvalidTemplateCode, MalaDireta> {
    const clienteOrError = Cliente.create(cliente);
    if(clienteOrError.isLeft()) {
      return left(clienteOrError.value);
    }
    const emailDataIsValid = this.validate(emailData);
    if(!emailDataIsValid) {
      const error = new InvalidTemplateCode();
      return left(error);
    }
    const malaDireta = new MalaDireta(clienteOrError.value, emailData);
    return right(malaDireta);
  }

  private static validate(emailData: EmailDataModel): boolean {
    if(!emailData.templateCode) {
      return false;
    }
    if(emailData.templateCode.trim().length < 1) {
      return false;
    }
    return true;
  }
}