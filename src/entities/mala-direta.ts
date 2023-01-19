import { Cliente } from "@/entities/cliente";
import { InvalidEmailError } from "@/entities/errors/invalid-email-error";
import { InvalidNameError } from "@/entities/errors/invalid-name-error";
import { InvalidTemplateCode } from "@/entities/errors/invalid-template-code";
import { Either, left, right } from "@/shared/either";
import { CreateMalaDiretaModel } from "./models/create-mala-direta";
import { MalaDiretaDataModel } from "./models/email-data";

export class MalaDireta {
  constructor(public cliente: Cliente, public maladiretaData: MalaDiretaDataModel){ }

  public static create(data: CreateMalaDiretaModel): Either<InvalidEmailError | InvalidNameError | InvalidTemplateCode, MalaDireta> {
    const clienteOrError = Cliente.create(data.cliente);
    if(clienteOrError.isLeft()) {
      return left(clienteOrError.value);
    }
    const emailDataIsValid = this.validate(data.maladiretaData);
    if(!emailDataIsValid) {
      const error = new InvalidTemplateCode();
      return left(error);
    }
    const malaDireta = new MalaDireta(clienteOrError.value, data.maladiretaData);
    return right(malaDireta);
  }

  private static validate(maladiretaData: MalaDiretaDataModel): boolean {
    if(!maladiretaData.templateCode) {
      return false;
    }
    if(maladiretaData.templateCode.trim().length < 1) {
      return false;
    }
    return true;
  }

  toJson(cliente: Cliente, maladiretaData: MalaDiretaDataModel) {
    return {
      cliente: cliente.toJson(),
      maladiretaData
    }
  }
}