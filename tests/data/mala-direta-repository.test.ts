import { MalaDiretaRepository } from "@/data/contracts/mala-direta-repository";
import { MalaDireta } from "@/entities/mala-direta";
import { InMemoryMalaDiretaRepository } from "./memory-mala-direta-repository";

describe("MalaDireta Repository", () => {
  test("espero salvar uma mala direta", async () => {
    let malasdiretas = [];
    const repository : MalaDiretaRepository = new InMemoryMalaDiretaRepository(malasdiretas);
    const maladireta = MalaDireta.create({
      email: "validemail@mail.com",
      name: "valid name"
    }, {
      templateCode: "abc-123"
    }).value as MalaDireta;
    repository.save(maladireta);
    const malasdiretasCliente = await repository.getByEmail('validemail@mail.com');
    expect(malasdiretasCliente.length).toBe(1);
  })
})