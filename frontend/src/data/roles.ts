import type { RoleSummary } from "../types/role";

export const rolesData: RoleSummary[] = [
  {
    id: "feriado-na-praia",
    name: "Feriado na Praia",
    people: 4,
    total: "R$ 1.720,00",
    expenses: ["Airbnb", "Mercado", "Gasolina"],
    settlement: "João paga R$ 215,00 para Maria",
    participants: [
      { id: 1, name: "Você", status: "Conta ativa", note: "Organizador" },
      { id: 2, name: "Pedro", status: "Convidado", note: "Lançado sem cadastro" },
      { id: 3, name: "Ana", status: "Link enviado", note: "Pode entrar depois pelo link" },
      { id: 4, name: "Maria", status: "Conta ativa", note: "Participante" },
    ],
  },
  {
    id: "churrasco-em-ubatuba",
    name: "Churrasco em Ubatuba",
    people: 6,
    total: "R$ 980,00",
    expenses: ["Carnes", "Bebidas", "Carvão"],
    settlement: "Lucas paga R$ 80,00 para Júlia",
    participants: [
      { id: 1, name: "Você", status: "Conta ativa", note: "Organizador" },
      { id: 2, name: "Lucas", status: "Convidado", note: "Lançado sem cadastro" },
      { id: 3, name: "Júlia", status: "Conta ativa", note: "Participante" },
      { id: 4, name: "Rafa", status: "Link enviado", note: "Pode entrar depois pelo link" },
      { id: 5, name: "Bia", status: "Convidado", note: "Lançado sem cadastro" },
      { id: 6, name: "Caio", status: "Conta ativa", note: "Participante" },
    ],
  },
  {
    id: "aniversario-da-ana",
    name: "Aniversário da Ana",
    people: 8,
    total: "R$ 2.340,00",
    expenses: ["Bolo", "Decoração", "Buffet"],
    settlement: "Bruno paga R$ 120,00 para Ana",
    participants: [
      { id: 1, name: "Você", status: "Conta ativa", note: "Organizador" },
      { id: 2, name: "Ana", status: "Conta ativa", note: "Aniversariante" },
      { id: 3, name: "Bruno", status: "Link enviado", note: "Pode entrar depois pelo link" },
      { id: 4, name: "Carla", status: "Convidado", note: "Lançado sem cadastro" },
      { id: 5, name: "Diego", status: "Conta ativa", note: "Participante" },
      { id: 6, name: "Eva", status: "Convidado", note: "Lançado sem cadastro" },
      { id: 7, name: "Fê", status: "Link enviado", note: "Pode entrar depois pelo link" },
      { id: 8, name: "Gabi", status: "Conta ativa", note: "Participante" },
    ],
  },
];

export function getRoleById(roleId: string | undefined) {
  if (!roleId) return undefined;
  return rolesData.find((role) => role.id === roleId);
}
