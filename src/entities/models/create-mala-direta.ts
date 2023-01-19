import { CreateClienteModel } from "./create-cliente";
import { MalaDiretaDataModel } from "./email-data";

export type CreateMalaDiretaModel = {
  cliente: CreateClienteModel;
  maladiretaData: MalaDiretaDataModel;
} 