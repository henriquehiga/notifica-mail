import { MalaDireta } from "@/entities/mala-direta";

export interface MalaDiretaRepository {
  save: (data: MalaDireta) => Promise<void>;
  getByEmail: (email: string) => Promise<MalaDireta[]>;
}