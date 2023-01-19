import { MalaDiretaRepository } from "@/data/contracts/mala-direta-repository";
import { MalaDireta } from "@/entities/mala-direta";

export class InMemoryMalaDiretaRepository implements MalaDiretaRepository {
  constructor(private readonly repository: MalaDireta[]) { }
  
  async save(data: MalaDireta) {
    this.repository.push(data);
  };

  async getByEmail(email: string) {
    let malasdiretas = [];
    this.repository.find(maladireta => {
      if(maladireta.cliente.email.value == email) {
        malasdiretas.push(maladireta);
      }
    })
    return malasdiretas;
  }
}