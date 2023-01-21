import { CreateMalaDiretaModel } from "@/entities/models/create-mala-direta";

export type GetEmailsModel = {
  count: number;
  body: CreateMalaDiretaModel[];
}