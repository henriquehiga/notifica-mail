import { Cliente } from "@/entities/cliente";
import { InvalidEmailError } from "@/entities/errors/invalid-email-error";
import { InvalidNameError } from "@/entities/errors/invalid-name-error";
import { InvalidTemplateCode } from "@/entities/errors/invalid-template-code";
import { EmailDataModel } from "@/entities/models/email-data";
import { Either, left, right } from "@/shared/either";
import { CreateMalaDiretaModel } from "./models/create-mala-direta";

export class MalaDireta {
  constructor(public cliente: Cliente, public emailData: EmailDataModel){ }

  public static create(data: CreateMalaDiretaModel): Either<InvalidEmailError | InvalidNameError | InvalidTemplateCode, MalaDireta> {
    const clienteOrError = Cliente.create(data.createClienteModel);
    if(clienteOrError.isLeft()) {
      return left(clienteOrError.value);
    }
    const emailDataIsValid = this.validate(data.emailData);
    if(!emailDataIsValid) {
      const error = new InvalidTemplateCode();
      return left(error);
    }
    const malaDireta = new MalaDireta(clienteOrError.value, data.emailData);
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

  toJson(cliente: Cliente, emailData: EmailDataModel) {
    return {
      cliente: cliente.toJson(),
      emailData
    }
  }
}