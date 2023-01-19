import { MalaDiretaRepository } from "@/data/contracts/mala-direta-repository";
import { MalaDireta } from "@/entities/mala-direta";
import { CreateMalaDiretaModel } from "@/entities/models/create-mala-direta";
import { InMemoryMalaDiretaRepository } from "./memory-mala-direta-repository";

describe("MalaDireta Repository", () => {
  test("espero salvar uma mala direta", async () => {
    let malasdiretas = [];
    const repository : MalaDiretaRepository = new InMemoryMalaDiretaRepository(malasdiretas);
    const input: CreateMalaDiretaModel = {
      cliente : {
        name: "Valid Name",
        email: "validemail@mail.com"
      },
      maladiretaData : {
        templateCode : "abc-123"
      }
    }
    const maladireta = MalaDireta.create(input).value as MalaDireta;
    repository.save(maladireta);
    const malasdiretasCliente = await repository.getByEmail("validemail@mail.com");
    expect(malasdiretasCliente.length).toBe(1);
  })
})